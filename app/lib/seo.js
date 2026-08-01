export const SITE_URL = 'https://pauuu.dev';

const SOCIAL_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'P-Devs — Pau, Filipino full-stack web developer in the Philippines',
};

export function createPageMetadata({ title, description, path }) {
  const url = new URL(path, SITE_URL).toString();
  const socialTitle = `${title} | P-Devs`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: 'P-Devs',
      locale: 'en_PH',
      url,
      title: socialTitle,
      description,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [{ url: SOCIAL_IMAGE.url, alt: SOCIAL_IMAGE.alt }],
    },
  };
}

export function serializeJsonLd(value) {
  return JSON.stringify(value).replaceAll('<', '\\u003c');
}
