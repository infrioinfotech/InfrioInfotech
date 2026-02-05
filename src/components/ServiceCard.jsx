import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ title, description, icon, index, slug }) => {
  const IconComponent = Icons[icon] || Icons.HelpCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="card group hover:bg-brand-offwhite"
    >
      <Link to={`/services/${slug}`} className="block">
        <div className="w-14 h-14 flex items-center justify-center text-brand-red mb-6 border-b border-brand-red/10 group-hover:border-brand-red transition-all duration-300">
          <IconComponent size={32} />
        </div>
        <h3 className="text-xl font-bold text-brand-black mb-3 group-hover:text-brand-red transition-colors">
          {title}
        </h3>
        <p className="text-brand-gray text-sm leading-relaxed">
          {description}
        </p>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
