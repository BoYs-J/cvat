---
title: 'Developer guide'
linkTitle: 'Developer guide'
weight: 10
description: ''
---

## Overview

This package contains manually written and autogenerated files. We store only sources in
the repository. To get the full package, one need to generate missing package files.

## Layout of the cvat-sdk directory

- `gen/` - generator files
- `cvat_sdk/` - Python package root
- `cvat_sdk/api_client` - autogenerated low-level package code
- `cvat_sdk/core` - high-level package code

## How to generate package code

1. Install generator dependencies:
   ```bash
   pip install -r cvat-sdk/gen/requirements.txt
   ```

1. Generate package code (call from the package root directory!):
   ```bash
   ./cvat-sdk/gen/generate.sh
   ```

1. Install the packages:

   ```bash
   pip install ./cvat-sdk ./cvat-cli
   ```

   If you want to edit package files, install them with `-e`:

   ```bash
   pip install -e ./cvat-sdk -e ./cvat-cli
   ```

## How to edit templates

If you want to edit templates, obtain them from the generator first:

```bash
docker run --rm -v $PWD:/local \
    openapitools/openapi-generator-cli author template \
        -o /local/generator_templates -g python
```

Then, you can copy the modified version of the template you need into
the `gen/templates/openapi-generator/` directory.

Relevant links:
- [Generator implementation, available variables in templates](https://github.com/OpenAPITools/openapi-generator/tree/master/modules/openapi-generator/src/main/java/org/openapitools/codegen)
- [Mustache syntax in the generator](https://github.com/OpenAPITools/openapi-generator/wiki/Mustache-Template-Variables)

## How to test

API client tests are integrated into REST API tests in `/tests/python/rest_api`
and SDK tests are placed next to them in `/tests/python/sdk`.
To execute, run:
```bash
pytest tests/python/rest_api tests/python/sdk
```

## SDK API design decisions

The generated `ApiClient` code is modified from what `openapi-generator` does by default.
Changes are mostly focused on better user experience - including better
usage patterns and simpler/faster ways to achieve results.

### Modifications

- Added Python type annotations for return types and class members.
  This change required us to implement a custom post-processing script,
  which converts generated types into correct type annotations. The types
  generated by default are supposed to work with the API implementation
  (parameter validation and parsing), but they are not applicable as
  type annotations (they have incorrect syntax). Custom post-processing
  allowed us to make these types correct type annotations.
  Other possible solutions:
  - There is the `python-experimental` API generator, which may solve
    some issues, but it is unstable and requires python 3.9. Our API
    works with 3.7, which is the lowest supported version now.
  - Custom templates - partially works, but only in limited cases
    (model fields). It's very hard to maintain the template code and
    logic for this. Only `if` checks and `for` loops are available in
    mustache templates, which is not enough for annotation generation.

- Separate APIs are embedded into the general `APIClient` class.
  Now we have:
  ```python
  with ApiClient(config) as api_client:
    result1 = api_client.foo_api.operation1()
    result2 = api_client.bar_api.operation2()
  ```

  This showed to be more convenient than the default:
  ```python
  with ApiClient(config) as api_client:
    foo_api = FooApi(api_client)
    result1 = foo_api.operation1()
    result2 = foo_api.operation2()

    bar_api = BarApi(api_client)
    result3 = bar_api.operation3()
    result4 = bar_api.operation4()
  ```

  This also required custom post-processing. Operation Ids are
  [supposed to be unique](https://swagger.io/specification/#operation-object)
  in the OpenAPI / Swagger specification. Therefore, we can't generate such
  schema on the server, nor we can't expect it to be supported in the
  API generator.

- Operations have IDs like `<api>/<method>_<object>`.
  This also showed to be more readable and more natural than DRF-spectacular's
  default `<api>/<object>_<method>`.

- Server operations have different types for input and output values.
  While it can be expected that an endpoint with POST/PUT methods available
  (like `create` or `partial_update`) has the same type for input and output
  (because it looks natural), it also leads to the situation, in which there
  are lots of read-/write-only fields, and it becomes hard for understanding.
  This clear type separation is supposed to make it simpler for users.

- Added cookie management in the `ApiClient` class.

- Added interface classes for models to simplify class member usage and lookup.

- Dicts can be passed into API methods and model constructors instead of models.
  They are automatically parsed as models. In the original implementation, the user
  is required to pass a `Configuration` object each time, which is clumsy and adds little sense.
