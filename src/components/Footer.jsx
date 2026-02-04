import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-black text-brand-black mb-6 block">
              Infrio <span className="text-brand-red">Infotech</span>
            </Link>
            <p className="text-brand-gray text-sm leading-relaxed mb-6">
              Emerging IT startup focused on quality web and software solutions. We combine academic learning with practical skills to build digital products.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/infrioinfotech" className="text-brand-black/40 hover:text-brand-red transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/infrio-infotech" className="text-brand-black/40 hover:text-brand-red transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/InfrioInfotech" className="text-brand-black/40 hover:text-brand-red transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-brand-black font-bold mb-6 uppercase tracking-wider text-xs">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-brand-gray hover:text-brand-red text-sm transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-brand-gray hover:text-brand-red text-sm transition-colors">Our Services</Link></li>
              <li><Link to="/pricing" className="text-brand-gray hover:text-brand-red text-sm transition-colors">Pricing Packages</Link></li>
              <li><Link to="/portfolio" className="text-brand-gray hover:text-brand-red text-sm transition-colors">Portfolio</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-brand-black font-bold mb-6 uppercase tracking-wider text-xs">Services</h4>
            <ul className="space-y-4">
              <li className="text-brand-gray text-sm hover:text-brand-red cursor-default transition-colors">Web Development</li>
              <li className="text-brand-gray text-sm hover:text-brand-red cursor-default transition-colors">Software Solutions</li>
              <li className="text-brand-gray text-sm hover:text-brand-red cursor-default transition-colors">Mobile App Dev</li>
              <li className="text-brand-gray text-sm hover:text-brand-red cursor-default transition-colors">Cloud Services</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-brand-black font-bold mb-6 uppercase tracking-wider text-xs">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-brand-gray text-sm">
                <Phone size={18} className="text-brand-red shrink-0" />
                <span>Chavda Jaydeepisinh <br /> +91 70465 35767</span>
                {/* <span>+91 81600 57141</span> */}
              </li>
              <li className="flex items-start space-x-3 text-brand-gray text-sm">
                <Phone size={18} className="text-brand-red shrink-0" />
                {/* <span>+91 70465 35767</span> */}
                <span>Uday Patel <br /> +91 81600 57141</span>
              </li>
              <li className="flex items-start space-x-3 text-brand-gray text-sm">
                <Mail size={18} className="text-brand-red shrink-0" />
                <span>contact@infrioinfotech.com</span>
              </li>
              <li className="flex items-start space-x-3 text-brand-gray text-sm">
                <MapPin size={18} className="text-brand-red shrink-0" />
                <span>Ahmedabad, Gujarat, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 text-center">
          <p className="text-brand-gray/60 text-xs">
            © {new Date().getFullYear()} Infrio Infotech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
