import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Quote } from 'lucide-react';
import { services, portfolioImages, testimonials, whyChooseUs } from '../utils/data';
import ServiceCard from '../components/ServiceCard';
import PortfolioCard from '../components/PortfolioCard';
import * as Icons from 'lucide-react';

const Home = () => {
  return (
    <div className="overflow-hidden bg-brand-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-brand-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#E1060005_0%,transparent_70%)]" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-red/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-brand-offwhite border border-gray-100 px-4 py-2 mb-6"
              >
                <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
                <span className="text-brand-black/60 text-[10px] font-black uppercase tracking-[0.2em]">Emerging IT Solutions</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-black text-brand-black leading-tight mb-6">
                Passionate
                <span className="text-brand-red"> IT</span>
                <br />
                & Software
                <br />
                <span className="text-brand-black/90">Solutions</span>
              </h1>

              <p className="text-lg text-brand-gray mb-8 max-w-lg leading-relaxed">
                Two passionate developers turning ideas into reality. Quality websites and software built with fresh perspectives.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/services" className="btn-primary flex items-center gap-2">
                  Explore Services <ArrowRight size={20} />
                </Link>
                <Link to="/contact" className="btn-outline">
                  Get in Touch
                </Link>
              </div>

              <div className="flex items-center gap-8 mt-12">
                <div>
                  <div className="text-2xl font-black text-brand-black">~3</div>
                  <div className="text-brand-gray/60 text-[10px] font-bold uppercase tracking-widest">Years Exp.</div>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div>
                  <div className="text-2xl font-black text-brand-black">100%</div>
                  <div className="text-brand-gray/60 text-[10px] font-bold uppercase tracking-widest">Dedication</div>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div>
                  <div className="text-2xl font-black text-brand-black">Reliable</div>
                  <div className="text-brand-gray/60 text-[10px] font-bold uppercase tracking-widest">Support</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square max-w-lg mx-auto bg-brand-offwhite border border-gray-100 p-8 shadow-premium">
                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-brand-red/20 -mr-2 -mt-2" />
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-brand-red/20 -ml-2 -mb-2" />
                <img
                  src="/infrio/InfruiLogo.png"
                  alt="Infrio Infotech Logo"
                  className="w-full h-full object-contain grayscale-2 hover:grayscale transition-all duration-700"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => {
              const Icon = Icons[item.icon] || Icons.HelpCircle;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card group hover:bg-brand-white"
                >
                  <Icon className="text-brand-red mb-6 group-hover:scale-110 transition-transform duration-300" size={32} />
                  <h3 className="text-lg font-bold text-brand-black mb-2">{item.title}</h3>
                  <p className="text-brand-gray text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-brand-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em] block mb-4">Services</span>
            <h2 className="section-title text-brand-black">What We <span className="text-brand-red underline decoration-brand-red/20 underline-offset-8">Do</span></h2>
            <p className="text-brand-gray">Focused IT services built with modern tech stacks.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service, index) => (
              <ServiceCard key={service.id} {...service} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="btn-outline inline-flex items-center gap-2">
              All Services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-24 bg-brand-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em] block mb-4">Portfolio</span>
              <h2 className="section-title text-brand-black">Recent <span className="text-brand-red underline decoration-brand-red/20 underline-offset-8">Projects</span></h2>
              <p className="text-brand-gray">A collection of our academic, personal, and client projects.</p>
            </div>
            <Link to="/portfolio" className="btn-primary px-8 py-3 text-sm">View Full Portfolio</Link>
          </div>

            <div className="flex flex-col gap-8">
              {portfolioImages.slice(0, 3).map((item, index) => (
                <div key={item.id} className="w-full">
                  <PortfolioCard 
                    {...item} 
                    index={index} 
                  />
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-24 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em] block mb-4">Testimonials</span>
            <h2 className="section-title text-brand-black">What People <span className="text-brand-red underline decoration-brand-red/20 underline-offset-8">Say</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-brand-white border border-gray-100 p-8 shadow-premium relative group hover:border-brand-red/30 transition-all duration-300"
              >
                <Quote size={40} className="text-brand-red/10 absolute top-6 right-6 group-hover:text-brand-red/20 transition-colors" />
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-brand-red fill-brand-red" />
                  ))}
                </div>
                <p className="text-brand-gray italic mb-8 leading-relaxed">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-none bg-brand-offwhite border border-gray-100 flex items-center justify-center font-black text-brand-red">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="text-brand-black font-bold text-sm">{t.name}</h4>
                    <p className="text-brand-gray/60 text-[10px] uppercase tracking-widest">{t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-white border-2 border-brand-red/10 p-12 md:p-20 text-center relative overflow-hidden shadow-premium">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/[0.02] rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-red/[0.02] rounded-full -ml-20 -mb-20 blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-brand-black mb-6">Let's Build Something Great Together</h2>
              <p className="text-brand-gray text-lg mb-10 max-w-2xl mx-auto">Get a professional website started today starting at just <span className="font-black text-brand-red text-2xl">₹4,999</span>.</p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link to="/pricing" className="btn-primary px-12 py-4 text-lg">
                  Get Started Now
                </Link>
                <Link to="/contact" className="btn-outline px-12 py-4 text-lg">
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
