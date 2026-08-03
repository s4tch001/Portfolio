import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const SITE_URL = 'https://pauuu.dev';
const INDEXNOW_KEY = '6c1f4a9b33d24a7f8e9a4d42b5c7180a';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

async function submitSitemap(): Promise<void> {
  const sitemapPath = resolve(process.cwd(), 'public', 'sitemap.xml');
  const sitemap = await readFile(sitemapPath, 'utf8');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

  if (urls.length === 0) {
    throw new Error('No URLs found in public/sitemap.xml');
  }

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`IndexNow returned ${response.status}: ${details || response.statusText}`);
  }

  console.log(`Submitted ${urls.length} URL(s) to IndexNow.`);
}

void submitSitemap().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`IndexNow submission failed: ${message}`);
  process.exitCode = 1;
});
