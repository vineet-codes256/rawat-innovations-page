import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "../components/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rawat Innovations | Multi-Sector Technology Solutions | Software, Gaming, Tourism Tech, AgriTech",
  description: "Leading multi-sector technology company specializing in software development, gaming solutions, tourism technology, agritech innovations, and digital services. Building moonshot products for tomorrow.",
  keywords: [
    "technology solutions",
    "software development",
    "gaming development",
    "tourism technology",
    "agritech innovation",
    "digital services",
    "web development",
    "mobile apps",
    "AI solutions",
    "blockchain",
    "IoT",
    "cloud computing",
    "Rawat Innovations",
    "Vineet Rawat",
    "multi-sector technology",
    "innovative software",
    "tech startup",
    "digital transformation"
  ],
  authors: [{ name: "Vineet Rawat", url: "https://rawatinnovations.com" }],
  creator: "Vineet Rawat",
  publisher: "Rawat Innovations Pvt. Ltd.",
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
    title: "Rawat Innovations | Multi-Sector Technology Solutions",
    description: "Leading multi-sector technology company building innovative solutions in software, gaming, tourism tech, agritech, and digital services.",
    url: "https://rawatinnovations.com",
    siteName: "Rawat Innovations",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rawat Innovations - Multi-Sector Technology Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rawat Innovations | Multi-Sector Technology Solutions",
    description: "Leading multi-sector technology company building innovative solutions in software, gaming, tourism tech, agritech, and digital services.",
    images: ["/og-image.png"],
    creator: "@ripl_in",
    site: "@ripl_in",
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
    google: "your-google-verification-code",
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        {/* Performance optimizations - Critical resource hints */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

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
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Rawat Innovations Pvt. Ltd.",
              "url": "https://rawatinnovations.com",
              "logo": "https://rawatinnovations.com/logo.png",
              "description": "Leading multi-sector technology company specializing in software development, gaming solutions, tourism technology, agritech innovations, and digital services.",
              "foundingDate": "2025",
              "founder": {
                "@type": "Person",
                "name": "Vineet Rawat",
                "jobTitle": "Founder & CEO"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "English",
                "email": "info@rawatinnovations.com"
              },
              "sameAs": [
                "https://www.linkedin.com/company/rawat-innovations-pvt-ltd",
                "https://x.com/ripl_in",
                "https://www.instagram.com/rawatinnovations"
              ],
              "knowsAbout": [
                "Software Development",
                "Game Design",
                "Tourism Technology",
                "AgriTech Innovation",
                "Digital Services",
                "AI Solutions",
                "Web Development",
                "Mobile Applications",
                "Cloud Computing",
                "Blockchain Technology"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Technology Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Software Development",
                      "description": "Custom software development, web applications, and enterprise solutions"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Game Design & Development",
                      "description": "Immersive gaming experiences for mobile, desktop, and console platforms"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Tourism Technology",
                      "description": "Smart travel solutions promoting culture and enhancing accessibility worldwide"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "AgriTech Innovation",
                      "description": "IoT-powered agriculture solutions, AI tools, and rural empowerment initiatives"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Digital Services",
                      "description": "Branding, consulting, content creation, and comprehensive digital transformation"
                    }
                  }
                ]
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What services does Rawat Innovations offer?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Rawat Innovations offers multi-sector technology solutions including software development, game design, tourism technology, agritech innovations, and digital services. We specialize in creating innovative solutions across diverse industries."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Who is the founder of Rawat Innovations?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Vineet Rawat is the founder and CEO of Rawat Innovations Pvt. Ltd. He leads all aspects of technology innovation, from software development to business strategy."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What industries does Rawat Innovations serve?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Rawat Innovations serves six dynamic sectors: Software Development, Game Design, Tourism Technology, Digital Services, Fashion & Apparel, and AgriTech Innovation."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How can I contact Rawat Innovations?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can contact Rawat Innovations through our website contact form, email us at info@rawatinnovations.com, or connect with us on LinkedIn, Twitter, and Instagram."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
