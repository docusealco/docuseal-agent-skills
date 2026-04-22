# Send documents for signature via API

1. [Send default document signing request email](https://www.docuseal.com#send-default-document-signing-request-email)
2. [Send custom document signing request email message](https://www.docuseal.com#send-custom-document-signing-request-email-message)

**Prerequisites:**

**Sign Up and Obtain API Key:** Visit [DocuSeal API Console](https://console.docuseal.com/api) to obtain your API key.

**Template ID:** Identify the template ID you want to use for the form.

## Send default document signing request email

`POST` request to `https://api.docuseal.com/submissions`. Include the obtained API key in the headers along with the content type (`'application/json'`). Specify the `template_id` and submitter details:

- `email`: pass email address of each individual party in the document signing process. 
- `role`: specifies the designated role of each participant (e.g., 'Director', 'Contractor'). Pass role names defined in the template form. 
- `order`: pass `'preserved'` order to send email only to the first signer party, second party will receive an email after the document is signed by the first party. Pass `'random'` to send emails to all parties right away to allow them to sign in random order. 

Upon a successful request, specified submitters of the document will receive an email invitation to click on the link to fill and sign the document.

Javascript

```
const docuseal = require("@docuseal/api");

docuseal.configure({ key: "API_KEY", url: "https://api.docuseal.com" });

const submission = await docuseal.createSubmission({
  template_id: 1000001,
  send_email: false,
  submitters: [
    {
      email: 'john.doe@example.com',
      role: 'Director'
    },
    {
      email: 'roe.moe@example.com',
      role: 'Contractor'
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
  send_email: false,
  submitters: [
    {
      email: 'john.doe@example.com',
      role: 'Director'
    },
    {
      email: 'roe.moe@example.com',
      role: 'Contractor'
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
  "send_email": False,
  "submitters": [
    {
      "email": "john.doe@example.com",
      "role": "Director"
    },
    {
      "email": "roe.moe@example.com",
      "role": "Contractor"
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
  send_email: false,
  submitters: [
    {
      email: 'john.doe@example.com',
      role: 'Director'
    },
    {
      email: 'roe.moe@example.com',
      role: 'Contractor'
    }
  ]
})
```

Php

```
$docuseal = new DocusealApi('API_KEY', 'https://api.docuseal.com');

$submission = $docuseal->createSubmission([
  'template_id' => 1000001,
  'send_email' => false,
  'submitters' => [
    [
      'email' => 'john.doe@example.com',
      'role' => 'Director'
    ],
    [
      'email' => 'roe.moe@example.com',
      'role' => 'Contractor'
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
        data.put("send_email", false);

        JSONArray submitters = new JSONArray();
        submitters.put(new JSONObject().put("email", "john.doe@example.com").put("role", "Director"));
        submitters.put(new JSONObject().put("email", "roe.moe@example.com").put("role", "Contractor"));

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
                send_email = false,
                submitters = new[]
                {
                    new { email = "john.doe@example.com", role = "Director" },
                    new { email = "roe.moe@example.com", role = "Contractor" }
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

  resp, err := client.R().
    SetHeader("X-Auth-Token", "YOUR_API_KEY").
    SetHeader("Content-Type", "application/json").
    SetBody(map[string]interface{}{
      "template_id": 1000001,
      "send_email": false,
      "submitters": []map[string]string{
        {"email": "john.doe@example.com", "role": "Director"},
        {"email": "roe.moe@example.com", "role": "Contractor"},
      },
    }).
    SetResult([]map[string]interface{}{}).
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
  --data '{
    "template_id": 1000001,
    "send_email": false,
    "submitters": [
      { "email": "john.doe@example.com", "role": "Director" },
      { "email": "roe.moe@example.com", "role": "Contractor" }
    ]
  }'
```

## Send custom document signing request email message

`POST` request to `https://api.docuseal.com/submissions`. Include the obtained API key in the headers along with the content type (`'application/json'`).  
 Specify the `message` and submitter details:

- `subject`: Custom email message subject line. 
- `body`: Custom email message body, can contain the following variables: 

| Variable | Description |
| --- | --- |
| `{{template.name}}` | Name of the template document form |
| `{{template.id}}` | ID of the template document form |
| `{{submitter.link}}` | Signing form link |
| `{{account.name}}` | Your company name |
| `{{sender.name}}` | Full name of the user requesting signature |
| `{{sender.first_name}}` | First name of the user requesting signature |
| `{{submitter.email}}` | Signer (aka Submitter) email address |
| `{{submitter.name}}` | Signer (aka Submitter) full name |
| `{{submitter.first_name}}` | Signer (aka Submitter) first name |
| `{{submitter.FieldName}}` | Signer (aka Submitter) field value |
| `{{submitter.slug}}` | Unique key which is used to open the embedded signing form |
| `{{submission.submitters}}` | A list of submitter emails |
| `{{submission.expire_at}}` | Submission expiration date and time |
| `{{submitters[1].email}}` | Email of the first party |
| `{{submitters[1].name}}` | Name of the first party |
| `{{submitters[1].FieldName}}` | Form field value of the first party |

Upon a successful request, specified submitters of the document will receive an email invitation with a custom message.

**Learn more:**

[REST API Reference](https://www.docuseal.com/docs/api#create-a-submission)

Javascript

```
const docuseal = require("@docuseal/api");

docuseal.configure({ key: "API_KEY", url: "https://api.docuseal.com" });

const submission = await docuseal.createSubmission({
  template_id: 1000001,
  message: {
    subject: 'Custom Subject',
    body: 'Custom Message {{submitter.link}}'
  },
  submitters: [
    {
      email: 'john.doe@example.com',
      role: 'Director'
    },
    {
      email: 'roe.moe@example.com',
      role: 'Contractor'
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
  message: {
    subject: 'Custom Subject',
    body: 'Custom Message {{submitter.link}}'
  },
  submitters: [
    {
      email: 'john.doe@example.com',
      role: 'Director'
    },
    {
      email: 'roe.moe@example.com',
      role: 'Contractor'
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
  "message": {
    "subject": "Custom Subject",
    "body": "Custom Message {{submitter.link}}"
  },
  "submitters": [
    {
      "email": "john.doe@example.com",
      "role": "Director"
    },
    {
      "email": "roe.moe@example.com",
      "role": "Contractor"
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
  message: {
    subject: 'Custom Subject',
    body: 'Custom Message {{submitter.link}}'
  },
  submitters: [
    {
      email: 'john.doe@example.com',
      role: 'Director'
    },
    {
      email: 'roe.moe@example.com',
      role: 'Contractor'
    }
  ]
})
```

Php

```
$docuseal = new DocusealApi('API_KEY', 'https://api.docuseal.com');

$submission = $docuseal->createSubmission([
  'template_id' => 1000001,
  'message' => [
    'subject' => 'Custom Subject',
    'body' => 'Custom Message {{submitter.link}}'
  ],
  'submitters' => [
    [
      'email' => 'john.doe@example.com',
      'role' => 'Director'
    ],
    [
      'email' => 'roe.moe@example.com',
      'role' => 'Contractor'
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

        JSONObject message = new JSONObject();
        message.put("subject", "Custom Subject");
        message.put("body", "Custom Message {{submitter.link}}");
        data.put("message", message);

        JSONArray submitters = new JSONArray();
        submitters.put(new JSONObject().put("email", "john.doe@example.com").put("role", "Director"));
        submitters.put(new JSONObject().put("email", "roe.moe@example.com").put("role", "Contractor"));
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
                message = new
                {
                    subject = "Custom Subject",
                    body = "Custom Message {{submitter.link}}"
                },
                submitters = new[]
                {
                    new { email = "john.doe@example.com", role = "Director" },
                    new { email = "roe.moe@example.com", role = "Contractor" }
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

  resp, err := client.R().
    SetHeader("X-Auth-Token", "YOUR_API_KEY").
    SetHeader("Content-Type", "application/json").
    SetBody(map[string]interface{}{
      "template_id": 1000001,
      "message": map[string]string{
        "subject": "Custom Subject",
        "body": "Custom Message {{submitter.link}}",
      },
      "submitters": []map[string]string{
        {"email": "john.doe@example.com", "role": "Director"},
        {"email": "roe.moe@example.com", "role": "Contractor"},
      },
    }).
    SetResult([]map[string]interface{}{}).
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
    "message": {
      "subject": "Custom Subject",
      "body": "Custom Message {{submitter.link}}"
    },
    "submitters": [
      { "email": "john.doe@example.com", "role": "Director" },
      { "email": "roe.moe@example.com", "role": "Contractor" }
    ]
  }'
```
