# Pre-fill PDF document form fields with API

1. [Pre-fill document data and send for signature](https://www.docuseal.com#pre-fill-document-data-and-send-for-signature)
2. [Automatically sign documents via API](https://www.docuseal.com#automatically_sign_documents_via_api)

**Prerequisites:**

**Sign Up and Obtain API Key:** Visit [DocuSeal API Console](https://console.docuseal.com/api) to obtain your API key.

**Template ID:** Identify the template ID you want to use for the form.

## Pre-fill document data and send for signature

`POST` request to `https://api.docuseal.com/submissions`. Include the obtained API key in the headers (`'X-Auth-Token'`). Specify the `template_id` and submitter details with `fields[]` list containing:

- `name`: Name of the field in the template. 
- `default_value`: The default value assigned to the field. Use base64 encoded string to pass images, signatures or files. Or pass a public downloadable URL with an image to prefill signature, image, initials fields. Pass text value if you want to pre-fill signature or initials with the font-generated text. 
- `readonly`: Set `true` to make it impossible for the signer to edit the pre-filled field value. `false` by default. 

Upon a successful request, specified submitters of the document will receive an email invitation to click on the link to fill and sign the document.

Javascript

```
const docuseal = require("@docuseal/api");

docuseal.configure({ key: "API_KEY", url: "https://api.docuseal.com" });

const submission = await docuseal.createSubmission({
  template_id: 1000001,
  order: 'preserved',
  submitters: [
    {
      email: 'john.doe@example.com',
      fields: [
        {
          name: 'First name',
          default_value: 'John',
          readonly: true
        },
        {
          name: 'Last name',
          default_value: 'Doe',
          readonly: true
        }
      ]
    }
  ]
});
```

Typescript

```
import docuseal from "@docuseal/api";

docuseal.configure({ key: "API_KEY", url: "https://api.docuseal.com" });

const submission = await docuseal.createSubmission({
  template_id: 1000001,
  order: 'preserved',
  submitters: [
    {
      email: 'john.doe@example.com',
      fields: [
        {
          name: 'First name',
          default_value: 'John',
          readonly: true
        },
        {
          name: 'Last name',
          default_value: 'Doe',
          readonly: true
        }
      ]
    }
  ]
});
```

Python

```
from docuseal import docuseal

docuseal.key = "API_KEY"
docuseal.url = "https://api.docuseal.com"

submission = docuseal.create_submission({
  "template_id": 1000001,
  "order": "preserved",
  "submitters": [
    {
      "email": "john.doe@example.com",
      "fields": [
        {
          "name": "First name",
          "default_value": "John",
          "readonly": True
        },
        {
          "name": "Last name",
          "default_value": "Doe",
          "readonly": True
        }
      ]
    }
  ]
})
```

Ruby

```
require "docuseal"

Docuseal.key = ENV["DOCUSEAL_API_KEY"]
Docuseal.url = "https://api.docuseal.com"

submission = Docuseal.create_submission({
  template_id: 1000001,
  order: 'preserved',
  submitters: [
    {
      email: 'john.doe@example.com',
      fields: [
        {
          name: 'First name',
          default_value: 'John',
          readonly: true
        },
        {
          name: 'Last name',
          default_value: 'Doe',
          readonly: true
        }
      ]
    }
  ]
})
```

Php

```
$docuseal = new DocusealApi('API_KEY', 'https://api.docuseal.com');

$submission = $docuseal->createSubmission([
  'template_id' => 1000001,
  'order' => 'preserved',
  'submitters' => [
    [
      'email' => 'john.doe@example.com',
      'fields' => [
        [
          'name' => 'First name',
          'default_value' => 'John',
          'readonly' => true
        ],
        [
          'name' => 'Last name',
          'default_value' => 'Doe',
          'readonly' => true
        ]
      ]
    ]
  ]
]);
```

Java

```
import okhttp3.*;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;

public class DocusealSubmission {

    private static final String API_KEY = "YOUR_API_KEY";

    public static void main(String[] args) {
        OkHttpClient client = new OkHttpClient();

        JSONObject data = new JSONObject();
        data.put("template_id", 1000001);
        data.put("order", "preserved");

        JSONArray submitters = new JSONArray();

        JSONObject submitter = new JSONObject();
        submitter.put("email", "john.doe@example.com");

        JSONArray fields = new JSONArray();

        JSONObject firstNameField = new JSONObject();
        firstNameField.put("name", "First name");
        firstNameField.put("default_value", "John");
        firstNameField.put("readonly", true);
        fields.put(firstNameField);

        JSONObject lastNameField = new JSONObject();
        lastNameField.put("name", "Last name");
        lastNameField.put("default_value", "Doe");
        lastNameField.put("readonly", true);
        fields.put(lastNameField);

        submitter.put("fields", fields);
        submitters.put(submitter);

        data.put("submitters", submitters);

        RequestBody body = RequestBody.create(
                data.toString(),
                MediaType.parse("application/json")
        );

        Request request = new Request.Builder()
                .url("https://api.docuseal.com/submissions")
                .post(body)
                .addHeader("X-Auth-Token", API_KEY)
                .addHeader("Content-Type", "application/json")
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                System.err.println("Error: " + e.getMessage());
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (response.isSuccessful()) {
                    String responseData = response.body().string();
                    JSONArray result = new JSONArray(responseData);
                    System.out.println(result.getJSONObject(0).getString("slug"));
                } else {
                    System.err.println("Error: " + response.code() + " " + response.message());
                }
            }
        });
    }
}
```

Csharp

```
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

class Program
{
    private static readonly string API_KEY = "YOUR_API_KEY";

    static async Task Main(string[] args)
    {
        using (var client = new HttpClient())
        {
            var url = "https://api.docuseal.com/submissions";

            var data = new
            {
                template_id = 1000001,
                order = "preserved",
                submitters = new[]
                {
                    new {
                        email = "john.doe@example.com",
                        fields = new[]
                        {
                            new { name = "First name", default_value = "John", @readonly = true },
                            new { name = "Last name", default_value = "Doe", @readonly = true }
                        }
                    }
                }
            };

            var json = JsonConvert.SerializeObject(data);
            var content = new StringContent(json);
            content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            content.Headers.Add("X-Auth-Token", API_KEY);

            var response = await client.PostAsync(url, content);

            if (response.IsSuccessStatusCode)
            {
                var responseString = await response.Content.ReadAsStringAsync();
                var result = JArray.Parse(responseString);
                Console.WriteLine(result[0]["slug"]);
            }
            else
            {
                Console.WriteLine($"Error: {response.StatusCode}");
            }
        }
    }
}
```

Go

```
package main

import (
  "fmt"
  "log"
  "github.com/go-resty/resty/v2"
)

func main() {
  client := resty.New()

    body := map[string]interface{}{
      "template_id": 1000001,
      "order": "preserved",
      "submitters": []map[string]interface{}{
        {
          "email": "john.doe@example.com",
          "fields": []map[string]interface{}{
            {
              "name": "First name",
              "default_value": "John",
              "readonly": true,
            },
            {
              "name": "Last name",
              "default_value": "Doe",
              "readonly": true,
            },
          },
        },
      },
    }

  resp, err := client.R().
    SetHeader("X-Auth-Token", "YOUR_API_KEY").
    SetHeader("Content-Type", "application/json").
    SetResult([]map[string]interface{}{}).
    SetBody(body).
    Post("https://api.docuseal.com/submissions")

  if err != nil {
    log.Fatalf("Request failed: %v", err)
  }

  result := *resp.Result().(*[]map[string]interface{})
  fmt.Println(result[0]["slug"])
}
```

Curl

```
curl -X POST https://api.docuseal.com/submissions \
  --header "X-Auth-Token: YOUR_API_KEY" \
  --header "Content-Type: application/json" \
  --data'{
    "template_id": 1000001,
    "order": "preserved",
    "submitters": [
      {
        "email": "john.doe@example.com",
        "fields": [
          { "name": "First name", "default_value": "John", "readonly": true },
          { "name": "Last name", "default_value": "Doe", "readonly": true }
        ]
      }
    ]
  }'
```

## Automatically sign documents via API

Signing documents on behalf of your company as a signing party can be automated with the `PUT https://api.docuseal.com/submitters/{id}` API. This automation reduces the time spent on administrative tasks, enabling faster turnaround times for your documents.

API request body should contain JSON payload with `"completed": true` value to mark the document as signed by this submitter party. Also request body should contain `fields[]` list to predefine values and to put a signature image with the given URL.

Upon a successful request, all signing parties will receive an email with a signed document.

**Learn more:**

[REST API Reference](https://www.docuseal.com/docs/api#update-a-submitter)

Javascript

```
const docuseal = require("@docuseal/api");

docuseal.configure({ key: "API_KEY", url: "https://api.docuseal.com" });

const submitter = await docuseal.updateSubmitter(500001, {
  completed: true,
  fields: [
    {
      name: 'Full Name',
      default_value: 'John Doe',
      readonly: true
    },
    {
      name: 'Signature',
      default_value: 'https://your-company.com/signature.png',
      readonly: true
    }
  ]
});
```

Typescript

```
import docuseal from "@docuseal/api";

docuseal.configure({ key: "API_KEY", url: "https://api.docuseal.com" });

const submitter = await docuseal.updateSubmitter(500001, {
  completed: true,
  fields: [
    {
      name: 'Full Name',
      default_value: 'John Doe',
      readonly: true
    },
    {
      name: 'Signature',
      default_value: 'https://your-company.com/signature.png',
      readonly: true
    }
  ]
});
```

Python

```
from docuseal import docuseal

docuseal.key = "API_KEY"
docuseal.url = "https://api.docuseal.com"

submitter = docuseal.update_submitter(500001, {
  "completed": True,
  "fields": [
    {
      "name": "Full Name",
      "default_value": "John Doe",
      "readonly": True
    },
    {
      "name": "Signature",
      "default_value": "https://your-company.com/signature.png",
      "readonly": True
    }
  ]
})
```

Ruby

```
require "docuseal"

Docuseal.key = ENV["DOCUSEAL_API_KEY"]
Docuseal.url = "https://api.docuseal.com"

submitter = Docuseal.update_submitter(500001, {
  completed: true,
  fields: [
    {
      name: 'Full Name',
      default_value: 'John Doe',
      readonly: true
    },
    {
      name: 'Signature',
      default_value: 'https://your-company.com/signature.png',
      readonly: true
    }
  ]
})
```

Php

```
$docuseal = new DocusealApi('API_KEY', 'https://api.docuseal.com');

$docuseal->updateSubmitter(500001, [
  'completed' => true,
  'fields' => [
    [
      'name' => 'Full Name',
      'default_value' => 'John Doe',
      'readonly' => true
    ],
    [
      'name' => 'Signature',
      'default_value' => 'https://your-company.com/signature.png',
      'readonly' => true
    ]
  ]
]);
```

Java

```
import okhttp3.*;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;

public class DocusealSubmitterUpdate {

    private static final String API_KEY = "YOUR_API_KEY";

    public static void main(String[] args) {

        OkHttpClient client = new OkHttpClient();

        JSONObject data = new JSONObject();
        data.put("completed", true);

        JSONArray fields = new JSONArray();

        JSONObject fullNameField = new JSONObject();
        fullNameField.put("name", "Full Name");
        fullNameField.put("default_value", "John Doe");
        fullNameField.put("readonly", true);
        fields.put(fullNameField);

        JSONObject signatureField = new JSONObject();
        signatureField.put("name", "Signature");
        signatureField.put("default_value", "https://your-company.com/signature.png");
        signatureField.put("readonly", true);
        fields.put(signatureField);

        data.put("fields", fields);

        RequestBody body = RequestBody.create(
                data.toString(),
                MediaType.parse("application/json")
        );

        Request request = new Request.Builder()
                .url("https://api.docuseal.com/submitters/500001")
                .put(body)
                .addHeader("X-Auth-Token", API_KEY)
                .addHeader("Content-Type", "application/json")
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                System.err.println("Error: " + e.getMessage());
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (response.isSuccessful()) {
                    String responseData = response.body().string();
                    System.out.println("Response: " + responseData);
                } else {
                    System.err.println("Error: " + response.code() + " " + response.message());
                }
            }
        });
    }
}
```

Csharp

```
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

class Program
{
    private static readonly string API_KEY = "YOUR_API_KEY";

    static async Task Main(string[] args)
    {
        using (var client = new HttpClient())
        {
            var url = "https://api.docuseal.com/submitters/500001";

            var data = new
            {
                completed = true,
                fields = new[]
                {
                    new
                    {
                        name = "Full Name",
                        default_value = "John Doe",
                        @readonly = true
                    },
                    new
                    {
                        name = "Signature",
                        default_value = "https://your-company.com/signature.png",
                        @readonly = true
                    }
                }
            };

            var json = JsonConvert.SerializeObject(data);
            var content = new StringContent(json);
            content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var request = new HttpRequestMessage(HttpMethod.Put, url)
            {
                Content = content
            };

            request.Headers.Add("X-Auth-Token", API_KEY);

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                var responseString = await response.Content.ReadAsStringAsync();
                var result = JObject.Parse(responseString);
                Console.WriteLine("Response: " + result.ToString());
            }
            else
            {
                Console.WriteLine($"Error: {response.StatusCode} {response.ReasonPhrase}");
            }
        }
    }
}
```

Go

```
package main

import (
  "fmt"
  "log"
  "github.com/go-resty/resty/v2"
)

func main() {
  client := resty.New()

  body := map[string]interface{}{
    "completed": true,
    "fields": []map[string]interface{}{
      {
        "name": "Full Name",
        "default_value": "John Doe",
        "readonly": true,
      },
      {
        "name": "Signature",
        "default_value": "https://your-company.com/signature.png",
        "readonly": true,
      },
    },
  }

  resp, err := client.R().
    SetHeader("X-Auth-Token", "YOUR_API_KEY").
    SetHeader("Content-Type", "application/json").
    SetBody(body).
    Put("https://api.docuseal.com/submitters/500001")

  if err != nil {
    log.Fatalf("Request failed: %v", err)
  }

  fmt.Println("Response:", resp.String())
}
```

Curl

```
curl -X PUT https://api.docuseal.com/submitters/500001 \
  --header "X-Auth-Token: YOUR_API_KEY" \
  --header "Content-Type: application/json" \
  --data '{
    "completed": true,
    "fields": [
      {
        "name": "Full Name",
        "default_value": "John Doe",
        "readonly": true
      },
      {
        "name": "Signature",
        "default_value": "https://your-company.com/signature.png",
        "readonly": true
      }
    ]
  }'
```
