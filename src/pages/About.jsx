import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Eye, Heart } from 'lucide-react';
import SEO from '../components/SEO';

const About = () => {
  const values = [
    { title: "Our Mission", desc: "To provide affordable, high-quality digital solutions while building a foundation of trust and technical excellence.", icon: Target },
    { title: "Our Vision", desc: "To grow into a reliable IT partner known for honesty, innovation, and client satisfaction.", icon: Eye },
    { title: "Our Philosophy", desc: "We believe that great software is not just about code, but about solving problems and creating seamless experiences.", icon: Heart },
    { title: "Quality First", desc: "We are committed to delivering the best possible work, always learning and improving to meet client expectations.", icon: Award },
  ];

  return (
    <div className="bg-brand-white pb-24">
      <SEO
        title="About Infrio Infotech | Our Company & Mission"
        description="Learn about Infrio Infotech, our mission and how we build professional IT services and software solutions for businesses and startups."
        canonical="https://infrioinfotech.qzz.io/about"
        ogTitle="About Infrio Infotech | Our Company & Mission"
        ogDescription="About Infrio Infotech: our mission and commitment to quality IT services."
        ogImage="https://infrioinfotech.qzz.io/infrio/Logo.png"
        ogUrl="https://infrioinfotech.qzz.io/about"
        robots="index,follow"
      />
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em] block mb-4">About Infrio Infotech</span>
            <h1 className="text-5xl md:text-7xl font-black text-brand-black mb-8">Growing Together <span className="text-brand-red">Through Tech</span></h1>
            <p className="text-lg text-brand-gray leading-relaxed">
              Infrio Infotech is an early-stage IT startup founded by passionate students. We are dedicated to building high-quality software solutions while continuously learning and growing with our clients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-brand-offwhite border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">The Story Behind <span className="text-brand-red">Infrio Infotech</span></h2>
              <div className="space-y-6 text-brand-gray">
                <p>Infrio Infotech started as a vision shared by two college students who wanted to bridge the gap between academic learning and real-world application.</p>
                <p>What began as college projects has grown into a professional startup. We apply our fresh knowledge and 3 years of combined experience to build modern, efficient solutions.</p>
                <p>Our journey is defined by curiosity and a commitment to quality. We treat every project as a chance to prove our skills and deliver real value to our clients.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative aspect-square bg-brand-white border border-gray-100 overflow-hidden shadow-premium"
            >
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=800&fit=crop"
                alt="Creative Team"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <v.icon className="text-brand-red mb-6" size={32} />
                <h3 className="text-xl font-bold text-brand-black mb-3">{v.title}</h3>
                <p className="text-brand-gray text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
