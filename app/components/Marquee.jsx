const ITEMS = [
  'React',
  'Next.js',
  'JavaScript',
  'TypeScript',
  'Vite',
  'Tailwind CSS',
  'HTML5',
  'CSS3',
  'Node.js',
  'Python',
  'Django',
  'Flask',
  'Lua',
  'Supabase',
  'PostgreSQL',
  'Cloudflare Workers',
  'D1',
  'R2',
  'Durable Objects',
  'Netlify',
  'Vercel',
  'Shopify',
  'UI/UX',
  'SEO',
  'Git',
];

function Row({ prefix }) {
  return (
    <div className="marquee__row">
      {ITEMS.map((item) => (
        <span key={`${prefix}-${item}`} className="marquee__item">
          {item}
        </span>
      ))}
    </div>
  );
}

// Two identical rows inside a track animated -50% => seamless infinite loop.
export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        <Row prefix="a" />
        <Row prefix="b" />
      </div>
    </div>
  );
}
