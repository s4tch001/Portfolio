import './globals.css';
import './styles/graffiti.css';
import './styles/oldschool.css';
import './styles/pixels.css';
import './styles/luxe.css';
import './styles/hacker.css';
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
import Script from 'next/script';

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
    'web developer',
    'web dev',
    'web devs',
    'webdev',
    'software engineer',
    'software development',
    'software developer',
    'full-stack developer',
    'React developer',
    'Next.js',
    'TypeScript',
    'UI/UX designer',
    'SEO specialist',
    'penetration testing',
    'Philippines web developer',
    'freelance web developer',
    'P-Devs',
    'P Devs',
    'PDevs',
    'P-Devs Philippines',
    'P-Devs Web Development',
    'P-Devs Website Builder',
    'P-Devs Web Design',
    'pauuu.dev',
    'Pau',
    'Pau Dev',
    'Pau Developer',
    'Pau Web Developer',
    'Pinoy Dev',
    'Pinoy Developer',
    'Pinoy Web Developer',
    'Filipino Developer',
    'Filipino Web Developer',
    'Philippine Web Developer',
    'Philippines Web Developer',
    'Web Developer Philippines',
    'Website Builder',
    'Website Creator',
    'Website Developer',
    'Website Designer',
    'Website Development',
    'Web Design',
    'Web Development',
    'Custom Website',
    'Custom Website Developer',
    'Professional Website Developer',
    'Freelance Web Developer',
    'Responsive Website',
    'Mobile Friendly Website',
    'Modern Website',
    'Business Website',
    'Portfolio Website',
    'Landing Page',
    'Corporate Website',
    'Ecommerce Website',
    'Online Store Developer',
    'Website Maintenance',
    'Website Redesign',
    'SEO Friendly Website',
    'Fast Website',
    'Secure Website',
    'Web Application',
    'Web App Developer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Full Stack Web Developer',
    'HTML5',
    'CSS3',
    'JavaScript',
    'React',
    'Next.js',
    'Node.js',
    'Express.js',
    'Tailwind CSS',
    'PostgreSQL',
    'SQLite',
    'Cloudflare',
    'Cloudflare Workers',
    'Cloudflare D1',
    'API Development',
    'REST API',
    'Authentication',
    'UI Design',
    'UX Design',
    'Small Business Website',
    'Startup Website',
    'Personal Website',
    'Custom Web Solutions',
    'Modern Web Solutions',
    'Professional Web Design',
    'Affordable Website Developer',
    'Local Website Developer',
    'Web Development Services',
    'Website Design Services',
    'Website Development Services',
    'Digital Solutions',
    'Software Developer',
    'Software Engineer',
    'Custom Software Development',
  ],
  authors: [{ name: 'Pau (P-Devs)' }],
  creator: 'Pau (P-Devs)',
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
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
  other: { google: 'notranslate' },
  openGraph: {
    type: 'website',
    siteName: 'P-Devs',
    url: 'https://pauuu.dev/',
    title: 'Pau — Filipino Web Developer in the Philippines',
    description:
      'Filipino full-stack web developer building fast, secure Next.js websites and web apps for businesses and teams.',
    locale: 'en_PH',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pau — Filipino Web Developer in the Philippines',
    description:
      'Filipino full-stack web developer building fast, secure Next.js websites and web apps for businesses and teams.',
    images: ['/og-image.png'],
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#07070d' },
    { media: '(prefers-color-scheme: light)', color: '#f7f7fb' },
  ],
  viewportFit: 'cover',
};

// Applies the saved (or system) theme + saved page style to <html> before
// first paint, so there's no flash of the wrong look. Mirrors the inline
// script from the old index.html.
const themeScript = `(function () {
  try {
    var saved = localStorage.getItem('theme');
    var theme =
      saved ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.dataset.theme = theme;
    var style = localStorage.getItem('site-style');
    if (style && style !== 'default') document.documentElement.dataset.style = style;
  } catch (e) {
    document.documentElement.dataset.theme = 'dark';
  }
})();`;

// Structured data — helps search engines understand who this site is about.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://pauuu.dev/#pau',
      name: 'Pau',
      alternateName: 'P-Devs',
      jobTitle: 'Full-Stack Web Developer',
      description: 'Filipino full-stack and Next.js web developer based in the Philippines.',
      url: 'https://pauuu.dev/',
      nationality: { '@type': 'Country', name: 'Philippines' },
      image: 'https://pauuu.dev/android-chrome-512x512.png',
      knowsAbout: [
        'Web Development',
        'Next.js',
        'React',
        'TypeScript',
        'Node.js',
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
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`notranslate ${fontVariables}`}
      translate="no"
      suppressHydrationWarning
    >
      <body>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
