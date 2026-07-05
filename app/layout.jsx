import './globals.css';
import './styles/graffiti.css';
import './styles/oldschool.css';
import './styles/pixels.css';
import './styles/luxe.css';
import './styles/hacker.css';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL('https://pauuu.dev'),
  title: 'P-Devs · Pau — Full-Stack Web Developer & Software Engineer',
  description:
    'P-Devs is Pau — a Philippine-based full-stack web developer and software engineer building fast, modern sites and apps. React, Next.js, TypeScript, Node, Supabase & Cloudflare, plus UI/UX, SEO, and security. Available for freelance and full-time work.',
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
    'Manila Developer',
    'Metro Manila Web Developer',
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
    'Best Web Developer Philippines',
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
  openGraph: {
    type: 'website',
    siteName: 'P-Devs',
    url: 'https://pauuu.dev/',
    title: 'P-Devs · Pau — Full-Stack Web Developer & Software Engineer',
    description:
      'Philippine-based full-stack web developer and software engineer. React, Next.js, TypeScript, Node, Supabase & Cloudflare, plus UI/UX, SEO, and security. Available for work.',
    locale: 'en_PH',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'P-Devs · Pau — Full-Stack Web Developer & Software Engineer',
    description:
      'Philippine-based full-stack web developer and software engineer. React, Next.js, TypeScript, Node, Supabase & Cloudflare, plus UI/UX, SEO, and security.',
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
  '@type': 'Person',
  name: 'Pau',
  alternateName: 'P-Devs',
  jobTitle: 'Full-Stack Web Developer',
  url: 'https://pauuu.dev/',
  email: 'mailto:admin@pauuu.dev',
  nationality: 'Filipino',
  image: 'https://pauuu.dev/android-chrome-512x512.png',
  knowsAbout: [
    'Web Development',
    'Software Engineering',
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'UI/UX Design',
    'SEO',
    'Cybersecurity',
    'Penetration Testing',
  ],
  sameAs: [
    'https://github.com/s4tch001',
    'https://www.facebook.com/jonbarentain',
    'https://www.instagram.com/jonbarentain',
    'https://www.tiktok.com/@jonbarentain',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:wght@400;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;600&family=Permanent+Marker&family=Pixelify+Sans:wght@400;500;700&family=Space+Grotesk:wght@500;600;700&family=VT323&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          rel="stylesheet"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
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
