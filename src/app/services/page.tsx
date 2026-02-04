"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const processSteps = [
  {
    step: "01",
    title: "Share Your Vision",
    description: "Tell us about your business, target audience, and design preferences through our simple inquiry form.",
  },
  {
    step: "02",
    title: "Concept Development",
    description: "Our designers create multiple unique concepts based on your requirements and brand guidelines.",
  },
  {
    step: "03",
    title: "Review & Refine",
    description: "You review the designs and request revisions until you're 100% satisfied with the result.",
  },
  {
    step: "04",
    title: "Delivery",
    description: "Receive your final designs in all formats (JPEG, PNG, PDF, AI, EPS, CDR) within 24-48 hours.",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#e11d4820_0%,transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-[#e11d48] font-semibold text-sm uppercase tracking-wider">Our Services</span>
            <h1 className="text-5xl md:text-6xl font-black text-white mt-4 mb-6">
              What We <span className="text-[#e11d48]">Offer</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              From logo design to complete branding solutions, we provide everything you need to build a powerful brand identity.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center -m-4">
            {services.map((service, index) => (
              <div key={service.id} className="p-4 w-full md:w-1/2 lg:w-1/3 max-w-sm">
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#e11d48] font-semibold text-sm uppercase tracking-wider">Our Process</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4">
              How We <span className="text-[#e11d48]">Work</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-7xl font-black text-[#e11d48]/10 absolute -top-4 left-0">
                  {item.step}
                </div>
                <div className="relative pt-12">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-[#e11d48] font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
              <h2 className="text-4xl font-black text-white mt-4 mb-8">
                We Deliver <span className="text-[#e11d48]">Excellence</span>
              </h2>
              <div className="space-y-6">
                {[
                  "Professional designs that stand out from the competition",
                  "Quick turnaround time - get your designs in 24-48 hours",
                  "Unlimited revisions until you're 100% satisfied",
                  "All file formats included (JPEG, PNG, PDF, AI, EPS, CDR)",
                  "Affordable pricing with no hidden costs",
                  "Dedicated support team available 24/7",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <CheckCircle className="text-[#e11d48] mt-1 flex-shrink-0" size={24} />
                    <span className="text-white/80 text-lg">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#e11d48] to-[#be123c] rounded-3xl p-10 text-white"
            >
              <h3 className="text-3xl font-bold mb-6">Ready to Get Started?</h3>
              <p className="text-white/90 mb-8 text-lg leading-relaxed">
                Transform your brand with professional designs that make an impact. Our packages start at just ₹799 for a complete logo and intro video.
              </p>
              <div className="space-y-4">
                <Link
                  href="/pricing"
                  className="flex items-center justify-center gap-2 bg-white text-[#e11d48] hover:bg-gray-100 px-8 py-4 rounded-full font-bold transition-all duration-300 w-full"
                >
                  View Pricing
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 bg-transparent border-2 border-white hover:bg-white/10 px-8 py-4 rounded-full font-bold transition-all duration-300 w-full"
                >
                  Get Free Consultation
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#e11d48] font-semibold text-sm uppercase tracking-wider">FAQs</span>
            <h2 className="text-4xl font-black text-gray-900 mt-4">
              Frequently Asked <span className="text-[#e11d48]">Questions</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "How long does it take to design a logo?",
                a: "We typically deliver logo concepts within 24-48 hours. The timeline may vary based on revisions and complexity.",
              },
              {
                q: "What file formats do I receive?",
                a: "You receive all major formats including JPEG, PNG, PDF, AI, EPS, and CDR - everything you need for both digital and print use.",
              },
              {
                q: "Can I request revisions?",
                a: "Yes! All our packages include revisions. Premium packages offer unlimited revisions until you're completely satisfied.",
              },
              {
                q: "Do you provide source files?",
                a: "Absolutely! You receive full ownership of all source files, allowing you to make future modifications if needed.",
              },
            ].map((faq, index) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
