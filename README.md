# DocuSeal Agent Skills

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![DocuSeal](https://img.shields.io/badge/DocuSeal-CLI-blue)](https://www.docuseal.com)

A collection of [Agent Skills](https://agentskills.io/) for the [DocuSeal](https://www.docuseal.com) e-signature platform -- create templates from PDF/DOCX/HTML, send documents for signing, track submissions, and manage submitters.

## Available Skills

| Skill | Description | Source |
|-------|-------------|--------|
| [docuseal-cli](skills/docuseal-cli) | Manage e-signature templates, submissions, and submitters with DocuSeal | Synced from [docusealco/docuseal-cli](https://github.com/docusealco/docuseal-cli) |
| [docuseal-code](skills/docuseal-code) | DocuSeal development reference. Embed UI components, REST API, webhooks, and SDK examples | Authored here |

## Installation

### Universal (all agents)

```bash
npx skills add docusealco/docuseal-agent-skills
```

## Plugins

Platform-specific manifests:

| Platform | Directory |
|----------|-----------|
| Claude Code | [`.claude-plugin/`](.claude-plugin/) |
| OpenAI Codex | [`.codex-plugin/`](.codex-plugin/) |
| Cursor | [`.cursor-plugin/`](.cursor-plugin/) |

## Prerequisites (docuseal-cli)

1. Install the [DocuSeal CLI](https://github.com/docuseal/docuseal-cli): `npm install -g docuseal`
2. Set your API key:
```bash
export DOCUSEAL_API_KEY="your-api-key"       # Required. Get yours at https://console.docuseal.com/api
export DOCUSEAL_SERVER="global"              # Optional: global (default), europe, or full URL for self-hosted
```

## License

MIT License - see [LICENSE](LICENSE) for details.
