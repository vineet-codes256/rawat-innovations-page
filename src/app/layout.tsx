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
  title:
    'Rawat Innovations | Emerging Multi-Sector Technology Startup | Software, Gaming, Tourism Tech, AgriTech',
  description:
    'Emerging multi-sector technology startup developing innovative software solutions, gaming experiences, tourism technology, agritech innovations, and digital services. Seeking investors and funding for moonshot products.',
  keywords: [
    'technology solutions',
    'software development',
    'gaming development',
    'tourism technology',
    'agritech innovation',
    'digital services',
    'web development',
    'mobile apps',
    'AI solutions',
    'blockchain',
    'IoT',
    'cloud computing',
    'Rawat Innovations',
    'Vineet Rawat',
    'multi-sector technology',
    'innovative software',
    'tech startup',
    'digital transformation',
    'emerging technology',
    'startup funding',
    'venture capital',
    'tech investment',
    'innovative startup',
    'business investment',
    'technology innovation',
    'startup opportunities',
    'investor relations',
    'tech entrepreneur',
    'startup Uttarakhand',
    'best startup Uttarakhand',
    'innovation Uttarakhand',
    'technology startup Uttarakhand',
    'emerging startup Uttarakhand',
    'venture capital Uttarakhand',
    'investor Uttarakhand',
    'tech innovation Uttarakhand',
    'startup funding Uttarakhand',
    'Uttarakhand startup ecosystem',
    'Uttarakhand technology',
    'Uttarakhand innovation hub',
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
    title: 'Rawat Innovations | Emerging Multi-Sector Technology Startup',
    description:
      'Emerging multi-sector technology startup developing innovative solutions in software, gaming, tourism tech, agritech, and digital services. Seeking investors and funding.',
    url: 'https://rawatinnovations.com',
    siteName: 'Rawat Innovations',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rawat Innovations - Multi-Sector Technology Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rawat Innovations | Emerging Multi-Sector Technology Startup',
    description:
      'Emerging multi-sector technology startup developing innovative solutions in software, gaming, tourism tech, agritech, and digital services. Seeking investors and funding.',
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href="https://rawatinnovations.com" />
        <meta name="theme-color" content="#3b82f6" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* Performance optimizations - Critical resource hints */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin=""
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        {/* Preload critical resources */}
        <link rel="preload" href="/logo.png" as="image" />
        <link rel="preload" href="/favicon.ico" as="image" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('Service Worker registered successfully:', registration.scope);
                    })
                    .catch(function(error) {
                      console.log('Service Worker registration failed:', error);
                    });
                });
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Rawat Innovations',
              url: 'https://rawatinnovations.com',
              description:
                'Multi-sector technology company specializing in software development, gaming, tourism tech, agritech, and digital services',
              publisher: {
                '@type': 'Organization',
                name: 'Rawat Innovations Pvt. Ltd.',
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://rawatinnovations.com/#contact',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Rawat Innovations Pvt. Ltd.',
              url: 'https://rawatinnovations.com',
              logo: 'https://rawatinnovations.com/logo.png',
              description:
                'Emerging multi-sector technology company developing innovative software solutions, gaming experiences, tourism technology, agritech innovations, and digital services.',
              foundingDate: '2025',
              founder: {
                '@type': 'Person',
                name: 'Vineet Rawat',
                jobTitle: 'Founder & CEO',
              },
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'IN',
                addressRegion: 'Uttarakhand',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                availableLanguage: 'English',
                email: 'info@rawatinnovations.com',
              },
              sameAs: [
                'https://www.linkedin.com/company/rawat-innovations-pvt-ltd',
                'https://x.com/ripl_in',
                'https://www.instagram.com/rawatinnovations',
              ],
              knowsAbout: [
                'Software Development',
                'Game Design',
                'Tourism Technology',
                'AgriTech Innovation',
                'Digital Services',
                'AI Solutions',
                'Web Development',
                'Mobile Applications',
                'Cloud Computing',
                'Blockchain Technology',
                'Startup Funding',
                'Venture Capital',
                'Technology Innovation',
                'Emerging Technologies',
                'Investor Relations',
                'Uttarakhand Startup',
                'Uttarakhand Innovation',
                'Uttarakhand Technology',
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Technology Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Software Development',
                      description:
                        'Custom software development, web applications, and enterprise solutions',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Game Design & Development',
                      description:
                        'Immersive gaming experiences for mobile, desktop, and console platforms',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Tourism Technology',
                      description:
                        'Smart travel solutions promoting culture and enhancing accessibility worldwide',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'AgriTech Innovation',
                      description:
                        'IoT-powered agriculture solutions, AI tools, and rural empowerment initiatives',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Digital Services',
                      description:
                        'Branding, consulting, content creation, and comprehensive digital transformation',
                    },
                  },
                ],
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What services does Rawat Innovations offer?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Rawat Innovations is an emerging technology company with ambitious plans to offer multi-sector technology solutions including software development, game design, tourism technology, agritech innovations, and digital services. We aim to create innovative solutions across diverse industries.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Who is the founder of Rawat Innovations?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Vineet Rawat is the founder and CEO of Rawat Innovations Pvt. Ltd. He leads all aspects of technology innovation, from software development to business strategy.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What industries does Rawat Innovations serve?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Rawat Innovations serves six dynamic sectors: Software Development, Game Design, Tourism Technology, Digital Services, Fashion & Apparel, and AgriTech Innovation.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Is Rawat Innovations seeking investment?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, as an emerging technology startup founded in 2025, Rawat Innovations is actively seeking investors, venture capital, and funding opportunities to accelerate the development of our innovative multi-sector technology solutions.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Where is Rawat Innovations based?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Rawat Innovations is based in Uttarakhand, India, and is proud to be part of the emerging startup ecosystem in the region while serving clients globally.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How can I contact Rawat Innovations?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'You can contact Rawat Innovations through our website contact form, email us at info@rawatinnovations.com, or connect with us on LinkedIn, Twitter, and Instagram.',
                  },
                },
                ,
              ],
            }),
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
