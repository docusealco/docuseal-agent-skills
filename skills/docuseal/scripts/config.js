const DOCUSEAL_URL = process.env.DOCUSEAL_URL
const DOCUSEAL_MCP_TOKEN = process.env.DOCUSEAL_MCP_TOKEN

if (!DOCUSEAL_URL || !DOCUSEAL_MCP_TOKEN) {
  console.error('Set DOCUSEAL_URL and DOCUSEAL_MCP_TOKEN environment variables')
  process.exit(1)
}

module.exports = { DOCUSEAL_URL, DOCUSEAL_MCP_TOKEN }
