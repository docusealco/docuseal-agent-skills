# DocuSeal Agent Skills

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![DocuSeal](https://img.shields.io/badge/DocuSeal-MCP-blue)](https://docuseal.com)

A collection of skills for AI coding agents. Skills are packaged instructions and scripts that extend agent capabilities with [DocuSeal](https://www.docuseal.com) e-signature functionality.

Skills follow the [Agent Skills](https://agentskills.io/) format.

## Available Skills

### docuseal

Manage document templates and e-signatures via the DocuSeal MCP endpoint. Search templates, create new ones from PDFs, send documents for signing, and search signed documents.

**Use when:**
- Search for a template
- Create a template from this PDF
- Send this document for signing
- Find signed documents for john@example.com

**Commands:**
- `search-templates` - Search document templates by name
- `create-template` - Create a template from a PDF URL or base64 file
- `send-documents` - Send a template for signing to specified emails
- `search-documents` - Search signed or pending documents

**Setup:**
1. Enable MCP in DocuSeal settings (Settings > MCP)
2. Create an MCP token
3. Set environment variables:
   ```bash
   export DOCUSEAL_URL="https://your-docuseal-instance.com"
   export DOCUSEAL_MCP_TOKEN="your-mcp-token"
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
Search for all documents related to example.com
```
```
Find all pending documents that haven't been signed yet
```
```
Upload the contractor agreement from https://example.com/contractor.pdf and name it "Freelance Contract"
```
```
Show me the latest documents signed by sarah@example.com
```

## Skill Structure

Each skill contains:
- `SKILL.md` - Instructions for the agent
- `scripts/` - Helper scripts for automation

## License

MIT License - see [LICENSE](LICENSE) for details.
