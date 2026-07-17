---
name: docuseal-code
description: >
  DocuSeal development reference. Embed signing forms and template builder
  into web and mobile apps (JS/React/Vue/Angular, WebView, JWT, CSS theming).
  REST API with all endpoints, request/response schemas, code examples
  (cURL, CLI, Node.js, TypeScript, Python, Ruby, PHP, Go, C#, Java),
  and webhooks. Use when the user wants to integrate DocuSeal document
  signing or template management into their application.
license: MIT
metadata:
  author: DocuSeal
  version: "1.0.2"
  homepage: https://www.docuseal.com/docs
  source: https://github.com/docusealco/docuseal-agent-skills
---

## How References Are Organised

Reference files live in two subdirectories under `references/`:

- **`references/embed/`** — Embed UI components (signing forms, template builder). Each file is self-contained — load only the ones matching the user's stack.
- **`references/api/`** — REST API endpoints and webhooks. One file per endpoint/webhook with parameters, schemas, code examples, and response samples.

## Embed UI Components

| Component | Tag | Purpose | JWT |
|---|---|---|---|
| Signing Form | `<docuseal-form>` | Embed document signing UI into a page | optional |
| Form Builder | `<docuseal-builder>` | Embed a full template/document builder | **required** |

Each component ships in four frontend implementations: **JavaScript / React / Vue / Angular**.

### Signing Form (`<docuseal-form>`)

- JavaScript / HTML → [references/embed/signing-form-js.md](references/embed/signing-form-js.md)
- React → [references/embed/signing-form-react.md](references/embed/signing-form-react.md)
- Vue → [references/embed/signing-form-vue.md](references/embed/signing-form-vue.md)
- Angular → [references/embed/signing-form-angular.md](references/embed/signing-form-angular.md)
- Mobile (Android/iOS/React Native/Flutter via WebView) → [references/embed/signing-form-mobile-integration.md](references/embed/signing-form-mobile-integration.md)

### Form Builder (`<docuseal-builder>`)

- JavaScript / HTML → [references/embed/form-builder-js.md](references/embed/form-builder-js.md)
- React → [references/embed/form-builder-react.md](references/embed/form-builder-react.md)
- Vue → [references/embed/form-builder-vue.md](references/embed/form-builder-vue.md)
- Angular → [references/embed/form-builder-angular.md](references/embed/form-builder-angular.md)

After loading the main component reference, follow a link from its `## Guides` section for step-by-step walkthroughs.

### Cross-cutting

- JWT token generation — Form Builder (Node/TypeScript/Ruby/Python/PHP/Java/C#/Go) → [references/embed/form-builder-jwt-token.md](references/embed/form-builder-jwt-token.md)
- JWT token generation — Signing Form completed/preview mode → [references/embed/signing-form-completed-preview-jwt-token.md](references/embed/signing-form-completed-preview-jwt-token.md)
- EU Cloud / self-hosted `host` configuration — Signing Form → [references/embed/signing-form-hosts.md](references/embed/signing-form-hosts.md)
- EU Cloud / self-hosted `host` configuration — Form Builder → [references/embed/form-builder-hosts.md](references/embed/form-builder-hosts.md)
- Custom CSS theming — Signing Form (dark theme reference) → [references/embed/signing-form-custom-css.md](references/embed/signing-form-custom-css.md)
- Custom CSS theming — Form Builder (dark theme reference) → [references/embed/form-builder-custom-css.md](references/embed/form-builder-custom-css.md)
- Signing Form security recommendations → [references/embed/signing-form-security-recommendations.md](references/embed/signing-form-security-recommendations.md)
- Form Builder security recommendations → [references/embed/form-builder-security-recommendations.md](references/embed/form-builder-security-recommendations.md)

### Packages

| Framework | Package | CDN |
|---|---|---|
| JavaScript | — | `https://cdn.docuseal.com/js/form.js`, `https://cdn.docuseal.com/js/builder.js` |
| React | `@docuseal/react` | — |
| Vue | `@docuseal/vue` | — |
| Angular | `@docuseal/angular` | — |
| React Native | uses `react-native-webview` (no native SDK) | — |
| Flutter | uses `webview_flutter` (no native SDK) | — |

### Common Embed Mistakes

| # | Mistake | Fix |
|---|---|---|
| 1 | **Generating JWT in the browser** | JWT must be signed on the **backend** — the API key must never ship to the client. See [form-builder-jwt-token.md](references/embed/form-builder-jwt-token.md) / [signing-form-completed-preview-jwt-token.md](references/embed/signing-form-completed-preview-jwt-token.md). |
| 2 | **Passing the API key as `data-token`** | `data-token` is a JWT **signed with** the API key, not the key itself. |
| 3 | **Missing `host`/`data-host` on EU or self-hosted** | Set `data-host="cdn.docuseal.eu"` for EU Cloud or your own hostname for self-hosted. See [signing-form-hosts.md](references/embed/signing-form-hosts.md) / [form-builder-hosts.md](references/embed/form-builder-hosts.md). |
| 4 | **Confusing `/d/{slug}` vs `/s/{slug}`** | `/d/{slug}` is the template URL (single-party templates). `/s/{slug}` is an individual signer URL created via the `/submissions` API. |
| 5 | **Multi-party template via `data-src` URL** | Templates with multiple signing parties must be initiated via the `/submissions` API — the direct `/d/{slug}` URL only works for single-party templates. |
| 6 | **camelCase props in HTML** | The web component uses `data-*` kebab-case attributes. Only React/Vue/Angular use camelCase props. |
| 7 | **Expecting a native mobile SDK** | None exists. Embed via WebView — see [signing-form-mobile-integration.md](references/embed/signing-form-mobile-integration.md). |
| 8 | **Passing `customCss` as a stylesheet link** | `customCss` / `data-custom-css` takes a CSS string, not a URL. See [signing-form-custom-css.md](references/embed/signing-form-custom-css.md) / [form-builder-custom-css.md](references/embed/form-builder-custom-css.md). |
| 9 | **Embedding signing forms behind enumerable URLs** | DocuSeal slugs are random, but an embedding page like `https://yourapp.com/contracts/123/sign` lets an attacker iterate integer IDs to reach other users' signing forms. Put the DocuSeal slug or a UUID in your URL, or require auth on the embedding page. See [signing-form-security-recommendations.md](references/embed/signing-form-security-recommendations.md). |
| 10 | **Exposing the Form Builder without auth** | The page that renders `<docuseal-builder>` must be gated by your app's authentication. The JWT-issuing endpoint must verify the requesting user owns the template referenced by `external_id`. Otherwise any logged-in user can edit any template. See [form-builder-security-recommendations.md](references/embed/form-builder-security-recommendations.md). |
| 11 | **Acting on client-side `completed` events** | Browser events can be forged. Drive state changes from `form.completed` webhooks with HMAC verification, not from `<docuseal-form>` JavaScript callbacks. See [signing-form-security-recommendations.md](references/embed/signing-form-security-recommendations.md). |

## REST API

### Authentication

All requests require an API key passed in the `X-Auth-Token` header:

```
X-Auth-Token: YOUR_API_KEY
```

Get your API key: https://console.docuseal.com/api

### Base URLs

| Environment | Base URL |
|---|---|
| Global Cloud | `https://api.docuseal.com` |
| EU Cloud | `https://api.docuseal.eu` |
| Self-hosted | `https://docuseal.yourdomain.com/api` |

### API Client SDKs

Official SDK libraries wrap the REST API and handle authentication, request building, and response parsing. **Prefer SDKs over raw HTTP when the user's language has one.**

| Language | Package | Install |
|---|---|---|
| JavaScript / TypeScript | `@docuseal/api` | `npm install @docuseal/api` |
| Python | `docuseal` | `pip install docuseal` |
| Ruby | `docuseal` | `gem install docuseal` |
| PHP | `docusealco/docuseal` | `composer require docusealco/docuseal` |

SDK usage examples are included in each endpoint reference file below (marked with "SDK" in the heading).

### Endpoints

**Templates**

  - `GET /templates` — [List all templates](references/api/list-all-templates.md)
  - `GET /templates/{id}` — [Get a template](references/api/get-a-template.md)
  - `DELETE /templates/{id}` — [Archive a template](references/api/archive-a-template.md)
  - `PUT /templates/{id}` — [Update a template](references/api/update-a-template.md)
  - `PUT /templates/{id}/documents` — [Update template documents](references/api/update-template-documents.md)
  - `POST /templates/{id}/clone` — [Clone a template](references/api/clone-a-template.md)
  - `POST /templates/html` — [Create a template from HTML](references/api/create-a-template-from-html.md)
  - `POST /templates/docx` — [Create a template from Word DOCX](references/api/create-a-template-from-word-docx.md)
  - `POST /templates/pdf` — [Create a template from PDF](references/api/create-a-template-from-pdf.md)
  - `POST /templates/merge` — [Merge templates](references/api/merge-templates.md)

**Submissions**

  - `GET /submissions` — [List all submissions](references/api/list-all-submissions.md)
  - `GET /submissions/{id}` — [Get a submission](references/api/get-a-submission.md)
  - `GET /submissions/{id}/documents` — [Get submission documents](references/api/get-submission-documents.md)
  - `DELETE /submissions/{id}` — [Archive a submission](references/api/archive-a-submission.md)
  - `PUT /submissions/{id}` — [Update a submission](references/api/update-a-submission.md)
  - `POST /submissions/emails` — [Create submissions from emails](references/api/create-submissions-from-emails.md)
  - `POST /submissions/pdf` — [Create a submission from PDF](references/api/create-a-submission-from-pdf.md)
  - `POST /submissions/docx` — [Create a submission from DOCX](references/api/create-a-submission-from-docx.md)
  - `POST /submissions/html` — [Create a submission from HTML](references/api/create-a-submission-from-html.md)
  - `POST /submissions` — [Create a submission](references/api/create-a-submission.md)

**Submitters**

  - `GET /submitters/{id}` — [Get a submitter](references/api/get-a-submitter.md)
  - `PUT /submitters/{id}` — [Update a submitter](references/api/update-a-submitter.md)
  - `GET /submitters` — [List all submitters](references/api/list-all-submitters.md)

### Webhooks

- [Form Webhook](references/api/form-webhook.md)
- [Submission Webhook](references/api/submission-webhook.md)
- [Template Webhook](references/api/template-webhook.md)

Configure webhook URL: https://console.docuseal.com/webhooks

### Common API Patterns

1. **Send a document for signing:** create a template (or use existing) → `POST /submissions` with submitter emails → submitters receive signing links
2. **Embed signing in your app:** create submission with `send_email: false` → use returned `slug` with `<docuseal-form>` (see Embed UI Components above)
3. **Pre-fill and auto-sign:** `POST /submissions` with `fields[].default_value` and `completed: true`
4. **Track completion:** poll `GET /submissions/{id}` or configure webhooks for `form.completed`
5. **Download signed documents:** `GET /submissions/{id}/documents` returns PDF URLs

## Quick Decision Flow

1. **Embedding a component?** → Signing Form or Form Builder → load from `references/embed/`.
2. **Making API calls?** → Check if the user's language has an SDK (JS/TS, Python, Ruby, PHP) and prefer it over raw HTTP. Load the matching endpoint from `references/api/`.
3. **How-to question about embed?** Follow links from the component reference's `## Guides` section.
4. **Mobile?** Load [references/embed/signing-form-mobile-integration.md](references/embed/signing-form-mobile-integration.md).
5. **JWT needed?** Always for Form Builder — load [references/embed/form-builder-jwt-token.md](references/embed/form-builder-jwt-token.md). For Signing Form only when using `data-token` (preview/completed mode) — load [references/embed/signing-form-completed-preview-jwt-token.md](references/embed/signing-form-completed-preview-jwt-token.md).
6. **Not on `docuseal.com`?** Load [references/embed/signing-form-hosts.md](references/embed/signing-form-hosts.md) or [references/embed/form-builder-hosts.md](references/embed/form-builder-hosts.md) depending on the component.
7. **Custom theme?** Load [references/embed/signing-form-custom-css.md](references/embed/signing-form-custom-css.md) or [references/embed/form-builder-custom-css.md](references/embed/form-builder-custom-css.md) depending on the component.
8. **Auth, URL handling, webhook verification, or any security-sensitive embedding?** Load [references/embed/signing-form-security-recommendations.md](references/embed/signing-form-security-recommendations.md) or [references/embed/form-builder-security-recommendations.md](references/embed/form-builder-security-recommendations.md) depending on the component.
9. **CLI commands?** Load the sibling `docuseal-cli` skill from this same repo.
