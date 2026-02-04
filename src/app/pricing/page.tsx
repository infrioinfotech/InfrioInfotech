"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PricingCard } from "@/components/PricingCard";
import { pricingPackages } from "@/lib/data";
import { motion } from "framer-motion";
import { Check, HelpCircle } from "lucide-react";

export default function PricingPage() {
  const handleSelectPackage = (packageData: typeof pricingPackages[0]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedPackage", JSON.stringify(packageData));
    }
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
            <span className="text-[#e11d48] font-semibold text-sm uppercase tracking-wider">Pricing</span>
            <h1 className="text-5xl md:text-6xl font-black text-white mt-4 mb-6">
              Simple & <span className="text-[#e11d48]">Affordable</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Choose the perfect package for your brand. All packages include professional designs, multiple revisions, and all file formats.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center -m-4">
            {pricingPackages.map((pkg, index) => (
              <div key={pkg.id} className="p-4 w-full md:w-1/2 lg:w-1/3 max-w-sm">
                <PricingCard
                  name={pkg.name}
                  price={pkg.price}
                  popular={pkg.popular}
                  includes={pkg.includes}
                  features={pkg.features}
                  index={index}
                  onSelect={() => handleSelectPackage(pkg)}
                />
              </div>
            ))}
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
            <span className="text-[#e11d48] font-semibold text-sm uppercase tracking-wider">Comparison</span>
            <h2 className="text-4xl font-black text-gray-900 mt-4">
              Package <span className="text-[#e11d48]">Comparison</span>
            </h2>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Features</th>
                  {pricingPackages.map((pkg) => (
                    <th key={pkg.id} className="text-center py-4 px-4 font-bold text-gray-900">
                      {pkg.name}
                      <div className="text-[#e11d48] text-sm font-normal">₹{pkg.price.toLocaleString()}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Logo Design", values: [true, true, true, true, true] },
                  { feature: "Intro Video", values: [true, true, true, true, true] },
                  { feature: "Visiting Card", values: [false, true, true, true, true] },
                  { feature: "Letterhead", values: [false, false, true, true, true] },
                  { feature: "Envelope", values: [false, false, false, true, true] },
                  { feature: "Festival Posters (64)", values: [false, false, false, false, true] },
                  { feature: "Logo Samples", values: ["3", "3", "3", "5", "5"] },
                  { feature: "Revisions", values: ["3", "3", "5", "Unlimited", "Unlimited"] },
                  { feature: "Delivery Time", values: ["24-48 hrs", "24-48 hrs", "24 hrs", "24 hrs", "12-24 hrs"] },
                  { feature: "Source Files", values: [true, true, true, true, true] },
                ].map((row, index) => (
                  <tr key={row.feature} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                    <td className="py-4 px-4 font-medium text-gray-900">{row.feature}</td>
                    {row.values.map((value, i) => (
                      <td key={i} className="text-center py-4 px-4">
                        {typeof value === "boolean" ? (
                          value ? (
                            <Check className="mx-auto text-[#e11d48]" size={20} />
                          ) : (
                            <span className="text-gray-300">—</span>
                          )
                        ) : (
                          <span className="text-gray-900 font-medium">{value}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#e11d48] font-semibold text-sm uppercase tracking-wider">FAQs</span>
            <h2 className="text-4xl font-black text-gray-900 mt-4">
              Pricing <span className="text-[#e11d48]">Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "Are there any hidden charges?",
                a: "No, absolutely not. The price you see is the final price. All packages include all file formats, revisions, and source files.",
              },
              {
                q: "Can I upgrade my package later?",
                a: "Yes! You can upgrade to a higher package anytime by paying the difference amount.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major payment methods including UPI, bank transfer, and online payment options.",
              },
              {
                q: "Is there a refund policy?",
                a: "Yes, we offer a 100% refund if you're not satisfied with the initial concepts. Refund is available before final delivery.",
              },
              {
                q: "Do you offer custom packages?",
                a: "Absolutely! Contact us with your specific requirements and we'll create a custom package tailored to your needs.",
              },
            ].map((faq, index) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <HelpCircle className="text-[#e11d48] flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h3>
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#e11d48] to-[#be123c]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Need a Custom Package?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Have specific requirements? We&apos;ll create a custom package tailored exactly to your needs. Get in touch for a free consultation.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#e11d48] hover:bg-gray-100 px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
