export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p>
          © {new Date().getFullYear()} <span className="accent">Pau</span> · Web Developer · Musician · Gamer
        </p>
        <p className="footer__meta">Built with React + Vite · Deployed on Netlify</p>
      </div>
    </footer>
  );
}
