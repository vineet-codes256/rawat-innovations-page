"use client";
// This is a simple landing page for Rawat Innovations Pvt. Ltd. using React and Tailwind CSS.
// It includes a header, a section describing the services offered, and a footer with contact information.
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-900 font-sans">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 py-16 text-center"
      >
        {/* Logo at the top */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center mb-6"
        >
          <Image
            src="/logo.png"
            alt="Rawat Innovations Logo"
            width={120}
            height={120}
            priority
            className="mx-auto"
          />
        </motion.div>
        {/* Main heading and description */}
        <motion.h1
          className="text-5xl font-bold text-blue-900 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Rawat Innovations Pvt. Ltd.
        </motion.h1>
        <motion.p
          className="text-lg max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Empowering the future through technology, creativity, and purpose. We innovate across software, gaming, tourism, agritech, apparel, and digital services.
        </motion.p>
        <motion.a
          href="#contact"
          className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-full transition"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7 }}
        >
          Get in Touch
        </motion.a>
      </motion.div>

      <section className="bg-white py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-blue-800 text-center mb-10">What We Do</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
            {[
              { title: "Software Development", desc: "Custom apps, SaaS, and web platforms built with precision and performance." },
              { title: "Game Design", desc: "Mobile, desktop, and console gaming experiences that entertain and inspire." },
              { title: "Tourism-Tech", desc: "Smart travel solutions promoting culture and accessibility." },
              { title: "Digital Services", desc: "Branding, consulting, content, and digital transformation for modern businesses." },
              { title: "Merch & Apparel", desc: "Design-first printed T-shirts, lifestyle wear, and custom dropshipping." },
              { title: "AgriTech Innovation", desc: "Digitizing agriculture with IoT, AI tools, and rural empowerment initiatives." }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-2 text-blue-900">{item.title}</h3>
                <p className="text-sm text-gray-700">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-blue-900 text-white py-10" id="contact">
        <motion.div
          className="container mx-auto px-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-lg font-bold mb-2">Connect with Us</p>
          <p>Email: <a href="mailto:info@rawatinnovations.com" className="underline">info@rawatinnovations.com</a></p>
          <p className="text-sm mt-4">&copy; 2025 Rawat Innovations Pvt. Ltd. | CIN: U62011UT2025PTC019256</p>
        </motion.div>
      </footer>
    </main>
  );
}
// This is a simple landing page for Rawat Innovations Pvt. Ltd. using React and Tailwind CSS.