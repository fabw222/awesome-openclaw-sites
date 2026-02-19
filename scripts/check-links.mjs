import { readFileSync } from 'node:fs';

const CONCURRENCY = 8;
const TIMEOUT = 10_000;

const file = new URL('../data/sites.json', import.meta.url);
const data = JSON.parse(readFileSync(file, 'utf-8'));

const urls = data.map((item) => ({ id: item.id, url: item.url }));

async function checkUrl({ id, url }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    let res = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow',
    });

    // Fallback to GET if HEAD is not allowed
    if (res.status === 405 || res.status === 501) {
      res = await fetch(url, { signal: controller.signal, redirect: 'follow' });
    }

    clearTimeout(timer);

    if (res.status >= 400) {
      return { id, url, ok: false, status: res.status };
    }
    return { id, url, ok: true, status: res.status };
  } catch (err) {
    clearTimeout(timer);
    return { id, url, ok: false, status: err.name === 'AbortError' ? 'timeout' : err.message };
  }
}

async function run() {
  console.log(`Checking ${urls.length} URLs (concurrency: ${CONCURRENCY})...\n`);
  const results = [];

  for (let i = 0; i < urls.length; i += CONCURRENCY) {
    const batch = urls.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(batch.map(checkUrl));
    results.push(...batchResults);
  }

  const failed = results.filter((r) => !r.ok);

  for (const r of results) {
    const icon = r.ok ? 'ok' : 'FAIL';
    console.log(`  [${icon}] ${r.id} (${r.status}) ${r.url}`);
  }

  console.log(`\n${results.length - failed.length}/${results.length} passed.`);

  if (failed.length > 0) {
    console.error(`\n${failed.length} link(s) failed.`);
    process.exit(1);
  }
}

run();
