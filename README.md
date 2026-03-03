# DocuSeal Agent Skills

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![DocuSeal](https://img.shields.io/badge/DocuSeal-MCP-blue)](https://docuseal.com)

A collection of skills for AI coding agents. Skills are packaged instructions and scripts that extend agent capabilities with [DocuSeal](https://docuseal.com) e-signature functionality.

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
Search for contract templates
```
```
Create a template from https://example.com/document.pdf
```
```
Send document template 1 to signer@example.com for signing
```

## Skill Structure

Each skill contains:
- `SKILL.md` - Instructions for the agent
- `scripts/` - Helper scripts for automation

## License

MIT License - see [LICENSE](LICENSE) for details.
