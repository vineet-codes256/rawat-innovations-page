import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Rawat Innovations Pvt. Ltd.',
  description:
    'Terms and Conditions for using the Rawat Innovations website and services.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="border-b border-gray-200 py-4 px-6">
        <nav aria-label="Site navigation">
          <Link
            href="/"
            className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            &larr; Back to Rawat Innovations
          </Link>
        </nav>
      </header>

      <main id="main-content" className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-4 py-3 mb-8">
          <strong>Draft for legal review.</strong> This page has not been
          reviewed by a qualified lawyer. Do not rely on it as legal advice.
        </p>

        <h1 className="text-3xl font-bold text-blue-900 mb-2">
          Terms &amp; Conditions
        </h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: October 2026</p>

        <div className="prose prose-blue max-w-none space-y-8 text-gray-800">
          <section aria-labelledby="acceptance">
            <h2
              id="acceptance"
              className="text-xl font-bold text-blue-900 mb-3"
            >
              1. Acceptance of terms
            </h2>
            <p>
              By accessing or using the Rawat Innovations website at{' '}
              <a
                href="https://rawatinnovations.com"
                className="text-blue-600 hover:underline"
              >
                rawatinnovations.com
              </a>
              , you agree to be bound by these Terms &amp; Conditions. If you do
              not agree, please do not use the site.
            </p>
          </section>

          <section aria-labelledby="about-company">
            <h2
              id="about-company"
              className="text-xl font-bold text-blue-900 mb-3"
            >
              2. About the company
            </h2>
            <p>
              Rawat Innovations Pvt. Ltd. (RIPL) is a private limited company
              incorporated under the Companies Act 2013 in India (CIN:
              U62011UT2025PTC019256), based in Dehradun, Uttarakhand.
            </p>
          </section>

          <section aria-labelledby="use-of-site">
            <h2
              id="use-of-site"
              className="text-xl font-bold text-blue-900 mb-3"
            >
              3. Use of the site
            </h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the site for any unlawful purpose.</li>
              <li>
                Attempt to gain unauthorised access to any part of the site or
                its infrastructure.
              </li>
              <li>
                Transmit any material that is harmful, offensive, or defamatory.
              </li>
              <li>
                Scrape or systematically extract data from the site without our
                written permission.
              </li>
            </ul>
          </section>

          <section aria-labelledby="intellectual-property">
            <h2
              id="intellectual-property"
              className="text-xl font-bold text-blue-900 mb-3"
            >
              4. Intellectual property
            </h2>
            <p>
              All content on this site (text, images, logos, code) is the
              property of Rawat Innovations Pvt. Ltd. or its licensors and is
              protected by applicable intellectual property laws. You may not
              reproduce, distribute, or create derivative works without our
              prior written consent.
            </p>
          </section>

          <section aria-labelledby="disclaimers">
            <h2
              id="disclaimers"
              className="text-xl font-bold text-blue-900 mb-3"
            >
              5. Disclaimers
            </h2>
            <p>
              The site and its content are provided on an &ldquo;as is&rdquo;
              basis without warranties of any kind, whether express or implied.
              We do not guarantee that the site will be uninterrupted,
              error-free, or free from viruses.
            </p>
            <p>
              Product descriptions, timelines, and feature information on this
              site are subject to change without notice.
            </p>
          </section>

          <section aria-labelledby="limitation-of-liability">
            <h2
              id="limitation-of-liability"
              className="text-xl font-bold text-blue-900 mb-3"
            >
              6. Limitation of liability
            </h2>
            <p>
              To the fullest extent permitted by law, Rawat Innovations Pvt.
              Ltd. shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising from your use of the
              site or our services.
            </p>
          </section>

          <section aria-labelledby="third-party-links">
            <h2
              id="third-party-links"
              className="text-xl font-bold text-blue-900 mb-3"
            >
              7. Third-party links
            </h2>
            <p>
              The site may contain links to third-party websites. We are not
              responsible for the content or privacy practices of those sites.
              Links do not imply endorsement.
            </p>
          </section>

          <section aria-labelledby="governing-law">
            <h2
              id="governing-law"
              className="text-xl font-bold text-blue-900 mb-3"
            >
              8. Governing law
            </h2>
            <p>
              These terms are governed by the laws of India. Any disputes shall
              be subject to the exclusive jurisdiction of the courts in
              Uttarakhand, India.
            </p>
          </section>

          <section aria-labelledby="changes-terms">
            <h2
              id="changes-terms"
              className="text-xl font-bold text-blue-900 mb-3"
            >
              9. Changes to these terms
            </h2>
            <p>
              We may update these terms from time to time. Continued use of the
              site after changes are posted constitutes acceptance of the
              updated terms.
            </p>
          </section>

          <section aria-labelledby="contact-terms">
            <h2
              id="contact-terms"
              className="text-xl font-bold text-blue-900 mb-3"
            >
              10. Contact
            </h2>
            <p>
              For any questions about these terms, email{' '}
              <a
                href="mailto:info@rawatinnovations.com"
                className="text-blue-600 hover:underline"
              >
                info@rawatinnovations.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-gray-200 py-6 px-6 text-center text-sm text-gray-500">
        <p>
          &copy; 2026 Rawat Innovations Pvt. Ltd. &middot;{' '}
          <Link href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>{' '}
          &middot; CIN: U62011UT2025PTC019256
        </p>
      </footer>
    </div>
  );
}
