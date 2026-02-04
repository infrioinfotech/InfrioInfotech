import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioImages } from '../utils/data';
import PortfolioCard from '../components/PortfolioCard';

const Portfolio = () => {
  const categories = ['All', 'Web Development', 'Mobile Apps', 'E-commerce', 'Digital Marketing'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = activeCategory === 'All'
    ? portfolioImages
    : portfolioImages.filter(img => img.category === activeCategory);

  return (
    <div className="bg-brand-white pb-24">
      {/* Hero */}
      <section className="py-24 relative overflow-hidden  ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em] block mb-4">Our Work</span>
            <h1 className="text-5xl md:text-7xl font-black text-brand-black mb-8">Our <span className="text-brand-red">Projects</span></h1>
            <p className="text-lg text-brand-gray leading-relaxed">
              Explore our collection of projects, ranging from academic coursework to client prototypes. Each one represents a step in our learning and professional journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-12 bg-brand-offwhite border-y border-gray-100  ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  ">
          <div className="flex flex-wrap justify-center gap-4 ">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-none text-xs font-black uppercase tracking-widest transition-all duration-300 {activeCategory === cat ? 'bg-brand-red text-white shadow-premium' : 'bg-brand-white border border-gray-100 text-brand-black hover:border-brand-red'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
              <AnimatePresence>
                {filteredImages.map((item, index) => (
                  <PortfolioCard 
                    key={item.id} 
                    {...item} 
                    index={index} 
                    className={index === 4 && filteredImages.length === 6 ? "lg:col-start-2" : ""} 
                  />
                ))}
              </AnimatePresence>
            </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
