# Signing Form - Security Recommendations

`<docuseal-form>` is safe by default. The surrounding integration code carries the security responsibility.

## Embedding page URL must not be enumerable

DocuSeal's own signing URLs are random and non-enumerable:

- `/d/{slug}` - template signing URL. Example: `/d/LEVGR9rhZYf86M`.
- `/s/{slug}` - per-signer URL returned by `POST /submissions`. Example: `/s/aB12cD34eF56`.

The page in **your** application that embeds `<docuseal-form>` must not undo this guarantee. If you serve the embedding page at a URL like `https://yourapp.com/contracts/123/sign`, an attacker can iterate the integer ID (`/contracts/124/sign`, `/contracts/125/sign`, ...) and reach other users' signing forms even though the DocuSeal slug inside is random.

Common approaches:

- Put the DocuSeal slug in your own URL: `https://yourapp.com/sign/{docuseal_slug}`.
- Use your own non-enumerable identifier (UUID, random token) instead of the database integer.
- Require authentication on the embedding page and verify the current user owns the contract before rendering `<docuseal-form>`. This is the strongest defense and the only one that helps when the document must be tied to a specific user.

These can be combined for defense in depth.

## JWT must be signed on the backend

`data-token` is a JWT (HS256) signed with your DocuSeal API key.

- Sign tokens only on the backend. Never ship the API key to the browser.
- The `X-Auth-Token` API key and the JWT signing secret are the same value. Leaking either compromises both.

Use a token to carry parameters that the client must not be able to forge: `preview: true`, the bound `slug`, `external_id`, and `email`. The token authenticates that those values came from your backend.

See [signing-form-completed-preview-jwt-token.md](signing-form-completed-preview-jwt-token.md) for backend code examples.

## Authorize before exposing a signing URL

`/d/{slug}` and `/s/{slug}` are bearer URLs. Anyone with the link can open the form. To restrict a signing flow to a specific authenticated user:

- Create a per-signer URL via `POST /submissions` (returns `/s/{slug}`) instead of sharing the template URL.
- Set `send_email: false` if you want to control delivery.
- Require login on the page that embeds `<docuseal-form>`.
- Set `external_id` to bind the submitter to your internal user, and verify it on webhook events.
- Disable the shared template link on the template (`shared_link: false` / "Shared link" off in the dashboard) when you only want per-signer `/s/{slug}` URLs.

## Per-submitter 2FA for high-value documents

When creating the signer through `POST /submissions` or `POST /submitters`, pass `require_email_2fa: true` or `require_phone_2fa: true` on the submitter. Code verification happens before the embedded `<docuseal-form>` exposes the document.

## Do not trust client-supplied field values

`data-values` pre-fills fields in the browser. A signer can open devtools and change them before submitting.

If a field value must be immutable, mark the field as readonly server-side. Common ways:

- `POST /submissions` (or `POST /submitters`) with `fields[].default_value` and `readonly: true` on that field.
- `POST /submissions` (or `POST /submitters`) with the field name listed in `readonly_fields`.
- Mark the field as readonly directly in the template.

DocuSeal enforces immutability only when the field is marked readonly server-side.

## Token authentication for completed-document preview

`<docuseal-form>` in `preview` mode for a completed submission requires a `data-token` JWT by default. Always issue this token from your backend - do not rely on a public preview link to gate access to signed PDFs.

## Trust webhooks, not client events

`completed` and `declined` browser events fire in the user's browser and can be forged.

- Drive state changes (DB writes, fulfillment, charging) from `form.completed` and `form.declined` webhooks.
- Verify the HMAC signature on every webhook.
- Treat client events as UI hints only.

## Treat redirect URLs as untrusted

`data-completed-redirect-url` is rendered into the signer's browser. If you compute it from request input, validate it against an allowlist of your own hosts to prevent open-redirect issues.
