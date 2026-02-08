import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { submitContactForm } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Web Development',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    try {
      // 1. Submit to Firestore (existing logic)
      await submitContactForm(formData);

      // 2. Prepare EmailJS parameters
      const templateParamsCompany = {
        user_name: formData.name,
        user_email: formData.email,
        subject: `New Contact Request – ${formData.service}`,
        message: formData.message,
        service: formData.service,
        from_email: 'contact@infrioinfotech.qzz.io',
      };
      const templateParamsUser = {
        user_name: formData.name,
        user_email: formData.email,
        subject: 'We received your request',
        message: formData.message,
        service: formData.service,
        from_email: 'contact@infrioinfotech.qzz.io',
      };

      // 3. Send email to company
      if (window.emailjs) {
        await window.emailjs.send(
          'service_lczqxtw',
          'template_lj8kou9',
          templateParamsCompany
        );

        // 4. Send thank you email to user
        await window.emailjs.send(
          'service_lczqxtw',
          'template_l3bb6or',
          templateParamsUser
        );
      } else {
        console.warn('EmailJS not loaded');
      }

      setStatus({ submitting: false, success: true, error: null });
      setFormData({ name: '', email: '', phone: '', service: 'Web Development', message: '' });
    } catch (err) {
      console.error(err);
      setStatus({ submitting: false, success: false, error: err.message || 'Something went wrong' });
    }
  };

  return (
    <div className="bg-brand-white pb-24">
      <SEO
        title="Contact Infrio Infotech | Start Your Project"
        description="Contact Infrio Infotech to start your project. Get in touch for IT services, web development and software solutions."
        canonical="https://infrioinfotech.qzz.io/contact"
        ogTitle="Contact Infrio Infotech | Start Your Project"
        ogDescription="Reach out to Infrio Infotech for professional IT services."
        ogImage="https://infrioinfotech.qzz.io/infrio/Logo.png"
        ogUrl="https://infrioinfotech.qzz.io/contact"
        robots="index,follow"
      />
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em] block mb-4">Contact Us</span>
            <h1 className="text-5xl md:text-7xl font-black text-brand-black mb-8">Get in <span className="text-brand-red">Touch</span></h1>
            <p className="text-lg text-brand-gray leading-relaxed">
              Have a project in mind? We'd love to hear from you. Send us a message and our team will get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-brand-offwhite border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="card shadow-none">
                <Mail className="text-brand-red mb-4" size={24} />
                <h4 className="text-brand-black font-bold mb-2">Email Us</h4>
                <p className="text-brand-gray text-sm">contact@infrioinfotech.com</p>
                <p className="text-brand-gray text-sm">support@infrioinfotech.com</p>
              </div>
              <div className="card shadow-none">
                <Phone className="text-brand-red mb-4" size={24} />
                <h4 className="text-brand-black font-bold mb-2">Call Us</h4>
                <p className="text-brand-gray text-sm flex items-center justify-between ">Chavda Jaydeepisinh <span className="block">+91 70465 35767</span></p>
                <p className="text-brand-gray text-sm flex items-center justify-between ">Uday Patel <span className="block">+91 81600 57141</span></p>
              </div>
              <div className="card shadow-none">
                <MapPin className="text-brand-red mb-4" size={24} />
                <h4 className="text-brand-black font-bold mb-2">Visit Us</h4>
                <p className="text-brand-gray text-sm flex items-center justify-between ">Ahmedabad, Gujarat <span className="block">India</span> </p>
                {/* <p className="text-brand-gray text-sm flex items-center justify-between ">India <span className="block">+91 98200 45678</span></p> */}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="card bg-brand-white p-8 md:p-12">
                {status.success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-red">
                      <CheckCircle size={48} />
                    </div>
                    <h3 className="text-3xl font-black text-brand-black mb-4">Message Sent!</h3>
                    <p className="text-brand-gray mb-8">Thank you for reaching out. Our team will contact you very soon.</p>
                    <button
                      onClick={() => setStatus({ ...status, success: false })}
                      className="btn-outline"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-black/40">Full Name</label>
                        <input
                          required
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full bg-brand-offwhite border border-gray-100 px-6 py-4 text-brand-black focus:outline-none focus:border-brand-red transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-black/40">Email Address</label>
                        <input
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full bg-brand-offwhite border border-gray-100 px-6 py-4 text-brand-black focus:outline-none focus:border-brand-red transition-colors"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-black/40">Phone Number</label>
                        <input
                          required
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 00000 00000"
                          className="w-full bg-brand-offwhite border border-gray-100 px-6 py-4 text-brand-black focus:outline-none focus:border-brand-red transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-black/40">Service Required</label>
                        <div className="relative">
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full bg-brand-offwhite border border-gray-100 px-6 py-4 text-brand-black focus:outline-none focus:border-brand-red transition-colors appearance-none"
                          >
                            <option>Web Development</option>
                            <option>Software Solutions</option>
                            <option>Mobile App Development</option>
                            <option>Cloud Services</option>
                            <option>UI/UX Design</option>
                            <option>Digital Marketing</option>
                            <option>Other</option>
                          </select>
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-brand-gray">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-black/40">Message</label>
                      <textarea
                        required
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Tell us about your project..."
                        className="w-full bg-brand-offwhite border border-gray-100 px-6 py-4 text-brand-black focus:outline-none focus:border-brand-red transition-colors resize-none"
                      ></textarea>
                    </div>
                    {status.error && (
                      <p className="text-brand-red text-sm font-bold">{status.error}</p>
                    )}
                    <button
                      disabled={status.submitting}
                      type="submit"
                      className="btn-primary w-full flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {status.submitting ? 'Sending...' : (
                        <>
                          Send Message <Send size={20} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
