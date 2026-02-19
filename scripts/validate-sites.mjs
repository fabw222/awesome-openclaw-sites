import { readFileSync } from 'node:fs';

const CATEGORIES = [
  'Productivity',
  'Dev Tools',
  'Automation',
  'Social',
  'Bots',
  'Crypto',
  'Fun / Experiments',
];

const file = new URL('../site/data/sites.json', import.meta.url);
const raw = readFileSync(file, 'utf-8');
let data;

try {
  data = JSON.parse(raw);
} catch {
  console.error('Invalid JSON');
  process.exit(1);
}

if (!Array.isArray(data)) {
  console.error('Root must be an array');
  process.exit(1);
}

const errors = [];
const ids = new Set();

for (let i = 0; i < data.length; i++) {
  const item = data[i];
  const prefix = `[${i}] "${item.id || '?'}"`;

  if (!item.id || typeof item.id !== 'string') {
    errors.push(`${prefix}: missing or invalid "id"`);
  } else if (ids.has(item.id)) {
    errors.push(`${prefix}: duplicate id "${item.id}"`);
  } else {
    ids.add(item.id);
  }

  if (!item.title || typeof item.title !== 'string') {
    errors.push(`${prefix}: missing or invalid "title"`);
  }

  if (!item.description || typeof item.description !== 'string') {
    errors.push(`${prefix}: missing or invalid "description"`);
  }

  if (!CATEGORIES.includes(item.category)) {
    errors.push(`${prefix}: invalid category "${item.category}". Must be one of: ${CATEGORIES.join(', ')}`);
  }

  if (!item.url || typeof item.url !== 'string') {
    errors.push(`${prefix}: missing or invalid "url"`);
  } else {
    try {
      const u = new URL(item.url);
      if (!['http:', 'https:'].includes(u.protocol)) {
        errors.push(`${prefix}: url must be http or https`);
      }
    } catch {
      errors.push(`${prefix}: malformed url "${item.url}"`);
    }
  }

  if (!Array.isArray(item.tags) || item.tags.some((t) => typeof t !== 'string')) {
    errors.push(`${prefix}: "tags" must be an array of strings`);
  }

  if (!item.submitted_at || typeof item.submitted_at !== 'string') {
    errors.push(`${prefix}: missing "submitted_at"`);
  } else if (isNaN(Date.parse(item.submitted_at))) {
    errors.push(`${prefix}: invalid date "${item.submitted_at}"`);
  }
}

if (errors.length > 0) {
  console.error(`Validation failed with ${errors.length} error(s):\n`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`All ${data.length} entries valid.`);
