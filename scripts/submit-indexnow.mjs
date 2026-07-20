import { readFile } from 'node:fs/promises';

const SITE_URL = 'https://pauuu.dev';
const INDEXNOW_KEY = '6c1f4a9b33d24a7f8e9a4d42b5c7180a';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

const sitemapPath = new URL('../public/sitemap.xml', import.meta.url);
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
