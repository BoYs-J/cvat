# cvat_api_client.TasksApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**jobs_data_meta_partial_update**](TasksApi.md#jobs_data_meta_partial_update) | **PATCH** /api/jobs/{id}/data/meta | Method provides a meta information about media files which are related with the job
[**tasks_annotations_create**](TasksApi.md#tasks_annotations_create) | **POST** /api/tasks/{id}/annotations/ | 
[**tasks_annotations_destroy**](TasksApi.md#tasks_annotations_destroy) | **DELETE** /api/tasks/{id}/annotations/ | Method deletes all annotations for a specific task
[**tasks_annotations_partial_update**](TasksApi.md#tasks_annotations_partial_update) | **PATCH** /api/tasks/{id}/annotations/ | Method performs a partial update of annotations in a specific task
[**tasks_annotations_partial_update2**](TasksApi.md#tasks_annotations_partial_update2) | **PATCH** /api/tasks/{id}/annotations/{file_id} | 
[**tasks_annotations_retrieve**](TasksApi.md#tasks_annotations_retrieve) | **GET** /api/tasks/{id}/annotations/ | Method allows to download task annotations
[**tasks_annotations_update**](TasksApi.md#tasks_annotations_update) | **PUT** /api/tasks/{id}/annotations/ | Method allows to upload task annotations
[**tasks_backup_create**](TasksApi.md#tasks_backup_create) | **POST** /api/tasks/backup/ | Method recreates a task from an attached task backup file
[**tasks_backup_partial_update**](TasksApi.md#tasks_backup_partial_update) | **PATCH** /api/tasks/backup/{file_id} | 
[**tasks_backup_retrieve**](TasksApi.md#tasks_backup_retrieve) | **GET** /api/tasks/{id}/backup | Method backup a specified task
[**tasks_create**](TasksApi.md#tasks_create) | **POST** /api/tasks | Method creates a new task in a database without any attached images and videos
[**tasks_data_create**](TasksApi.md#tasks_data_create) | **POST** /api/tasks/{id}/data/ | Method permanently attaches images or video to a task. Supports tus uploads, see more https://tus.io/
[**tasks_data_meta_partial_update**](TasksApi.md#tasks_data_meta_partial_update) | **PATCH** /api/tasks/{id}/data/meta | Method provides a meta information about media files which are related with the task
[**tasks_data_meta_retrieve**](TasksApi.md#tasks_data_meta_retrieve) | **GET** /api/tasks/{id}/data/meta | Method provides a meta information about media files which are related with the task
[**tasks_data_partial_update**](TasksApi.md#tasks_data_partial_update) | **PATCH** /api/tasks/{id}/data/{file_id} | 
[**tasks_data_retrieve**](TasksApi.md#tasks_data_retrieve) | **GET** /api/tasks/{id}/data/ | Method returns data for a specific task
[**tasks_dataset_retrieve**](TasksApi.md#tasks_dataset_retrieve) | **GET** /api/tasks/{id}/dataset | Export task as a dataset in a specific format
[**tasks_destroy**](TasksApi.md#tasks_destroy) | **DELETE** /api/tasks/{id} | Method deletes a specific task, all attached jobs, annotations, and data
[**tasks_jobs_list**](TasksApi.md#tasks_jobs_list) | **GET** /api/tasks/{id}/jobs | Method returns a list of jobs for a specific task
[**tasks_list**](TasksApi.md#tasks_list) | **GET** /api/tasks | Returns a paginated list of tasks according to query parameters (10 tasks per page)
[**tasks_partial_update**](TasksApi.md#tasks_partial_update) | **PATCH** /api/tasks/{id} | Methods does a partial update of chosen fields in a task
[**tasks_retrieve**](TasksApi.md#tasks_retrieve) | **GET** /api/tasks/{id} | Method returns details of a specific task
[**tasks_status_retrieve**](TasksApi.md#tasks_status_retrieve) | **GET** /api/tasks/{id}/status | When task is being created the method returns information about a status of the creation process
[**tasks_update**](TasksApi.md#tasks_update) | **PUT** /api/tasks/{id} | Method updates a task by id


# **jobs_data_meta_partial_update**
> DataMetaRead jobs_data_meta_partial_update(id)

Method provides a meta information about media files which are related with the job

### Example

* Api Key Authentication (SignatureAuthentication):
* Basic Authentication (basicAuth):
* Api Key Authentication (cookieAuth):
* Api Key Authentication (tokenAuth):

```python
import time
import cvat_api_client
from cvat_api_client.api import tasks_api
from cvat_api_client.model.patched_job_write_request import PatchedJobWriteRequest
from cvat_api_client.model.data_meta_read import DataMetaRead
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = cvat_api_client.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: SignatureAuthentication
configuration.api_key['SignatureAuthentication'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['SignatureAuthentication'] = 'Bearer'

# Configure HTTP basic authorization: basicAuth
configuration = cvat_api_client.Configuration(
    username = 'YOUR_USERNAME',
    password = 'YOUR_PASSWORD'
)

# Configure API key authorization: cookieAuth
configuration.api_key['cookieAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['cookieAuth'] = 'Bearer'

# Configure API key authorization: tokenAuth
configuration.api_key['tokenAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['tokenAuth'] = 'Bearer'

# Enter a context with an instance of the API client
with cvat_api_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = tasks_api.TasksApi(api_client)
    id = 1 # int | A unique integer value identifying this job.
    patched_job_write_request = PatchedJobWriteRequest(
        assignee=1,
        stage=StageEnum("annotation"),
        state=StateBf1Enum("new"),
    ) # PatchedJobWriteRequest |  (optional)

    # example passing only required values which don't have defaults set
    try:
        # Method provides a meta information about media files which are related with the job
        api_response = api_instance.jobs_data_meta_partial_update(id)
        pprint(api_response)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->jobs_data_meta_partial_update: %s\n" % e)

    # example passing only required values which don't have defaults set
    # and optional values
    try:
        # Method provides a meta information about media files which are related with the job
        api_response = api_instance.jobs_data_meta_partial_update(id, patched_job_write_request=patched_job_write_request)
        pprint(api_response)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->jobs_data_meta_partial_update: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**| A unique integer value identifying this job. |
 **patched_job_write_request** | [**PatchedJobWriteRequest**](PatchedJobWriteRequest.md)|  | [optional]

### Return type

[**DataMetaRead**](DataMetaRead.md)

### Authorization

[SignatureAuthentication](../README.md#SignatureAuthentication), [basicAuth](../README.md#basicAuth), [cookieAuth](../README.md#cookieAuth), [tokenAuth](../README.md#tokenAuth)

### HTTP request headers

 - **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data, application/offset+octet-stream
 - **Accept**: application/vnd.cvat+json


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tasks_annotations_create**
> LabeledData tasks_annotations_create(id, labeled_data_request)



### Example

* Api Key Authentication (SignatureAuthentication):
* Basic Authentication (basicAuth):
* Api Key Authentication (cookieAuth):
* Api Key Authentication (tokenAuth):

```python
import time
import cvat_api_client
from cvat_api_client.api import tasks_api
from cvat_api_client.model.labeled_data_request import LabeledDataRequest
from cvat_api_client.model.labeled_data import LabeledData
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = cvat_api_client.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: SignatureAuthentication
configuration.api_key['SignatureAuthentication'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['SignatureAuthentication'] = 'Bearer'

# Configure HTTP basic authorization: basicAuth
configuration = cvat_api_client.Configuration(
    username = 'YOUR_USERNAME',
    password = 'YOUR_PASSWORD'
)

# Configure API key authorization: cookieAuth
configuration.api_key['cookieAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['cookieAuth'] = 'Bearer'

# Configure API key authorization: tokenAuth
configuration.api_key['tokenAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['tokenAuth'] = 'Bearer'

# Enter a context with an instance of the API client
with cvat_api_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = tasks_api.TasksApi(api_client)
    id = 1 # int | A unique integer value identifying this task.
    labeled_data_request = LabeledDataRequest(
        version=1,
        tags=[
            LabeledImageRequest(
                id=1,
                frame=0,
                label_id=0,
                group=0,
                source="manual",
                attributes=[
                    AttributeValRequest(
                        spec_id=1,
                        value="value_example",
                    ),
                ],
            ),
        ],
        shapes=[
            LabeledShapeRequest(
                type=Type411Enum("rectangle"),
                occluded=True,
                z_order=0,
                rotation=0.0,
                points=[
                    3.14,
                ],
                id=1,
                frame=0,
                label_id=0,
                group=0,
                source="manual",
                attributes=[
                    AttributeValRequest(
                        spec_id=1,
                        value="value_example",
                    ),
                ],
            ),
        ],
        tracks=[
            LabeledTrackRequest(
                id=1,
                frame=0,
                label_id=0,
                group=0,
                source="manual",
                shapes=[
                    TrackedShapeRequest(
                        type=Type411Enum("rectangle"),
                        occluded=True,
                        z_order=0,
                        rotation=0.0,
                        points=[
                            3.14,
                        ],
                        id=1,
                        frame=0,
                        outside=True,
                        attributes=[
                            AttributeValRequest(
                                spec_id=1,
                                value="value_example",
                            ),
                        ],
                    ),
                ],
                attributes=[
                    AttributeValRequest(
                        spec_id=1,
                        value="value_example",
                    ),
                ],
            ),
        ],
    ) # LabeledDataRequest | 

    # example passing only required values which don't have defaults set
    try:
        api_response = api_instance.tasks_annotations_create(id, labeled_data_request)
        pprint(api_response)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_annotations_create: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**| A unique integer value identifying this task. |
 **labeled_data_request** | [**LabeledDataRequest**](LabeledDataRequest.md)|  |

### Return type

[**LabeledData**](LabeledData.md)

### Authorization

[SignatureAuthentication](../README.md#SignatureAuthentication), [basicAuth](../README.md#basicAuth), [cookieAuth](../README.md#cookieAuth), [tokenAuth](../README.md#tokenAuth)

### HTTP request headers

 - **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data, application/offset+octet-stream
 - **Accept**: application/vnd.cvat+json


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tasks_annotations_destroy**
> tasks_annotations_destroy(id)

Method deletes all annotations for a specific task

### Example

* Api Key Authentication (SignatureAuthentication):
* Basic Authentication (basicAuth):
* Api Key Authentication (cookieAuth):
* Api Key Authentication (tokenAuth):

```python
import time
import cvat_api_client
from cvat_api_client.api import tasks_api
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = cvat_api_client.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: SignatureAuthentication
configuration.api_key['SignatureAuthentication'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['SignatureAuthentication'] = 'Bearer'

# Configure HTTP basic authorization: basicAuth
configuration = cvat_api_client.Configuration(
    username = 'YOUR_USERNAME',
    password = 'YOUR_PASSWORD'
)

# Configure API key authorization: cookieAuth
configuration.api_key['cookieAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['cookieAuth'] = 'Bearer'

# Configure API key authorization: tokenAuth
configuration.api_key['tokenAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['tokenAuth'] = 'Bearer'

# Enter a context with an instance of the API client
with cvat_api_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = tasks_api.TasksApi(api_client)
    id = 1 # int | A unique integer value identifying this task.

    # example passing only required values which don't have defaults set
    try:
        # Method deletes all annotations for a specific task
        api_instance.tasks_annotations_destroy(id)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_annotations_destroy: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**| A unique integer value identifying this task. |

### Return type

void (empty response body)

### Authorization

[SignatureAuthentication](../README.md#SignatureAuthentication), [basicAuth](../README.md#basicAuth), [cookieAuth](../README.md#cookieAuth), [tokenAuth](../README.md#tokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**204** | The annotation has been deleted |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tasks_annotations_partial_update**
> LabeledData tasks_annotations_partial_update(action, id)

Method performs a partial update of annotations in a specific task

### Example

* Api Key Authentication (SignatureAuthentication):
* Basic Authentication (basicAuth):
* Api Key Authentication (cookieAuth):
* Api Key Authentication (tokenAuth):

```python
import time
import cvat_api_client
from cvat_api_client.api import tasks_api
from cvat_api_client.model.patched_labeled_data_request import PatchedLabeledDataRequest
from cvat_api_client.model.labeled_data import LabeledData
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = cvat_api_client.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: SignatureAuthentication
configuration.api_key['SignatureAuthentication'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['SignatureAuthentication'] = 'Bearer'

# Configure HTTP basic authorization: basicAuth
configuration = cvat_api_client.Configuration(
    username = 'YOUR_USERNAME',
    password = 'YOUR_PASSWORD'
)

# Configure API key authorization: cookieAuth
configuration.api_key['cookieAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['cookieAuth'] = 'Bearer'

# Configure API key authorization: tokenAuth
configuration.api_key['tokenAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['tokenAuth'] = 'Bearer'

# Enter a context with an instance of the API client
with cvat_api_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = tasks_api.TasksApi(api_client)
    action = "create" # str | 
    id = 1 # int | A unique integer value identifying this task.
    patched_labeled_data_request = PatchedLabeledDataRequest(
        version=1,
        tags=[
            LabeledImageRequest(
                id=1,
                frame=0,
                label_id=0,
                group=0,
                source="manual",
                attributes=[
                    AttributeValRequest(
                        spec_id=1,
                        value="value_example",
                    ),
                ],
            ),
        ],
        shapes=[
            LabeledShapeRequest(
                type=Type411Enum("rectangle"),
                occluded=True,
                z_order=0,
                rotation=0.0,
                points=[
                    3.14,
                ],
                id=1,
                frame=0,
                label_id=0,
                group=0,
                source="manual",
                attributes=[
                    AttributeValRequest(
                        spec_id=1,
                        value="value_example",
                    ),
                ],
            ),
        ],
        tracks=[
            LabeledTrackRequest(
                id=1,
                frame=0,
                label_id=0,
                group=0,
                source="manual",
                shapes=[
                    TrackedShapeRequest(
                        type=Type411Enum("rectangle"),
                        occluded=True,
                        z_order=0,
                        rotation=0.0,
                        points=[
                            3.14,
                        ],
                        id=1,
                        frame=0,
                        outside=True,
                        attributes=[
                            AttributeValRequest(
                                spec_id=1,
                                value="value_example",
                            ),
                        ],
                    ),
                ],
                attributes=[
                    AttributeValRequest(
                        spec_id=1,
                        value="value_example",
                    ),
                ],
            ),
        ],
    ) # PatchedLabeledDataRequest |  (optional)

    # example passing only required values which don't have defaults set
    try:
        # Method performs a partial update of annotations in a specific task
        api_response = api_instance.tasks_annotations_partial_update(action, id)
        pprint(api_response)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_annotations_partial_update: %s\n" % e)

    # example passing only required values which don't have defaults set
    # and optional values
    try:
        # Method performs a partial update of annotations in a specific task
        api_response = api_instance.tasks_annotations_partial_update(action, id, patched_labeled_data_request=patched_labeled_data_request)
        pprint(api_response)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_annotations_partial_update: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **action** | **str**|  |
 **id** | **int**| A unique integer value identifying this task. |
 **patched_labeled_data_request** | [**PatchedLabeledDataRequest**](PatchedLabeledDataRequest.md)|  | [optional]

### Return type

[**LabeledData**](LabeledData.md)

### Authorization

[SignatureAuthentication](../README.md#SignatureAuthentication), [basicAuth](../README.md#basicAuth), [cookieAuth](../README.md#cookieAuth), [tokenAuth](../README.md#tokenAuth)

### HTTP request headers

 - **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data, application/offset+octet-stream
 - **Accept**: application/vnd.cvat+json


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tasks_annotations_partial_update2**
> Task tasks_annotations_partial_update2(file_id, id)



### Example

* Api Key Authentication (SignatureAuthentication):
* Basic Authentication (basicAuth):
* Api Key Authentication (cookieAuth):
* Api Key Authentication (tokenAuth):

```python
import time
import cvat_api_client
from cvat_api_client.api import tasks_api
from cvat_api_client.model.task import Task
from cvat_api_client.model.patched_task_request import PatchedTaskRequest
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = cvat_api_client.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: SignatureAuthentication
configuration.api_key['SignatureAuthentication'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['SignatureAuthentication'] = 'Bearer'

# Configure HTTP basic authorization: basicAuth
configuration = cvat_api_client.Configuration(
    username = 'YOUR_USERNAME',
    password = 'YOUR_PASSWORD'
)

# Configure API key authorization: cookieAuth
configuration.api_key['cookieAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['cookieAuth'] = 'Bearer'

# Configure API key authorization: tokenAuth
configuration.api_key['tokenAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['tokenAuth'] = 'Bearer'

# Enter a context with an instance of the API client
with cvat_api_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = tasks_api.TasksApi(api_client)
    file_id = "bf325375-e030-fccb-a009-17317c574773" # str | 
    id = 1 # int | A unique integer value identifying this task.
    patched_task_request = PatchedTaskRequest(
        name="name_example",
        project_id=1,
        owner=BasicUserRequest(
            username="A",
            first_name="first_name_example",
            last_name="last_name_example",
        ),
        assignee=PatchedProjectRequestAssignee(None),
        owner_id=1,
        assignee_id=1,
        bug_tracker="bug_tracker_example",
        overlap=1,
        segment_size=1,
        labels=[
            PatchedLabelRequest(
                id=1,
                name="name_example",
                color="color_example",
                attributes=[
                    AttributeRequest(
                        name="name_example",
                        mutable=True,
                        input_type=InputTypeEnum("checkbox"),
                        default_value="default_value_example",
                        values=[
                            "values_example",
                        ],
                    ),
                ],
                deleted=True,
            ),
        ],
        dimension="dimension_example",
        subset="subset_example",
    ) # PatchedTaskRequest |  (optional)

    # example passing only required values which don't have defaults set
    try:
        api_response = api_instance.tasks_annotations_partial_update2(file_id, id)
        pprint(api_response)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_annotations_partial_update2: %s\n" % e)

    # example passing only required values which don't have defaults set
    # and optional values
    try:
        api_response = api_instance.tasks_annotations_partial_update2(file_id, id, patched_task_request=patched_task_request)
        pprint(api_response)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_annotations_partial_update2: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **file_id** | **str**|  |
 **id** | **int**| A unique integer value identifying this task. |
 **patched_task_request** | [**PatchedTaskRequest**](PatchedTaskRequest.md)|  | [optional]

### Return type

[**Task**](Task.md)

### Authorization

[SignatureAuthentication](../README.md#SignatureAuthentication), [basicAuth](../README.md#basicAuth), [cookieAuth](../README.md#cookieAuth), [tokenAuth](../README.md#tokenAuth)

### HTTP request headers

 - **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data, application/offset+octet-stream
 - **Accept**: application/vnd.cvat+json


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tasks_annotations_retrieve**
> tasks_annotations_retrieve(id)

Method allows to download task annotations

### Example

* Api Key Authentication (SignatureAuthentication):
* Basic Authentication (basicAuth):
* Api Key Authentication (cookieAuth):
* Api Key Authentication (tokenAuth):

```python
import time
import cvat_api_client
from cvat_api_client.api import tasks_api
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = cvat_api_client.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: SignatureAuthentication
configuration.api_key['SignatureAuthentication'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['SignatureAuthentication'] = 'Bearer'

# Configure HTTP basic authorization: basicAuth
configuration = cvat_api_client.Configuration(
    username = 'YOUR_USERNAME',
    password = 'YOUR_PASSWORD'
)

# Configure API key authorization: cookieAuth
configuration.api_key['cookieAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['cookieAuth'] = 'Bearer'

# Configure API key authorization: tokenAuth
configuration.api_key['tokenAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['tokenAuth'] = 'Bearer'

# Enter a context with an instance of the API client
with cvat_api_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = tasks_api.TasksApi(api_client)
    id = 1 # int | A unique integer value identifying this task.
    action = "download" # str | Used to start downloading process after annotation file had been created (optional) if omitted the server will use the default value of "download"
    filename = "filename_example" # str | Desired output file name (optional)
    format = "format_example" # str | Desired output format name You can get the list of supported formats at: /server/annotation/formats (optional)

    # example passing only required values which don't have defaults set
    try:
        # Method allows to download task annotations
        api_instance.tasks_annotations_retrieve(id)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_annotations_retrieve: %s\n" % e)

    # example passing only required values which don't have defaults set
    # and optional values
    try:
        # Method allows to download task annotations
        api_instance.tasks_annotations_retrieve(id, action=action, filename=filename, format=format)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_annotations_retrieve: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**| A unique integer value identifying this task. |
 **action** | **str**| Used to start downloading process after annotation file had been created | [optional] if omitted the server will use the default value of "download"
 **filename** | **str**| Desired output file name | [optional]
 **format** | **str**| Desired output format name You can get the list of supported formats at: /server/annotation/formats | [optional]

### Return type

void (empty response body)

### Authorization

[SignatureAuthentication](../README.md#SignatureAuthentication), [basicAuth](../README.md#basicAuth), [cookieAuth](../README.md#cookieAuth), [tokenAuth](../README.md#tokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Download of file started |  -  |
**201** | Annotations file is ready to download |  -  |
**202** | Dump of annotations has been started |  -  |
**405** | Format is not available |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tasks_annotations_update**
> tasks_annotations_update(id, labeled_data_request)

Method allows to upload task annotations

### Example

* Api Key Authentication (SignatureAuthentication):
* Basic Authentication (basicAuth):
* Api Key Authentication (cookieAuth):
* Api Key Authentication (tokenAuth):

```python
import time
import cvat_api_client
from cvat_api_client.api import tasks_api
from cvat_api_client.model.labeled_data_request import LabeledDataRequest
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = cvat_api_client.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: SignatureAuthentication
configuration.api_key['SignatureAuthentication'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['SignatureAuthentication'] = 'Bearer'

# Configure HTTP basic authorization: basicAuth
configuration = cvat_api_client.Configuration(
    username = 'YOUR_USERNAME',
    password = 'YOUR_PASSWORD'
)

# Configure API key authorization: cookieAuth
configuration.api_key['cookieAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['cookieAuth'] = 'Bearer'

# Configure API key authorization: tokenAuth
configuration.api_key['tokenAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['tokenAuth'] = 'Bearer'

# Enter a context with an instance of the API client
with cvat_api_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = tasks_api.TasksApi(api_client)
    id = 1 # int | A unique integer value identifying this task.
    labeled_data_request = LabeledDataRequest(
        version=1,
        tags=[
            LabeledImageRequest(
                id=1,
                frame=0,
                label_id=0,
                group=0,
                source="manual",
                attributes=[
                    AttributeValRequest(
                        spec_id=1,
                        value="value_example",
                    ),
                ],
            ),
        ],
        shapes=[
            LabeledShapeRequest(
                type=Type411Enum("rectangle"),
                occluded=True,
                z_order=0,
                rotation=0.0,
                points=[
                    3.14,
                ],
                id=1,
                frame=0,
                label_id=0,
                group=0,
                source="manual",
                attributes=[
                    AttributeValRequest(
                        spec_id=1,
                        value="value_example",
                    ),
                ],
            ),
        ],
        tracks=[
            LabeledTrackRequest(
                id=1,
                frame=0,
                label_id=0,
                group=0,
                source="manual",
                shapes=[
                    TrackedShapeRequest(
                        type=Type411Enum("rectangle"),
                        occluded=True,
                        z_order=0,
                        rotation=0.0,
                        points=[
                            3.14,
                        ],
                        id=1,
                        frame=0,
                        outside=True,
                        attributes=[
                            AttributeValRequest(
                                spec_id=1,
                                value="value_example",
                            ),
                        ],
                    ),
                ],
                attributes=[
                    AttributeValRequest(
                        spec_id=1,
                        value="value_example",
                    ),
                ],
            ),
        ],
    ) # LabeledDataRequest | 
    format = "format_example" # str | Input format name You can get the list of supported formats at: /server/annotation/formats (optional)

    # example passing only required values which don't have defaults set
    try:
        # Method allows to upload task annotations
        api_instance.tasks_annotations_update(id, labeled_data_request)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_annotations_update: %s\n" % e)

    # example passing only required values which don't have defaults set
    # and optional values
    try:
        # Method allows to upload task annotations
        api_instance.tasks_annotations_update(id, labeled_data_request, format=format)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_annotations_update: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**| A unique integer value identifying this task. |
 **labeled_data_request** | [**LabeledDataRequest**](LabeledDataRequest.md)|  |
 **format** | **str**| Input format name You can get the list of supported formats at: /server/annotation/formats | [optional]

### Return type

void (empty response body)

### Authorization

[SignatureAuthentication](../README.md#SignatureAuthentication), [basicAuth](../README.md#basicAuth), [cookieAuth](../README.md#cookieAuth), [tokenAuth](../README.md#tokenAuth)

### HTTP request headers

 - **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data, application/offset+octet-stream
 - **Accept**: Not defined


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Uploading has finished |  -  |
**202** | Uploading has been started |  -  |
**405** | Format is not available |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tasks_backup_create**
> tasks_backup_create(task_request)

Method recreates a task from an attached task backup file

### Example

* Api Key Authentication (SignatureAuthentication):
* Basic Authentication (basicAuth):
* Api Key Authentication (cookieAuth):
* Api Key Authentication (tokenAuth):

```python
import time
import cvat_api_client
from cvat_api_client.api import tasks_api
from cvat_api_client.model.task_request import TaskRequest
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = cvat_api_client.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: SignatureAuthentication
configuration.api_key['SignatureAuthentication'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['SignatureAuthentication'] = 'Bearer'

# Configure HTTP basic authorization: basicAuth
configuration = cvat_api_client.Configuration(
    username = 'YOUR_USERNAME',
    password = 'YOUR_PASSWORD'
)

# Configure API key authorization: cookieAuth
configuration.api_key['cookieAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['cookieAuth'] = 'Bearer'

# Configure API key authorization: tokenAuth
configuration.api_key['tokenAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['tokenAuth'] = 'Bearer'

# Enter a context with an instance of the API client
with cvat_api_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = tasks_api.TasksApi(api_client)
    task_request = TaskRequest(
        name="name_example",
        project_id=1,
        owner=BasicUserRequest(
            username="A",
            first_name="first_name_example",
            last_name="last_name_example",
        ),
        assignee=PatchedProjectRequestAssignee(None),
        owner_id=1,
        assignee_id=1,
        bug_tracker="bug_tracker_example",
        overlap=1,
        segment_size=1,
        labels=[
            PatchedLabelRequest(
                id=1,
                name="name_example",
                color="color_example",
                attributes=[
                    AttributeRequest(
                        name="name_example",
                        mutable=True,
                        input_type=InputTypeEnum("checkbox"),
                        default_value="default_value_example",
                        values=[
                            "values_example",
                        ],
                    ),
                ],
                deleted=True,
            ),
        ],
        dimension="dimension_example",
        subset="subset_example",
    ) # TaskRequest | 

    # example passing only required values which don't have defaults set
    try:
        # Method recreates a task from an attached task backup file
        api_instance.tasks_backup_create(task_request)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_backup_create: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **task_request** | [**TaskRequest**](TaskRequest.md)|  |

### Return type

void (empty response body)

### Authorization

[SignatureAuthentication](../README.md#SignatureAuthentication), [basicAuth](../README.md#basicAuth), [cookieAuth](../README.md#cookieAuth), [tokenAuth](../README.md#tokenAuth)

### HTTP request headers

 - **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data, application/offset+octet-stream
 - **Accept**: Not defined


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | The task has been imported |  -  |
**202** | Importing a backup file has been started |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tasks_backup_partial_update**
> Task tasks_backup_partial_update(file_id)



### Example

* Api Key Authentication (SignatureAuthentication):
* Basic Authentication (basicAuth):
* Api Key Authentication (cookieAuth):
* Api Key Authentication (tokenAuth):

```python
import time
import cvat_api_client
from cvat_api_client.api import tasks_api
from cvat_api_client.model.task import Task
from cvat_api_client.model.patched_task_request import PatchedTaskRequest
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = cvat_api_client.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: SignatureAuthentication
configuration.api_key['SignatureAuthentication'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['SignatureAuthentication'] = 'Bearer'

# Configure HTTP basic authorization: basicAuth
configuration = cvat_api_client.Configuration(
    username = 'YOUR_USERNAME',
    password = 'YOUR_PASSWORD'
)

# Configure API key authorization: cookieAuth
configuration.api_key['cookieAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['cookieAuth'] = 'Bearer'

# Configure API key authorization: tokenAuth
configuration.api_key['tokenAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['tokenAuth'] = 'Bearer'

# Enter a context with an instance of the API client
with cvat_api_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = tasks_api.TasksApi(api_client)
    file_id = "bf325375-e030-fccb-a009-17317c574773" # str | 
    patched_task_request = PatchedTaskRequest(
        name="name_example",
        project_id=1,
        owner=BasicUserRequest(
            username="A",
            first_name="first_name_example",
            last_name="last_name_example",
        ),
        assignee=PatchedProjectRequestAssignee(None),
        owner_id=1,
        assignee_id=1,
        bug_tracker="bug_tracker_example",
        overlap=1,
        segment_size=1,
        labels=[
            PatchedLabelRequest(
                id=1,
                name="name_example",
                color="color_example",
                attributes=[
                    AttributeRequest(
                        name="name_example",
                        mutable=True,
                        input_type=InputTypeEnum("checkbox"),
                        default_value="default_value_example",
                        values=[
                            "values_example",
                        ],
                    ),
                ],
                deleted=True,
            ),
        ],
        dimension="dimension_example",
        subset="subset_example",
    ) # PatchedTaskRequest |  (optional)

    # example passing only required values which don't have defaults set
    try:
        api_response = api_instance.tasks_backup_partial_update(file_id)
        pprint(api_response)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_backup_partial_update: %s\n" % e)

    # example passing only required values which don't have defaults set
    # and optional values
    try:
        api_response = api_instance.tasks_backup_partial_update(file_id, patched_task_request=patched_task_request)
        pprint(api_response)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_backup_partial_update: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **file_id** | **str**|  |
 **patched_task_request** | [**PatchedTaskRequest**](PatchedTaskRequest.md)|  | [optional]

### Return type

[**Task**](Task.md)

### Authorization

[SignatureAuthentication](../README.md#SignatureAuthentication), [basicAuth](../README.md#basicAuth), [cookieAuth](../README.md#cookieAuth), [tokenAuth](../README.md#tokenAuth)

### HTTP request headers

 - **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data, application/offset+octet-stream
 - **Accept**: application/vnd.cvat+json


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tasks_backup_retrieve**
> tasks_backup_retrieve(id)

Method backup a specified task

### Example

* Api Key Authentication (SignatureAuthentication):
* Basic Authentication (basicAuth):
* Api Key Authentication (cookieAuth):
* Api Key Authentication (tokenAuth):

```python
import time
import cvat_api_client
from cvat_api_client.api import tasks_api
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = cvat_api_client.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: SignatureAuthentication
configuration.api_key['SignatureAuthentication'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['SignatureAuthentication'] = 'Bearer'

# Configure HTTP basic authorization: basicAuth
configuration = cvat_api_client.Configuration(
    username = 'YOUR_USERNAME',
    password = 'YOUR_PASSWORD'
)

# Configure API key authorization: cookieAuth
configuration.api_key['cookieAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['cookieAuth'] = 'Bearer'

# Configure API key authorization: tokenAuth
configuration.api_key['tokenAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['tokenAuth'] = 'Bearer'

# Enter a context with an instance of the API client
with cvat_api_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = tasks_api.TasksApi(api_client)
    id = 1 # int | A unique integer value identifying this task.

    # example passing only required values which don't have defaults set
    try:
        # Method backup a specified task
        api_instance.tasks_backup_retrieve(id)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_backup_retrieve: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**| A unique integer value identifying this task. |

### Return type

void (empty response body)

### Authorization

[SignatureAuthentication](../README.md#SignatureAuthentication), [basicAuth](../README.md#basicAuth), [cookieAuth](../README.md#cookieAuth), [tokenAuth](../README.md#tokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Download of file started |  -  |
**201** | Output backup file is ready for downloading |  -  |
**202** | Creating a backup file has been started |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tasks_create**
> Task tasks_create(task_request)

Method creates a new task in a database without any attached images and videos

### Example

* Api Key Authentication (SignatureAuthentication):
* Basic Authentication (basicAuth):
* Api Key Authentication (cookieAuth):
* Api Key Authentication (tokenAuth):

```python
import time
import cvat_api_client
from cvat_api_client.api import tasks_api
from cvat_api_client.model.task import Task
from cvat_api_client.model.task_request import TaskRequest
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = cvat_api_client.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: SignatureAuthentication
configuration.api_key['SignatureAuthentication'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['SignatureAuthentication'] = 'Bearer'

# Configure HTTP basic authorization: basicAuth
configuration = cvat_api_client.Configuration(
    username = 'YOUR_USERNAME',
    password = 'YOUR_PASSWORD'
)

# Configure API key authorization: cookieAuth
configuration.api_key['cookieAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['cookieAuth'] = 'Bearer'

# Configure API key authorization: tokenAuth
configuration.api_key['tokenAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['tokenAuth'] = 'Bearer'

# Enter a context with an instance of the API client
with cvat_api_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = tasks_api.TasksApi(api_client)
    task_request = TaskRequest(
        name="name_example",
        project_id=1,
        owner=BasicUserRequest(
            username="A",
            first_name="first_name_example",
            last_name="last_name_example",
        ),
        assignee=PatchedProjectRequestAssignee(None),
        owner_id=1,
        assignee_id=1,
        bug_tracker="bug_tracker_example",
        overlap=1,
        segment_size=1,
        labels=[
            PatchedLabelRequest(
                id=1,
                name="name_example",
                color="color_example",
                attributes=[
                    AttributeRequest(
                        name="name_example",
                        mutable=True,
                        input_type=InputTypeEnum("checkbox"),
                        default_value="default_value_example",
                        values=[
                            "values_example",
                        ],
                    ),
                ],
                deleted=True,
            ),
        ],
        dimension="dimension_example",
        subset="subset_example",
    ) # TaskRequest | 

    # example passing only required values which don't have defaults set
    try:
        # Method creates a new task in a database without any attached images and videos
        api_response = api_instance.tasks_create(task_request)
        pprint(api_response)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_create: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **task_request** | [**TaskRequest**](TaskRequest.md)|  |

### Return type

[**Task**](Task.md)

### Authorization

[SignatureAuthentication](../README.md#SignatureAuthentication), [basicAuth](../README.md#basicAuth), [cookieAuth](../README.md#cookieAuth), [tokenAuth](../README.md#tokenAuth)

### HTTP request headers

 - **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data, application/offset+octet-stream
 - **Accept**: application/vnd.cvat+json


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tasks_data_create**
> tasks_data_create(id, data_request)

Method permanently attaches images or video to a task. Supports tus uploads, see more https://tus.io/

### Example

* Api Key Authentication (SignatureAuthentication):
* Basic Authentication (basicAuth):
* Api Key Authentication (cookieAuth):
* Api Key Authentication (tokenAuth):

```python
import time
import cvat_api_client
from cvat_api_client.api import tasks_api
from cvat_api_client.model.data_request import DataRequest
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = cvat_api_client.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: SignatureAuthentication
configuration.api_key['SignatureAuthentication'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['SignatureAuthentication'] = 'Bearer'

# Configure HTTP basic authorization: basicAuth
configuration = cvat_api_client.Configuration(
    username = 'YOUR_USERNAME',
    password = 'YOUR_PASSWORD'
)

# Configure API key authorization: cookieAuth
configuration.api_key['cookieAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['cookieAuth'] = 'Bearer'

# Configure API key authorization: tokenAuth
configuration.api_key['tokenAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['tokenAuth'] = 'Bearer'

# Enter a context with an instance of the API client
with cvat_api_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = tasks_api.TasksApi(api_client)
    id = 1 # int | A unique integer value identifying this task.
    data_request = DataRequest(
        chunk_size=1,
        size=1,
        image_quality=0,
        start_frame=1,
        stop_frame=1,
        frame_filter="frame_filter_example",
        compressed_chunk_type=CompressedChunkTypeEnum("video"),
        original_chunk_type=OriginalChunkTypeEnum("video"),
        client_files=[
            ClientFileRequest(
                file=open('/path/to/file', 'rb'),
            ),
        ],
        server_files=[
            ServerFileRequest(
                file="file_example",
            ),
        ],
        remote_files=[
            RemoteFileRequest(
                file="file_example",
            ),
        ],
        use_zip_chunks=False,
        cloud_storage_id=1,
        use_cache=False,
        copy_data=False,
        storage_method=StorageMethodEnum("cache"),
        storage=StorageEnum("cloud_storage"),
        sorting_method=SortingMethodEnum("lexicographical"),
    ) # DataRequest | 
    upload_finish = True # bool | Finishes data upload. Can be combined with Upload-Start header to create task data with one request (optional)
    upload_multiple = True # bool | Indicates that data with this request are single or multiple files that should be attached to a task (optional)
    upload_start = True # bool | Initializes data upload. No data should be sent with this header (optional)

    # example passing only required values which don't have defaults set
    try:
        # Method permanently attaches images or video to a task. Supports tus uploads, see more https://tus.io/
        api_instance.tasks_data_create(id, data_request)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_data_create: %s\n" % e)

    # example passing only required values which don't have defaults set
    # and optional values
    try:
        # Method permanently attaches images or video to a task. Supports tus uploads, see more https://tus.io/
        api_instance.tasks_data_create(id, data_request, upload_finish=upload_finish, upload_multiple=upload_multiple, upload_start=upload_start)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_data_create: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**| A unique integer value identifying this task. |
 **data_request** | [**DataRequest**](DataRequest.md)|  |
 **upload_finish** | **bool**| Finishes data upload. Can be combined with Upload-Start header to create task data with one request | [optional]
 **upload_multiple** | **bool**| Indicates that data with this request are single or multiple files that should be attached to a task | [optional]
 **upload_start** | **bool**| Initializes data upload. No data should be sent with this header | [optional]

### Return type

void (empty response body)

### Authorization

[SignatureAuthentication](../README.md#SignatureAuthentication), [basicAuth](../README.md#basicAuth), [cookieAuth](../README.md#cookieAuth), [tokenAuth](../README.md#tokenAuth)

### HTTP request headers

 - **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data, application/offset+octet-stream
 - **Accept**: Not defined


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**202** | No response body |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tasks_data_meta_partial_update**
> DataMetaRead tasks_data_meta_partial_update(id)

Method provides a meta information about media files which are related with the task

### Example

* Api Key Authentication (SignatureAuthentication):
* Basic Authentication (basicAuth):
* Api Key Authentication (cookieAuth):
* Api Key Authentication (tokenAuth):

```python
import time
import cvat_api_client
from cvat_api_client.api import tasks_api
from cvat_api_client.model.data_meta_read import DataMetaRead
from cvat_api_client.model.patched_data_meta_read_request import PatchedDataMetaReadRequest
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = cvat_api_client.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: SignatureAuthentication
configuration.api_key['SignatureAuthentication'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['SignatureAuthentication'] = 'Bearer'

# Configure HTTP basic authorization: basicAuth
configuration = cvat_api_client.Configuration(
    username = 'YOUR_USERNAME',
    password = 'YOUR_PASSWORD'
)

# Configure API key authorization: cookieAuth
configuration.api_key['cookieAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['cookieAuth'] = 'Bearer'

# Configure API key authorization: tokenAuth
configuration.api_key['tokenAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['tokenAuth'] = 'Bearer'

# Enter a context with an instance of the API client
with cvat_api_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = tasks_api.TasksApi(api_client)
    id = 1 # int | A unique integer value identifying this task.
    patched_data_meta_read_request = PatchedDataMetaReadRequest(
        image_quality=0,
        frames=[
            FrameMetaRequest(
                width=1,
                height=1,
                name="name_example",
                has_related_context=True,
            ),
        ],
        deleted_frames=[
            0,
        ],
    ) # PatchedDataMetaReadRequest |  (optional)

    # example passing only required values which don't have defaults set
    try:
        # Method provides a meta information about media files which are related with the task
        api_response = api_instance.tasks_data_meta_partial_update(id)
        pprint(api_response)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_data_meta_partial_update: %s\n" % e)

    # example passing only required values which don't have defaults set
    # and optional values
    try:
        # Method provides a meta information about media files which are related with the task
        api_response = api_instance.tasks_data_meta_partial_update(id, patched_data_meta_read_request=patched_data_meta_read_request)
        pprint(api_response)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_data_meta_partial_update: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**| A unique integer value identifying this task. |
 **patched_data_meta_read_request** | [**PatchedDataMetaReadRequest**](PatchedDataMetaReadRequest.md)|  | [optional]

### Return type

[**DataMetaRead**](DataMetaRead.md)

### Authorization

[SignatureAuthentication](../README.md#SignatureAuthentication), [basicAuth](../README.md#basicAuth), [cookieAuth](../README.md#cookieAuth), [tokenAuth](../README.md#tokenAuth)

### HTTP request headers

 - **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data, application/offset+octet-stream
 - **Accept**: application/vnd.cvat+json


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tasks_data_meta_retrieve**
> DataMetaRead tasks_data_meta_retrieve(id)

Method provides a meta information about media files which are related with the task

### Example

* Api Key Authentication (SignatureAuthentication):
* Basic Authentication (basicAuth):
* Api Key Authentication (cookieAuth):
* Api Key Authentication (tokenAuth):

```python
import time
import cvat_api_client
from cvat_api_client.api import tasks_api
from cvat_api_client.model.data_meta_read import DataMetaRead
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = cvat_api_client.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: SignatureAuthentication
configuration.api_key['SignatureAuthentication'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['SignatureAuthentication'] = 'Bearer'

# Configure HTTP basic authorization: basicAuth
configuration = cvat_api_client.Configuration(
    username = 'YOUR_USERNAME',
    password = 'YOUR_PASSWORD'
)

# Configure API key authorization: cookieAuth
configuration.api_key['cookieAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['cookieAuth'] = 'Bearer'

# Configure API key authorization: tokenAuth
configuration.api_key['tokenAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['tokenAuth'] = 'Bearer'

# Enter a context with an instance of the API client
with cvat_api_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = tasks_api.TasksApi(api_client)
    id = 1 # int | A unique integer value identifying this task.

    # example passing only required values which don't have defaults set
    try:
        # Method provides a meta information about media files which are related with the task
        api_response = api_instance.tasks_data_meta_retrieve(id)
        pprint(api_response)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_data_meta_retrieve: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**| A unique integer value identifying this task. |

### Return type

[**DataMetaRead**](DataMetaRead.md)

### Authorization

[SignatureAuthentication](../README.md#SignatureAuthentication), [basicAuth](../README.md#basicAuth), [cookieAuth](../README.md#cookieAuth), [tokenAuth](../README.md#tokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/vnd.cvat+json


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tasks_data_partial_update**
> Task tasks_data_partial_update(file_id, id)



### Example

* Api Key Authentication (SignatureAuthentication):
* Basic Authentication (basicAuth):
* Api Key Authentication (cookieAuth):
* Api Key Authentication (tokenAuth):

```python
import time
import cvat_api_client
from cvat_api_client.api import tasks_api
from cvat_api_client.model.task import Task
from cvat_api_client.model.patched_task_request import PatchedTaskRequest
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = cvat_api_client.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: SignatureAuthentication
configuration.api_key['SignatureAuthentication'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['SignatureAuthentication'] = 'Bearer'

# Configure HTTP basic authorization: basicAuth
configuration = cvat_api_client.Configuration(
    username = 'YOUR_USERNAME',
    password = 'YOUR_PASSWORD'
)

# Configure API key authorization: cookieAuth
configuration.api_key['cookieAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['cookieAuth'] = 'Bearer'

# Configure API key authorization: tokenAuth
configuration.api_key['tokenAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['tokenAuth'] = 'Bearer'

# Enter a context with an instance of the API client
with cvat_api_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = tasks_api.TasksApi(api_client)
    file_id = "bf325375-e030-fccb-a009-17317c574773" # str | 
    id = 1 # int | A unique integer value identifying this task.
    patched_task_request = PatchedTaskRequest(
        name="name_example",
        project_id=1,
        owner=BasicUserRequest(
            username="A",
            first_name="first_name_example",
            last_name="last_name_example",
        ),
        assignee=PatchedProjectRequestAssignee(None),
        owner_id=1,
        assignee_id=1,
        bug_tracker="bug_tracker_example",
        overlap=1,
        segment_size=1,
        labels=[
            PatchedLabelRequest(
                id=1,
                name="name_example",
                color="color_example",
                attributes=[
                    AttributeRequest(
                        name="name_example",
                        mutable=True,
                        input_type=InputTypeEnum("checkbox"),
                        default_value="default_value_example",
                        values=[
                            "values_example",
                        ],
                    ),
                ],
                deleted=True,
            ),
        ],
        dimension="dimension_example",
        subset="subset_example",
    ) # PatchedTaskRequest |  (optional)

    # example passing only required values which don't have defaults set
    try:
        api_response = api_instance.tasks_data_partial_update(file_id, id)
        pprint(api_response)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_data_partial_update: %s\n" % e)

    # example passing only required values which don't have defaults set
    # and optional values
    try:
        api_response = api_instance.tasks_data_partial_update(file_id, id, patched_task_request=patched_task_request)
        pprint(api_response)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_data_partial_update: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **file_id** | **str**|  |
 **id** | **int**| A unique integer value identifying this task. |
 **patched_task_request** | [**PatchedTaskRequest**](PatchedTaskRequest.md)|  | [optional]

### Return type

[**Task**](Task.md)

### Authorization

[SignatureAuthentication](../README.md#SignatureAuthentication), [basicAuth](../README.md#basicAuth), [cookieAuth](../README.md#cookieAuth), [tokenAuth](../README.md#tokenAuth)

### HTTP request headers

 - **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data, application/offset+octet-stream
 - **Accept**: application/vnd.cvat+json


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tasks_data_retrieve**
> tasks_data_retrieve(id, number, quality, type)

Method returns data for a specific task

### Example

* Api Key Authentication (SignatureAuthentication):
* Basic Authentication (basicAuth):
* Api Key Authentication (cookieAuth):
* Api Key Authentication (tokenAuth):

```python
import time
import cvat_api_client
from cvat_api_client.api import tasks_api
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = cvat_api_client.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: SignatureAuthentication
configuration.api_key['SignatureAuthentication'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['SignatureAuthentication'] = 'Bearer'

# Configure HTTP basic authorization: basicAuth
configuration = cvat_api_client.Configuration(
    username = 'YOUR_USERNAME',
    password = 'YOUR_PASSWORD'
)

# Configure API key authorization: cookieAuth
configuration.api_key['cookieAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['cookieAuth'] = 'Bearer'

# Configure API key authorization: tokenAuth
configuration.api_key['tokenAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['tokenAuth'] = 'Bearer'

# Enter a context with an instance of the API client
with cvat_api_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = tasks_api.TasksApi(api_client)
    id = 1 # int | A unique integer value identifying this task.
    number = 3.14 # float | A unique number value identifying chunk or frame, doesn't matter for 'preview' type
    quality = "compressed" # str | Specifies the quality level of the requested data, doesn't matter for 'preview' type
    type = "chunk" # str | Specifies the type of the requested data

    # example passing only required values which don't have defaults set
    try:
        # Method returns data for a specific task
        api_instance.tasks_data_retrieve(id, number, quality, type)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_data_retrieve: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**| A unique integer value identifying this task. |
 **number** | **float**| A unique number value identifying chunk or frame, doesn&#39;t matter for &#39;preview&#39; type |
 **quality** | **str**| Specifies the quality level of the requested data, doesn&#39;t matter for &#39;preview&#39; type |
 **type** | **str**| Specifies the type of the requested data |

### Return type

void (empty response body)

### Authorization

[SignatureAuthentication](../README.md#SignatureAuthentication), [basicAuth](../README.md#basicAuth), [cookieAuth](../README.md#cookieAuth), [tokenAuth](../README.md#tokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Data of a specific type |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tasks_dataset_retrieve**
> tasks_dataset_retrieve(format, id)

Export task as a dataset in a specific format

### Example

* Api Key Authentication (SignatureAuthentication):
* Basic Authentication (basicAuth):
* Api Key Authentication (cookieAuth):
* Api Key Authentication (tokenAuth):

```python
import time
import cvat_api_client
from cvat_api_client.api import tasks_api
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = cvat_api_client.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: SignatureAuthentication
configuration.api_key['SignatureAuthentication'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['SignatureAuthentication'] = 'Bearer'

# Configure HTTP basic authorization: basicAuth
configuration = cvat_api_client.Configuration(
    username = 'YOUR_USERNAME',
    password = 'YOUR_PASSWORD'
)

# Configure API key authorization: cookieAuth
configuration.api_key['cookieAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['cookieAuth'] = 'Bearer'

# Configure API key authorization: tokenAuth
configuration.api_key['tokenAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['tokenAuth'] = 'Bearer'

# Enter a context with an instance of the API client
with cvat_api_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = tasks_api.TasksApi(api_client)
    format = "format_example" # str | Desired output format name You can get the list of supported formats at: /server/annotation/formats
    id = 1 # int | A unique integer value identifying this task.
    action = "download" # str | Used to start downloading process after annotation file had been created (optional) if omitted the server will use the default value of "download"
    filename = "filename_example" # str | Desired output file name (optional)

    # example passing only required values which don't have defaults set
    try:
        # Export task as a dataset in a specific format
        api_instance.tasks_dataset_retrieve(format, id)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_dataset_retrieve: %s\n" % e)

    # example passing only required values which don't have defaults set
    # and optional values
    try:
        # Export task as a dataset in a specific format
        api_instance.tasks_dataset_retrieve(format, id, action=action, filename=filename)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_dataset_retrieve: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **format** | **str**| Desired output format name You can get the list of supported formats at: /server/annotation/formats |
 **id** | **int**| A unique integer value identifying this task. |
 **action** | **str**| Used to start downloading process after annotation file had been created | [optional] if omitted the server will use the default value of "download"
 **filename** | **str**| Desired output file name | [optional]

### Return type

void (empty response body)

### Authorization

[SignatureAuthentication](../README.md#SignatureAuthentication), [basicAuth](../README.md#basicAuth), [cookieAuth](../README.md#cookieAuth), [tokenAuth](../README.md#tokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Download of file started |  -  |
**201** | Output file is ready for downloading |  -  |
**202** | Exporting has been started |  -  |
**405** | Format is not available |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tasks_destroy**
> tasks_destroy(id)

Method deletes a specific task, all attached jobs, annotations, and data

### Example

* Api Key Authentication (SignatureAuthentication):
* Basic Authentication (basicAuth):
* Api Key Authentication (cookieAuth):
* Api Key Authentication (tokenAuth):

```python
import time
import cvat_api_client
from cvat_api_client.api import tasks_api
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = cvat_api_client.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: SignatureAuthentication
configuration.api_key['SignatureAuthentication'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['SignatureAuthentication'] = 'Bearer'

# Configure HTTP basic authorization: basicAuth
configuration = cvat_api_client.Configuration(
    username = 'YOUR_USERNAME',
    password = 'YOUR_PASSWORD'
)

# Configure API key authorization: cookieAuth
configuration.api_key['cookieAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['cookieAuth'] = 'Bearer'

# Configure API key authorization: tokenAuth
configuration.api_key['tokenAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['tokenAuth'] = 'Bearer'

# Enter a context with an instance of the API client
with cvat_api_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = tasks_api.TasksApi(api_client)
    id = 1 # int | A unique integer value identifying this task.

    # example passing only required values which don't have defaults set
    try:
        # Method deletes a specific task, all attached jobs, annotations, and data
        api_instance.tasks_destroy(id)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_destroy: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**| A unique integer value identifying this task. |

### Return type

void (empty response body)

### Authorization

[SignatureAuthentication](../README.md#SignatureAuthentication), [basicAuth](../README.md#basicAuth), [cookieAuth](../README.md#cookieAuth), [tokenAuth](../README.md#tokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**204** | The task has been deleted |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tasks_jobs_list**
> PaginatedJobReadList tasks_jobs_list(id)

Method returns a list of jobs for a specific task

### Example

* Api Key Authentication (SignatureAuthentication):
* Basic Authentication (basicAuth):
* Api Key Authentication (cookieAuth):
* Api Key Authentication (tokenAuth):

```python
import time
import cvat_api_client
from cvat_api_client.api import tasks_api
from cvat_api_client.model.paginated_job_read_list import PaginatedJobReadList
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = cvat_api_client.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: SignatureAuthentication
configuration.api_key['SignatureAuthentication'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['SignatureAuthentication'] = 'Bearer'

# Configure HTTP basic authorization: basicAuth
configuration = cvat_api_client.Configuration(
    username = 'YOUR_USERNAME',
    password = 'YOUR_PASSWORD'
)

# Configure API key authorization: cookieAuth
configuration.api_key['cookieAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['cookieAuth'] = 'Bearer'

# Configure API key authorization: tokenAuth
configuration.api_key['tokenAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['tokenAuth'] = 'Bearer'

# Enter a context with an instance of the API client
with cvat_api_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = tasks_api.TasksApi(api_client)
    id = 1 # int | A unique integer value identifying this task.
    filter = "filter_example" # str | A filter term. Avaliable filter_fields: ['project_name', 'name', 'owner', 'status', 'assignee', 'subset', 'mode', 'dimension', 'id', 'project_id', 'updated_date'] (optional)
    org = "org_example" # str | Organization unique slug (optional)
    org_id = "org_id_example" # str | Organization identifier (optional)
    page = 1 # int | A page number within the paginated result set. (optional)
    page_size = 1 # int | Number of results to return per page. (optional)
    search = "search_example" # str | A search term. Avaliable search_fields: ('project_name', 'name', 'owner', 'status', 'assignee', 'subset', 'mode', 'dimension') (optional)
    sort = "sort_example" # str | Which field to use when ordering the results. Avaliable ordering_fields: ['project_name', 'name', 'owner', 'status', 'assignee', 'subset', 'mode', 'dimension', 'id', 'project_id', 'updated_date'] (optional)

    # example passing only required values which don't have defaults set
    try:
        # Method returns a list of jobs for a specific task
        api_response = api_instance.tasks_jobs_list(id)
        pprint(api_response)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_jobs_list: %s\n" % e)

    # example passing only required values which don't have defaults set
    # and optional values
    try:
        # Method returns a list of jobs for a specific task
        api_response = api_instance.tasks_jobs_list(id, filter=filter, org=org, org_id=org_id, page=page, page_size=page_size, search=search, sort=sort)
        pprint(api_response)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_jobs_list: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**| A unique integer value identifying this task. |
 **filter** | **str**| A filter term. Avaliable filter_fields: [&#39;project_name&#39;, &#39;name&#39;, &#39;owner&#39;, &#39;status&#39;, &#39;assignee&#39;, &#39;subset&#39;, &#39;mode&#39;, &#39;dimension&#39;, &#39;id&#39;, &#39;project_id&#39;, &#39;updated_date&#39;] | [optional]
 **org** | **str**| Organization unique slug | [optional]
 **org_id** | **str**| Organization identifier | [optional]
 **page** | **int**| A page number within the paginated result set. | [optional]
 **page_size** | **int**| Number of results to return per page. | [optional]
 **search** | **str**| A search term. Avaliable search_fields: (&#39;project_name&#39;, &#39;name&#39;, &#39;owner&#39;, &#39;status&#39;, &#39;assignee&#39;, &#39;subset&#39;, &#39;mode&#39;, &#39;dimension&#39;) | [optional]
 **sort** | **str**| Which field to use when ordering the results. Avaliable ordering_fields: [&#39;project_name&#39;, &#39;name&#39;, &#39;owner&#39;, &#39;status&#39;, &#39;assignee&#39;, &#39;subset&#39;, &#39;mode&#39;, &#39;dimension&#39;, &#39;id&#39;, &#39;project_id&#39;, &#39;updated_date&#39;] | [optional]

### Return type

[**PaginatedJobReadList**](PaginatedJobReadList.md)

### Authorization

[SignatureAuthentication](../README.md#SignatureAuthentication), [basicAuth](../README.md#basicAuth), [cookieAuth](../README.md#cookieAuth), [tokenAuth](../README.md#tokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/vnd.cvat+json


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tasks_list**
> PaginatedTaskList tasks_list()

Returns a paginated list of tasks according to query parameters (10 tasks per page)

### Example

* Api Key Authentication (SignatureAuthentication):
* Basic Authentication (basicAuth):
* Api Key Authentication (cookieAuth):
* Api Key Authentication (tokenAuth):

```python
import time
import cvat_api_client
from cvat_api_client.api import tasks_api
from cvat_api_client.model.paginated_task_list import PaginatedTaskList
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = cvat_api_client.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: SignatureAuthentication
configuration.api_key['SignatureAuthentication'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['SignatureAuthentication'] = 'Bearer'

# Configure HTTP basic authorization: basicAuth
configuration = cvat_api_client.Configuration(
    username = 'YOUR_USERNAME',
    password = 'YOUR_PASSWORD'
)

# Configure API key authorization: cookieAuth
configuration.api_key['cookieAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['cookieAuth'] = 'Bearer'

# Configure API key authorization: tokenAuth
configuration.api_key['tokenAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['tokenAuth'] = 'Bearer'

# Enter a context with an instance of the API client
with cvat_api_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = tasks_api.TasksApi(api_client)
    filter = "filter_example" # str | A filter term. Avaliable filter_fields: ['project_name', 'name', 'owner', 'status', 'assignee', 'subset', 'mode', 'dimension', 'id', 'project_id', 'updated_date'] (optional)
    org = "org_example" # str | Organization unique slug (optional)
    org_id = "org_id_example" # str | Organization identifier (optional)
    page = 1 # int | A page number within the paginated result set. (optional)
    page_size = 1 # int | Number of results to return per page. (optional)
    search = "search_example" # str | A search term. Avaliable search_fields: ('project_name', 'name', 'owner', 'status', 'assignee', 'subset', 'mode', 'dimension') (optional)
    sort = "sort_example" # str | Which field to use when ordering the results. Avaliable ordering_fields: ['project_name', 'name', 'owner', 'status', 'assignee', 'subset', 'mode', 'dimension', 'id', 'project_id', 'updated_date'] (optional)

    # example passing only required values which don't have defaults set
    # and optional values
    try:
        # Returns a paginated list of tasks according to query parameters (10 tasks per page)
        api_response = api_instance.tasks_list(filter=filter, org=org, org_id=org_id, page=page, page_size=page_size, search=search, sort=sort)
        pprint(api_response)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_list: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **filter** | **str**| A filter term. Avaliable filter_fields: [&#39;project_name&#39;, &#39;name&#39;, &#39;owner&#39;, &#39;status&#39;, &#39;assignee&#39;, &#39;subset&#39;, &#39;mode&#39;, &#39;dimension&#39;, &#39;id&#39;, &#39;project_id&#39;, &#39;updated_date&#39;] | [optional]
 **org** | **str**| Organization unique slug | [optional]
 **org_id** | **str**| Organization identifier | [optional]
 **page** | **int**| A page number within the paginated result set. | [optional]
 **page_size** | **int**| Number of results to return per page. | [optional]
 **search** | **str**| A search term. Avaliable search_fields: (&#39;project_name&#39;, &#39;name&#39;, &#39;owner&#39;, &#39;status&#39;, &#39;assignee&#39;, &#39;subset&#39;, &#39;mode&#39;, &#39;dimension&#39;) | [optional]
 **sort** | **str**| Which field to use when ordering the results. Avaliable ordering_fields: [&#39;project_name&#39;, &#39;name&#39;, &#39;owner&#39;, &#39;status&#39;, &#39;assignee&#39;, &#39;subset&#39;, &#39;mode&#39;, &#39;dimension&#39;, &#39;id&#39;, &#39;project_id&#39;, &#39;updated_date&#39;] | [optional]

### Return type

[**PaginatedTaskList**](PaginatedTaskList.md)

### Authorization

[SignatureAuthentication](../README.md#SignatureAuthentication), [basicAuth](../README.md#basicAuth), [cookieAuth](../README.md#cookieAuth), [tokenAuth](../README.md#tokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/vnd.cvat+json


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tasks_partial_update**
> Task tasks_partial_update(id)

Methods does a partial update of chosen fields in a task

### Example

* Api Key Authentication (SignatureAuthentication):
* Basic Authentication (basicAuth):
* Api Key Authentication (cookieAuth):
* Api Key Authentication (tokenAuth):

```python
import time
import cvat_api_client
from cvat_api_client.api import tasks_api
from cvat_api_client.model.task import Task
from cvat_api_client.model.patched_task_request import PatchedTaskRequest
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = cvat_api_client.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: SignatureAuthentication
configuration.api_key['SignatureAuthentication'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['SignatureAuthentication'] = 'Bearer'

# Configure HTTP basic authorization: basicAuth
configuration = cvat_api_client.Configuration(
    username = 'YOUR_USERNAME',
    password = 'YOUR_PASSWORD'
)

# Configure API key authorization: cookieAuth
configuration.api_key['cookieAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['cookieAuth'] = 'Bearer'

# Configure API key authorization: tokenAuth
configuration.api_key['tokenAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['tokenAuth'] = 'Bearer'

# Enter a context with an instance of the API client
with cvat_api_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = tasks_api.TasksApi(api_client)
    id = 1 # int | A unique integer value identifying this task.
    patched_task_request = PatchedTaskRequest(
        name="name_example",
        project_id=1,
        owner=BasicUserRequest(
            username="A",
            first_name="first_name_example",
            last_name="last_name_example",
        ),
        assignee=PatchedProjectRequestAssignee(None),
        owner_id=1,
        assignee_id=1,
        bug_tracker="bug_tracker_example",
        overlap=1,
        segment_size=1,
        labels=[
            PatchedLabelRequest(
                id=1,
                name="name_example",
                color="color_example",
                attributes=[
                    AttributeRequest(
                        name="name_example",
                        mutable=True,
                        input_type=InputTypeEnum("checkbox"),
                        default_value="default_value_example",
                        values=[
                            "values_example",
                        ],
                    ),
                ],
                deleted=True,
            ),
        ],
        dimension="dimension_example",
        subset="subset_example",
    ) # PatchedTaskRequest |  (optional)

    # example passing only required values which don't have defaults set
    try:
        # Methods does a partial update of chosen fields in a task
        api_response = api_instance.tasks_partial_update(id)
        pprint(api_response)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_partial_update: %s\n" % e)

    # example passing only required values which don't have defaults set
    # and optional values
    try:
        # Methods does a partial update of chosen fields in a task
        api_response = api_instance.tasks_partial_update(id, patched_task_request=patched_task_request)
        pprint(api_response)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_partial_update: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**| A unique integer value identifying this task. |
 **patched_task_request** | [**PatchedTaskRequest**](PatchedTaskRequest.md)|  | [optional]

### Return type

[**Task**](Task.md)

### Authorization

[SignatureAuthentication](../README.md#SignatureAuthentication), [basicAuth](../README.md#basicAuth), [cookieAuth](../README.md#cookieAuth), [tokenAuth](../README.md#tokenAuth)

### HTTP request headers

 - **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data, application/offset+octet-stream
 - **Accept**: application/vnd.cvat+json


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tasks_retrieve**
> Task tasks_retrieve(id)

Method returns details of a specific task

### Example

* Api Key Authentication (SignatureAuthentication):
* Basic Authentication (basicAuth):
* Api Key Authentication (cookieAuth):
* Api Key Authentication (tokenAuth):

```python
import time
import cvat_api_client
from cvat_api_client.api import tasks_api
from cvat_api_client.model.task import Task
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = cvat_api_client.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: SignatureAuthentication
configuration.api_key['SignatureAuthentication'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['SignatureAuthentication'] = 'Bearer'

# Configure HTTP basic authorization: basicAuth
configuration = cvat_api_client.Configuration(
    username = 'YOUR_USERNAME',
    password = 'YOUR_PASSWORD'
)

# Configure API key authorization: cookieAuth
configuration.api_key['cookieAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['cookieAuth'] = 'Bearer'

# Configure API key authorization: tokenAuth
configuration.api_key['tokenAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['tokenAuth'] = 'Bearer'

# Enter a context with an instance of the API client
with cvat_api_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = tasks_api.TasksApi(api_client)
    id = 1 # int | A unique integer value identifying this task.

    # example passing only required values which don't have defaults set
    try:
        # Method returns details of a specific task
        api_response = api_instance.tasks_retrieve(id)
        pprint(api_response)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_retrieve: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**| A unique integer value identifying this task. |

### Return type

[**Task**](Task.md)

### Authorization

[SignatureAuthentication](../README.md#SignatureAuthentication), [basicAuth](../README.md#basicAuth), [cookieAuth](../README.md#cookieAuth), [tokenAuth](../README.md#tokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/vnd.cvat+json


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tasks_status_retrieve**
> RqStatus tasks_status_retrieve(id)

When task is being created the method returns information about a status of the creation process

### Example

* Api Key Authentication (SignatureAuthentication):
* Basic Authentication (basicAuth):
* Api Key Authentication (cookieAuth):
* Api Key Authentication (tokenAuth):

```python
import time
import cvat_api_client
from cvat_api_client.api import tasks_api
from cvat_api_client.model.rq_status import RqStatus
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = cvat_api_client.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: SignatureAuthentication
configuration.api_key['SignatureAuthentication'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['SignatureAuthentication'] = 'Bearer'

# Configure HTTP basic authorization: basicAuth
configuration = cvat_api_client.Configuration(
    username = 'YOUR_USERNAME',
    password = 'YOUR_PASSWORD'
)

# Configure API key authorization: cookieAuth
configuration.api_key['cookieAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['cookieAuth'] = 'Bearer'

# Configure API key authorization: tokenAuth
configuration.api_key['tokenAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['tokenAuth'] = 'Bearer'

# Enter a context with an instance of the API client
with cvat_api_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = tasks_api.TasksApi(api_client)
    id = 1 # int | A unique integer value identifying this task.

    # example passing only required values which don't have defaults set
    try:
        # When task is being created the method returns information about a status of the creation process
        api_response = api_instance.tasks_status_retrieve(id)
        pprint(api_response)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_status_retrieve: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**| A unique integer value identifying this task. |

### Return type

[**RqStatus**](RqStatus.md)

### Authorization

[SignatureAuthentication](../README.md#SignatureAuthentication), [basicAuth](../README.md#basicAuth), [cookieAuth](../README.md#cookieAuth), [tokenAuth](../README.md#tokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/vnd.cvat+json


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tasks_update**
> Task tasks_update(id, task_request)

Method updates a task by id

### Example

* Api Key Authentication (SignatureAuthentication):
* Basic Authentication (basicAuth):
* Api Key Authentication (cookieAuth):
* Api Key Authentication (tokenAuth):

```python
import time
import cvat_api_client
from cvat_api_client.api import tasks_api
from cvat_api_client.model.task import Task
from cvat_api_client.model.task_request import TaskRequest
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = cvat_api_client.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: SignatureAuthentication
configuration.api_key['SignatureAuthentication'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['SignatureAuthentication'] = 'Bearer'

# Configure HTTP basic authorization: basicAuth
configuration = cvat_api_client.Configuration(
    username = 'YOUR_USERNAME',
    password = 'YOUR_PASSWORD'
)

# Configure API key authorization: cookieAuth
configuration.api_key['cookieAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['cookieAuth'] = 'Bearer'

# Configure API key authorization: tokenAuth
configuration.api_key['tokenAuth'] = 'YOUR_API_KEY'

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['tokenAuth'] = 'Bearer'

# Enter a context with an instance of the API client
with cvat_api_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = tasks_api.TasksApi(api_client)
    id = 1 # int | A unique integer value identifying this task.
    task_request = TaskRequest(
        name="name_example",
        project_id=1,
        owner=BasicUserRequest(
            username="A",
            first_name="first_name_example",
            last_name="last_name_example",
        ),
        assignee=PatchedProjectRequestAssignee(None),
        owner_id=1,
        assignee_id=1,
        bug_tracker="bug_tracker_example",
        overlap=1,
        segment_size=1,
        labels=[
            PatchedLabelRequest(
                id=1,
                name="name_example",
                color="color_example",
                attributes=[
                    AttributeRequest(
                        name="name_example",
                        mutable=True,
                        input_type=InputTypeEnum("checkbox"),
                        default_value="default_value_example",
                        values=[
                            "values_example",
                        ],
                    ),
                ],
                deleted=True,
            ),
        ],
        dimension="dimension_example",
        subset="subset_example",
    ) # TaskRequest | 

    # example passing only required values which don't have defaults set
    try:
        # Method updates a task by id
        api_response = api_instance.tasks_update(id, task_request)
        pprint(api_response)
    except cvat_api_client.ApiException as e:
        print("Exception when calling TasksApi->tasks_update: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**| A unique integer value identifying this task. |
 **task_request** | [**TaskRequest**](TaskRequest.md)|  |

### Return type

[**Task**](Task.md)

### Authorization

[SignatureAuthentication](../README.md#SignatureAuthentication), [basicAuth](../README.md#basicAuth), [cookieAuth](../README.md#cookieAuth), [tokenAuth](../README.md#tokenAuth)

### HTTP request headers

 - **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data, application/offset+octet-stream
 - **Accept**: application/vnd.cvat+json


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
