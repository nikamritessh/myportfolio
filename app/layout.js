import './globals.css';
import './mobile.css';
import { IBM_Plex_Sans } from 'next/font/google';
import { Agentation } from 'agentation';
import SiteChrome from './components/SiteChrome';
import { ThemeProvider } from './context/ThemeContext';

const ibmPlex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
});

const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme') || 'light';
    var d = t === 'dark';
    var r = document.documentElement;
    if (d) r.classList.add('dark-theme');
    r.style.colorScheme = d ? 'dark' : 'light';
  } catch (e) {}
})();
`;

export const metadata = {
  metadataBase: new URL('https://riteshnikam.dev'),
  title: {
    default: 'Ritesh Nikam — Full Stack AI Engineer',
    template: '%s — Ritesh Nikam',
  },
  description:
    'Full Stack AI Engineer building production-ready AI products with LLMs, Voice AI, automation, FastAPI, and Next.js. Available for full-time opportunities.',
  keywords: [
    'Ritesh Nikam',
    'Full Stack Developer',
    'AI Engineer',
    'LLM Engineer',
    'Next.js',
    'FastAPI',
    'AI Automation',
  ],
  authors: [{ name: 'Ritesh Nikam' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-icon', type: 'image/png', sizes: '180x180' },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'Ritesh Nikam — Full Stack AI Engineer',
    description:
      'Building AI products that automate businesses — LLMs, Voice AI, automation, and modern cloud infrastructure.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ritesh Nikam — Full Stack AI Engineer',
    description: 'Building AI products that automate businesses.',
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#dce9e9' },
    { media: '(prefers-color-scheme: dark)', color: '#2f4345' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={ibmPlex.variable} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#dce9e9" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <SiteChrome>{children}</SiteChrome>
          {process.env.NODE_ENV === 'development' && <Agentation />}
        </ThemeProvider>
      </body>
    </html>
  );
}
