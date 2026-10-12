'use client';
import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ─── Contact form state type ────────────────────────────────────────────────
type FormState = 'idle' | 'submitting' | 'success' | 'error';

// ─── Reduced-motion helper ───────────────────────────────────────────────────
function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function HomePageClient() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ─── Contact form ──────────────────────────────────────────────────────────
  const [formState, setFormState] = useState<FormState>('idle');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // ─── Newsletter ────────────────────────────────────────────────────────────
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const scrollToSection = useCallback(
    (sectionId: string, closeMobileMenu = false) => {
      if (typeof document === 'undefined') return;
      const el = document.getElementById(sectionId);
      if (!el) return;
      const headerOffset = window.innerWidth < 768 ? 80 : 96;
      const top =
        el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      if (prefersReducedMotion()) {
        window.scrollTo({ top });
      } else {
        window.scrollTo({ top, behavior: 'smooth' });
      }
      if (closeMobileMenu) setMobileMenuOpen(false);
    },
    [],
  );

  // ─── Contact form validation + submit ─────────────────────────────────────
  const handleContactSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const name = (fd.get('name') as string).trim();
      const email = (fd.get('email') as string).trim();
      const topic = fd.get('topic') as string;
      const message = (fd.get('message') as string).trim();

      // Honeypot check
      const honeypot = fd.get('_phone') as string;
      if (honeypot) return; // bot detected — silently drop

      const errors: Record<string, string> = {};
      if (!name) errors.name = 'Name is required.';
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        errors.email = 'A valid email address is required.';
      if (!topic) errors.topic = 'Please choose a topic.';
      if (!message) errors.message = 'Message is required.';

      setFormErrors(errors);
      if (Object.keys(errors).length > 0) return;

      setFormState('submitting');

      // No live endpoint yet — show success message. Replace with real fetch
      // when an API route is wired up. {{NEEDS_FOUNDER: contact form endpoint}}
      await new Promise((r) => setTimeout(r, 400));
      setFormState('success');
    },
    [],
  );

  // ─── Newsletter validation + submit ───────────────────────────────────────
  const handleNewsletterSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setNewsletterError('');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.trim())) {
        setNewsletterError('Please enter a valid email address.');
        return;
      }
      // {{NEEDS_FOUNDER: newsletter endpoint}} — no live endpoint yet
      setNewsletterSuccess(true);
    },
    [newsletterEmail],
  );

  // ─── Nav links ─────────────────────────────────────────────────────────────
  const navLinks = [
    { label: 'Products', id: 'products' },
    { label: 'Services', id: 'services' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      {/* Skip Navigation Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Skip to main content
      </a>

      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 text-gray-900 font-sans">
        {/* ═══ HEADER ══════════════════════════════════════════════════════════ */}
        <header
          className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm"
          role="banner"
        >
          <nav
            className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between"
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
              aria-label="Rawat Innovations — home"
            >
              <Image
                src="/logo.png"
                alt=""
                width={36}
                height={36}
                className="rounded-lg object-contain"
                priority
                sizes="36px"
                aria-hidden="true"
              />
              <span className="font-bold text-blue-900 text-lg hidden sm:inline">
                Rawat Innovations
              </span>
              <span
                className="font-bold text-blue-900 text-lg sm:hidden"
                aria-hidden="true"
              >
                RIPL
              </span>
            </Link>

            {/* Desktop nav links */}
            <ul
              className="hidden md:flex items-center gap-1 list-none"
              role="list"
            >
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* CTA + mobile menu toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base"
                aria-label="Get in touch with Rawat Innovations"
              >
                Get in Touch
              </button>

              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setMobileMenuOpen((o) => !o)}
              >
                <span aria-hidden="true" className="text-xl">
                  {mobileMenuOpen ? '✕' : '☰'}
                </span>
              </button>
            </div>
          </nav>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div
              id="mobile-menu"
              className="md:hidden bg-white border-t border-gray-200 px-4 py-3"
            >
              <ul className="flex flex-col gap-1 list-none" role="list">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id, true)}
                      className="w-full text-left px-3 py-2.5 text-gray-700 hover:text-blue-600 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </header>

        {/* ═══ MAIN CONTENT ════════════════════════════════════════════════════ */}
        <main id="main-content">
          {/* ── HERO ──────────────────────────────────────────────────────────── */}
          <section
            id="home"
            className="pt-28 pb-16 sm:pt-32 sm:pb-20 relative overflow-hidden"
            aria-labelledby="hero-heading"
          >
            {/* Decorative blobs — hidden from assistive tech */}
            <div
              className="absolute inset-0 overflow-hidden hidden sm:block opacity-30 pointer-events-none"
              aria-hidden="true"
            >
              <div className="absolute top-20 left-10 w-40 h-40 bg-blue-200/30 rounded-full blur-2xl" />
              <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-200/20 rounded-full blur-2xl" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
              <h1
                id="hero-heading"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight"
              >
                Simple, accessible software — built end to end.
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-3 max-w-2xl mx-auto">
                Rawat Innovations is a bootstrapped studio in Dehradun,
                Uttarakhand. Currently building NearbyConnect, a hyperlocal
                social discovery app in closed alpha.
              </p>
              <p className="text-sm text-gray-500 mb-8 max-w-xl mx-auto">
                Solo-founded by Vineet Rawat &middot; CIN: U62011UT2025PTC019256
              </p>

              <div
                className="flex flex-col sm:flex-row gap-3 justify-center"
                role="group"
                aria-label="Primary actions"
              >
                {/* Primary CTA — {{NEEDS_FOUNDER: confirm final CTA target}} */}
                <button
                  onClick={() => scrollToSection('products')}
                  className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[48px] text-base"
                >
                  See our products
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[48px] text-base"
                >
                  Get in Touch
                </button>
              </div>
            </div>
          </section>

          {/* ── PRODUCTS ──────────────────────────────────────────────────────── */}
          <section
            id="products"
            className="py-16 sm:py-20 bg-white"
            aria-labelledby="products-heading"
          >
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12">
                <h2
                  id="products-heading"
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4"
                >
                  Products
                </h2>
                <p className="text-gray-600 max-w-xl mx-auto">
                  Two products built under RIPL, one launched and one in closed
                  alpha.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* NearbyConnect */}
                <article className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                  <div className="h-44 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
                    <Image
                      src="/project-nearby-connect.png"
                      alt="NearbyConnect app icon"
                      width={120}
                      height={120}
                      className="object-contain"
                      loading="lazy"
                      sizes="120px"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                        Social App
                      </span>
                      <span className="text-xs font-medium text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                        Closed Alpha
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">
                      NearbyConnect
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-1">
                      A hyperlocal social discovery app that connects people
                      through shared interests and nearby communities. Currently
                      in closed alpha — early access coming soon.
                    </p>
                    {/* Waitlist placeholder — {{NEEDS_FOUNDER: waitlist URL or form destination}} */}
                    <button
                      onClick={() => scrollToSection('contact')}
                      className="mt-auto inline-flex items-center justify-center bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px]"
                    >
                      Request early access
                    </button>
                  </div>
                </article>

                {/* CapturePro */}
                <article className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                  <div className="h-44 bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-6">
                    {/* {{NEEDS_FOUNDER: /project-capturepro.png — add screenshot or icon}} */}
                    <div
                      className="w-24 h-24 bg-purple-100 rounded-2xl flex items-center justify-center"
                      aria-label="CapturePro icon placeholder"
                    >
                      <span
                        className="text-4xl"
                        role="img"
                        aria-label="Camera"
                      >
                        📸
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                        Chrome Extension
                      </span>
                      <span className="text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                        Launched
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">
                      CapturePro
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-1">
                      A productivity Chrome extension built solo. Reached 34,000+
                      lifetime installs and 13,438 monthly active users (as of
                      September 2026) without paid acquisition.
                    </p>
                    {/* {{NEEDS_FOUNDER: reconfirm current dashboard figures}} */}
                    <div className="flex gap-4 text-center mb-4">
                      <div className="flex-1 bg-purple-50 rounded-lg py-2">
                        <div className="text-lg font-bold text-purple-700">
                          34,000+
                        </div>
                        <div className="text-xs text-gray-600">
                          lifetime installs
                        </div>
                      </div>
                      <div className="flex-1 bg-blue-50 rounded-lg py-2">
                        <div className="text-lg font-bold text-blue-700">
                          13,438
                        </div>
                        <div className="text-xs text-gray-600">
                          monthly active users
                        </div>
                      </div>
                    </div>
                    {/* {{NEEDS_FOUNDER: Chrome Web Store URL for CapturePro}} */}
                    <p className="text-xs text-gray-500 italic mt-auto">
                      Chrome Web Store link coming soon.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* ── SERVICES ──────────────────────────────────────────────────────── */}
          <section
            id="services"
            className="py-16 sm:py-20 bg-blue-50/60"
            aria-labelledby="services-heading"
          >
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12">
                <h2
                  id="services-heading"
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4"
                >
                  Services
                </h2>
                <p className="text-gray-600 max-w-xl mx-auto">
                  Available to hire for focused, deliverable-based engagements.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* LocalBizLabs */}
                <article className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                  <div className="w-12 h-12 mb-4">
                    <Image
                      src="/service-localbizlabs.png"
                      alt=""
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      sizes="48px"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">
                    LocalBizLabs
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Web development for local businesses: fast, accessible
                    sites and small e-commerce builds. Clean code, no
                    unnecessary plugins, handed over with documentation.
                  </p>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="text-blue-600 font-semibold text-sm hover:text-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded min-h-[44px] flex items-center"
                  >
                    Enquire about a website &rarr;
                  </button>
                </article>

                {/* Custom Software */}
                <article className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                  <div className="w-12 h-12 mb-4">
                    <Image
                      src="/service-software.png"
                      alt=""
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      sizes="48px"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">
                    Custom Software Development
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Contract engineering for backend-heavy work: APIs, system
                    architecture, Django/Python, TypeScript, React. Available
                    for short-term contracts and longer ongoing engagements.
                  </p>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="text-blue-600 font-semibold text-sm hover:text-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded min-h-[44px] flex items-center"
                  >
                    Discuss a project &rarr;
                  </button>
                </article>
              </div>
            </div>
          </section>

          {/* ── ABOUT ─────────────────────────────────────────────────────────── */}
          <section
            id="about"
            className="py-16 sm:py-20 bg-white"
            aria-labelledby="about-heading"
          >
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12">
                <h2
                  id="about-heading"
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4"
                >
                  About
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                {/* Founder card */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 text-center">
                  <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-4 border-blue-100">
                    <Image
                      src="/vineet-rawat.png"
                      alt="Vineet Rawat, Founder of Rawat Innovations"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      sizes="80px"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-1">
                    Vineet Rawat
                  </h3>
                  {/* {{NEEDS_FOUNDER: confirm preferred title}} */}
                  <p className="text-gray-500 text-sm mb-3">
                    Founder &amp; CTO
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Self-taught full-stack engineer with 4+ years building
                    production systems. Backend and architecture focus: Python,
                    Django, TypeScript, React. Built CapturePro solo to 34,000+
                    installs. Now running Rawat Innovations as a bootstrapped,
                    solo studio in Uttarakhand.
                  </p>
                </div>

                {/* Company narrative */}
                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed">
                    Rawat Innovations Pvt. Ltd. was incorporated in May 2025 in
                    Uttarakhand, India. It is a solo, bootstrapped studio. No
                    outside funding, no team yet.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The focus is on building software that is simple to use and
                    accessible to everyone. Accessibility is not treated as a
                    checkbox — it is part of the design from the start. That
                    matters here because a meaningful share of India&apos;s
                    population navigates the web with assistive technology, and
                    because usable software should be usable by all.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    NearbyConnect is the current primary build. LocalBizLabs
                    and contract work fund the studio while NearbyConnect moves
                    through alpha.
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                    {[
                      { number: '2025', label: 'Founded' },
                      { number: '4+', label: 'Years building' },
                      { number: '34K+', label: 'CapturePro installs' },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {stat.number}
                        </div>
                        <div className="text-xs text-gray-500 leading-tight">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── CONTACT ───────────────────────────────────────────────────────── */}
          <section
            id="contact"
            className="py-16 sm:py-20 bg-blue-50/60"
            aria-labelledby="contact-heading"
          >
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12">
                <h2
                  id="contact-heading"
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4"
                >
                  Get in Touch
                </h2>
                <p className="text-gray-600 max-w-xl mx-auto">
                  For project enquiries, early NearbyConnect access, or
                  anything else — use the form below or email directly.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Form */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
                  <h3
                    id="contact-form-label"
                    className="text-xl font-bold text-blue-900 mb-6"
                  >
                    Send a message
                  </h3>

                  {formState === 'success' ? (
                    <div
                      role="status"
                      aria-live="polite"
                      className="text-center py-10"
                    >
                      <div className="text-4xl mb-3" aria-hidden="true">
                        ✅
                      </div>
                      <p className="text-gray-800 font-semibold">
                        Message received. We&apos;ll get back to you at the
                        email you provided.
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleContactSubmit}
                      aria-labelledby="contact-form-label"
                      noValidate
                    >
                      {/* Honeypot — hidden from sighted users, traps bots */}
                      <div
                        style={{
                          position: 'absolute',
                          left: '-9999px',
                          opacity: 0,
                          pointerEvents: 'none',
                        }}
                        aria-hidden="true"
                      >
                        <label htmlFor="f-phone">Phone (leave blank)</label>
                        <input
                          id="f-phone"
                          type="text"
                          name="_phone"
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      <div
                        aria-live="assertive"
                        aria-atomic="true"
                        className="sr-only"
                      >
                        {Object.keys(formErrors).length > 0 &&
                          'Please fix the errors below before submitting.'}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        {/* Name */}
                        <div>
                          <label
                            htmlFor="f-name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Name{' '}
                            <span
                              className="text-red-600"
                              aria-label="required"
                            >
                              *
                            </span>
                          </label>
                          <input
                            id="f-name"
                            type="text"
                            name="name"
                            required
                            aria-required="true"
                            aria-describedby={
                              formErrors.name ? 'f-name-error' : undefined
                            }
                            aria-invalid={formErrors.name ? 'true' : undefined}
                            className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Your name"
                            autoComplete="name"
                          />
                          {formErrors.name && (
                            <p
                              id="f-name-error"
                              className="text-red-600 text-xs mt-1"
                              role="alert"
                            >
                              {formErrors.name}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <label
                            htmlFor="f-email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Email{' '}
                            <span
                              className="text-red-600"
                              aria-label="required"
                            >
                              *
                            </span>
                          </label>
                          <input
                            id="f-email"
                            type="email"
                            name="email"
                            required
                            aria-required="true"
                            aria-describedby={
                              formErrors.email ? 'f-email-error' : undefined
                            }
                            aria-invalid={
                              formErrors.email ? 'true' : undefined
                            }
                            className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="your@email.com"
                            autoComplete="email"
                          />
                          {formErrors.email && (
                            <p
                              id="f-email-error"
                              className="text-red-600 text-xs mt-1"
                              role="alert"
                            >
                              {formErrors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Topic */}
                      <div className="mb-4">
                        <label
                          htmlFor="f-topic"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Topic{' '}
                          <span
                            className="text-red-600"
                            aria-label="required"
                          >
                            *
                          </span>
                        </label>
                        <select
                          id="f-topic"
                          name="topic"
                          required
                          aria-required="true"
                          aria-describedby={
                            formErrors.topic ? 'f-topic-error' : undefined
                          }
                          aria-invalid={
                            formErrors.topic ? 'true' : undefined
                          }
                          className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] ${formErrors.topic ? 'border-red-500' : 'border-gray-300'}`}
                        >
                          <option value="">Select a topic</option>
                          <option value="nearbconnect">
                            NearbyConnect early access
                          </option>
                          <option value="localbizlabs">
                            LocalBizLabs — website project
                          </option>
                          <option value="software">
                            Custom software development
                          </option>
                          <option value="other">Other</option>
                        </select>
                        {formErrors.topic && (
                          <p
                            id="f-topic-error"
                            className="text-red-600 text-xs mt-1"
                            role="alert"
                          >
                            {formErrors.topic}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div className="mb-4">
                        <label
                          htmlFor="f-message"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Message{' '}
                          <span
                            className="text-red-600"
                            aria-label="required"
                          >
                            *
                          </span>
                        </label>
                        <textarea
                          id="f-message"
                          name="message"
                          rows={4}
                          required
                          aria-required="true"
                          aria-describedby={
                            formErrors.message ? 'f-message-error' : undefined
                          }
                          aria-invalid={
                            formErrors.message ? 'true' : undefined
                          }
                          className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical ${formErrors.message ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="What can we help with?"
                        />
                        {formErrors.message && (
                          <p
                            id="f-message-error"
                            className="text-red-600 text-xs mt-1"
                            role="alert"
                          >
                            {formErrors.message}
                          </p>
                        )}
                      </div>

                      {/* Consent */}
                      <p className="text-xs text-gray-500 mb-4">
                        By sending this message you agree that we may store
                        your name and email to reply to your enquiry. See our{' '}
                        <Link
                          href="/privacy"
                          className="text-blue-600 hover:underline"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </p>

                      <button
                        type="submit"
                        disabled={formState === 'submitting'}
                        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[48px] disabled:opacity-60 disabled:cursor-not-allowed"
                        aria-live="polite"
                      >
                        {formState === 'submitting'
                          ? 'Sending...'
                          : 'Send message'}
                      </button>
                    </form>
                  )}
                </div>

                {/* Contact info + Social */}
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-blue-900 mb-4">
                      Direct contact
                    </h3>
                    <dl className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Image
                          src="/contact-email.png"
                          alt=""
                          width={20}
                          height={20}
                          className="w-5 h-5 object-contain mt-0.5 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <div>
                          <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Email
                          </dt>
                          <dd>
                            <a
                              href="mailto:info@rawatinnovations.com"
                              className="text-blue-600 hover:underline text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                            >
                              info@rawatinnovations.com
                            </a>
                          </dd>
                        </div>
                      </div>

                      {/* Phone — {{NEEDS_FOUNDER: confirm correct number and whether it is staffed}} */}
                      <div className="flex items-start gap-3">
                        <Image
                          src="/contact-phone.png"
                          alt=""
                          width={20}
                          height={20}
                          className="w-5 h-5 object-contain mt-0.5 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <div>
                          <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Phone
                          </dt>
                          <dd>
                            {/* tel: value needs confirmation — see F6 */}
                            <a
                              href="tel:+911354093357"
                              className="text-blue-600 hover:underline text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                            >
                              +91 1354 093357
                            </a>
                            <span className="text-xs text-gray-400 block mt-0.5">
                              {/* NEEDS_FOUNDER: confirm this number is correct */}
                              Number needs founder confirmation before launch.
                            </span>
                          </dd>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Image
                          src="/contact-location.png"
                          alt=""
                          width={20}
                          height={20}
                          className="w-5 h-5 object-contain mt-0.5 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <div>
                          <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Location
                          </dt>
                          {/* {{NEEDS_FOUNDER: confirm address disclosure level}} */}
                          <dd className="text-sm text-gray-700">
                            Dehradun, Uttarakhand, India
                          </dd>
                        </div>
                      </div>
                    </dl>
                  </div>

                  {/* Social */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-blue-900 mb-4">
                      Follow our work
                    </h3>
                    <div className="flex gap-3">
                      <a
                        href="https://www.linkedin.com/company/rawat-innovations-pvt-ltd"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Rawat Innovations on LinkedIn (opens in new tab)"
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] min-w-[44px]"
                      >
                        <Image
                          src="/social-linkedin.png"
                          alt=""
                          width={28}
                          height={28}
                          className="object-contain"
                          aria-hidden="true"
                        />
                      </a>
                      <a
                        href="https://x.com/ripl_in"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Rawat Innovations on X, formerly Twitter (opens in new tab)"
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] min-w-[44px]"
                      >
                        <Image
                          src="/social-twitter.png"
                          alt=""
                          width={28}
                          height={28}
                          className="object-contain"
                          aria-hidden="true"
                        />
                      </a>
                      <a
                        href="https://www.instagram.com/rawatinnovations"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Rawat Innovations on Instagram (opens in new tab)"
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] min-w-[44px]"
                      >
                        <Image
                          src="/social-instagram.png"
                          alt=""
                          width={28}
                          height={28}
                          className="object-contain"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                  </div>

                  {/* Newsletter */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-blue-900 mb-2">
                      Stay updated
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Get occasional updates on NearbyConnect and what
                      we&apos;re building.
                    </p>
                    {newsletterSuccess ? (
                      <p
                        role="status"
                        aria-live="polite"
                        className="text-green-700 text-sm font-semibold"
                      >
                        Thanks! We&apos;ll be in touch.
                      </p>
                    ) : (
                      <form
                        onSubmit={handleNewsletterSubmit}
                        aria-label="Newsletter signup"
                        noValidate
                      >
                        <label
                          htmlFor="nl-email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email address{' '}
                          <span
                            className="text-red-600"
                            aria-label="required"
                          >
                            *
                          </span>
                        </label>
                        <div className="flex gap-2">
                          <input
                            id="nl-email"
                            type="email"
                            name="nl-email"
                            required
                            aria-required="true"
                            aria-describedby={
                              newsletterError ? 'nl-error' : undefined
                            }
                            aria-invalid={newsletterError ? 'true' : undefined}
                            value={newsletterEmail}
                            onChange={(e) =>
                              setNewsletterEmail(e.target.value)
                            }
                            placeholder="your@email.com"
                            className={`flex-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] ${newsletterError ? 'border-red-500' : 'border-gray-300'}`}
                            autoComplete="email"
                          />
                          <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] whitespace-nowrap"
                          >
                            Subscribe
                          </button>
                        </div>
                        {newsletterError && (
                          <p
                            id="nl-error"
                            className="text-red-600 text-xs mt-1"
                            role="alert"
                          >
                            {newsletterError}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 mt-2">
                          No spam. Unsubscribe at any time. See our{' '}
                          <Link
                            href="/privacy"
                            className="text-blue-600 hover:underline"
                          >
                            Privacy Policy
                          </Link>
                          .
                        </p>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* ═══ FOOTER ══════════════════════════════════════════════════════════ */}
        <footer
          className="bg-blue-900 text-white py-10"
          role="contentinfo"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Brand */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-2 mb-3">
                  <Image
                    src="/logo.png"
                    alt=""
                    width={28}
                    height={28}
                    className="rounded-lg"
                    aria-hidden="true"
                  />
                  <span className="font-bold text-lg">Rawat Innovations</span>
                </div>
                <p className="text-blue-200 text-sm leading-relaxed mb-4">
                  Bootstrapped software studio. Building NearbyConnect and
                  providing web and engineering services from Dehradun,
                  Uttarakhand.
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/company/rawat-innovations-pvt-ltd"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Rawat Innovations on LinkedIn (opens in new tab)"
                    className="focus:outline-none focus:ring-2 focus:ring-blue-300 rounded min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <Image
                      src="/social-linkedin.png"
                      alt=""
                      width={24}
                      height={24}
                      className="object-contain brightness-200"
                      aria-hidden="true"
                    />
                  </a>
                  <a
                    href="https://x.com/ripl_in"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Rawat Innovations on X (opens in new tab)"
                    className="focus:outline-none focus:ring-2 focus:ring-blue-300 rounded min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <Image
                      src="/social-twitter.png"
                      alt=""
                      width={24}
                      height={24}
                      className="object-contain brightness-200"
                      aria-hidden="true"
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/rawatinnovations"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Rawat Innovations on Instagram (opens in new tab)"
                    className="focus:outline-none focus:ring-2 focus:ring-blue-300 rounded min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <Image
                      src="/social-instagram.png"
                      alt=""
                      width={24}
                      height={24}
                      className="object-contain brightness-200"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>

              {/* Navigation */}
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-300 mb-3">
                  Navigation
                </h2>
                <ul className="space-y-2 list-none">
                  {[
                    { label: 'Products', id: 'products' },
                    { label: 'Services', id: 'services' },
                    { label: 'About', id: 'about' },
                    { label: 'Contact', id: 'contact' },
                  ].map((link) => (
                    <li key={link.id}>
                      <button
                        onClick={() => scrollToSection(link.id)}
                        className="text-blue-200 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 rounded min-h-[44px]"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-300 mb-3">
                  Legal
                </h2>
                <ul className="space-y-2 list-none mb-4">
                  <li>
                    <Link
                      href="/privacy"
                      className="text-blue-200 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-blue-200 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
                    >
                      Terms &amp; Conditions
                    </Link>
                  </li>
                </ul>
                <p className="text-blue-300 text-xs">
                  CIN: U62011UT2025PTC019256
                </p>
                <p className="text-blue-300 text-xs mt-1">
                  Rawat Innovations Pvt. Ltd.
                </p>
              </div>
            </div>

            <div className="border-t border-blue-800 pt-6 text-center">
              <p className="text-blue-300 text-sm">
                &copy; 2026 Rawat Innovations Pvt. Ltd. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
