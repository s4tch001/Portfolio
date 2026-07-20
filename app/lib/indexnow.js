export const SITE_URL = 'https://pauuu.dev';
export const INDEXNOW_KEY = '6c1f4a9b33d24a7f8e9a4d42b5c7180a';
export const INDEXNOW_KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

export function normalizeIndexNowUrl(url) {
  const parsed = new URL(url, SITE_URL);

  if (parsed.origin !== SITE_URL) {
    throw new Error(`URL must belong to ${SITE_URL}: ${url}`);
  }

  parsed.hash = '';
  return parsed.toString();
}

export async function submitIndexNowUrls(urls) {
  const urlList = [...new Set(urls.map(normalizeIndexNowUrl))];

  if (urlList.length === 0) {
    throw new Error('At least one URL is required.');
  }

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key: INDEXNOW_KEY,
      keyLocation: INDEXNOW_KEY_LOCATION,
      urlList,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`IndexNow returned ${response.status}: ${details || response.statusText}`);
  }

  return { status: response.status, urlList };
}
