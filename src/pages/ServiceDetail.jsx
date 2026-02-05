import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';

const SERVICES_CONTENT = {
  'web-development': {
    title: 'Web Development',
    subtitle: 'Modern, responsive websites and web apps tailored to your business.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop',
    explanation: [
      'We build fast, responsive, and SEO-friendly websites and web applications using React, Vite, and Node.js.',
      'Ideal for startups, small businesses, and growing teams who need a solid online presence.',
      'We deliver clean code, scalable architecture, and a smooth deployment pipeline.',
    ],
    pricing: [
      {
        id: 101, name: 'Starter Website', price: 499, popular: false,
        delivery: '1 week', support: '1 month',
        includes: ['5-page responsive website', 'Basic SEO', 'Contact form'],
        features: ['Responsive design', 'Deployment assistance', 'Performance baseline'],
      },
      {
        id: 102, name: 'Business Website', price: 999, popular: true,
        delivery: '2 weeks', support: '3 months',
        includes: ['10-page dynamic site', 'CMS integration', 'SEO setup'],
        features: ['Admin-ready CMS', 'Social media links', 'Content guidance'],
      },
      {
        id: 103, name: 'Web App', price: 1999, popular: false,
        delivery: '3 weeks', support: '6 months',
        includes: ['Custom web app', 'Auth & dashboard', 'API integration'],
        features: ['Scalable architecture', 'Best practices', 'Docs & handoff'],
      },
    ],
  },
  'software-solutions': {
    title: 'Software Solutions',
    subtitle: 'Practical tools and internal systems built to solve real problems.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
    explanation: [
      'We design and implement reliable tools, dashboards, and automation scripts.',
      'Ideal for teams needing inventory tools, internal admin panels, or workflow automation.',
      'We prioritize usability, maintainability, and clear documentation.',
    ],
    pricing: [
      { id: 201, name: 'Essential', price: 499, popular: false, delivery: '1-2 weeks', support: '1 month',
        includes: ['Single-purpose tool', 'Basic UI', 'Setup guide'],
        features: ['Bug fixes window', 'Lightweight deployment', 'Email support'],
      },
      { id: 202, name: 'Pro Suite', price: 1299, popular: true, delivery: '2-3 weeks', support: '3 months',
        includes: ['Multi-module system', 'Admin panel', 'Data export/import'],
        features: ['Role-based access', 'Logging & monitoring', 'Onboarding session'],
      },
      { id: 203, name: 'Custom Platform', price: 2499, popular: false, delivery: '3-4 weeks', support: '6 months',
        includes: ['Custom workflows', 'API integrations', 'Secure auth'],
        features: ['Scalable DB design', 'CI/CD guidance', 'Performance tuning'],
      },
    ],
  },
  'app-development': {
    title: 'App Development',
    subtitle: 'Lean mobile-first experiences with web/native strategies.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop',
    explanation: [
      'We build user-friendly mobile apps (web-first or hybrid) to validate ideas quickly.',
      'Perfect for MVPs, internal tools, and small business apps.',
      'We focus on simple UX, smooth navigation, and fast iteration.',
    ],
    pricing: [
      { id: 301, name: 'MVP', price: 799, popular: false, delivery: '2 weeks', support: '1 month',
        includes: ['Core screens', 'Auth', 'Basic backend'],
        features: ['Responsive UI', 'Simple analytics', 'Deployment help'],
      },
      { id: 302, name: 'Growth', price: 1499, popular: true, delivery: '3 weeks', support: '3 months',
        includes: ['Feature set', 'Notifications', 'Admin dashboard'],
        features: ['User roles', 'Crash monitoring', 'Guided testing'],
      },
      { id: 303, name: 'Plus', price: 2599, popular: false, delivery: '4 weeks', support: '6 months',
        includes: ['Advanced flows', 'Payments or maps', 'API integration'],
        features: ['Scalable setup', 'Best practices', 'Handoff docs'],
      },
    ],
  },
  'ui-ux-design': {
    title: 'UI/UX Design',
    subtitle: 'Clean, intuitive design systems tailored to your product.',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1200&h=800&fit=crop',
    explanation: [
      'We craft minimal, accessible, and usable interfaces that users love.',
      'Ideal for landing pages, dashboards, and product MVPs.',
      'Delivery includes component library, patterns, and handoff.',
    ],
    pricing: [
      { id: 401, name: 'Starter UI', price: 399, popular: false, delivery: '1 week', support: '1 month',
        includes: ['Landing page', 'Brand palette', 'Typography & spacing'],
        features: ['Responsive grids', 'Icon set', 'Exported assets'],
      },
      { id: 402, name: 'Product UI', price: 899, popular: true, delivery: '2 weeks', support: '2 months',
        includes: ['Multi-page UI', 'Component library', 'Design tokens'],
        features: ['Interaction states', 'Accessibility review', 'Handoff'],
      },
      { id: 403, name: 'UX Suite', price: 1499, popular: false, delivery: '3 weeks', support: '3 months',
        includes: ['User flows', 'Wireframes', 'Clickable prototype'],
        features: ['Usability notes', 'Iteration rounds', 'Design QA'],
      },
    ],
  },
  'cloud-basics': {
    title: 'Cloud Basics',
    subtitle: 'Deployment, hosting, and baseline infra for startups.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop',
    explanation: [
      'We help deploy your app to modern platforms with sensible defaults.',
      'Ideal for early-stage teams needing a stable environment and guidance.',
      'Includes logging, backups advice, and performance checks.',
    ],
    pricing: [
      { id: 501, name: 'Starter Deploy', price: 299, popular: false, delivery: '3-5 days', support: '1 month',
        includes: ['Single app deploy', 'Domain setup', 'HTTPS'],
        features: ['Env config', 'Basic monitoring', 'Docs'],
      },
      { id: 502, name: 'Pro Infra', price: 799, popular: true, delivery: '1-2 weeks', support: '3 months',
        includes: ['Multi-service setup', 'CI/CD', 'Metrics'],
        features: ['Alerting', 'Scaling policies', 'Cost tips'],
      },
      { id: 503, name: 'Growth Cloud', price: 1499, popular: false, delivery: '2-3 weeks', support: '6 months',
        includes: ['Prod-grade setup', 'Backups', 'Security checks'],
        features: ['Rollback strategy', 'Docs & training', 'Performance tuning'],
      },
    ],
  },
  'tech-consulting': {
    title: 'Tech Consulting',
    subtitle: 'Clear, honest guidance to choose the right tools for you.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
    explanation: [
      'We help you evaluate stacks, plan roadmaps, and set delivery targets.',
      'Best for founders and small teams needing pragmatic direction.',
      'Includes architecture advice and hiring recommendations.',
    ],
    pricing: [
      { id: 601, name: 'Discovery', price: 199, popular: false, delivery: '3 days', support: '2 weeks',
        includes: ['One workshop', 'Findings summary', 'Next steps'],
        features: ['Stack options', 'Risk notes', 'Timeline outline'],
      },
      { id: 602, name: 'Advisory', price: 499, popular: true, delivery: '1 week', support: '1 month',
        includes: ['Deep dive', 'Architecture sketch', 'Action plan'],
        features: ['Cost estimate', 'Hiring guidance', 'Weekly sync'],
      },
      { id: 603, name: 'Partner', price: 999, popular: false, delivery: '2-3 weeks', support: '3 months',
        includes: ['Ongoing consults', 'Design reviews', 'Roadmap updates'],
        features: ['Milestone tracking', 'Vendor check', 'Decision logs'],
      },
    ],
  },
};

function Workflow() {
  const steps = ['Consultation', 'Planning', 'Design', 'Development', 'Testing', 'Deployment', 'Support'];
  return (
    <div className="flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-6 justify-center">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-4">
          <div className="px-4 py-2 rounded-none border border-gray-200 bg-white text-sm font-black">{s}</div>
          {i < steps.length - 1 && (
            <svg width="24" height="24" viewBox="0 0 24 24" className="text-brand-red">
              <path d="M8 4l8 8-8 8" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

function PricingCards({ serviceKey, pricing }) {
  const navigate = useNavigate();
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {pricing.map((pkg, idx) => (
        <div
          key={pkg.id}
          className={`card relative ${pkg.popular ? 'border-brand-red ring-1 ring-brand-red/10 scale-[1.02]' : ''}`}
        >
          {pkg.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-red text-white text-[10px] font-black py-1 px-3 uppercase tracking-[0.2em]">
              Most Popular
            </div>
          )}
          <h3 className="text-xl font-bold text-brand-black mb-2">{pkg.name}</h3>
          <div className="text-4xl font-black text-brand-black mb-4">₹{pkg.price}</div>
          <div className="text-sm text-brand-gray mb-6">Delivery: {pkg.delivery} • Support: {pkg.support}</div>
          <ul className="space-y-3 mb-8">
            {pkg.features.map((f, i) => (
              <li key={i} className="flex items-start gap-3 text-brand-gray text-sm">
                <Check size={18} className="text-brand-red shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() =>
              navigate('/order', {
                state: {
                  selectedPackage: {
                    ...pkg,
                    service: SERVICES_CONTENT[serviceKey]?.title || '',
                  },
                },
              })
            }
            className="btn-primary w-full"
          >
            Order Now
          </button>
        </div>
      ))}
    </div>
  );
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const data = SERVICES_CONTENT[slug];
  if (!data) {
    return (
      <div className="bg-brand-white py-24 text-center">
        <h1 className="text-3xl font-black">Service Not Found</h1>
        <p className="mt-4 text-brand-gray">Please return to the services page.</p>
        <Link to="/services" className="btn-primary mt-8 inline-block">Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-white pb-24">
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            <div>
              <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em] block mb-4">Service</span>
              <h1 className="text-5xl md:text-6xl font-black text-brand-black mb-6">{data.title}</h1>
              <p className="text-lg text-brand-gray">{data.subtitle}</p>
            </div>
            <img src={data.image} alt={data.title} className="w-full h-full object-cover rounded-none border border-gray-100" />
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-brand-offwhite border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-brand-black mb-6">What We Deliver</h2>
          <div className="space-y-4 text-brand-gray">
            {data.explanation.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-black text-brand-black mb-8">Our Simple Process</h3>
          <Workflow />
        </div>
      </section>

      <section className="py-24 bg-brand-offwhite border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em] block mb-4">Pricing</span>
              <h2 className="text-3xl font-black text-brand-black">Budget-Friendly Plans</h2>
              <p className="text-brand-gray">Transparent pricing designed for startups and small businesses.</p>
            </div>
            <Link to="/order" className="btn-outline inline-flex items-center gap-2">
              Get Started <ArrowRight size={18} />
            </Link>
          </div>
          <PricingCards serviceKey={slug} pricing={data.pricing} />
        </div>
      </section>
    </div>
  );
}
