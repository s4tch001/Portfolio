import type { ReactNode } from 'react';
import Footer from './Footer';
import Nav from './Nav';
import StyleSwitcher from './StyleSwitcher';

interface StandalonePageProps {
  children: ReactNode;
}

export default function StandalonePage({ children }: StandalonePageProps) {
  return (
    <>
      <div className="bg-glow" aria-hidden="true" />
      <Nav />
      <main className="page-offset">{children}</main>
      <Footer />
      <StyleSwitcher />
    </>
  );
}
