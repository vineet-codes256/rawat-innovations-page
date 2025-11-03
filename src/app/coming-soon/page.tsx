'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function ComingSoonPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 text-gray-900 font-sans flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-2xl mx-auto"
            >
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden hidden sm:block pointer-events-none">
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

                {/* Content */}
                <div className="relative z-10">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="mb-8"
                    >
                        <Image
                            src="/logo.png"
                            alt="Rawat Innovations Logo"
                            width={80}
                            height={80}
                            className="mx-auto rounded-lg"
                            priority
                        />
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                    >
                        Coming Soon
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 font-light"
                    >
                        We&apos;re working on something amazing! This feature is under development and will be available soon.
                    </motion.p>

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="mb-12"
                    >
                        <p className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed max-w-xl mx-auto">
                            Stay tuned for exciting updates! Follow our social media channels and newsletter to be the first to know when this launches.
                        </p>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        <Link href="/">
                            <motion.button
                                className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Back to Home
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="flex justify-center space-x-6"
                    >
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
                                className="group relative"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white hover:shadow-lg transition-shadow backdrop-blur-sm bg-blue-600 hover:bg-blue-700">
                                    <Image
                                        src={social.icon}
                                        alt={social.label}
                                        width={24}
                                        height={24}
                                        className="w-6 h-6 object-contain"
                                    />
                                </div>
                                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                    {social.label}
                                </span>
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Footer Text */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="text-gray-500 text-sm mt-16"
                    >
                        © 2025 Rawat Innovations Pvt. Ltd. All rights reserved.
                    </motion.p>
                </div>
            </motion.div>
        </div>
    );
}
