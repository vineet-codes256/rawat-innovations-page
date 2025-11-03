'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Client-only dynamic load to keep heavy animation out of initial server render
const FloatingElements = dynamic(() => import('./FloatingElements'), {
    ssr: false,
    loading: () => null,
});

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

    // Smooth scroll with offset for fixed header
    const scrollToSection = (sectionId: string) => {
        if (typeof window === 'undefined' || typeof document === 'undefined') return;
        const element = document.getElementById(sectionId);
        if (element) {
            const headerOffset = isMobile ? 80 : 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
            setCurrentSection(sectionId);
        }
    };

    // Touch gesture support for mobile
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientY);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientY);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isUpSwipe = distance > 50;
        const isDownSwipe = distance < -50;

        const sections = ['home', 'about', 'services', 'portfolio', 'blog', 'contact'];
        const currentIndex = sections.indexOf(currentSection);

        if (isUpSwipe && currentIndex < sections.length - 1) {
            scrollToSection(sections[currentIndex + 1]);
        } else if (isDownSwipe && currentIndex > 0) {
            scrollToSection(sections[currentIndex - 1]);
        }
    };

    return (
        <>
            <FloatingElements />
            {/* Skip Navigation Link */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
                Skip to main content
            </a>

            <div
                className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 text-gray-900 font-sans"
                onTouchStart={isMobile ? handleTouchStart : undefined}
                onTouchMove={isMobile ? handleTouchMove : undefined}
                onTouchEnd={isMobile ? handleTouchEnd : undefined}
            >
                {/* Header / Navigation */}
                <header
                    className="fixed w-full sm:rounded-full sm:ml-[5%] sm:w-[90%] top-1 z-50 bg-white/20 backdrop-blur-md border-b border-gray-200 shadow-sm"
                    role="banner"
                >
                    <nav
                        className="container mx-auto px-6 py-4"
                        role="navigation"
                        aria-label="Main navigation"
                    >
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <motion.div
                                className="flex items-center space-x-3"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 400 }}
                            >
                                <Image
                                    src="/logo.png"
                                    alt="Rawat Innovations Logo"
                                    width={40}
                                    height={40}
                                    className="rounded-lg bg-transparent"
                                    priority
                                />
                                <span
                                    className="text-xl font-bold text-blue-900 md:hidden"
                                    aria-label="Rawat Innovations Pvt Ltd"
                                >
                                    RIPL
                                </span>
                                <span
                                    className="text-xl font-bold text-blue-900 hidden md:block cursor-default"
                                    aria-label="Rawat Innovations Pvt Ltd"
                                >
                                    Rawat Innovations
                                </span>
                            </motion.div>

                            {/* CTA Button */}
                            <motion.button
                                onClick={() => scrollToSection('contact')}
                                className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 focus-ring shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Get in touch with Rawat Innovations"
                            >
                                Get in Touch
                            </motion.button>
                        </div>
                    </nav>
                </header>

                {/* Main Content */}
                <main id="main-content">
                    {/* Hero Section */}
                    <section
                        id="home"
                        className="pt-20 sm:pt-24 pb-16 sm:pb-20 relative overflow-hidden"
                        aria-labelledby="hero-heading"
                    >
                        <div className="container mx-auto px-6">
                            <div className="text-center">
                                {/* Background Elements */}
                                <div
                                    className="absolute inset-0 overflow-hidden hidden sm:block"
                                    aria-hidden="true"
                                >
                                    <motion.div
                                        className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-xl"
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.3, 0.6, 0.3],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}
                                    />
                                    <motion.div
                                        className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-xl"
                                        animate={{
                                            scale: [1.2, 1, 1.2],
                                            opacity: [0.4, 0.7, 0.4],
                                        }}
                                        transition={{
                                            duration: 5,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}
                                    />
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="relative z-10 max-w-4xl mx-auto"
                                >
                                    {/* Main Headline */}
                                    <motion.h1
                                        id="hero-heading"
                                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 mt-9 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2, duration: 0.8 }}
                                        tabIndex={-1}
                                    >
                                        Innovating Today for a<br className="hidden sm:block" />{' '}
                                        Smarter Tomorrow
                                    </motion.h1>

                                    {/* Subheadline */}
                                    <motion.p
                                        className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 font-light max-w-3xl mx-auto"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4, duration: 0.8 }}
                                    >
                                        Rawat Innovations Pvt. Ltd. - Emerging multi-sector
                                        technology company developing innovative software solutions,
                                        gaming experiences, tourism technology, agritech
                                        innovations, and digital services to empower businesses
                                        worldwide.
                                    </motion.p>

                                    {/* CTA Buttons */}
                                    <motion.div
                                        className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6, duration: 0.8 }}
                                        role="group"
                                        aria-label="Call to action buttons"
                                    >
                                        <motion.button
                                            onClick={() => scrollToSection('portfolio')}
                                            className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            aria-label="Explore our vision and projects"
                                        >
                                            Explore Our Vision
                                        </motion.button>
                                        <motion.button
                                            onClick={() => scrollToSection('contact')}
                                            className="w-full sm:w-auto bg-white text-blue-600 px-6 sm:px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            aria-label="Contact Rawat Innovations"
                                        >
                                            Contact Us
                                        </motion.button>
                                    </motion.div>

                                    {/* Floating Sector Icons */}
                                    <motion.div
                                        className="flex justify-center space-x-4 sm:space-x-6 md:space-x-8 opacity-60"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.6 }}
                                        transition={{ delay: 0.8, duration: 1 }}
                                        role="list"
                                        aria-label="Technology sectors we serve"
                                    >
                                        {[
                                            { src: '/sector-software.png', alt: 'Software Development Services' },
                                            { src: '/sector-gaming.png', alt: 'Game Design and Development' },
                                            { src: '/sector-tourism.png', alt: 'Tourism Technology Solutions' },
                                            { src: '/sector-digital.png', alt: 'Digital Services and Consulting' },
                                            { src: '/sector-fashion.png', alt: 'Fashion and Apparel Technology' },
                                            { src: '/sector-agritech.png', alt: 'AgriTech Innovation Solutions' },
                                        ].map((icon, index) => (
                                            <motion.div
                                                key={index}
                                                className="w-10 h-10 sm:w-12 sm:h-12"
                                                role="listitem"
                                                animate={{ y: [0, -10, 0] }}
                                                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2, ease: 'easeInOut' }}
                                            >
                                                <Image src={icon.src} alt={icon.alt} width={48} height={48} className="w-full h-full object-contain" loading="lazy" />
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* About Us Section */}
                    <section id="about" className="py-20 bg-white">
                        <div className="container mx-auto px-6">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="text-center mb-16"
                            >
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-blue-900">About Rawat Innovations</h2>
                                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                                    Founded in 2025, Rawat Innovations is an emerging technology company with ambitious plans in software development, gaming solutions, tourism technology, agritech innovations, and digital transformation services. We aim to bridge innovative technology with real-world business needs to create solutions that drive growth and empower communities across multiple industries.
                                </p>
                            </motion.div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                                {/* Mission & Vision */}
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    className="space-y-6"
                                >
                                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                        <h3 className="text-2xl font-bold mb-4 text-blue-900">Our Mission</h3>
                                        <p className="text-gray-700">
                                            To democratize innovation through advanced software development, gaming technology, tourism tech solutions, agritech innovations, and comprehensive digital services that solve real-world business challenges across multiple industries, driving sustainable growth and positive societal impact.
                                        </p>
                                    </div>
                                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                        <h3 className="text-2xl font-bold mb-4 text-blue-900">Our Vision</h3>
                                        <p className="text-gray-700">
                                            To become a key technology catalyst for digital transformation, creating innovative software products, gaming experiences, tourism technology solutions, agritech innovations, and digital services that redefine possibilities and empower businesses worldwide.
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Leadership Cards */}
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    className="space-y-6"
                                >
                                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center">
                                        <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-4 border-blue-100">
                                            <Image src="/vineet-rawat.png" alt="Vineet Rawat - Founder & CEO of Rawat Innovations" width={80} height={80} className="w-full h-full object-cover" loading="lazy" />
                                        </div>
                                        <h4 className="text-xl font-bold text-blue-900 mb-2">Vineet Rawat</h4>
                                        <p className="text-gray-600 mb-2">Founder & CEO</p>
                                        <p className="text-sm text-gray-500">
                                            Visionary leader with expertise in technology innovation and entrepreneurial ventures. Handling all aspects of technology innovation, from software development to business strategy.
                                        </p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="bg-white max-w-4xl mx-auto p-8 rounded-2xl shadow-lg border border-gray-100"
                            >
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                                    {[
                                        { number: '2025', label: 'Founded' },
                                        { number: '6', label: 'Industries' },
                                        { number: '∞', label: 'Limitless Potential' },
                                        { number: '1', label: 'Mission' },
                                    ].map((stat, idx) => (
                                        <motion.div key={idx} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.6 }}>
                                            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                                            <div className="text-gray-600 text-sm">{stat.label}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Services / Sectors Section */}
                    <section id="services" className="py-20 bg-blue-50/50">
                        <div className="container mx-auto px-6">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="text-center mb-16"
                            >
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-blue-900">Our Sectors</h2>
                                <p className="text-xl text-gray-600 max-w-3xl mx-auto">We operate across six dynamic sectors, each representing our commitment to innovation and excellence.</p>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[
                                    { title: 'LocalBizLabs', desc: 'Professional web development agency specializing in modern websites, e-commerce platforms, and digital solutions for local businesses.', iconSrc: '/service-localbizlabs.png', iconAlt: 'LocalBizLabs Web Development', color: 'blue', isNew: true, website: 'https://localbizlabs.com' },
                                    { title: 'Software Development', desc: 'Custom applications, SaaS platforms, and enterprise solutions built with modern technologies.', iconSrc: '/service-software.png', iconAlt: 'Software Development', color: 'purple', isNew: true, website: 'https://localbizlabs.com' },
                                    { title: 'Game Design', desc: 'Immersive gaming experiences for mobile, desktop, and console platforms.', iconSrc: '/service-winitstudios.png', iconAlt: 'Game Design', color: 'green', isNew: true, website: 'https://winitstudios.com' },
                                    { title: 'Tourism-Tech', desc: 'Smart travel solutions promoting culture and enhancing accessibility worldwide.', iconSrc: '/service-tourism.png', iconAlt: 'Tourism Technology', color: 'orange', isNew: false, website: 'Coming Soon' },
                                    { title: 'Digital Services', desc: 'Branding, consulting, content creation, and comprehensive digital transformation.', iconSrc: '/service-digital.png', iconAlt: 'Digital Services', color: 'indigo', isNew: false, website: 'Coming Soon' },
                                    { title: 'AgriTech Innovation', desc: 'IoT-powered agriculture solutions, AI tools, and rural empowerment initiatives.', iconSrc: '/service-agritech.png', iconAlt: 'AgriTech Innovation', color: 'emerald', isNew: false, website: 'Coming Soon' },
                                ].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                                        className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100"
                                        whileHover={{ y: -8 }}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <motion.div className="w-12 h-12" whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 400 }}>
                                                <Image src={item.iconSrc} alt={item.iconAlt} width={48} height={48} className="w-full h-full object-contain" />
                                            </motion.div>
                                            {item.isNew && <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">NEW</span>}
                                            {item.website === 'Coming Soon' && <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium">Coming Soon</span>}
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4 text-blue-900 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                                        <p className="text-gray-700 leading-relaxed mb-4">{item.desc}</p>
                                        <motion.button
                                            className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                                            whileHover={{ x: 5 }}
                                            transition={{ type: 'spring', stiffness: 400 }}
                                            onClick={() => {
                                                if (typeof window !== 'undefined') {
                                                    window.open(item.website, '_blank', 'noopener,noreferrer');
                                                }
                                            }}
                                        >
                                            Learn More
                                        </motion.button>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Portfolio / Projects Section */}
                    <section id="portfolio" className="py-20 bg-white">
                        <div className="container mx-auto px-6">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="text-center mb-16"
                            >
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-blue-900">Our Vision</h2>
                                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                                    Bold ideas and moonshot projects shaping the future. We&apos;re currently building the foundation for groundbreaking innovations.
                                </p>

                                {/* Status Indicator */}
                                <div className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full font-medium mb-8">
                                    Currently in Development Phase
                                </div>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[
                                    { title: 'Nearby Connect', category: 'Social', description: 'Location-based discovery social media app connecting people through shared experiences and local communities.', status: 'Development', imageSrc: '/project-nearby-connect.png', imageAlt: 'Nearby Connect Social App', timeline: 'Q4 2025', url: 'https://www.karmicinnovations.com/' },
                                    { title: 'AI-Powered Analytics Platform', category: 'Software', description: 'Revolutionary analytics platform using machine learning for business intelligence.', status: 'Planning', imageSrc: '/portfolio-analytics.png', imageAlt: 'Analytics Platform', timeline: 'Q1 2026' },
                                    { title: 'Immersive VR Training', category: 'Gaming', description: 'Virtual reality training solutions for professional skill development.', status: 'Research', imageSrc: '/portfolio-vr-training.png', imageAlt: 'VR Training', timeline: 'Q2 2026' },
                                    { title: 'Smart Tourism App', category: 'Tourism', description: 'AI-driven travel companion with cultural insights and accessibility features.', status: 'Design', imageSrc: '/portfolio-tourism-app.png', imageAlt: 'Smart Tourism App', timeline: 'Q3 2026' },
                                    { title: 'Sustainable Fashion Platform', category: 'Merch', description: 'Eco-friendly apparel marketplace. Custom designs and sustainable materials.', status: 'Concept', imageSrc: '/portfolio-fashion-platform.png', imageAlt: 'Sustainable Fashion', timeline: '2027' },
                                    { title: 'IoT Agriculture Network', category: 'AgriTech', description: 'Connected farming solutions for precision agriculture.', status: 'Research', imageSrc: '/portfolio-agriculture-network.png', imageAlt: 'IoT Agriculture', timeline: '2027' },
                                ].map((project, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                                        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100 overflow-hidden"
                                        whileHover={{ y: -8 }}
                                        onClick={() => {
                                            if (project.url && typeof window !== 'undefined') {
                                                window.open(project.url, '_blank', 'noopener,noreferrer');
                                            }
                                        }}
                                    >
                                        <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center relative">
                                            <Image src={project.imageSrc} alt={project.imageAlt} width={120} height={120} className="w-48 h-48 object-contain" loading="lazy" />
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-blue-600">{project.timeline}</div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">{project.category}</span>
                                                <span className={`text-sm font-medium px-3 py-1 rounded-full ${project.status === 'Planning'
                                                        ? 'text-orange-600 bg-orange-100'
                                                        : project.status === 'Research'
                                                            ? 'text-purple-600 bg-purple-100'
                                                            : project.status === 'Design'
                                                                ? 'text-green-600 bg-green-100'
                                                                : 'text-gray-600 bg-gray-100'
                                                    }`}>
                                                    {project.status}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-3 text-blue-900 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                                            <p className="text-gray-700 leading-relaxed">{project.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Blog / Insights Section */}
                    <section id="blog" className="py-20 bg-blue-50/50">
                        <div className="container mx-auto px-6">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="text-center mb-16"
                            >
                                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900">Insights</h2>
                                <p className="text-xl text-gray-600 max-w-3xl mx-auto">Stay updated with the latest trends, insights, and thought leadership from Vineet Rawat.</p>
                            </motion.div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                                {/* Featured Article */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    className="lg:col-span-2 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100 overflow-hidden"
                                    whileHover={{ y: -8 }}
                                >
                                    <div className="h-64 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                        <Image src="/blog-featured.png" alt="Innovation and Technology" width={700} height={200} className="w-100 h-21 object-cover max-h-64" />
                                    </div>
                                    <div className="p-8">
                                        <div className="flex items-center mb-4">
                                            <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full mr-3">Featured</span>
                                            <span className="text-sm text-gray-500">5 min read</span>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4 text-blue-900 group-hover:text-blue-600 transition-colors">The Future of Multi-Sector Innovation: Building Moonshot Products</h3>
                                        <p className="text-gray-700 leading-relaxed mb-4">
                                            Explore how Rawat Innovations is aiming to pioneer innovation across six diverse sectors, from moonshot social apps, sustainable fashion platforms, and AI-powered sustainable agriculture to immersive gaming experiences...
                                        </p>
                                        <div className="flex items-center">
                                            <Image src="/vineet-rawat.png" alt="Vineet Rawat" width={40} height={40} className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3" />
                                            <div>
                                                <p className="font-semibold text-blue-900">Vineet Rawat</p>
                                                <p className="text-sm text-gray-500">CEO & Founder</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Recent Articles */}
                                <div className="space-y-6">
                                    {[
                                        { title: 'AI in Agriculture: Revolutionizing Farming', excerpt: 'How artificial intelligence is transforming traditional farming practices...', imageSrc: '/blog-ai-agritech.png', imageAlt: 'AI in Agriculture', readTime: '3 min read' },
                                        { title: 'The Rise of Tourism Technology', excerpt: 'Exploring how tech is enhancing travel experiences worldwide...', imageSrc: '/blog-tourism-tech.png', imageAlt: 'Tourism Technology', readTime: '4 min read' },
                                        { title: 'Sustainable Fashion in the Digital Age', excerpt: 'How technology is driving eco-friendly fashion innovation...', imageSrc: '/blog-sustainable-fashion.png', imageAlt: 'Sustainable Fashion', readTime: '3 min read' },
                                    ].map((article, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: 30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                                            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100"
                                            whileHover={{ x: 8 }}
                                        >
                                            <div className="flex space-x-4">
                                                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                                                    <Image src={article.imageSrc} alt={article.imageAlt} width={48} height={48} className="w-full h-full object-cover rounded-lg" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold mb-2 text-blue-900 group-hover:text-blue-600 transition-colors">{article.title}</h4>
                                                    <p className="text-gray-700 text-sm leading-relaxed mb-2">{article.excerpt}</p>
                                                    <span className="text-sm text-gray-500">{article.readTime}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Newsletter Signup */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="bg-white max-w-2xl mx-auto p-8 rounded-2xl shadow-lg border border-gray-100 text-center"
                            >
                                <h3 className="text-2xl font-bold mb-4 text-blue-900">Stay Updated</h3>
                                <p className="text-gray-700 mb-6">Subscribe to our newsletter for the latest insights on technology innovation and industry trends.</p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    <motion.button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        Subscribe
                                    </motion.button>
                                </div>
                            </motion.div>
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
                                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900">Future Opportunities</h2>
                                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">Currently a solo operation led by Vineet Rawat. Future opportunities will be posted as we grow.</p>
                            </motion.div>

                            <div className="max-w-4xl mx-auto">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-100 text-center"
                                >
                                    <h3 className="text-2xl font-bold mb-4 text-blue-900">Building Something Special</h3>
                                    <p className="text-gray-700 mb-6">
                                        Rawat Innovations is currently a one-person operation where Vineet Rawat handles all aspects of the business. As we grow and expand our moonshot projects, we&apos;ll be looking for passionate innovators to join our journey.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                            <h4 className="text-lg font-bold mb-3 text-blue-900">What We&apos;re Looking For</h4>
                                            <ul className="text-left space-y-2 text-gray-700">
                                                <li className="flex items-center">
                                                    <div className="w-4 h-4 mr-2"><Image src="/check-icon.png" alt="Check" width={16} height={16} className="w-full h-full object-contain" /></div>
                                                    Passionate developers
                                                </li>
                                                <li className="flex items-center">
                                                    <div className="w-4 h-4 mr-2"><Image src="/check-icon.png" alt="Check" width={16} height={16} className="w-full h-full object-contain" /></div>
                                                    Creative designers
                                                </li>
                                                <li className="flex items-center">
                                                    <div className="w-4 h-4 mr-2"><Image src="/check-icon.png" alt="Check" width={16} height={16} className="w-full h-full object-contain" /></div>
                                                    Strategic thinkers
                                                </li>
                                                <li className="flex items-center">
                                                    <div className="w-4 h-4 mr-2"><Image src="/check-icon.png" alt="Check" width={16} height={16} className="w-full h-full object-contain" /></div>
                                                    Innovation drivers
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                            <h4 className="text-lg font-bold mb-3 text-blue-900">Stay Connected</h4>
                                            <p className="text-gray-700 mb-4">Follow our journey and be the first to know when opportunities arise.</p>
                                            <div className="flex justify-center space-x-4">
                                                {[
                                                    { icon: '/social-linkedin.png', url: 'https://www.linkedin.com/company/rawat-innovations-pvt-ltd' },
                                                    { icon: '/social-twitter.png', url: 'https://x.com/ripl_in' },
                                                    { icon: '/social-instagram.png', url: 'https://www.instagram.com/rawatinnovations' },
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
                                                        <Image src={social.icon} alt="Social Media" width={40} height={40} className="w-10 h-10 rounded-lg object-contain" />
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
                                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900">Contact Us</h2>
                                <p className="text-xl text-gray-600 max-w-3xl mx-auto">Ready to start your innovation journey? Get in touch with Vineet Rawat.</p>
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
                                    <h3 id="contact-form-heading" className="text-2xl font-bold mb-6 text-blue-900">Send us a Message</h3>
                                    <form className="space-y-6" role="form" aria-labelledby="contact-form-heading">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Name <span className="text-red-500" aria-label="required">*</span>
                                                </label>
                                                <input id="contact-name" type="text" name="name" required aria-required="true" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Your full name" />
                                            </div>
                                            <div>
                                                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email <span className="text-red-500" aria-label="required">*</span>
                                                </label>
                                                <input id="contact-email" type="email" name="email" required aria-required="true" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="your@email.com" />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="contact-sector" className="block text-sm font-medium text-gray-700 mb-2">
                                                Sector of Interest <span className="text-red-500" aria-label="required">*</span>
                                            </label>
                                            <select id="contact-sector" name="sector" required aria-required="true" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
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
                                            <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-2">
                                                Message <span className="text-red-500" aria-label="required">*</span>
                                            </label>
                                            <textarea id="contact-message" name="message" rows={4} required aria-required="true" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical" placeholder="Tell us about your project..." />
                                        </div>
                                        <motion.button type="submit" className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                            Send Message
                                        </motion.button>
                                    </form>
                                </motion.div>

                                {/* Contact Info */}
                                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-6">
                                    {/* Contact Information */}
                                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                        <h3 className="text-xl font-bold mb-4 text-blue-900">Get in Touch</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                                    <Image src="/contact-email.png" alt="Email" width={20} height={20} className="w-8 h-8 object-contain" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-blue-900">Email</div>
                                                    <div className="text-gray-700">info@rawatinnovations.com</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                                    <Image src="/contact-phone.png" alt="Phone" width={20} height={20} className="w-8 h-8 object-contain" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-blue-900">Phone</div>
                                                    <a href="tel:+9101354093357" className="text-blue-600 hover:underline">+91-01354-093357</a>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                                    <Image src="/contact-location.png" alt="Location" width={20} height={20} className="w-8 h-8 object-contain" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-blue-900">Address</div>
                                                    <div className="text-gray-700">Uttarakhand, India</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Social Media */}
                                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                        <h3 className="text-xl font-bold mb-4 text-blue-900">Follow Us</h3>
                                        <div className="flex space-x-4">
                                            {[
                                                { icon: '/social-linkedin.png', label: 'LinkedIn', url: 'https://www.linkedin.com/company/rawat-innovations-pvt-ltd' },
                                                { icon: '/social-twitter.png', label: 'Twitter', url: 'https://x.com/ripl_in' },
                                                { icon: '/social-instagram.png', label: 'Instagram', url: 'https://www.instagram.com/rawatinnovations' },
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
                                                    <Image src={social.icon} alt={social.label} width={20} height={20} className="w-9 h-9 object-contain rounded-lg" />
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
                                    <Image src="/logo.png" alt="Rawat Innovations Logo" width={32} height={32} className="rounded-lg" />
                                    <span className="text-xl font-bold">Rawat Innovations</span>
                                </div>
                                <p className="text-blue-100 mb-4 max-w-md">Building moonshot products that drive innovation across software, gaming, tourism, agritech, apparel, and digital services.</p>
                                <div className="flex space-x-4">
                                    {[
                                        { icon: '/social-linkedin.png', url: 'https://www.linkedin.com/company/rawat-innovations-pvt-ltd' },
                                        { icon: '/social-twitter.png', url: 'https://x.com/ripl_in' },
                                        { icon: '/social-instagram.png', url: 'https://www.instagram.com/rawatinnovations' },
                                    ].map((social, idx) => (
                                        <motion.a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center transition-colors" whileTap={{ scale: 0.9 }}>
                                            <Image src={social.icon} alt="Social Media" width={16} height={16} className="w-8 h-8 object-contain" />
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
                                            <button onClick={() => scrollToSection(link.id)} className="text-blue-100 hover:text-white transition-colors">
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
                                        <a href="#" className="text-blue-100 hover:text-white transition-colors">Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-blue-100 hover:text-white transition-colors">Terms & Conditions</a>
                                    </li>
                                    <li className="text-blue-100">CIN: U62011UT2025PTC019256</li>
                                </ul>
                                <div className="text-sm text-blue-200">
                                    <p>info@rawatinnovations.com</p>
                                    <p>
                                        <a href="tel:+9101354093357" className="text-blue-600 hover:underline">+91-01354-093357</a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-blue-800 pt-8 text-center">
                            <p className="text-blue-200">&copy; 2025 Rawat Innovations Pvt. Ltd. All rights reserved. Building the future, one innovation at a time.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
