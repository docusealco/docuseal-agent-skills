# Download Signed Documents

## Setup webhooks

Navigate to [https://console.docuseal.com/webhooks](https://console.docuseal.com/webhooks) to set up the webhooks. Configure the endpoint URL of your backend API where you'll handle the received webhook data. Ensure this endpoint is secured with a token to authenticate incoming requests. Here's an example of how you might structure this:   
`https://your-backend-api.com/webhook/docuseal/YOUR_TOKEN_HERE`

Once the document is signed by one of the parties the "form.completed" event is triggered. DocuSeal will send a webhook payload containing a "documents" list which includes URLs with downloadable signed documents.

Webhook payload includes the `"external_id"` value which works as a identifier for that specific signer. External ID can be specified via [REST API](https://www.docuseal.com/docs/api#create-a-submission) or [Embedded Form](https://www.docuseal.com/docs/embedded/form). This association allows you to maintain a clear mapping between signed documents and the individual signers in your database.


```
{
  "event_type": "form.completed",
  "timestamp": "2023-09-24T13:48:36Z",
  "data": {
    "id": 1,
    "email": "john.doe@example.com",
    "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
    "ip": "132.216.88.83",
    "sent_at": "2023-08-20T10:09:05.459Z",
    "opened_at": "2023-08-20T10:10:00.451Z",
    "completed_at": "2023-08-20T10:12:47.579Z",
    "declined_at": null,
    "created_at": "2023-08-20T10:09:02.459Z",
    "updated_at": "2023-08-20T10:12:47.907Z",
    "name": null,
    "phone": null,
    "role": "First Party",
    "external_id": null,
    "decline_reason": null,
    "status": "completed",
    "preferences": {
      "send_email": true,
      "send_sms": false
    },
    "submission": {
      "id": 12,
      "audit_log_url": "https://docuseal.com/blobs/proxy/eyJfcmFpbHMiOnsib/audit-log.pdf",
      "combined_document_url": "https://docuseal.com/blobs/proxy/eyJfcmFpbHMiOnsib/document.pdf",
      "status": "completed",
      "url": "https://docuseal.com/e/N5JsdkFGPeQF7J",
      "variables": {
        "custom_variable": "value"
      },
      "created_at": "2023-08-20T10:09:05.258Z"
    },
    "template": {
      "id": 6,
      "name": "Invoice",
      "external_id": null,
      "created_at": "2023-08-19T11:09:21.487Z",
      "updated_at": "2023-08-19T11:11:47.804Z",
      "folder_name": "Default"
    },
    "values": [
      {
        "field": "First Name",
        "value": "John"
      },
      {
        "field": "Last Name",
        "value": "Doe"
      },
      {
        "field": "Signature",
        "value": "https://docuseal.com/blobs/proxy/eyJfcmFpbHMiOnsib/signature.png"
      },
      {
        "field": "Signature",
        "value": "John Doe"
      }
    ],
    "metadata": {
      "customData": "custom value"
    },
    "audit_log_url": "https://docuseal.com/blobs/proxy/eyJfcmFpbHMiOnsib/audit-log.pdf",
    "submission_url": "https://docuseal.com/e/N5JsdkFGPeQF7J",
    "documents": [
      {
        "name": "sample-document",
        "url": "https://docuseal.com/blobs/proxy/eyJfcmFpbHMiOnsib/sample-document.pdf"
      }
    ]
  }
}
```

## Download documents via API

Documents can be downloaded from DocuSeal using the following API request:  
`GET https://api.docuseal.com/submitters?external_id=value`  
 This API responds with the `documents[]` array that contains downloadable PDF URLs. Submitters (aka Signers) can be filtered with the specified `external_id` to make it easier to map documents to records in your database.

**Learn more:**

[REST API Reference](https://www.docuseal.com/docs/api#form-webhook)

#### Javascript

```
const docuseal = require("@docuseal/api");

docuseal.configure({ key: "API_KEY", url: "https://api.docuseal.com" });

const { data, pagination } = await docuseal.listSubmitters({ external_id: 'customer_123' });
```

#### Typescript

```
import docuseal from "@docuseal/api";

docuseal.configure({ key: "API_KEY", url: "https://api.docuseal.com" });

const { data, pagination } = await docuseal.listSubmitters({ external_id: 'customer_123' });
```

#### Python

```
from docuseal import docuseal

docuseal.key = "API_KEY"
docuseal.url = "https://api.docuseal.com"

docuseal.list_submitters({ "external_id": "customer_123" })
```

#### Ruby

```
require "docuseal"

Docuseal.key = ENV["DOCUSEAL_API_KEY"]
Docuseal.url = "https://api.docuseal.com"

Docuseal.list_submitters({ external_id: 'customer_123' })
```

#### Php

```
$docuseal = new DocusealApi('API_KEY', 'https://api.docuseal.com');

$docuseal->listSubmitters(['external_id' => 'customer_123']);
```

#### Java

```
import okhttp3.*;

import java.io.IOException;

public class DocusealSubmittersFetch {

    private static final String API_KEY = "YOUR_API_KEY";

    public static void main(String[] args) {

        OkHttpClient client = new OkHttpClient();

        HttpUrl url = HttpUrl.parse("https://api.docuseal.com/submitters")
                .newBuilder()
                .addQueryParameter("external_id", "customer_123")
                .build();

        Request request = new Request.Builder()
                .url(url)
                .get()
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
                    System.out.println("Submitters:");
                    System.out.println(responseData);
                } else {
                    System.err.println("Error: " + response.code() + " " + response.message());
                }
            }
        });
    }
}
```

#### Csharp

```
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

class Program
{
    private static readonly string API_KEY = "YOUR_API_KEY";

    static async Task Main(string[] args)
    {
        using (var client = new HttpClient())
        {
            var externalId = "customer_123";
            var url = $"https://api.docuseal.com/submitters?external_id={externalId}";

            client.DefaultRequestHeaders.Add("X-Auth-Token", API_KEY);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var response = await client.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var responseString = await response.Content.ReadAsStringAsync();
                Console.WriteLine("Submitters:");
                Console.WriteLine(responseString);
            }
            else
            {
                Console.WriteLine($"Error: {response.StatusCode} {response.ReasonPhrase}");
            }
        }
    }
}
```

#### Go

```
package main

import (
  "fmt"
  "log"
  "github.com/go-resty/resty/v2"
)

func main() {
  client := resty.New()

  externalID := "customer_123"

  resp, err := client.R().
    SetHeader("X-Auth-Token", "YOUR_API_KEY").
    SetHeader("Content-Type", "application/json").
    Get("https://api.docuseal.com/submitters?external_id=" + externalID)

  if err != nil {
    log.Fatalf("Request failed: %v", err)
  }

  if resp.IsSuccess() {
    fmt.Println("Submitters:")
    fmt.Println(resp.String())
  } else {
    fmt.Printf("Error: %d %s
", resp.StatusCode(), resp.Status())
  }
}
```

#### Curl

```
curl --request GET \
  --url https://api.docuseal.com/submitters?external_id=customer_123 \
  --header 'X-Auth-Token: API_KEY'
```

## Document URL expiration

Document URLs returned by the API and webhooks are **temporary** and expire after **40 minutes** by default. After expiration, these URLs will return a `404` error.

**Do not store document URLs in your database.** A common mistake is to save the URL from a webhook or API response and try to use it later for downloading. Since the URL expires, any stored link will stop working after a short period of time.

Instead, always call the API to get a fresh document URL right before you need to access the file:

- `GET /submissions/{id}/documents` - get only the document URLs 
- `GET /submissions/{id}` - get documents for the entire submission 
- `GET /submitters/{id}` - get documents for a specific submitter 

Save the `submission_id` or `submitter_id` in your database instead of the URL. When you need to download or display the document, make an API call with the stored ID to retrieve a fresh, valid URL.

#### Javascript

```
const docuseal = require("@docuseal/api");

docuseal.configure({ key: "API_KEY", url: "https://api.docuseal.com" });

const resp = await docuseal.getSubmissionDocuments(submissionId);

const documentUrl = resp.documents[0].url;
```

#### Typescript

```
import docuseal from "@docuseal/api";

docuseal.configure({ key: "API_KEY", url: "https://api.docuseal.com" });

const resp = await docuseal.getSubmissionDocuments(submissionId);

const documentUrl = resp.documents[0].url;
```

#### Python

```
from docuseal import docuseal

docuseal.key = "API_KEY"
docuseal.url = "https://api.docuseal.com"

resp = docuseal.get_submission_documents(submission_id)

document_url = resp["documents"][0]["url"]
```

#### Ruby

```
require "docuseal"

Docuseal.key = ENV["DOCUSEAL_API_KEY"]
Docuseal.url = "https://api.docuseal.com"

resp = Docuseal.get_submission_documents(submission_id)

document_url = resp["documents"][0]["url"]
```

#### Php

```
$docuseal = new \Docuseal\Api('API_KEY', 'https://api.docuseal.com');

$resp = $docuseal->getSubmissionDocuments($submissionId);

$documentUrl = $resp['documents'][0]['url'];
```

#### Java

```
import okhttp3.*;
import org.json.*;

OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
        .url("https://api.docuseal.com/submissions/" + submissionId + "/documents")
        .get()
        .addHeader("X-Auth-Token", "API_KEY")
        .build();

Response response = client.newCall(request).execute();
JSONObject resp = new JSONObject(response.body().string());

String documentUrl = resp.getJSONArray("documents")
        .getJSONObject(0).getString("url");
```

#### Csharp

```
using System.Net.Http;
using System.Text.Json;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("X-Auth-Token", "API_KEY");

var response = await client.GetAsync(
    $"https://api.docuseal.com/submissions/{submissionId}/documents");
var json = await response.Content.ReadAsStringAsync();
var resp = JsonDocument.Parse(json).RootElement;

var documentUrl = resp.GetProperty("documents")[0]
    .GetProperty("url").GetString();
```

#### Go

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
    SetHeader("X-Auth-Token", "API_KEY").
    Get(fmt.Sprintf("https://api.docuseal.com/submissions/%d/documents", submissionID))

  if err != nil {
    log.Fatalf("Request failed: %v", err)
  }

  fmt.Println(resp.String())
}
```

#### Curl

```
curl --request GET \
  --url https://api.docuseal.com/submissions/SUBMISSION_ID/documents \
  --header 'X-Auth-Token: API_KEY'
```
