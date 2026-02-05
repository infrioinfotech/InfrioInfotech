import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, Package, Send } from 'lucide-react';
import { pricingPackages } from '../utils/data';
import { submitOrderRequest } from '../services/api';

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPkg, setSelectedPkg] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectDescription: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  useEffect(() => {
    if (location.state?.selectedPackage) {
      setSelectedPkg(location.state.selectedPackage);
    } else {
      setSelectedPkg(pricingPackages[2]); // Default to Professional
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePackageChange = (e) => {
    const pkg = pricingPackages.find(p => p.id === parseInt(e.target.value));
    setSelectedPkg(pkg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    try {
      const orderData = {
        packageDetails: selectedPkg,
        projectDescription: formData.projectDescription,
        contactInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }
      };
      await submitOrderRequest(orderData);
      setStatus({ submitting: false, success: true, error: null });
    } catch (err) {
      setStatus({ submitting: false, success: false, error: err.message || 'Something went wrong' });
    }
  };

  if (!selectedPkg) return null;

  return (
    <div className="bg-brand-white pb-24">
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em] block mb-4">Project Inquiry</span>
            <h1 className="text-5xl md:text-7xl font-black text-brand-black mb-8">Start Your <span className="text-brand-red">Project</span></h1>
            <p className="text-lg text-brand-gray leading-relaxed">
              Fill in the details below to start your digital transformation with Infrio Infotech. Our team will review your requirements and reach out within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-brand-offwhite border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Selected Package Info */}
            <div className="space-y-8">
              <div className="card border-brand-red ring-1 ring-brand-red/10 relative overflow-hidden">
                <Package className="mb-6 text-brand-red" size={32} />
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-black/40 mb-2">Selected Package</h4>
                {selectedPkg.service && (
                  <div className="text-sm text-brand-gray mb-2">Service: <span className="font-bold text-brand-black">{selectedPkg.service}</span></div>
                )}
                <h3 className="text-3xl font-black text-brand-black mb-4">{selectedPkg.name}</h3>
                <div className="text-4xl font-black text-brand-black mb-8">₹{selectedPkg.price}</div>
                <ul className="space-y-3">
                  {selectedPkg.includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-bold text-brand-gray">
                      <div className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate('/pricing')}
                  className="mt-8 flex items-center gap-2 text-sm font-black text-brand-red hover:underline"
                >
                  <ArrowLeft size={16} /> Change Package
                </button>
              </div>

              <div className="card shadow-none">
                <h4 className="text-brand-black font-bold mb-4">What happens next?</h4>
                <ul className="space-y-4">
                  <li className="flex gap-3 text-sm text-brand-gray">
                    <span className="w-6 h-6 border border-brand-red text-brand-red flex items-center justify-center shrink-0 font-black text-xs">1</span>
                    <span>Team reviews your project details.</span>
                  </li>
                  <li className="flex gap-3 text-sm text-brand-gray">
                    <span className="w-6 h-6 border border-brand-red text-brand-red flex items-center justify-center shrink-0 font-black text-xs">2</span>
                    <span>We contact you via Email/Phone.</span>
                  </li>
                  <li className="flex gap-3 text-sm text-brand-gray">
                    <span className="w-6 h-6 border border-brand-red text-brand-red flex items-center justify-center shrink-0 font-black text-xs">3</span>
                    <span>Project proposal shared within 24-48h.</span>
                  </li>
                </ul>
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
                    <h3 className="text-3xl font-black text-brand-black mb-4">Order Received!</h3>
                    <p className="text-brand-gray mb-8">We've received your inquiry for the <span className="text-brand-red font-black">{selectedPkg.name}</span> package. Our team will contact you shortly to discuss next steps.</p>
                    <button
                      onClick={() => navigate('/')}
                      className="btn-primary"
                    >
                      Back to Home
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-6">
                      <h3 className="text-xl font-black text-brand-black border-l-4 border-brand-red pl-4 uppercase tracking-tighter">Contact Information</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-black/40">Full Name</label>
                          <input
                            required
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
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
                            className="w-full bg-brand-offwhite border border-gray-100 px-6 py-4 text-brand-black focus:outline-none focus:border-brand-red transition-colors"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-black/40">Phone Number</label>
                        <input
                          required
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-brand-offwhite border border-gray-100 px-6 py-4 text-brand-black focus:outline-none focus:border-brand-red transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-xl font-black text-brand-black border-l-4 border-brand-red pl-4 uppercase tracking-tighter">Project Details</h3>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-black/40">Change Package (Optional)</label>
                        <div className="relative">
                          <select
                            value={selectedPkg.id}
                            onChange={handlePackageChange}
                            className="w-full bg-brand-offwhite border border-gray-100 px-6 py-4 text-brand-black focus:outline-none focus:border-brand-red transition-colors appearance-none"
                          >
                            {pricingPackages.map(pkg => (
                              <option key={pkg.id} value={pkg.id}>
                                {pkg.name} - ₹{pkg.price}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-brand-gray">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-black/40">Project Description & Requirements</label>
                        <textarea
                          required
                          name="projectDescription"
                          value={formData.projectDescription}
                          onChange={handleChange}
                          rows="6"
                          placeholder="Please describe your project requirements, technology preferences, and any specific goals you have..."
                          className="w-full bg-brand-offwhite border border-gray-100 px-6 py-4 text-brand-black focus:outline-none focus:border-brand-red transition-colors resize-none"
                        ></textarea>
                      </div>
                    </div>

                    {status.error && (
                      <p className="text-brand-red text-sm font-bold">{status.error}</p>
                    )}
                    
                    <button
                      disabled={status.submitting}
                      type="submit"
                      className="btn-primary w-full flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {status.submitting ? 'Submitting...' : (
                        <>
                          Submit Project Request <Send size={20} />
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

export default Order;
