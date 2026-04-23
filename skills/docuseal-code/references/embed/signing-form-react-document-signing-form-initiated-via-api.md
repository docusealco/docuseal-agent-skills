## Document signing form initiated via API

**Prerequisites:**

**Sign Up and Obtain API Key:** Visit [DocuSeal API Console](https://console.docuseal.com/api) to obtain your API key.

The API can be used to initiate a signing session for a single-party form or for a multi-party form. For multi-party forms, the API returns a unique `embed_src` URL for each submitter, and each URL can be used to embed the signing form for the corresponding party.

`POST` request to `https://api.docuseal.com/submissions`. Include the obtained API key in the headers along with the content type (`'application/json'`). Specify the `template_id` and submitter details:

- `send_email`: set to `false` to disable automated emails from the platform. 
- `email`: pass email address of each individual party in the document signing process. 
- `role`: specifies the designated role of each participant (e.g., 'Director', 'Contractor'). Pass role names defined in the template form. 

Upon a successful request, the API will respond with an array of submitters. Each submitter contains an `embed_src` with the full signing form URL, as well as a `slug` key which can be appended to your DocuSeal host URL.

Pass the `embed_src` value directly to the `src` prop of the `<DocusealForm />` component, or construct the URL from the `slug` key (e.g. `https://docuseal.com/s/${slug}`). Either value links the embedded form in your React app to the specific submitter created through the DocuSeal API.

#### Nodejs

```
import express from 'express';
import axios from 'axios';
import docuseal from "@docuseal/api";

const app = express();

docuseal.configure({ key: "API_KEY", url: "https://api.docuseal.com" });

app.post('/your_backend/api/init_form', async (req, res) => {
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

  const slug = submission.slug;
  res.json({ slug });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

#### Javascript

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

#### Typescript

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

#### Python

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

#### Ruby

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

#### Php

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

#### Java

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

#### Csharp

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

#### Curl

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


```
import React, { useState, useEffect } from 'react';
import DocusealForm from '@docuseal/react';

const App = () => {
  const [slug, setSlug] = useState('');

  useEffect(() => {
    fetch('/your_backend/api/init_form')
      .then(async (resp) => {
        const { slug } = await resp.json();
        setSlug(slug);
      });
  }, []);

  return (
    <div>
      {slug && <DocusealForm src={`https://docuseal.com/s/${slug}`} />}
    </div>
  );
};
```
