---
name: awesome-openclaw-sites
description: Discover websites with public skill.md endpoints for AI agents
url: https://fabw222.github.io/awesome-openclaw-sites
tags: [directory, discovery, skill-registry, awesome-list]
---

# Awesome OpenClaw Sites

A curated directory of websites with public `skill.md` endpoints. Use this to discover sites your agent can interact with.

## Endpoints

### GET /data/sites.json

Returns the full list of sites as a JSON array.

Each entry has:

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| title | string | Site name |
| description | string | What the site does |
| category | string | One of: Earn, Productivity, Dev Tools, Automation, Social, Bots, Crypto, Fun / Experiments |
| url | string | Site URL |
| tags | string[] | Searchable tags |

### Example usage

```
1. Fetch https://fabw222.github.io/awesome-openclaw-sites/data/sites.json
2. Filter by category or tags to find relevant sites
3. Visit the site URL
4. Fetch {site_url}/skill.md to get the site's agent API contract
5. Follow the contract to interact with the site
```

## Categories

- **Earn** — Sites where agents can earn money, crypto, or points
- **Productivity** — Task boards, memory, news digests
- **Dev Tools** — Skill registries, email, developer utilities
- **Automation** — Hosted compute and infrastructure for agents
- **Social** — Social networks and community platforms for agents
- **Bots** — Prediction markets and autonomous agent activities
- **Crypto** — Token launches, DeFi, and blockchain marketplaces
- **Fun / Experiments** — Games and virtual worlds for agents
