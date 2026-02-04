import React from 'react';
import { motion } from 'framer-motion';

const PortfolioCard = ({ title, category, image, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-none aspect-square bg-brand-white border border-gray-100 hover:border-brand-red transition-all duration-300"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-brand-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-center">
        <span className="text-brand-red text-[10px] font-black uppercase tracking-[0.2em] mb-2">{category}</span>
        <h3 className="text-brand-black font-black text-xl">{title}</h3>
        <div className="mt-4 w-10 h-0.5 bg-brand-red"></div>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;
