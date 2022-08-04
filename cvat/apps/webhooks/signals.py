from requests import post
from django.dispatch import receiver, Signal
from .models import Webhook, WebhookDelivery
from cvat.apps.engine.serializers import BasicUserSerializer

signal_update = Signal()

def send_webhooks(webhooks, data):
    print("webhooks", webhooks)
    for webhook in webhooks:
        data.update({'webhook_id': webhook.id})
        response = post(
            webhook.target_url,
            json=data
        )
        WebhookDelivery.objects.create(
            webhook_id=webhook.id,
            event=data["event"],
            status_code=response.status_code,
            changed_fields=','.join(list(data["before_update"].keys()))
        )


@receiver(signal_update)
def update(sender, serializer=None, old_values=None, **kwargs):
    # TO-DO: generalize this to work with any model
    oid = serializer.instance.segment.task.organization
    pid = serializer.data["project_id"]

    if oid is None and pid is None:
        return


    event_name = f"{sender.basename}_updated"
    payload = {
        "event": event_name,
        sender.basename: serializer.data,
        "before_update": old_values,
        "sender": BasicUserSerializer(sender.request.user, context={"request": sender.request}).data
    }

    if oid is not None:
        webhooks = Webhook.objects.filter(
            events__contains=event_name,
            organization=oid,
        )
        send_webhooks(webhooks, payload)

    if pid is not None:
        webhooks = Webhook.objects.filter(
            events__contains=event_name,
            project=pid,
        )
        send_webhooks(webhooks, payload)
