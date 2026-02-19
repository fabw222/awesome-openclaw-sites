# README Professionalization Design

**Date**: 2026-02-19
**Goal**: Make awesome-openclaw-sites look as professional as top awesome repos (438k+ stars)

## Research Basis

Analyzed: sindresorhus/awesome, avelino/awesome-go, awesome-selfhosted, public-apis

## Changes

### 1. Header (centered + badge)

```markdown
<div align="center">
  <h1>Awesome OpenClaw Sites</h1>
  <p>A curated list of websites with public <code>skill.md</code> endpoints for OpenClaw agents.</p>
  <a href="https://github.com/sindresorhus/awesome">
    <img src="https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg" alt="Awesome">
  </a>
</div>
```

### 2. Table of Contents

Add `## Contents` section with anchor links to all 7 categories.

### 3. Category Headers

Promote from `###` (h3) to `##` (h2) for better visibility and anchor linking.

### 4. Entry Format

Standardize all entries to:
```
- [Name](url) - Description ending with period.
```

- No bold on names
- Hyphen separator (not em-dash)
- Alphabetical ordering within each category

### 5. Section Reordering

Move meta sections to bottom:
1. Contents (TOC)
2. Site categories (the actual list)
3. What Qualifies
4. How to Add a Site (becomes Contributing summary)
5. How Agents Use This

### 6. New Files

- **LICENSE**: CC0 1.0 Universal
- **CONTRIBUTING.md**: Entry format, qualification criteria, PR process

## Not Included (Future)

- GitHub Actions (awesome-lint, lychee link checker)
- PR/issue templates
- sites.json auto-generation
- Custom skill.md endpoint validation
