'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import PageTransition from './PageTransition';

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isResume = pathname === '/resume';

  if (isResume) {
    return <main id="main-content">{children}</main>;
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </>
  );
}
