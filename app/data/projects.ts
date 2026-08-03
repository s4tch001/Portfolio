import type { Project } from '../types/project';

// Screenshots live in /public/assets/projects and are referenced by URL so the
// Netlify serves them straight from its asset CDN (no bundler import needed).
const img = (file: string): string => `/assets/projects/${file}.webp`;

const hoursTracker = img('hours-tracker');
const hoursLight = img('hours-light');
const payrollSplitter = img('payroll-splitter');
const payrollFilled = img('payroll-filled');
const rcmiAttendance = img('rcmi-attendance');
const rcmiViewer = img('rcmi-viewer');
const rcmiLeadership = img('rcmi-leadership');
const rcmiDirectory = img('rcmi-directory');
const sunsetSpeaks = img('sunset-speaks');
const ssLogin = img('ss-login');
const ssSchedule = img('ss-schedule');
const ssStudents = img('ss-students');
const ssAccounts = img('ss-accounts');
const ssAdminReports = img('ss-admin-reports');
const ssAdminReportView = img('ss-admin-report-view');
const ssAdminTracker = img('ss-admin-tracker');
const ssAdminRemaining = img('ss-admin-remaining');
const ssAdminReceipt = img('ss-admin-receipt');
const ssAdminAnnual = img('ss-admin-annual');
const ssTeacherSchedule = img('ss-teacher-schedule');
const ssTeacherReport = img('ss-teacher-report');
const ssTeacherTracker = img('ss-teacher-tracker');
const ptravelsHero = img('ptravels-hero');
const ptravelsAbout = img('ptravels-about');
const ptravelsServices = img('ptravels-services');
const ptravelsTours = img('ptravels-tours');
const portfolioDefault = img('portfolio-default');
const portfolioGraffiti = img('portfolio-graffiti');
const portfolioOldschool = img('portfolio-oldschool');
const portfolioPixels = img('portfolio-pixels');
const portfolioLuxe = img('portfolio-luxe');
const portfolioHacker = img('portfolio-hacker');

const portfolioProject = {
  id: 'p-devs-portfolio',
  num: '01',
  name: 'P-Devs Portfolio',
  tagline: 'A type-safe, style-switchable portfolio built with Next.js',
  url: 'pauuu.dev',
  live: 'https://pauuu.dev',
  description:
    'The portfolio you are browsing: a responsive, TypeScript-first Next.js application for presenting my work, services, technical skills, and contact flow. One accessible content structure powers six distinct visual styles without sacrificing performance or usability.',
  features: [
    'Strict TypeScript across the App Router, React components, shared data, hooks, and server routes',
    'Six persistent visual styles: Default, Graffiti, Old School, Pixels, Luxe, and Hacker',
    'Smooth single-page navigation, optimized WebP galleries, and an accessible fullscreen lightbox',
    'SEO metadata, structured data, hardened response headers, rate limiting, Zod validation, and Cloudflare Turnstile',
  ],
  stack: ['Next.js 16', 'React 19', 'TypeScript', 'CSS3', 'Zod', 'React Hook Form', 'Netlify', 'Brevo', 'Cloudflare Turnstile'],
  deploy: ['Netlify'],
  images: [
    { src: portfolioDefault, alt: 'P-Devs portfolio homepage in the clean default style', caption: 'Default \u2014 clean & modern' },
    { src: portfolioGraffiti, alt: 'P-Devs portfolio homepage in the colorful graffiti style', caption: 'Graffiti \u2014 street art vibes' },
    { src: portfolioOldschool, alt: 'P-Devs portfolio homepage in the old-school 1990s web style', caption: 'Old School \u2014 90s web vibes' },
    { src: portfolioPixels, alt: 'P-Devs portfolio homepage in the pixel-art retro style', caption: 'Pixels \u2014 8-bit retro' },
    { src: portfolioLuxe, alt: 'P-Devs portfolio homepage in the minimalist luxe style', caption: 'Luxe \u2014 minimalist luxury' },
    { src: portfolioHacker, alt: 'P-Devs portfolio homepage in the terminal-inspired hacker style', caption: 'Hacker \u2014 code & terminal' },
  ],
  accent: 'violet',
} satisfies Project;

// Project screenshots use demo or public site data. Disposable demo previews
// are isolated from production and reset their visitor-created data daily.
const projectEntries = [
  portfolioProject,
  {
    id: 'sunset-speaks',
    num: '02',
    name: 'Sunset-Speaks Class Management',
    tagline: 'Full-stack ESL school platform on the Cloudflare edge',
    url: 'sunset-speaks.app',
    description:
      'The class-management platform behind Sunset-Speaks, an online ESL tutoring service. Teachers and admins run their entire operation here — scheduling live lessons, tracking student progress, filing class reports, and issuing class-balance receipts.',
    features: [
      'Cloudflare Worker API backed by D1 (SQLite), R2 file storage, and a Durable Object notification hub',
      'Cron triggers for automated monthly backups and hourly pending-report alerts',
      'Role-based access (admin / teacher / student) plus an Android WebView companion app',
    ],
    stack: ['React', 'Vite', 'JavaScript', 'Cloudflare Workers', 'D1 (SQLite)', 'R2', 'Durable Objects', 'Kotlin'],
    deploy: ['Cloudflare Workers', 'Cloudflare Pages'],
    demo: {
      url: 'https://cn-demo.pauuu.dev',
      deploy: ['Netlify', 'Supabase'],
      note: 'Portfolio-only demo preview: frontend on Netlify, backend/database on Supabase. Visitor-created demo data resets every day at 12:00 AM Asia/Manila.',
    },
    images: [
      { src: sunsetSpeaks, alt: 'Sunset-Speaks public landing page with a sunset illustration', caption: 'Public landing page', pov: 'Public' },
      { src: ssLogin, alt: 'Login screen over an animated sunset backdrop', caption: 'Login — animated sunset backdrop', pov: 'Public' },
      { src: ssSchedule, alt: 'Per-teacher class schedule grid for July 2026', caption: 'Per-teacher schedule grid', pov: 'Admin POV' },
      { src: ssAdminReports, alt: 'Class reports calendar with per-class status dots', caption: 'Class reports calendar', pov: 'Admin POV' },
      { src: ssAdminReportView, alt: 'Detailed class report with material, status and lesson memo', caption: 'Class report detail', pov: 'Admin POV' },
      { src: ssAdminTracker, alt: 'Lesson tracker table of every filed lesson per teacher', caption: 'Lesson tracker', pov: 'Admin POV' },
      { src: ssAdminRemaining, alt: 'Remaining classes balances per student with status badges', caption: 'Remaining classes', pov: 'Admin POV' },
      { src: ssAdminReceipt, alt: 'Receipt card modal showing a student’s receipts and balance', caption: 'Receipt card', pov: 'Admin POV' },
      { src: ssAdminAnnual, alt: 'Annual report dashboard with stats, donut charts and trends', caption: 'Annual report dashboard', pov: 'Admin POV' },
      { src: ssStudents, alt: 'Student management table with notes and statuses', caption: 'Student management', pov: 'Admin POV' },
      { src: ssAccounts, alt: 'Teacher and admin accounts management page', caption: 'Teacher & admin accounts', pov: 'Admin POV' },
      { src: ssTeacherSchedule, alt: 'Teacher calendar view of their own weekly classes', caption: 'My weekly schedule', pov: 'Teacher POV' },
      { src: ssTeacherReport, alt: 'Teacher filing a class report in a modal form', caption: 'Filing a class report', pov: 'Teacher POV' },
      { src: ssTeacherTracker, alt: 'Teacher lesson tracker log of their filed lessons', caption: 'My lesson tracker', pov: 'Teacher POV' },
    ],
    accent: 'amber',
  },
  {
    id: 'rcmi-attendance',
    num: '03',
    name: 'RCMI Attendance Checker',
    tagline: 'Attendance management for a ministry organization',
    url: 'rcmi-attendance.app',
    description:
      'A responsive attendance system for Radiance of Christ Ministries International. Leaders record attendance on a calendar, manage the member directory, and review a leadership overview — then export everything to Excel in one click.',
    features: [
      'Serverless API via Netlify Functions with Supabase (PostgreSQL) as the datastore',
      'Grouped Excel exports (per-day and per-leader sheets) generated client-side with ExcelJS',
      'Member directory, leadership hierarchy view, and password-protected admin actions',
    ],
    stack: ['React 19', 'Vite', 'JavaScript', 'Netlify Functions', 'Supabase', 'ExcelJS'],
    deploy: ['Netlify', 'Supabase'],
    demo: {
      url: 'https://rcmi-demo.pauuu.dev',
      deploy: ['Netlify', 'Supabase'],
      note: 'Portfolio-only demo preview: frontend on Netlify, backend/database on Supabase. Visitor-created demo data resets every day at 12:00 AM Asia/Manila.',
    },
    images: [
      { src: rcmiAttendance, alt: 'RCMI attendance calendar view in light theme', caption: 'Attendance calendar' },
      { src: rcmiViewer, alt: 'Day roster grouped by leader with role badges', caption: 'Day roster — grouped by leader' },
      { src: rcmiLeadership, alt: 'Leadership overview grouped by district leader', caption: 'Leadership overview by district' },
      { src: rcmiDirectory, alt: 'Member directory management view', caption: 'Member directory' },
    ],
    accent: 'blue',
  },
  {
    id: 'hours-tracker',
    num: '04',
    name: 'Hours Tracker',
    tagline: 'Calendar-based work hours logging with cloud sync',
    url: 'hours-tracker.app',
    description:
      'A zero-framework hours logger. Click any day to add or edit logged hours; weekly and monthly totals compute automatically. Data syncs to Supabase and the whole app sits behind a password gate stored in the database.',
    features: [
      'Hand-rolled calendar rendering, totals engine, and theme system in vanilla JavaScript',
      'Supabase REST sync with Row Level Security governing access',
      'Dark / light themes and a fully responsive layout — no dependencies at all',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Supabase'],
    deploy: ['Netlify'],
    demo: {
      url: 'https://hours-demo.pauuu.dev',
      deploy: ['Netlify', 'Supabase'],
      note: 'Portfolio-only demo preview: frontend on Netlify, backend/database on Supabase. Visitor-created demo data resets every day at 12:00 AM Asia/Manila.',
    },
    images: [
      { src: hoursTracker, alt: 'Hours Tracker calendar in dark theme', caption: 'Dark theme' },
      { src: hoursLight, alt: 'Hours Tracker calendar in light theme', caption: 'Light theme' },
    ],
    accent: 'violet',
  },
  {
    id: 'payroll-splitter',
    num: '05',
    name: 'Payroll Splitter',
    tagline: 'USD → PHP payroll math without the spreadsheet',
    url: 'payroll-splitter.app',
    description:
      'A focused calculator that splits a USD payroll across multiple people by hours rendered, then converts each share to PHP with a manually entered exchange rate. Built for a real recurring payday problem.',
    features: [
      'Auto-fills a missing person’s hours and warns when totals don’t add up',
      'Full formula trace so every peso in the result can be audited',
      'Instant, entirely client-side computation — works offline once loaded',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    deploy: ['Netlify'],
    demo: {
      url: 'https://payroll-demo.pauuu.dev',
      deploy: ['Netlify', 'Supabase'],
      note: 'Portfolio-only demo preview: frontend on Netlify, backend/database on Supabase. Visitor-created demo data resets every day at 12:00 AM Asia/Manila.',
    },
    images: [
      { src: payrollSplitter, alt: 'Payroll Splitter USD setup and hours inputs', caption: 'USD setup & hours' },
      { src: payrollFilled, alt: 'Computed pay split with per-person cards and formula trace', caption: 'Pay split + formula trace' },
    ],
    accent: 'green',
  },
  {
    id: 'p-travel-tours',
    num: '06',
    name: 'P Travel Tours Landing Page',
    tagline: 'Responsive travel-agency landing page for Philippine tours',
    url: 'p-travel-tours.app',
    description:
      'A polished marketing landing page for a fictional Philippine travel agency. Visitors land on a full-bleed hero, learn about the company, browse the services on offer, and scroll a grid of featured tour packages across the islands — from Boracay and Palawan to Batanes and Vigan.',
    features: [
      'Component-driven React build with distinct hero, about, services, and featured-tours sections',
      'Data-driven tour cards (destination, date, duration, price) rendered from a single data source',
      'Smooth in-page navigation, Font Awesome iconography, and a fully responsive layout',
    ],
    stack: ['React 19', 'Create React App', 'JavaScript', 'CSS3', 'Font Awesome'],
    deploy: ['Netlify'],
    demo: {
      url: 'https://travels-demo.pauuu.dev',
      deploy: ['Netlify', 'Supabase'],
      note: 'Portfolio-only demo preview: frontend on Netlify, backend/database on Supabase. Visitor-created demo data resets every day at 12:00 AM Asia/Manila.',
    },
    images: [
      { src: ptravelsHero, alt: 'P Travel Tours hero with an El Nido lagoon backdrop and Explore Tours call to action', caption: 'Full-bleed hero' },
      { src: ptravelsAbout, alt: 'About Us section with a lagoon photo and Explore The Difference copy', caption: 'About the agency' },
      { src: ptravelsServices, alt: 'Our Services section with affordable packages, island adventures, and comfortable stays', caption: 'Services offered' },
      { src: ptravelsTours, alt: 'Featured Tours grid of eight Philippine destinations with dates and prices', caption: 'Featured tour packages' },
    ],
    accent: 'blue',
  },
  ] satisfies readonly Project[];

const projects: readonly Project[] = projectEntries;

export default projects;
