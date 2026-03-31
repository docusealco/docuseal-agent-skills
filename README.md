# DocuSeal Agent Skills

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![DocuSeal](https://img.shields.io/badge/DocuSeal-CLI-blue)](https://docuseal.com)

A collection of skills for AI coding agents. Skills are packaged instructions that extend agent capabilities with [DocuSeal](https://www.docuseal.com) e-signature functionality.

Skills follow the [Agent Skills](https://agentskills.io/) format.

## Available Skills

### docuseal

Manage document templates and e-signatures via the [DocuSeal CLI](https://github.com/docuseal/docuseal-cli). Create templates from PDF/DOCX/HTML, send documents for signing, track submissions, and manage submitters.

**Use when:**
- Search for a template
- Create a template from a PDF, DOCX, or HTML file
- Send a document for signing
- Check signing status or find signed documents
- Update submitter details

**Commands:**
- `docuseal templates` - list, retrieve, update, archive, create-pdf, create-docx, create-html, clone, merge, update-documents
- `docuseal submissions` - list, retrieve, archive, create, send-emails, create-pdf, create-docx, create-html, documents
- `docuseal submitters` - list, retrieve, update

**Setup:**
1. Install the CLI: `npm install -g docuseal`
2. Configure: `docuseal configure`

Or set environment variables:
```bash
export DOCUSEAL_API_KEY="your-api-key"
export DOCUSEAL_SERVER="global"  # global (default), europe, or full URL for self-hosted
```

## Installation

Using [clawhub](https://clawhub.ai/):
```bash
clawhub install docuseal
```

## Usage

Skills are automatically available once installed. The agent will use them when relevant tasks are detected.

**Examples:**
```
Find all NDA templates
```
```
Create a new template from https://example.com/employment-agreement.pdf
```
```
Send the "Lease Agreement" template to tenant@example.com for signing
```
```
Check if john@example.com has signed any documents
```
```
Create a template called "Sales Contract" from this PDF and send it to buyer@example.com
```
```
Find all pending documents that haven't been signed yet
```
```
Show me the latest documents signed by sarah@example.com
```

## Skill Structure

Each skill contains:
- `SKILL.md` - Instructions and command reference for the agent
- `references/` - Detailed per-topic documentation loaded on demand

## License

MIT License - see [LICENSE](LICENSE) for details.
