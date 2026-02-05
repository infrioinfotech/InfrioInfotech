import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const techIcons = {
  React: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
  "Node.js": "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
  MongoDB: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
  Express: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg",
  Python: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
  TensorFlow: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg",
  FastAPI: "https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg",
  NLP: "https://cdn-icons-png.flaticon.com/512/1256/1256650.png",
};

const PortfolioCard = ({ title, category, description, image, technologies, index, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`group relative overflow-hidden rounded-3xl bg-black border border-white/10 flex flex-col lg:flex-row shadow-2xl hover:shadow-[#e11d48]/20 transition-all duration-500 ${className}`}
    >
      {/* Content Section */}
      <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center relative z-10">
        <div className="mb-4">
           <span className="text-[#e11d48] text-sm font-bold uppercase tracking-wider">{category}</span>
        </div>
        
        <h3 className="text-3xl md:text-4xl font-black text-white mb-6 group-hover:text-[#e11d48] transition-colors duration-300">
          {title}
        </h3>

        <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
          {description || "A creative project showcasing innovation and technical expertise."}
        </p>

        {technologies && (
          <div className="flex items-center gap-4 mb-8">
            {technologies.map((tech) => (
              <div 
                key={tech} 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center p-2"
                title={tech}
              >
                {techIcons[tech] ? (
                  <img src={techIcons[tech]} alt={tech} className="w-full h-full object-contain" />
                ) : (
                  <span className="text-[10px] text-white font-bold">{tech.slice(0, 2)}</span>
                )}
              </div>
            ))}
          </div>
        )}

        <div>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-[#e11d48] hover:text-white transition-all duration-300 group/btn">
            Visit Site
            <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10 lg:w-1/2" />
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
    </motion.div>
  );
};

export default PortfolioCard;
