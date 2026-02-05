import React from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../utils/data';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
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
            <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em] block mb-4">Social Proof</span>
            <h1 className="text-5xl md:text-7xl font-black text-brand-black mb-8">Feedback & <span className="text-brand-red">Reviews</span></h1>
            <p className="text-lg text-brand-gray leading-relaxed">
              Read what our early clients and collaborators say about working with us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24 bg-brand-offwhite border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card relative group"
              >
                <Quote size={40} className="text-brand-red/10 absolute top-6 right-6 group-hover:text-brand-red/20 transition-colors" />
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-brand-red fill-brand-red" />
                  ))}
                </div>
                <p className="text-brand-gray italic mb-8 leading-relaxed">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-none bg-brand-white border border-gray-100 flex items-center justify-center font-black text-brand-red text-lg">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="text-brand-black font-bold">{t.name}</h4>
                    <p className="text-brand-gray/60 text-xs uppercase tracking-widest">{t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Review CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-brand-black mb-6">Worked With Us?</h2>
          <p className="text-brand-gray mb-8">We value every piece of feedback. It helps us learn and improve.</p>
          <a href="/contact" className="btn-outline">Leave a Review</a>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
