'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HomePageClient() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Smooth scroll with offset for fixed header - wrapped in useCallback
  const scrollToSection = useCallback((sectionId: string) => {
    if (typeof window === 'undefined' || typeof document === 'undefined')
      return;
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = window.innerWidth < 768 ? 80 : 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setCurrentSection(sectionId);
    }
  }, []);

  // Touch gesture support for mobile with passive listeners
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Optimize event listeners
  useEffect(() => {
    if (!isMobile) return;

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;

      const distance = touchStart - touchEnd;
      const isUpSwipe = distance > 50;
      const isDownSwipe = distance < -50;

      const sections = [
        'home',
        'about',
        'services',
        'portfolio',
        'blog',
        'contact',
      ];
      const currentIndex = sections.indexOf(currentSection);

      if (isUpSwipe && currentIndex < sections.length - 1) {
        scrollToSection(sections[currentIndex + 1]);
      } else if (isDownSwipe && currentIndex > 0) {
        scrollToSection(sections[currentIndex - 1]);
      }

      // Reset touch states
      setTouchStart(0);
      setTouchEnd(0);
    };

    const options: AddEventListenerOptions = { passive: true };
    const handlePassiveTouchStart = (e: TouchEvent) => {
      setTouchStart(e.touches[0].clientY);
    };
    const handlePassiveTouchMove = (e: TouchEvent) => {
      setTouchEnd(e.touches[0].clientY);
    };

    document.addEventListener('touchstart', handlePassiveTouchStart, options);
    document.addEventListener('touchmove', handlePassiveTouchMove, options);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handlePassiveTouchStart);
      document.removeEventListener('touchmove', handlePassiveTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, touchStart, touchEnd, currentSection, scrollToSection]);

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
        {/* Header / Navigation */}
        <header
          className="fixed w-full sm:rounded-full sm:ml-[5%] sm:w-[90%] top-1 z-50 bg-white/20 backdrop-blur-md border-b border-gray-200 shadow-sm"
          role="banner"
        >
          <nav
            className="mx-auto py-3 xs:py-3 sm:py-4"
            role="navigation"
            aria-label="Main navigation"
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-2 xs:space-x-2 sm:space-x-3">
                <Image
                  src="/logo.png"
                  alt="Rawat Innovations Logo"
                  width={40}
                  height={40}
                  className="xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-lg bg-transparent"
                  priority
                  sizes="(max-width: 640px) 32px, 40px"
                />
                <span
                  className="text-lg xs:text-base sm:text-xl font-bold text-blue-900 md:hidden"
                  aria-label="Rawat Innovations Pvt Ltd"
                >
                  RIPL
                </span>
                <span
                  className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900 hidden md:block cursor-default whitespace-nowrap"
                  aria-label="Rawat Innovations Pvt Ltd"
                >
                  Rawat Innovations
                </span>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                           xs:px-4 xs:py-2 xs:text-sm xs:min-w-[100px] xs:min-h-[44px]
                           sm:px-5 sm:py-2.5 sm:text-base
                           md:px-6 md:py-3
                           lg:px-8 lg:py-3 lg:text-lg"
                aria-label="Get in touch with Rawat Innovations"
              >
                <span className="xs:inline sm:hidden">Contact</span>
                <span className="hidden sm:inline">Get in Touch</span>
              </button>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main id="main-content">
          {/* Hero Section */}
          <section
            id="home"
            className="relative overflow-hidden
                       xs:pt-20 xs:pb-12 
                       sm:pt-24 sm:pb-16 
                       md:pt-28 md:pb-20
                       lg:pt-32 lg:pb-24
                       xl:pt-36 xl:pb-28"
            aria-labelledby="hero-heading"
          >
            <div className="container mx-auto xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
              <div className="text-center">
                {/* Simplified background gradient - no animations */}
                <div
                  className="absolute inset-0 overflow-hidden hidden sm:block opacity-30"
                  aria-hidden="true"
                >
                  <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-xl" />
                  <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-xl" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto">
                  {/* Main Headline - Fully responsive */}
                  <h1
                    id="hero-heading"
                    className="font-bold mb-4 sm:mb-6 mt-6 sm:mt-9 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight animate-fadeIn
                               xs:text-2xl 
                               sm:text-3xl 
                               md:text-4xl 
                               lg:text-5xl 
                               xl:text-6xl 
                               2xl:text-7xl
                               3xl:text-8xl"
                    tabIndex={-1}
                  >
                    Innovating Today for a<br className="hidden sm:block" />{' '}
                    Smarter Tomorrow
                  </h1>

                  {/* Subheadline */}
                  <p
                    className="text-gray-600 mb-6 sm:mb-8 font-light mx-auto animate-fadeIn
                                xs:text-sm xs:max-w-sm xs:px-2
                                sm:text-base sm:max-w-xl
                                md:text-lg md:max-w-2xl
                                lg:text-xl lg:max-w-3xl
                                xl:text-2xl
                                2xl:text-2xl"
                  >
                    Rawat Innovations Pvt. Ltd. - Emerging multi-sector
                    technology company developing innovative software solutions,
                    gaming experiences, tourism technology, agritech
                    innovations, and digital services to empower businesses
                    worldwide.
                  </p>

                  {/* CTA Buttons */}
                  <div
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 animate-fadeIn
                               xs:px-4 sm:px-0"
                    role="group"
                    aria-label="Call to action buttons"
                  >
                    <button
                      onClick={() => scrollToSection('portfolio')}
                      className="w-full sm:w-auto bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                 xs:px-6 xs:py-3 xs:text-sm xs:min-h-[48px]
                                 sm:px-8 sm:py-4 sm:text-base
                                 md:px-10 md:py-4
                                 lg:px-12 lg:py-5 lg:text-lg"
                      aria-label="Explore our vision and projects"
                    >
                      Explore Our Vision
                    </button>
                    <button
                      onClick={() => scrollToSection('contact')}
                      className="w-full sm:w-auto bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-lg hover:shadow-xl border-2 border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                 xs:px-6 xs:py-3 xs:text-sm xs:min-h-[48px]
                                 sm:px-8 sm:py-4 sm:text-base
                                 md:px-10 md:py-4
                                 lg:px-12 lg:py-5 lg:text-lg"
                      aria-label="Contact Rawat Innovations"
                    >
                      Contact Us
                    </button>
                  </div>

                  {/* Sector Icons - Responsive */}
                  <div
                    className="flex justify-center flex-wrap gap-3 sm:gap-4 md:gap-6 lg:gap-8 opacity-60 xs:px-2"
                    role="list"
                    aria-label="Technology sectors we serve"
                  >
                    {[
                      {
                        src: '/sector-software.png',
                        alt: 'Software Development Services',
                      },
                      {
                        src: '/sector-gaming.png',
                        alt: 'Game Design and Development',
                      },
                      {
                        src: '/sector-tourism.png',
                        alt: 'Tourism Technology Solutions',
                      },
                      {
                        src: '/sector-digital.png',
                        alt: 'Digital Services and Consulting',
                      },
                      {
                        src: '/sector-fashion.png',
                        alt: 'Fashion and Apparel Technology',
                      },
                      {
                        src: '/sector-agritech.png',
                        alt: 'AgriTech Innovation Solutions',
                      },
                    ].map((icon, index) => (
                      <div
                        key={index}
                        className="xs:w-8 xs:h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
                        role="listitem"
                      >
                        <Image
                          src={icon.src}
                          alt={icon.alt}
                          width={56}
                          height={56}
                          className="w-full h-full object-contain"
                          loading="lazy"
                          sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, (max-width: 1024px) 48px, 56px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About Us Section */}
          <section
            id="about"
            className="xs:py-12 sm:py-16 md:py-20 lg:py-24 bg-white"
          >
            <div className="container mx-auto xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <div className="text-center xs:mb-8 sm:mb-12 md:mb-16">
                <h2
                  className="font-bold mb-4 sm:mb-6 text-blue-900
                               xs:text-2xl 
                               sm:text-3xl 
                               md:text-4xl 
                               lg:text-5xl
                               xl:text-5xl"
                >
                  About Rawat Innovations
                </h2>
                <p
                  className="text-gray-600 mx-auto
                              xs:text-sm xs:max-w-sm xs:px-2
                              sm:text-base sm:max-w-xl
                              md:text-lg md:max-w-2xl
                              lg:text-xl lg:max-w-3xl"
                >
                  Founded in 2025, Rawat Innovations is an emerging technology
                  company with ambitious plans in software development, gaming
                  solutions, tourism technology, agritech innovations, and
                  digital transformation services. We aim to bridge innovative
                  technology with real-world business needs to create solutions
                  that drive growth and empower communities across multiple
                  industries.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xs:gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center xs:mb-8 sm:mb-12 md:mb-16">
                {/* Mission & Vision */}
                <div className="xs:space-y-4 sm:space-y-6">
                  <div className="bg-white xs:p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
                    <h3
                      className="font-bold mb-3 sm:mb-4 text-blue-900
                                   xs:text-lg sm:text-xl md:text-2xl"
                    >
                      Our Mission
                    </h3>
                    <p className="text-gray-700 xs:text-sm sm:text-base leading-relaxed">
                      To democratize innovation through advanced software
                      development, gaming technology, tourism tech solutions,
                      agritech innovations, and comprehensive digital services
                      that solve real-world business challenges across multiple
                      industries, driving sustainable growth and positive
                      societal impact.
                    </p>
                  </div>
                  <div className="bg-white xs:p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
                    <h3
                      className="font-bold mb-3 sm:mb-4 text-blue-900
                                   xs:text-lg sm:text-xl md:text-2xl"
                    >
                      Our Vision
                    </h3>
                    <p className="text-gray-700 xs:text-sm sm:text-base leading-relaxed">
                      To become a key technology catalyst for digital
                      transformation, creating innovative software products,
                      gaming experiences, tourism technology solutions, agritech
                      innovations, and digital services that redefine
                      possibilities and empower businesses worldwide.
                    </p>
                  </div>
                </div>

                {/* Leadership Cards */}
                <div className="xs:space-y-4 sm:space-y-6">
                  <div className="bg-white xs:p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100 text-center">
                    <div className="xs:w-16 xs:h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-4 overflow-hidden border-4 border-blue-100">
                      <Image
                        src="/vineet-rawat.png"
                        alt="Vineet Rawat - Founder & CEO of Rawat Innovations"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        sizes="(max-width: 640px) 64px, 80px"
                      />
                    </div>
                    <h4
                      className="font-bold text-blue-900 mb-2
                                   xs:text-lg sm:text-xl"
                    >
                      Vineet Rawat
                    </h4>
                    <p className="text-gray-600 mb-2 xs:text-sm sm:text-base">
                      Founder & CEO
                    </p>
                    <p className="text-gray-500 xs:text-xs sm:text-sm leading-relaxed">
                      Visionary leader with expertise in technology innovation
                      and entrepreneurial ventures. Handling all aspects of
                      technology innovation, from software development to
                      business strategy.
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-white max-w-4xl mx-auto xs:p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="grid grid-cols-2 md:grid-cols-4 xs:gap-4 sm:gap-6 md:gap-8 text-center">
                  {[
                    { number: '2025', label: 'Founded' },
                    { number: '6', label: 'Industries' },
                    { number: '∞', label: 'Limitless Potential' },
                    { number: '1', label: 'Mission' },
                  ].map((stat, idx) => (
                    <div key={idx}>
                      <div
                        className="font-bold text-blue-600 mb-1 sm:mb-2
                                      xs:text-2xl sm:text-3xl md:text-4xl"
                      >
                        {stat.number}
                      </div>
                      <div className="text-gray-600 xs:text-xs sm:text-sm">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Services / Sectors Section */}
          <section
            id="services"
            className="xs:py-12 sm:py-16 md:py-20 lg:py-24 bg-blue-50/50"
          >
            <div className="container mx-auto xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <div className="text-center xs:mb-8 sm:mb-12 md:mb-16">
                <h2
                  className="font-bold mb-4 sm:mb-6 text-blue-900
                               xs:text-2xl 
                               sm:text-3xl 
                               md:text-4xl 
                               lg:text-5xl
                               xl:text-5xl"
                >
                  Our Sectors
                </h2>
                <p
                  className="text-gray-600 mx-auto
                              xs:text-sm xs:max-w-sm xs:px-2
                              sm:text-base sm:max-w-xl
                              md:text-lg md:max-w-2xl
                              lg:text-xl lg:max-w-3xl"
                >
                  We operate across six dynamic sectors, each representing our
                  commitment to innovation and excellence.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xs:gap-4 sm:gap-6 md:gap-8">
                {[
                  {
                    title: 'LocalBizLabs',
                    desc: 'Professional web development agency specializing in modern websites, e-commerce platforms, and digital solutions for local businesses.',
                    iconSrc: '/service-localbizlabs.png',
                    iconAlt: 'LocalBizLabs Web Development',
                    color: 'blue',
                    isNew: true,
                    website: 'https://localbizlabs.com',
                  },
                  {
                    title: 'Software Development',
                    desc: 'Custom applications, SaaS platforms, and enterprise solutions built with modern technologies.',
                    iconSrc: '/service-software.png',
                    iconAlt: 'Software Development',
                    color: 'purple',
                    isNew: true,
                    website: 'https://localbizlabs.com',
                  },
                  {
                    title: 'Game Design',
                    desc: 'Immersive gaming experiences for mobile, desktop, and console platforms.',
                    iconSrc: '/service-winitstudios.png',
                    iconAlt: 'Game Design',
                    color: 'green',
                    isNew: true,
                    website: 'https://winitstudios.com',
                  },
                  {
                    title: 'Tourism-Tech',
                    desc: 'Smart travel solutions promoting culture and enhancing accessibility worldwide.',
                    iconSrc: '/service-tourism.png',
                    iconAlt: 'Tourism Technology',
                    color: 'orange',
                    isNew: false,
                    website: 'Coming Soon',
                  },
                  {
                    title: 'Digital Services',
                    desc: 'Branding, consulting, content creation, and comprehensive digital transformation.',
                    iconSrc: '/service-digital.png',
                    iconAlt: 'Digital Services',
                    color: 'indigo',
                    isNew: false,
                    website: 'Coming Soon',
                  },
                  {
                    title: 'AgriTech Innovation',
                    desc: 'IoT-powered agriculture solutions, AI tools, and rural empowerment initiatives.',
                    iconSrc: '/service-agritech.png',
                    iconAlt: 'AgriTech Innovation',
                    color: 'emerald',
                    isNew: false,
                    website: 'Coming Soon',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white xs:p-4 sm:p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl 
                               transition-shadow duration-200 group cursor-pointer border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className="xs:w-10 xs:h-10 sm:w-12 sm:h-12">
                        <Image
                          src={item.iconSrc}
                          alt={item.iconAlt}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain"
                          loading="lazy"
                          sizes="(max-width: 640px) 40px, 48px"
                        />
                      </div>
                      {item.isNew && (
                        <span
                          className="bg-blue-600 text-white xs:text-[10px] sm:text-xs 
                                       xs:px-1.5 xs:py-0.5 sm:px-2 sm:py-1 rounded-full font-medium"
                        >
                          NEW
                        </span>
                      )}
                      {item.website === 'Coming Soon' && (
                        <span
                          className="bg-yellow-500 text-white xs:text-[10px] sm:text-xs 
                                       xs:px-1.5 xs:py-0.5 sm:px-2 sm:py-1 rounded-full font-medium"
                        >
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <h3
                      className="font-bold mb-3 sm:mb-4 text-blue-900 
                                   group-hover:text-blue-600 transition-colors
                                   xs:text-lg sm:text-xl md:text-2xl"
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-gray-700 leading-relaxed mb-3 sm:mb-4
                                  xs:text-xs sm:text-sm md:text-base"
                    >
                      {item.desc}
                    </p>
                    <button
                      className="text-blue-600 font-semibold hover:text-blue-800 
                                 transition-colors xs:text-xs sm:text-sm md:text-base
                                 min-h-[44px] flex items-center"
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          window.open(
                            item.website,
                            '_blank',
                            'noopener,noreferrer'
                          );
                        }
                      }}
                    >
                      Learn More
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Portfolio / Projects Section */}
          <section
            id="portfolio"
            className="xs:py-12 sm:py-16 md:py-20 lg:py-24 bg-white"
          >
            <div className="container mx-auto xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <div className="text-center xs:mb-8 sm:mb-12 md:mb-16">
                <h2
                  className="font-bold mb-4 sm:mb-6 text-blue-900
                               xs:text-2xl 
                               sm:text-3xl 
                               md:text-4xl 
                               lg:text-5xl
                               xl:text-5xl"
                >
                  Our Vision
                </h2>
                <p
                  className="text-gray-600 mx-auto mb-4 sm:mb-6 md:mb-8
                              xs:text-sm xs:max-w-sm xs:px-2
                              sm:text-base sm:max-w-xl
                              md:text-lg md:max-w-2xl
                              lg:text-xl lg:max-w-3xl"
                >
                  Bold ideas and moonshot projects shaping the future.
                  We&apos;re currently building the foundation for
                  groundbreaking innovations.
                </p>

                {/* Status Indicator */}
                <div
                  className="inline-flex items-center bg-blue-100 text-blue-800 
                               xs:px-3 xs:py-2 xs:text-xs
                               sm:px-4 sm:py-2 sm:text-sm
                               md:px-6 md:py-3 md:text-base
                               rounded-full font-medium"
                >
                  Currently in Development Phase
                </div>
              </div>

              <div className="flex justify-center">
                {[
                  {
                    title: 'Nearby Connect',
                    category: 'Social',
                    description:
                      'Location-based discovery social media app connecting people through shared experiences and local communities.',
                    status: 'Development',
                    imageSrc: '/project-nearby-connect.png',
                    imageAlt: 'Nearby Connect Social App',
                    timeline: 'Q4 2025',
                    url: 'https://www.karmicinnovations.com/',
                  },
                ].map((project, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 
                               group cursor-pointer border border-gray-100 overflow-hidden"
                    onClick={() => {
                      if (project.url && typeof window !== 'undefined') {
                        window.open(
                          project.url,
                          '_blank',
                          'noopener,noreferrer'
                        );
                      }
                    }}
                  >
                    <div
                      className="xs:h-36 sm:h-40 md:h-48 bg-gradient-to-br from-blue-50 to-purple-50 
                                    flex items-center justify-center relative"
                    >
                      <Image
                        src={project.imageSrc}
                        alt={project.imageAlt}
                        width={192}
                        height={192}
                        className="w-full h-full object-contain xs:p-4 sm:p-6"
                        loading="lazy"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 25vw"
                      />
                      <div
                        className="absolute xs:top-2 xs:right-2 sm:top-4 sm:right-4 
                                     bg-white/90 backdrop-blur-sm 
                                     xs:px-2 xs:py-0.5 xs:text-[10px]
                                     sm:px-3 sm:py-1 sm:text-xs
                                     rounded-full font-medium text-blue-600"
                      >
                        {project.timeline}
                      </div>
                    </div>
                    <div className="xs:p-3 sm:p-4 md:p-6">
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <span
                          className="xs:text-[10px] sm:text-xs md:text-sm font-medium 
                                       text-blue-600 bg-blue-100 
                                       xs:px-2 xs:py-0.5
                                       sm:px-3 sm:py-1
                                       rounded-full"
                        >
                          {project.category}
                        </span>
                        <span
                          className={`xs:text-[10px] sm:text-xs md:text-sm font-medium 
                                     xs:px-2 xs:py-0.5
                                     sm:px-3 sm:py-1
                                     rounded-full ${
                                       project.status === 'Planning'
                                         ? 'text-orange-600 bg-orange-100'
                                         : project.status === 'Research'
                                           ? 'text-purple-600 bg-purple-100'
                                           : project.status === 'Design'
                                             ? 'text-green-600 bg-green-100'
                                             : 'text-gray-600 bg-gray-100'
                                     }`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <h3
                        className="font-bold mb-2 sm:mb-3 text-blue-900 
                                     group-hover:text-blue-600 transition-colors
                                     xs:text-sm sm:text-base md:text-lg lg:text-xl"
                      >
                        {project.title}
                      </h3>
                      <p
                        className="text-gray-700 leading-relaxed
                                    xs:text-xs sm:text-sm md:text-base"
                      >
                        {project.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Newsletter Signup */}
          <section
            id="newsletter"
            className="xs:py-12 sm:py-16 md:py-20 lg:py-24 bg-blue-50/50"
          >
            <div className="container mx-auto xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <div
                className="bg-white max-w-2xl mx-auto xs:p-4 sm:p-6 md:p-8 
                              rounded-2xl shadow-lg border border-gray-100 text-center"
              >
                <h3
                  className="font-bold xs:mb-2 sm:mb-3 md:mb-4 text-blue-900
                               xs:text-lg sm:text-xl md:text-2xl"
                >
                  Stay Updated
                </h3>
                <p
                  className="text-gray-700 xs:mb-3 sm:mb-4 md:mb-6
                              xs:text-xs sm:text-sm md:text-base"
                >
                  Subscribe to our newsletter for the latest insights on
                  technology innovation and industry trends.
                </p>
                <div className="flex flex-col sm:flex-row xs:gap-2 sm:gap-3 md:gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 xs:px-3 xs:py-2 xs:text-xs
                               sm:px-4 sm:py-3 sm:text-sm
                               md:text-base
                               rounded-lg border border-gray-300 
                               focus:outline-none focus:ring-2 focus:ring-blue-500
                               min-h-[44px]"
                  />
                  <button
                    className="bg-blue-600 text-white 
                               xs:px-4 xs:py-2 xs:text-xs
                               sm:px-5 sm:py-3 sm:text-sm
                               md:px-6 md:text-base
                               rounded-lg font-semibold hover:bg-blue-700 
                               transition-all duration-300 shadow-lg hover:shadow-xl
                               min-h-[44px]"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Future Opportunities */}
          <section id="careers" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900">
                  Future Opportunities
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                  Currently a solo operation led by Vineet Rawat. Future
                  opportunities will be posted as we grow.
                </p>
              </motion.div>

              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-100 text-center"
                >
                  <h3 className="text-2xl font-bold mb-4 text-blue-900">
                    Building Something Special
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Rawat Innovations is currently a one-person operation where
                    Vineet Rawat handles all aspects of the business. As we grow
                    and expand our moonshot projects, we&apos;ll be looking for
                    passionate innovators to join our journey.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                      <h4 className="text-lg font-bold mb-3 text-blue-900">
                        What We&apos;re Looking For
                      </h4>
                      <ul className="text-left space-y-2 text-gray-700">
                        <li className="flex items-center">
                          <div className="w-4 h-4 mr-2">
                            <Image
                              src="/check-icon.png"
                              alt="Check"
                              width={16}
                              height={16}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          Passionate developers
                        </li>
                        <li className="flex items-center">
                          <div className="w-4 h-4 mr-2">
                            <Image
                              src="/check-icon.png"
                              alt="Check"
                              width={16}
                              height={16}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          Creative designers
                        </li>
                        <li className="flex items-center">
                          <div className="w-4 h-4 mr-2">
                            <Image
                              src="/check-icon.png"
                              alt="Check"
                              width={16}
                              height={16}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          Strategic thinkers
                        </li>
                        <li className="flex items-center">
                          <div className="w-4 h-4 mr-2">
                            <Image
                              src="/check-icon.png"
                              alt="Check"
                              width={16}
                              height={16}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          Innovation drivers
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                      <h4 className="text-lg font-bold mb-3 text-blue-900">
                        Stay Connected
                      </h4>
                      <p className="text-gray-700 mb-4">
                        Follow our journey and be the first to know when
                        opportunities arise.
                      </p>
                      <div className="flex justify-center space-x-4">
                        {[
                          {
                            icon: '/social-linkedin.png',
                            url: 'https://www.linkedin.com/company/rawat-innovations-pvt-ltd',
                          },
                          {
                            icon: '/social-twitter.png',
                            url: 'https://x.com/ripl_in',
                          },
                          {
                            icon: '/social-instagram.png',
                            url: 'https://www.instagram.com/rawatinnovations',
                          },
                        ].map((social, idx) => (
                          <motion.a
                            key={idx}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-white hover:shadow-lg transition-shadow backdrop-blur-sm bg-white/20"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Image
                              src={social.icon}
                              alt="Social Media"
                              width={40}
                              height={40}
                              className="w-10 h-10 rounded-lg object-contain"
                            />
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-20 bg-blue-50/50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900">
                  Contact Us
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Ready to start your innovation journey? Get in touch with
                  Vineet Rawat.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
                >
                  <h3
                    id="contact-form-heading"
                    className="text-2xl font-bold mb-6 text-blue-900"
                  >
                    Send us a Message
                  </h3>
                  <form
                    className="space-y-6"
                    role="form"
                    aria-labelledby="contact-form-heading"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Name{' '}
                          <span className="text-red-500" aria-label="required">
                            *
                          </span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          required
                          aria-required="true"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Email{' '}
                          <span className="text-red-500" aria-label="required">
                            *
                          </span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          required
                          aria-required="true"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="contact-sector"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Sector of Interest{' '}
                        <span className="text-red-500" aria-label="required">
                          *
                        </span>
                      </label>
                      <select
                        id="contact-sector"
                        name="sector"
                        required
                        aria-required="true"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a sector</option>
                        <option value="software">Software Development</option>
                        <option value="gaming">Game Design</option>
                        <option value="tourism">Tourism-Tech</option>
                        <option value="digital">Digital Services</option>
                        <option value="merch">Merch & Apparel</option>
                        <option value="agritech">AgriTech Innovation</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Message{' '}
                        <span className="text-red-500" aria-label="required">
                          *
                        </span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        required
                        aria-required="true"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                        placeholder="Tell us about your project..."
                      />
                    </div>
                    <motion.button
                      type="submit"
                      className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Send Message
                    </motion.button>
                  </form>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  {/* Contact Information */}
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <h3 className="text-xl font-bold mb-4 text-blue-900">
                      Get in Touch
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <Image
                            src="/contact-email.png"
                            alt="Email"
                            width={20}
                            height={20}
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-blue-900">
                            Email
                          </div>
                          <div className="text-gray-700">
                            info@rawatinnovations.com
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <Image
                            src="/contact-phone.png"
                            alt="Phone"
                            width={20}
                            height={20}
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-blue-900">
                            Phone
                          </div>
                          <a
                            href="tel:+9101354093357"
                            className="text-blue-600 hover:underline"
                          >
                            +91-01354-093357
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <Image
                            src="/contact-location.png"
                            alt="Location"
                            width={20}
                            height={20}
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-blue-900">
                            Address
                          </div>
                          <div className="text-gray-700">
                            Uttarakhand, India
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <h3 className="text-xl font-bold mb-4 text-blue-900">
                      Follow Us
                    </h3>
                    <div className="flex space-x-4">
                      {[
                        {
                          icon: '/social-linkedin.png',
                          label: 'LinkedIn',
                          url: 'https://www.linkedin.com/company/rawat-innovations-pvt-ltd',
                        },
                        {
                          icon: '/social-twitter.png',
                          label: 'Twitter',
                          url: 'https://x.com/ripl_in',
                        },
                        {
                          icon: '/social-instagram.png',
                          label: 'Instagram',
                          url: 'https://www.instagram.com/rawatinnovations',
                        },
                      ].map((social, idx) => (
                        <motion.a
                          key={idx}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-white hover:shadow-lg transition-shadow backdrop-blur-sm bg-white/20"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Image
                            src={social.icon}
                            alt={social.label}
                            width={20}
                            height={20}
                            className="w-9 h-9 object-contain rounded-lg"
                          />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-blue-900 text-white py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Company Info */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-4 bg-white/10 p-2 rounded-lg h-10 w-max">
                  <Image
                    src="/logo.png"
                    alt="Rawat Innovations Logo"
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                  <span className="text-xl font-bold">Rawat Innovations</span>
                </div>
                <p className="text-blue-100 mb-4 max-w-md">
                  Building moonshot products that drive innovation across
                  software, gaming, tourism, agritech, apparel, and digital
                  services.
                </p>
                <div className="flex space-x-4">
                  {[
                    {
                      icon: '/social-linkedin.png',
                      url: 'https://www.linkedin.com/company/rawat-innovations-pvt-ltd',
                    },
                    {
                      icon: '/social-twitter.png',
                      url: 'https://x.com/ripl_in',
                    },
                    {
                      icon: '/social-instagram.png',
                      url: 'https://www.instagram.com/rawatinnovations',
                    },
                  ].map((social, idx) => (
                    <motion.a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center transition-colors"
                      whileTap={{ scale: 0.9 }}
                    >
                      <Image
                        src={social.icon}
                        alt="Social Media"
                        width={16}
                        height={16}
                        className="w-8 h-8 object-contain"
                      />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-font-medium">
                  {[
                    { label: 'About Us', id: 'about' },
                    { label: 'Services', id: 'services' },
                    { label: 'Portfolio', id: 'portfolio' },
                    { label: 'Careers', id: 'careers' },
                    { label: 'Blog', id: 'blog' },
                    { label: 'Contact', id: 'contact' },
                  ].map((link) => (
                    <li key={link.id}>
                      <button
                        onClick={() => scrollToSection(link.id)}
                        className="text-blue-100 hover:text-white transition-colors"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal & Contact */}
              <div>
                <h4 className="text-lg font-bold mb-4">Legal</h4>
                <ul className="space-y-2 mb-6">
                  <li>
                    <a
                      href="#"
                      className="text-blue-100 hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-blue-100 hover:text-white transition-colors"
                    >
                      Terms & Conditions
                    </a>
                  </li>
                  <li className="text-blue-100">CIN: U62011UT2025PTC019256</li>
                </ul>
                <div className="text-sm text-blue-200">
                  <p>info@rawatinnovations.com</p>
                  <p>
                    <a
                      href="tel:+9101354093357"
                      className="text-blue-600 hover:underline"
                    >
                      +91-01354-093357
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-blue-800 pt-8 text-center">
              <p className="text-blue-200">
                &copy; 2025 Rawat Innovations Pvt. Ltd. All rights reserved.
                Building the future, one innovation at a time.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
