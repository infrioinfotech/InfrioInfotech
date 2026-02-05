import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingCard = ({ pkg, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`card relative flex flex-col {pkg.popular ? 'border-brand-red ring-1 ring-brand-red/20 shadow-2xl scale-105 z-10' : ''}`}
    >
      {pkg.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-red text-white text-[10px] font-black py-1 px-4 uppercase tracking-[0.2em]">
          Most Popular
        </div>
      )}
      
      <div className="mb-8">
        <h3 className="text-xl font-bold text-brand-black mb-2">{pkg.name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-brand-black">₹{pkg.price}</span>
        </div>
      </div>

      <div className="flex-grow">
        <ul className="space-y-4 mb-8">
          {pkg.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-brand-gray text-sm">
              <Check size={18} className="text-brand-red shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        to="/order"
        state={{ selectedPackage: pkg }}
        className="btn-primary w-full text-center py-4"
      >
        Order Now
      </Link>
    </motion.div>
  );
};

export default PricingCard;
