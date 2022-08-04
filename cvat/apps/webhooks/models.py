from enum import Enum

from django.db import models
from django.contrib.auth.models import User
from cvat.apps.engine.models import Project
from cvat.apps.organizations.models import Organization


class WebhookTypeChoice(str, Enum):
    ORGANIZATION = "organization"
    PROJECT = "project"

    @classmethod
    def choices(cls):
        return tuple((x.value, x.name) for x in cls)

    def __str__(self):
        return self.value


class WebhookContentTypeChoice(str, Enum):
    JSON = "application/json"

    @classmethod
    def choices(cls):
        return tuple((x.value, x.name) for x in cls)

    def __str__(self):
        return self.value


class Webhook(models.Model):
    target_url = models.URLField()

    events = models.CharField(max_length=4096, default="")
    type = models.CharField(max_length=16, choices=WebhookTypeChoice.choices())
    content_type = models.CharField(
        max_length=64,
        choices=WebhookContentTypeChoice.choices(),
        default=WebhookContentTypeChoice.JSON,
    )
    secret = models.CharField(max_length=64, blank=True, default="")

    is_active = models.BooleanField(default=True)
    enable_ssl = models.BooleanField(default=True)

    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    # questionable: should we keep webhook if owner has been deleted?
    owner = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.SET_NULL, related_name="+"
    )
    project = models.ForeignKey(
        Project, null=True, on_delete=models.CASCADE, related_name="+"
    )
    organization = models.ForeignKey(
        Organization, null=True, on_delete=models.CASCADE, related_name="+"
    )

    class Meta:
        default_permissions = ()
        unique_together = ("target_url", "secret", "enable_ssl", "type", "content_type")
        constraints = [
            models.CheckConstraint(
                name="webhooks_project_or_organization",
                check=(
                    models.Q(
                        type=WebhookTypeChoice.PROJECT.value,
                        project_id__isnull=False,
                        organization_id__isnull=True,
                    ) | \
                    models.Q(
                        type=WebhookTypeChoice.ORGANIZATION.value,
                        project_id__isnull=True,
                        organization_id__isnull=False,
                    )
                ),
            )
        ]

class WebhookDelivery(models.Model):
    webhook = models.ForeignKey(
        Webhook, on_delete=models.CASCADE, related_name="deliveries"
    )
    event = models.CharField(max_length=64)

    # TO-DO: define status_code field more accurate (as CharField with choices, or with specific validation)
    status_code = models.IntegerField()
    redelivery = models.BooleanField(default=False)

    delivered_at = models.DateTimeField(auto_now_add=True)
    changed_fields = models.CharField(max_length=4096, default="")

    class Meta:
        default_permissions = ()