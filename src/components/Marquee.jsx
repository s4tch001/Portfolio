const ITEMS = [
  'React',
  'JavaScript',
  'Vite',
  'HTML5',
  'CSS3',
  'Supabase',
  'PostgreSQL',
  'Cloudflare Workers',
  'D1',
  'R2',
  'Durable Objects',
  'Netlify',
  'Netlify Functions',
  'Git',
];

function Row({ prefix }) {
  return ITEMS.map((item) => (
    <span key={`${prefix}-${item}`} className="marquee__item">
      {item} <span className="marquee__star" aria-hidden="true">✦</span>
    </span>
  ));
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
