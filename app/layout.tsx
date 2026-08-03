import './globals.css';
import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import type { ReactNode } from 'react';
import {
  Bangers,
  Comic_Neue,
  Cormorant_Garamond,
  Inter,
  JetBrains_Mono,
  Permanent_Marker,
  Pixelify_Sans,
  Space_Grotesk,
  VT323,
} from 'next/font/google';
import AnchorScrollController from './components/AnchorScrollController';
import RevealController from './components/RevealController';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const bangers = Bangers({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bangers',
  display: 'swap',
  preload: false,
});

const comicNeue = Comic_Neue({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-comic-neue',
  display: 'swap',
  preload: false,
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant-garamond',
  display: 'swap',
  preload: false,
});

const permanentMarker = Permanent_Marker({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-permanent-marker',
  display: 'swap',
  preload: false,
});

const pixelifySans = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-pixelify-sans',
  display: 'swap',
  preload: false,
});

const vt323 = VT323({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-vt323',
  display: 'swap',
  preload: false,
});

const fontVariables = [
  inter.variable,
  spaceGrotesk.variable,
  jetBrainsMono.variable,
  bangers.variable,
  comicNeue.variable,
  cormorantGaramond.variable,
  permanentMarker.variable,
  pixelifySans.variable,
  vt323.variable,
].join(' ');

export const metadata = {
  metadataBase: new URL('https://pauuu.dev'),
  title: {
    default: 'Filipino Web Developer in the Philippines | Pau',
    template: '%s | P-Devs',
  },
  description:
    'Hire Pau, a Filipino web developer in the Philippines building fast, secure Next.js websites and full-stack web apps for businesses and teams.',
  keywords: [
    'Filipino web developer',
    'full-stack developer Philippines',
    'Next.js developer',
    'React developer',
    'web development services Philippines',
    'custom web applications',
    'P-Devs',
    'Pau web developer',
  ],
  authors: [{ name: 'Pau (P-Devs)' }],
  creator: 'Pau (P-Devs)',
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: 'P-Devs',
    url: 'https://pauuu.dev/',
    title: 'Pau — Filipino Web Developer in the Philippines',
    description:
      'Filipino full-stack web developer building fast, secure Next.js websites and web apps for businesses and teams.',
    locale: 'en_PH',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'P-Devs — Pau, Filipino full-stack web developer in the Philippines',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pau — Filipino Web Developer in the Philippines',
    description:
      'Filipino full-stack web developer building fast, secure Next.js websites and web apps for businesses and teams.',
    images: [{
      url: '/og-image.png',
      alt: 'P-Devs — Pau, Filipino full-stack web developer in the Philippines',
    }],
  },
} satisfies Metadata;

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#07070d' },
    { media: '(prefers-color-scheme: light)', color: '#f7f7fb' },
  ],
  viewportFit: 'cover',
} satisfies Viewport;

// Applies the saved (or system) theme + saved page style during HTML parsing,
// before visible content is painted. Keep this as a raw parser-executed script:
// next/script queues beforeInteractive code behind the Next runtime, which can
// cause a late repaint on slow mobile connections.
const themeScript = `(function () {
  try {
    var root = document.documentElement;
    var saved = localStorage.getItem('theme');
    var theme =
      saved ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    root.dataset.theme = theme;
    var style = localStorage.getItem('site-style');
    var styles = {
      graffiti: true,
      oldschool: true,
      pixels: true,
      luxe: true,
      hacker: true
    };

    if (styles[style]) {
      root.dataset.style = style;
      root.dataset.styleLoading = 'true';
      root.style.visibility = 'hidden';

      var link = document.createElement('link');
      var settled = false;
      var timeout;
      var finish = function (loaded) {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeout);
        if (loaded) {
          link.dataset.loaded = 'true';
        } else {
          link.dataset.failed = 'true';
          link.dispatchEvent(new Event('page-style-failed'));
          link.remove();
          delete root.dataset.style;
          try {
            localStorage.setItem('site-style', 'default');
          } catch (storageError) {}
        }
        delete root.dataset.styleLoading;
        root.style.removeProperty('visibility');
      };

      link.id = 'page-style-css-' + style;
      link.rel = 'stylesheet';
      link.href = '/styles/' + style + '.css';
      link.dataset.pageStyle = style;
      link.setAttribute('blocking', 'render');
      link.addEventListener('load', function () { finish(true); }, { once: true });
      link.addEventListener('error', function () { finish(false); }, { once: true });
      document.head.appendChild(link);
      timeout = window.setTimeout(function () { finish(false); }, 3000);
    }
  } catch (e) {
    document.documentElement.dataset.theme = 'dark';
    delete document.documentElement.dataset.styleLoading;
    document.documentElement.style.removeProperty('visibility');
  }
})();`;

// Structured data — helps search engines understand who this site is about.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': 'https://pauuu.dev/#profile',
      url: 'https://pauuu.dev/',
      name: 'Pau — Filipino Full-Stack Web Developer',
      description: metadata.description,
      inLanguage: 'en-PH',
      mainEntity: { '@id': 'https://pauuu.dev/#pau' },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: 'https://pauuu.dev/android-chrome-512x512.png',
        width: 512,
        height: 512,
      },
    },
    {
      '@type': 'Person',
      '@id': 'https://pauuu.dev/#pau',
      name: 'Pau',
      alternateName: 'P-Devs',
      jobTitle: 'Full-Stack Web Developer',
      description: 'Filipino full-stack and Next.js web developer based in the Philippines.',
      url: 'https://pauuu.dev/',
      mainEntityOfPage: { '@id': 'https://pauuu.dev/#profile' },
      nationality: { '@type': 'Country', name: 'Philippines' },
      homeLocation: { '@type': 'Country', name: 'Philippines' },
      image: 'https://pauuu.dev/android-chrome-512x512.png',
      knowsAbout: [
        'Web Development',
        'Next',
        'React',
        'TypeScript',
        'Node',
        'UI/UX Design',
        'Technical SEO',
        'Web Security',
      ],
      sameAs: [
        'https://github.com/s4tch001',
        'https://www.facebook.com/jonbarentain',
        'https://www.instagram.com/jonbarentain',
        'https://www.tiktok.com/@jonbarentain',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://pauuu.dev/#website',
      url: 'https://pauuu.dev/',
      name: 'P-Devs',
      inLanguage: 'en-PH',
      publisher: { '@id': 'https://pauuu.dev/#pau' },
      about: { '@id': 'https://pauuu.dev/#pau' },
      hasPart: [
        { '@type': 'WebPageElement', name: 'About Pau', url: 'https://pauuu.dev/#about' },
        { '@type': 'WebPageElement', name: 'Services', url: 'https://pauuu.dev/#services' },
        { '@type': 'WebPageElement', name: 'Portfolio', url: 'https://pauuu.dev/#portfolio' },
        { '@type': 'WebPageElement', name: 'Skills', url: 'https://pauuu.dev/#skills' },
        { '@type': 'ContactPage', name: 'Contact Pau', url: 'https://pauuu.dev/contact' },
      ],
    },
  ],
};

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return (
    <html
      lang="en-PH"
      className={fontVariables}
      suppressHydrationWarning
    >
      <head>
        <script
          id="theme-init"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <AnchorScrollController />
        <RevealController />
      </body>
    </html>
  );
}
