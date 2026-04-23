# Update a template

`PUT /templates/{id}`
The API endpoint provides the functionality to move a document template to a different folder and update the name of the template.


## Parameters

| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | `integer` | yes | The unique identifier of the document template. |

## Request Body

| Property | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | no | The name of the template. Example: `New Document Name` |
| `folder_name` | `string` | no | The folder's name to which the template should be moved. Example: `New Folder` |
| `roles` | `array[]` | no | An array of submitter role names to update the template with. Example: `["Agent", "Customer"]` |
| `archived` | `boolean` | no | Set `false` to unarchive template. |

## Code Examples

### cURL

```curl
curl --request PUT \
  --url https://api.docuseal.com/templates/1000001 \
  --header 'X-Auth-Token: API_KEY' \
  --header 'content-type: application/json' \
  --data '{"name":"New Document Name","folder_name":"New Folder"}'
```
### CLI

```shell
docuseal templates update 1000001 --name "New Document Name" --folder-name "New Folder"
```
### Node.js (fetch)

```javascript
const fetch = require("node-fetch");

const resp = await fetch("https://api.docuseal.com/templates/1000001", {
  method: "PUT",
  headers: {
    "X-Auth-Token": "API_KEY"
  },
  body: JSON.stringify({
    name: "New Document Name",
    folder_name: "New Folder"
  })
});

const template = await resp.json();
```
### JavaScript SDK

```javascript
const docuseal = require("@docuseal/api");

docuseal.configure({ key: "API_KEY", url: "https://api.docuseal.com" });

const template = await docuseal.updateTemplate(1000001, {
  name: "New Document Name",
  folder_name: "New Folder"
});
```
### TypeScript SDK

```typescript
import docuseal from "@docuseal/api";

docuseal.configure({ key: "API_KEY", url: "https://api.docuseal.com" });

const template = await docuseal.updateTemplate(1000001, {
  name: "New Document Name",
  folder_name: "New Folder"
});
```
### Python SDK

```python
from docuseal import docuseal

docuseal.key = "API_KEY"
docuseal.url = "https://api.docuseal.com"

docuseal.update_template(1000001, {
  "name": "New Document Name",
  "folder_name": "New Folder"
})
```
### Ruby SDK

```ruby
require "docuseal"

Docuseal.key = ENV["DOCUSEAL_API_KEY"]
Docuseal.url = "https://api.docuseal.com"

Docuseal.update_template(1000001, {
  name: "New Document Name",
  folder_name: "New Folder"
})
```
### PHP SDK

```php
$docuseal = new \Docuseal\Api('API_KEY', 'https://api.docuseal.com');

$docuseal->updateTemplate(1000001, [
  'name' => 'New Document Name',
  'folder_name' => 'New Folder'
]);
```
### Go

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.docuseal.com/templates/1000001"

	payload := strings.NewReader("{\"name\":\"New Document Name\",\"folder_name\":\"New Folder\"}")

	req, _ := http.NewRequest("PUT", url, payload)

	req.Header.Add("X-Auth-Token", "API_KEY")
	req.Header.Add("content-type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```
### C#

```csharp
var client = new RestClient("https://api.docuseal.com/templates/1000001");
var request = new RestRequest("", Method.Put);
request.AddHeader("X-Auth-Token", "API_KEY");
request.AddHeader("content-type", "application/json");
request.AddParameter("application/json", "{\"name\":\"New Document Name\",\"folder_name\":\"New Folder\"}", ParameterType.RequestBody);
var response = client.Execute(request);
```
### Java

```java
HttpResponse<String> response = Unirest.put("https://api.docuseal.com/templates/1000001")
  .header("X-Auth-Token", "API_KEY")
  .header("content-type", "application/json")
  .body("{\"name\":\"New Document Name\",\"folder_name\":\"New Folder\"}")
  .asString();
```

## Response Example

```json
{
  "id": 1,
  "updated_at": "2023-12-14T15:50:21.799Z"
}
```
