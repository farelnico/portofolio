import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/syne';
import '@fontsource-variable/hanken-grotesk';
import './globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import { site } from '@/data/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.brand} | Software Engineer`, template: `%s | ${site.brand}` },
  description: site.description,
  openGraph: { type: 'website', title: `${site.brand} | Software Engineer`, description: site.description, siteName: site.name },
  twitter: { card: 'summary_large_image', title: `${site.brand} | Software Engineer`, description: site.description },
};

export const viewport: Viewport = { themeColor: '#14151A', colorScheme: 'dark' };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  sameAs: site.socials.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <noscript><style>{'.loader{display:none!important}'}</style></noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-bone focus:px-5 focus:py-3 focus:text-ink">
          Skip to content
        </a>
        <Providers>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
