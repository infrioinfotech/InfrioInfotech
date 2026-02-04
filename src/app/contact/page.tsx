"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { services } from "@/lib/data";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const result = await response.json();
          const existingContacts = JSON.parse(localStorage.getItem("contactSubmissions") || "[]");
          existingContacts.push(result.data);
          localStorage.setItem("contactSubmissions", JSON.stringify(existingContacts));
          toast.success("Message sent successfully! We'll get back to you soon.");
          setFormData({ name: "", email: "", phone: "", serviceType: "", message: "" });
        } else {
          toast.error("Failed to send message. Please try again.");
        }
      } catch {
        toast.error("Something went wrong. Please try again.");
      }

    setIsSubmitting(false);
  };

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
            <span className="text-[#e11d48] font-semibold text-sm uppercase tracking-wider">Contact Us</span>
            <h1 className="text-5xl md:text-6xl font-black text-white mt-4 mb-6">
              Get In <span className="text-[#e11d48]">Touch</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Have a project in mind? Let&apos;s discuss how we can help bring your brand vision to life.
            </p>
          </motion.div>
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
              <h2 className="text-3xl font-black text-gray-900 mb-8">
                Contact <span className="text-[#e11d48]">Information</span>
              </h2>

              <div className="space-y-6 mb-10">
                {[
                  { icon: <Phone size={24} />, title: "Phone", value: "+91 9054747808", href: "tel:+919054747808" },
                  { icon: <Mail size={24} />, title: "Email", value: "contact@9graphix.com", href: "mailto:contact@9graphix.com" },
                  { icon: <MapPin size={24} />, title: "Location", value: "India", href: null },
                  { icon: <Clock size={24} />, title: "Working Hours", value: "Mon - Sat: 9AM - 8PM", href: null },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#e11d48]/10 rounded-xl flex items-center justify-center text-[#e11d48] flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{item.title}</p>
                      {item.href ? (
                        <a href={item.href} className="text-lg font-semibold text-gray-900 hover:text-[#e11d48] transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-lg font-semibold text-gray-900">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-[#e11d48] to-[#be123c] rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Book Free Consultation</h3>
                <p className="text-white/90 mb-6">
                  Not sure which package is right for you? Book a free consultation and we&apos;ll help you choose the best solution for your brand.
                </p>
                <a
                  href="tel:+919054747808"
                  className="inline-flex items-center gap-2 bg-white text-[#e11d48] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
                >
                  <Phone size={18} />
                  Call Now
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-50 rounded-3xl p-8 lg:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#e11d48] focus:ring-2 focus:ring-[#e11d48]/20 outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#e11d48] focus:ring-2 focus:ring-[#e11d48]/20 outline-none transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#e11d48] focus:ring-2 focus:ring-[#e11d48]/20 outline-none transition-all"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
                      Service Type
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#e11d48] focus:ring-2 focus:ring-[#e11d48]/20 outline-none transition-all bg-white"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#e11d48] focus:ring-2 focus:ring-[#e11d48]/20 outline-none transition-all resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#e11d48] hover:bg-[#be123c] text-white py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
