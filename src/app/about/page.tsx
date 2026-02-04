"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { CheckCircle, Palette, Monitor, PenTool, Layers, Target, Heart } from "lucide-react";
import Image from "next/image";

const skills = [
  { name: "Logo Design", level: 98 },
  { name: "Brand Identity", level: 95 },
  { name: "Print Design", level: 92 },
  { name: "Social Media Graphics", level: 96 },
  { name: "Video Editing", level: 88 },
];

const tools = [
  "Adobe Illustrator",
  "Adobe Photoshop",
  "CorelDRAW",
  "Adobe Premiere Pro",
  "Adobe After Effects",
  "Figma",
];

const experience = [
  { number: "5+", label: "Years Experience" },
  { number: "500+", label: "Projects Delivered" },
  { number: "300+", label: "Happy Clients" },
  { number: "24hr", label: "Quick Delivery" },
];

export default function AboutPage() {
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
            <span className="text-[#e11d48] font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h1 className="text-5xl md:text-6xl font-black text-white mt-4 mb-6">
              Meet <span className="text-[#e11d48]">9Graphix</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Your trusted partner for professional logo design and branding solutions that help businesses stand out.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-[#e11d48] font-semibold text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="text-4xl font-black text-gray-900 mt-4 mb-6">
                Turning Ideas Into <span className="text-[#e11d48]">Visual Masterpieces</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  9Graphix was founded with a simple mission: to provide professional, affordable, and high-quality graphic design services to businesses of all sizes. What started as a passion for design has evolved into a full-fledged creative studio serving clients across India and beyond.
                </p>
                <p>
                  Our founder&apos;s journey began with a deep love for visual storytelling and brand communication. With years of experience in the design industry, we understand that a great logo is more than just a symbol—it&apos;s the face of your business, the first impression that can make or break customer trust.
                </p>
                <p>
                  Today, 9Graphix is proud to have helped over 500 businesses create memorable brand identities. From startups to established enterprises, we bring the same level of dedication and creativity to every project.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/f743b618-43a9-4644-8746-2edd4caa9566-1768922638234.jpg?width=800&height=800&resize=contain"
                  alt="9Graphix Studio"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-[#e11d48] text-white p-6 rounded-2xl shadow-xl">
                <div className="text-4xl font-black">5+</div>
                <div className="text-white/80">Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-3xl shadow-lg"
            >
              <div className="w-16 h-16 bg-[#e11d48] rounded-2xl flex items-center justify-center mb-6">
                <Target size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To empower businesses with exceptional visual identities that communicate their values, engage their audience, and drive growth. We believe every business deserves a professional brand presence, regardless of size or budget.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-3xl shadow-lg"
            >
              <div className="w-16 h-16 bg-[#e11d48] rounded-2xl flex items-center justify-center mb-6">
                <Heart size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become India&apos;s most trusted graphic design studio, known for delivering creative excellence, exceptional customer service, and transformative brand experiences that help businesses thrive in competitive markets.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#e11d48] font-semibold text-sm uppercase tracking-wider">Experience</span>
            <h2 className="text-4xl font-black text-white mt-4">Our Numbers Speak</h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {experience.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-black text-[#e11d48]">{item.number}</div>
                <div className="text-white/70 mt-2">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-[#e11d48] font-semibold text-sm uppercase tracking-wider">Skills</span>
              <h2 className="text-4xl font-black text-gray-900 mt-4 mb-8">
                Our <span className="text-[#e11d48]">Expertise</span>
              </h2>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-gray-900">{skill.name}</span>
                      <span className="text-[#e11d48] font-bold">{skill.level}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `{skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-[#e11d48] to-[#f43f5e] rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-[#e11d48] font-semibold text-sm uppercase tracking-wider">Tools</span>
              <h2 className="text-4xl font-black text-gray-900 mt-4 mb-8">
                Software We <span className="text-[#e11d48]">Master</span>
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {tools.map((tool, index) => (
                  <motion.div
                    key={tool}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl"
                  >
                    <CheckCircle size={20} className="text-[#e11d48]" />
                    <span className="font-medium text-gray-900">{tool}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 p-8 bg-gradient-to-br from-[#e11d48] to-[#be123c] rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
                <ul className="space-y-3">
                  {[
                    "Industry-standard design quality",
                    "Quick turnaround time",
                    "Unlimited revisions on premium packages",
                    "All source files included",
                    "24/7 customer support",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
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
            <span className="text-[#e11d48] font-semibold text-sm uppercase tracking-wider">Core Values</span>
            <h2 className="text-4xl font-black text-gray-900 mt-4">What Drives Us</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Palette size={32} />,
                title: "Creativity",
                description: "We push boundaries to create unique designs that capture attention and leave lasting impressions.",
              },
              {
                icon: <Layers size={32} />,
                title: "Quality",
                description: "Every pixel matters. We maintain the highest standards of quality in all our deliverables.",
              },
              {
                icon: <Monitor size={32} />,
                title: "Innovation",
                description: "We stay updated with the latest design trends and technologies to deliver modern solutions.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-[#e11d48]/10 rounded-2xl flex items-center justify-center text-[#e11d48]">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
