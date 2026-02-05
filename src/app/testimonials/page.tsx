"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { testimonials } from "@/lib/data";
import { motion } from "framer-motion";
import { Star, Quote, CheckCircle, Users, Award, ThumbsUp } from "lucide-react";

export default function TestimonialsPage() {
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
            <span className="text-[#e11d48] font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h1 className="text-5xl md:text-6xl font-black text-white mt-4 mb-6">
              Client <span className="text-[#e11d48]">Feedback</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what our clients have to say about their experience with 9Graphix.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative"
              >
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#e11d48] rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <Quote size={20} />
                </div>
                
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-600 mb-8 text-lg italic leading-relaxed">
                  &quot;{testimonial.content}&quot;
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#e11d48] to-[#be123c] flex items-center justify-center text-white font-bold text-xl shadow-md">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                Why Clients <span className="text-[#e11d48]">Love Us</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We take pride in delivering exceptional value and quality to every business we work with. Our commitment to excellence has earned us a reputation as a trusted design partner.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: <CheckCircle className="text-[#e11d48]" />, text: "Personalized attention to every project" },
                  { icon: <CheckCircle className="text-[#e11d48]" />, text: "Creative solutions tailored to your industry" },
                  { icon: <CheckCircle className="text-[#e11d48]" />, text: "Transparent pricing with no hidden costs" },
                  { icon: <CheckCircle className="text-[#e11d48]" />, text: "Timely delivery and responsive communication" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-gray-700 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: <Users size={32} />, number: "300+", label: "Happy Clients" },
                { icon: <Award size={32} />, number: "500+", label: "Designs Delivered" },
                { icon: <ThumbsUp size={32} />, number: "99%", label: "Satisfaction Rate" },
                { icon: <Star size={32} />, number: "4.9/5", label: "Average Rating" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-8 rounded-3xl text-center hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-[#e11d48]/10 rounded-2xl flex items-center justify-center text-[#e11d48]">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-black text-gray-900">{stat.number}</div>
                  <div className="text-gray-500 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-white mb-6">
              Be Our Next Success Story
            </h2>
            <p className="text-xl text-white/70 mb-10">
              Join hundreds of satisfied business owners who have transformed their brands with 9Graphix.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/pricing"
                className="bg-[#e11d48] hover:bg-[#be123c] text-white px-10 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105"
              >
                Start Your Project
              </a>
              <a
                href="/contact"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-10 py-4 rounded-full font-bold transition-all duration-300"
              >
                Read More Reviews
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
