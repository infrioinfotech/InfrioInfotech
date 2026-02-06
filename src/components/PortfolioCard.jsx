import React from 'react';
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
    <div
      className={`group overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out lg:flex lg:h-48 ${className}`}
    >
      <div className="relative overflow-hidden lg:w-2/5 lg:h-full">
        <div className="aspect-video w-full lg:h-full lg:aspect-auto">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-all duration-300 ease-out"
          />
        </div>
      </div>
      <div className="p-5 lg:w-3/5">
        <span className="text-brand-red text-[10px] font-bold uppercase tracking-widest">{category}</span>
        <h3 className="mt-2 text-lg md:text-xl font-bold text-brand-black line-clamp-1">{title}</h3>
        <p className="mt-2 text-sm text-brand-gray line-clamp-2 lg:line-clamp-3">
          {description || "A creative project showcasing innovation and technical expertise."}
        </p>
        {technologies && technologies.length > 0 && (
          <div className="mt-4 flex items-center gap-2">
            {technologies.slice(0, 6).map((tech) => (
              <div
                key={tech}
                className="w-7 h-7 rounded-full bg-brand-offwhite border border-gray-100 flex items-center justify-center p-1"
                title={tech}
              >
                {techIcons[tech] ? (
                  <img src={techIcons[tech]} alt={tech} className="w-full h-full object-contain" />
                ) : (
                  <span className="text-[10px] text-brand-gray font-bold">{tech.slice(0, 2)}</span>
                )}
              </div>
            ))}
          </div>
        )}
        <div className="mt-5">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm text-brand-black hover:border-brand-red hover:text-brand-red transition-all duration-300 ease-out">
            View Project
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
