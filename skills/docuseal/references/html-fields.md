# HTML Field Tags

DocuSeal uses custom HTML tags to define fillable fields in templates. These tags can be used in `--html` or `--file` values for `templates create-html` and `submissions create-html` commands.

Full guide: https://www.docuseal.com/guides/create-pdf-document-fillable-form-with-html-api

## Available Tags

| Tag | Purpose |
|---|---|
| `<text-field>` | Text input |
| `<signature-field>` | Signature capture |
| `<date-field>` | Date picker |
| `<image-field>` | Image upload |
| `<initials-field>` | Initials capture |
| `<phone-field>` | Phone number input |
| `<stamp-field>` | Document stamp |
| `<file-field>` | File attachment |
| `<checkbox-field>` | Boolean checkbox |
| `<radio-field>` | Single option selection |
| `<select-field>` | Dropdown menu |
| `<multi-select-field>` | Multiple selection dropdown |
| `<payment-field>` | Payment processing |
| `<verification-field>` | Identity verification |

## Common Attributes

All tags support:

| Attribute | Description |
|---|---|
| `name` | Field identifier (required) |
| `role` | Signer role assignment |
| `default` | Pre-filled value |
| `required` | Required field, `true` by default |
| `readonly` | Prevent editing by signer |
| `title` | Display label |
| `description` | Help text shown to signer |
| `condition` | Conditional visibility, e.g. `"Status:active"` |
| `style` | CSS styling (width, height, etc.) |

## Text Formatting Attributes

| Attribute | Values |
|---|---|
| `font` | `Times`, `Helvetica`, `Courier` |
| `font-size` | Numeric value |
| `font-type` | `bold`, `italic`, `bold_italic` |
| `color` | `blue`, `red`, `black` (default) |
| `align` | `left`, `center`, `right` |
| `valign` | `top`, `center`, `bottom` |
| `mask` | `true` / `false` (hide sensitive data) |

## Type-Specific Attributes

**`<select-field>`, `<multi-select-field>`, `<radio-field>`:**

| Attribute | Description |
|---|---|
| `options` | Comma-separated list: `"opt1,opt2,opt3"` |

**`<date-field>`:**

| Attribute | Description |
|---|---|
| `min` / `max` | Min/max date |
| `format` | `DD/MM/YYYY` or `MM/DD/YYYY` |

**`<signature-field>`:**

| Attribute | Description |
|---|---|
| `format` | `drawn`, `typed`, `drawn_or_typed`, `upload` |

**`<payment-field>`:**

| Attribute | Description |
|---|---|
| `price` | Amount |
| `currency` | Currency code (e.g. `USD`) |

**`<verification-field>`:**

| Attribute | Description |
|---|---|
| `method` | `aes` or `qes` |

## Examples

**Simple contract:**
```html
<h1>Non-Disclosure Agreement</h1>
<p>This agreement is entered by <text-field name="Company Name" role="Company"></text-field>
and <text-field name="Recipient Name" role="Recipient"></text-field>.</p>

<p>Date: <date-field name="Date" format="MM/DD/YYYY"></date-field></p>

<p>Company signature:</p>
<signature-field name="Company Signature" role="Company"></signature-field>

<p>Recipient signature:</p>
<signature-field name="Recipient Signature" role="Recipient"></signature-field>
```

**Form with various field types:**
```html
<h2>Application Form</h2>
<p>Full Name: <text-field name="Full Name" required="true"></text-field></p>
<p>Phone: <phone-field name="Phone"></phone-field></p>
<p>Department: <select-field name="Department" options="Engineering,Sales,Marketing,HR"></select-field></p>
<p>Start Date: <date-field name="Start Date" min="2024-01-01"></date-field></p>
<p>Photo ID: <image-field name="Photo ID"></image-field></p>
<p>I agree to the terms: <checkbox-field name="Terms" required="true"></checkbox-field></p>
<signature-field name="Signature"></signature-field>
```

**Using with CLI:**
```bash
docuseal templates create-html --name "NDA" --html '<h1>NDA</h1>
<p>Party: <text-field name="Name"></text-field></p>
<signature-field name="Signature"></signature-field>'

docuseal templates create-html --name "NDA" --file nda.html

docuseal submissions create-html --file nda.html \
  -d "submitters[0][email]=john@acme.com"
```
