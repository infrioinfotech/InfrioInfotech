"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Check, Package, Send } from "lucide-react";
import { pricingPackages } from "@/lib/data";

interface SelectedPackage {
  id: number;
  name: string;
  price: number;
  includes: string[];
  features: string[];
}

export default function OrderPage() {
  const [selectedPackage, setSelectedPackage] = useState<SelectedPackage | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    projectDescription: "",
    references: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("selectedPackage");
      if (saved) {
        setSelectedPackage(JSON.parse(saved));
      }
    }
  }, []);

  const handlePackageSelect = (pkg: typeof pricingPackages[0]) => {
    setSelectedPackage(pkg);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedPackage", JSON.stringify(pkg));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.phone || !formData.businessName || !formData.projectDescription) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    if (!selectedPackage) {
      toast.error("Please select a package");
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
        const response = await fetch("/api/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, package: selectedPackage }),
        });

        if (response.ok) {
          const result = await response.json();
          const existingOrders = JSON.parse(localStorage.getItem("orderSubmissions") || "[]");
          existingOrders.push(result.data);
          localStorage.setItem("orderSubmissions", JSON.stringify(existingOrders));
          toast.success("Order submitted successfully! We'll contact you shortly.");
          setFormData({ name: "", email: "", phone: "", businessName: "", projectDescription: "", references: "" });
          localStorage.removeItem("selectedPackage");
          setSelectedPackage(null);
        } else {
          toast.error("Failed to submit order. Please try again.");
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
            <span className="text-[#e11d48] font-semibold text-sm uppercase tracking-wider">Place Order</span>
            <h1 className="text-5xl md:text-6xl font-black text-white mt-4 mb-6">
              Start Your <span className="text-[#e11d48]">Project</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Fill in your project details and we&apos;ll get started on creating your brand identity.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Project Details</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#e11d48] focus:ring-2 focus:ring-[#e11d48]/20 outline-none transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#e11d48] focus:ring-2 focus:ring-[#e11d48]/20 outline-none transition-all"
                        placeholder="Your business name"
                      />
                    </div>
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
                    <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      id="projectDescription"
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#e11d48] focus:ring-2 focus:ring-[#e11d48]/20 outline-none transition-all resize-none"
                      placeholder="Describe your business, target audience, preferred colors, style preferences, and any specific requirements..."
                    />
                  </div>

                  <div>
                    <label htmlFor="references" className="block text-sm font-medium text-gray-700 mb-2">
                      Reference Links (Optional)
                    </label>
                    <textarea
                      id="references"
                      name="references"
                      value={formData.references}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#e11d48] focus:ring-2 focus:ring-[#e11d48]/20 outline-none transition-all resize-none"
                      placeholder="Share links to logos or designs you like for reference..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !selectedPackage}
                    className="w-full bg-[#e11d48] hover:bg-[#be123c] text-white py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        Submit Order
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-sm sticky top-28"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Package size={20} className="text-[#e11d48]" />
                  Selected Package
                </h3>

                {selectedPackage ? (
                  <div className="border-2 border-[#e11d48] rounded-xl p-4 mb-6">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-gray-900">{selectedPackage.name}</h4>
                      <span className="text-[#e11d48] font-black text-xl">₹{selectedPackage.price.toLocaleString()}</span>
                    </div>
                    <div className="space-y-2">
                      {selectedPackage.includes.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                          <Check size={14} className="text-[#e11d48]" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm mb-6">No package selected. Choose from below:</p>
                )}

                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700">Choose a Package:</p>
                  {pricingPackages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => handlePackageSelect(pkg)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 {
                        selectedPackage?.id === pkg.id
                          ? "border-[#e11d48] bg-[#e11d48]/5"
                          : "border-gray-200 hover:border-[#e11d48]/50"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900">{pkg.name}</span>
                        <span className="text-[#e11d48] font-bold">₹{pkg.price.toLocaleString()}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
