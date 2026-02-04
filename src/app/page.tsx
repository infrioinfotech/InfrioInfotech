"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { PortfolioCard } from "@/components/PortfolioCard";
import { services, portfolioImages, testimonials, whyChooseUs } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Zap, Award, IndianRupee, RefreshCw, Star, ArrowRight, Quote } from "lucide-react";

const iconComponents: Record<string, React.ReactNode> = {
  Zap: <Zap size={28} />,
  Award: <Award size={28} />,
  IndianRupee: <IndianRupee size={28} />,
  RefreshCw: <RefreshCw size={28} />,
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#e11d4820_0%,transparent_70%)]" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#e11d48]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#e11d48]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6"
              >
                <span className="w-2 h-2 bg-[#e11d48] rounded-full animate-pulse" />
                <span className="text-white/80 text-sm font-medium">Professional Design Studio</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
                Creative
                <span className="text-[#e11d48]"> Logo</span>
                <br />
                & Graphic
                <br />
                <span className="bg-gradient-to-r from-[#e11d48] to-[#f43f5e] bg-clip-text text-transparent">Design Solutions</span>
              </h1>

              <p className="text-xl text-white/70 mb-8 max-w-lg leading-relaxed">
                Transform your brand identity with stunning logos, intro videos, and complete branding packages that make lasting impressions.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 bg-[#e11d48] hover:bg-[#be123c] text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#e11d48]/30"
                >
                  View Services
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>

              <div className="flex items-center gap-8 mt-12">
                <div>
                  <div className="text-3xl font-black text-white">500+</div>
                  <div className="text-white/60 text-sm">Projects Completed</div>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div>
                  <div className="text-3xl font-black text-white">100%</div>
                  <div className="text-white/60 text-sm">Client Satisfaction</div>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div>
                  <div className="text-3xl font-black text-white">24hr</div>
                  <div className="text-white/60 text-sm">Fast Delivery</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-[#e11d48]/20 to-transparent rounded-3xl" />
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/f743b618-43a9-4644-8746-2edd4caa9566-1768922638234.jpg?width=800&height=800&resize=contain"
                  alt="9Graphix Logo"
                  fill
                  className="object-contain p-8"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-[#e11d48] font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 mb-6">
              Welcome to <span className="text-[#e11d48]">9Graphix</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We are a professional graphic design studio specializing in logo design, branding, and visual identity solutions. Our mission is to help businesses create memorable brand experiences through creative design.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#e11d48] to-[#be123c] flex items-center justify-center text-white">
                  {iconComponents[item.icon]}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-[#e11d48] font-semibold text-sm uppercase tracking-wider">Our Services</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 mb-6">
              What We <span className="text-[#e11d48]">Offer</span>
            </h2>
            <p className="text-xl text-gray-600">
              From logo design to complete branding packages, we provide everything you need to build a powerful brand identity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service, index) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                index={index}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-[#e11d48] text-white px-8 py-4 rounded-full font-bold transition-all duration-300"
            >
              View All Services
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-[#e11d48] font-semibold text-sm uppercase tracking-wider">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-6">
              Our <span className="text-[#e11d48]">Creative Work</span>
            </h2>
            <p className="text-xl text-white/70">
              Browse through our collection of logos, branding projects, and design work that showcase our creative expertise.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {portfolioImages.slice(0, 8).map((item, index) => (
              <PortfolioCard
                key={item.id}
                title={item.title}
                category={item.category}
                image={item.image}
                index={index}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 bg-[#e11d48] hover:bg-[#be123c] text-white px-8 py-4 rounded-full font-bold transition-all duration-300"
            >
              View Full Portfolio
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-[#e11d48] font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 mb-6">
              What Our <span className="text-[#e11d48]">Clients Say</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <Quote size={40} className="text-[#e11d48]/20 mb-4" />
                <p className="text-gray-600 mb-6 leading-relaxed">{testimonial.content}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#e11d48] to-[#be123c] flex items-center justify-center text-white font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
                <div className="flex gap-1 mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-[#e11d48] to-[#be123c]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Start Your Brand Today?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let&apos;s create something amazing together. Get a professional logo and complete branding package starting at just ₹799.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 bg-white text-[#e11d48] hover:bg-gray-100 px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105"
              >
                View Pricing
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-bold transition-all duration-300"
              >
                Get Free Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
