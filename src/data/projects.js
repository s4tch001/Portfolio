import hoursTracker from '../assets/projects/hours-tracker.webp';
import payrollSplitter from '../assets/projects/payroll-splitter.webp';
import rcmiAttendance from '../assets/projects/rcmi-attendance.webp';
import sunsetSpeaks from '../assets/projects/sunset-speaks.webp';

// Add a `live` URL to any project to render a "Visit site" button.
const projects = [
  {
    id: 'sunset-speaks',
    num: '01',
    name: 'Sunset-Speaks Class Management',
    tagline: 'Full-stack ESL school platform on the Cloudflare edge',
    url: 'sunset-speaks.app',
    description:
      'The class-management platform behind Sunset-Speaks, an online ESL tutoring service. Teachers and admins run their entire operation here — scheduling live lessons, tracking student progress, filing class reports, and issuing class-balance receipts.',
    features: [
      'Cloudflare Worker API backed by D1 (SQLite), R2 file storage, and a Durable Object notification hub',
      'Cron triggers for automated monthly backups and hourly pending-report alerts',
      'Role-based access (admin / teacher) plus an Android WebView companion app',
    ],
    stack: ['React', 'Vite', 'JavaScript', 'Cloudflare Workers', 'D1 (SQLite)', 'R2', 'Durable Objects', 'Kotlin'],
    deploy: ['Cloudflare Workers', 'Cloudflare Pages'],
    image: sunsetSpeaks,
    alt: 'Sunset-Speaks landing page with a sunset illustration background',
    accent: 'amber',
  },
  {
    id: 'rcmi-attendance',
    num: '02',
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
    image: rcmiAttendance,
    alt: 'RCMI Attendance Checker calendar view in light theme',
    accent: 'blue',
  },
  {
    id: 'hours-tracker',
    num: '03',
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
    image: hoursTracker,
    alt: 'Hours Tracker dark calendar interface showing weekly totals',
    accent: 'violet',
  },
  {
    id: 'payroll-splitter',
    num: '04',
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
    image: payrollSplitter,
    alt: 'Payroll Splitter dark interface with USD setup and hours fields',
    accent: 'green',
  },
];

export default projects;
