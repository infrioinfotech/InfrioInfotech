import React from 'react';
import { motion } from 'framer-motion';
import { services } from '../utils/data';
import ServiceCard from '../components/ServiceCard';
import { Link } from 'react-router-dom';

const Services = () => {
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
            <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em] block mb-4">Our Expertise</span>
            <h1 className="text-5xl md:text-7xl font-black text-brand-black mb-8">Digital Skills <span className="text-brand-red">& Solutions</span></h1>
            <p className="text-lg text-brand-gray leading-relaxed">
              We offer practical IT services to help you establish your digital presence. From custom coding to basic cloud setup, we apply our skills to your needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-brand-offwhite border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id} {...service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Custom Request CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="card p-12 text-center"
          >
            <h2 className="text-3xl font-black text-brand-black mb-6">Have a Unique Idea?</h2>
            <p className="text-brand-gray mb-8 max-w-xl mx-auto">If you have a specific requirement or a new idea, let's talk. We love taking on challenges and building custom solutions.</p>
            <a href="/contact" className="btn-primary inline-block">Request a Quote</a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
