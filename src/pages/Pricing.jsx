import React from 'react';
import { motion } from 'framer-motion';
import { pricingPackages } from '../utils/data';
import PricingCard from '../components/PricingCard';

const Pricing = () => {
  return (
    <div className="bg-brand-white pb-24">
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em] block mb-4">Pricing</span>
            <h1 className="text-5xl md:text-7xl font-black text-brand-black mb-8">Startup-Friendly <span className="text-brand-red">Pricing</span></h1>
            <p className="text-lg text-brand-gray leading-relaxed">
              Affordable packages designed for individuals and small businesses. Clear pricing with no hidden costs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-24 bg-brand-offwhite border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingPackages.map((pkg, index) => (
              <PricingCard key={pkg.id} pkg={pkg} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-brand-black mb-12 underline decoration-brand-red/10 underline-offset-8">Frequently Asked Questions</h2>
          <div className="space-y-6 text-left">
            {[
              { q: "What is the delivery time?", a: "Basic websites take ~1 week, custom software takes ~2-4 weeks depending on requirements." },
              { q: "Do you offer post-launch support?", a: "Yes, we provide support to ensure everything runs smoothly. We are happy to help with minor updates." },
              { q: "Can I upgrade my plan later?", a: "Yes, you can always add more features later. We build with growth in mind." }
            ].map((faq, i) => (
              <div key={i} className="card bg-brand-offwhite shadow-none hover:bg-brand-white transition-colors">
                <h4 className="font-bold text-brand-black mb-2 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                  {faq.q}
                </h4>
                <p className="text-brand-gray text-sm leading-relaxed ml-4.5">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
