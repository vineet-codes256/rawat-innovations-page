import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ErrorBoundary from '../components/ErrorBoundary';
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Rawat Innovations | Software Studio — Dehradun, India',
  description:
    'Rawat Innovations Pvt. Ltd. is a bootstrapped software studio in Dehradun, Uttarakhand, India. Building NearbyConnect (hyperlocal social discovery, closed alpha) and CapturePro (Chrome extension, 34,000+ installs). Web development for local businesses via LocalBizLabs.',
  keywords: [
    'software development India',
    'full stack engineer Uttarakhand',
    'web development local business',
    'NearbyConnect',
    'hyperlocal social app',
    'Rawat Innovations',
    'Vineet Rawat',
    'LocalBizLabs',
    'bootstrapped startup India',
    'Dehradun startup',
    'CapturePro Chrome extension',
    'custom web apps',
  ],
  authors: [{ name: 'Vineet Rawat', url: 'https://rawatinnovations.com' }],
  creator: 'Vineet Rawat',
  publisher: 'Rawat Innovations Pvt. Ltd.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://rawatinnovations.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Rawat Innovations | Software Studio — Dehradun, India',
    description:
      'Bootstrapped software studio in Uttarakhand building NearbyConnect and CapturePro. Web development for local businesses via LocalBizLabs. Founded by Vineet Rawat.',
    url: 'https://rawatinnovations.com',
    siteName: 'Rawat Innovations',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rawat Innovations — Simple, accessible software built end to end.',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rawat Innovations | Software Studio — Dehradun, India',
    description:
      'Bootstrapped software studio in Uttarakhand building NearbyConnect and CapturePro. Web development for local businesses via LocalBizLabs.',
    images: ['/og-image.png'],
    creator: '@ripl_in',
    site: '@ripl_in',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Organisation + WebSite JSON-LD
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Rawat Innovations Pvt. Ltd.',
  alternateName: 'RIPL',
  url: 'https://rawatinnovations.com',
  logo: 'https://rawatinnovations.com/logo.png',
  description:
    'Bootstrapped software studio in Dehradun, Uttarakhand, India. Building NearbyConnect (hyperlocal social discovery app) and CapturePro (Chrome extension). Web development for local businesses via LocalBizLabs.',
  foundingDate: '2025',
  // {{NEEDS_FOUNDER: confirm registered address disclosure}}
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dehradun',
    addressRegion: 'Uttarakhand',
    addressCountry: 'IN',
  },
  founder: {
    '@type': 'Person',
    name: 'Vineet Rawat',
    // {{NEEDS_FOUNDER: confirm preferred job title}}
    jobTitle: 'Founder & CTO',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi'],
    email: 'info@rawatinnovations.com',
  },
  sameAs: [
    'https://www.linkedin.com/company/rawat-innovations-pvt-ltd',
    'https://x.com/ripl_in',
    'https://www.instagram.com/rawatinnovations',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Rawat Innovations',
  url: 'https://rawatinnovations.com',
  description:
    'Bootstrapped software studio in Dehradun, Uttarakhand. Building NearbyConnect and providing web development and engineering services.',
  publisher: {
    '@type': 'Organization',
    name: 'Rawat Innovations Pvt. Ltd.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover, user-scalable=yes"
        />
        {/* iOS-specific */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />

        {/* Preload critical image */}
        <link rel="preload" href="/logo.png" as="image" />

        {/* Service worker — deferred to avoid blocking render */}
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
                window.addEventListener('load', function() {
                  setTimeout(function() {
                    navigator.serviceWorker.register('/sw.js').catch(function(err) {
                      console.log('Service Worker registration failed:', err);
                    });
                  }, 2000);
                });
              }
            `,
          }}
        />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>{children}</ErrorBoundary>
        <Analytics />
      </body>
    </html>
  );
}
