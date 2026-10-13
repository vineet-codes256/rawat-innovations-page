import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Rawat Innovations Pvt. Ltd.',
  description:
    'Privacy Policy for Rawat Innovations Pvt. Ltd. (RIPL). Explains what personal data we collect, how we use it, and your rights.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: October 2026</p>

        <div className="prose prose-blue max-w-none space-y-8 text-gray-800">
          <section aria-labelledby="who-we-are">
            <h2
              id="who-we-are"
              className="text-xl font-bold text-blue-900 mb-3"
            >
              1. Who we are
            </h2>
            <p>
              Rawat Innovations Pvt. Ltd. (RIPL) is a private limited company
              incorporated in India (CIN: U62011UT2025PTC019256), based in
              Dehradun, Uttarakhand. We build software products and provide web
              development services for local businesses.
            </p>
            <p>
              For questions about this policy, contact us at{' '}
              <a
                href="mailto:info@rawatinnovations.com"
                className="text-blue-600 hover:underline"
              >
                info@rawatinnovations.com
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="data-we-collect">
            <h2
              id="data-we-collect"
              className="text-xl font-bold text-blue-900 mb-3"
            >
              2. Data we collect
            </h2>
            <p>We collect the following personal data:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Contact form:</strong> name, email address, and the
                message you send us.
              </li>
              <li>
                <strong>Newsletter (if active):</strong> email address only.
              </li>
              <li>
                <strong>Analytics:</strong> anonymised page-view data via Vercel
                Analytics. No cookies are set for analytics. No individual
                visitors are identified.
              </li>
            </ul>
            <p>We do not collect payment information directly on this site.</p>
          </section>

          <section aria-labelledby="how-we-use">
            <h2
              id="how-we-use"
              className="text-xl font-bold text-blue-900 mb-3"
            >
              3. How we use your data
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To respond to your enquiry.</li>
              <li>
                To send you the newsletter, if you subscribed (you may
                unsubscribe at any time).
              </li>
              <li>
                To improve the site using aggregated, anonymous analytics.
              </li>
            </ul>
            <p>We do not sell your data to third parties.</p>
          </section>

          <section aria-labelledby="data-sharing">
            <h2
              id="data-sharing"
              className="text-xl font-bold text-blue-900 mb-3"
            >
              4. Data sharing
            </h2>
            <p>
              We may share data with service providers who help us operate the
              site (hosting, email delivery). These providers process data on
              our behalf and are bound by data processing agreements. We do not
              share data with unrelated third parties for marketing.
            </p>
          </section>

          <section aria-labelledby="data-retention">
            <h2
              id="data-retention"
              className="text-xl font-bold text-blue-900 mb-3"
            >
              5. Data retention
            </h2>
            <p>
              Contact form submissions are kept only as long as needed to handle
              your enquiry. Newsletter email addresses are kept until you
              unsubscribe. Anonymous analytics data may be retained indefinitely
              in aggregated form.
            </p>
          </section>

          <section aria-labelledby="your-rights">
            <h2
              id="your-rights"
              className="text-xl font-bold text-blue-900 mb-3"
            >
              6. Your rights
            </h2>
            <p>
              Depending on your location, you may have rights to access,
              correct, or delete your personal data, and to object to or
              restrict processing. To exercise these rights, email us at{' '}
              <a
                href="mailto:info@rawatinnovations.com"
                className="text-blue-600 hover:underline"
              >
                info@rawatinnovations.com
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="security">
            <h2 id="security" className="text-xl font-bold text-blue-900 mb-3">
              7. Security
            </h2>
            <p>
              We take reasonable technical and organisational measures to
              protect your data. No method of transmission over the internet is
              completely secure. We will notify affected users if a data breach
              affects their personal data, as required by applicable law.
            </p>
          </section>

          <section aria-labelledby="changes">
            <h2 id="changes" className="text-xl font-bold text-blue-900 mb-3">
              8. Changes to this policy
            </h2>
            <p>
              We may update this policy from time to time. The updated date at
              the top of this page will reflect any changes. We encourage you to
              review this page periodically.
            </p>
          </section>

          <section aria-labelledby="contact-privacy">
            <h2
              id="contact-privacy"
              className="text-xl font-bold text-blue-900 mb-3"
            >
              9. Contact
            </h2>
            <p>
              For any privacy-related questions, email{' '}
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
          <Link href="/terms" className="text-blue-600 hover:underline">
            Terms &amp; Conditions
          </Link>{' '}
          &middot; CIN: U62011UT2025PTC019256
        </p>
      </footer>
    </div>
  );
}
