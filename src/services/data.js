import React from 'react';
import { Zap, Award, IndianRupee, RefreshCw } from "lucide-react";

export const services = [
  {
    id: 1,
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies to drive your business growth.",
    icon: "Palette",
  },
  {
    id: 2,
    title: "Software Solutions",
    description: "Scalable and efficient software solutions tailored to meet your specific business requirements.",
    icon: "FileText",
  },
  {
    id: 3,
    title: "E-commerce Development",
    description: "Robust e-commerce platforms with secure payment gateways and seamless user experiences.",
    icon: "CreditCard",
  },
  {
    id: 4,
    title: "Digital Marketing",
    description: "Strategic digital marketing services to boost your online presence and reach your target audience.",
    icon: "Video",
  },
  {
    id: 5,
    title: "IT Support & Maintenance",
    description: "Reliable support and maintenance services to ensure your systems run smoothly 24/7.",
    icon: "Mail",
  },
  {
    id: 6,
    title: "UI/UX Design",
    description: "Intuitive and engaging user interface designs that enhance user satisfaction and retention.",
    icon: "Image",
  },
  {
    id: 7,
    title: "Tech Consulting",
    description: "Expert technology consulting to help you make informed decisions and stay ahead of the curve.",
    icon: "Award",
  },
];

export const pricingPackages = [
  {
    id: 1,
    name: "Startup",
    price: 499,
    popular: false,
    includes: ["Basic Website", "Hosting Setup"],
    features: [
      "5 Page Responsive Website",
      "Basic SEO Optimization",
      "Contact Form Integration",
      "Delivery: 1 Week",
      "1 Month Support",
    ],
  },
  {
    id: 2,
    name: "Growth",
    price: 999,
    popular: false,
    includes: ["Dynamic Website", "CMS Integration", "SEO Pro"],
    features: [
      "10 Page Dynamic Website",
      "Content Management System",
      "Advanced SEO Setup",
      "Delivery: 2 Weeks",
      "Social Media Integration",
      "3 Months Support",
    ],
  },
  {
    id: 3,
    name: "Professional",
    price: 1999,
    popular: true,
    includes: ["E-commerce", "Payment Gateway", "Admin Panel"],
    features: [
      "Full E-commerce Functionality",
      "Payment Gateway Integration",
      "Admin Dashboard",
      "Priority Delivery: 3 Weeks",
      "User Authentication",
      "Inventory Management",
      "6 Months Support",
    ],
  },
  {
    id: 4,
    name: "Business",
    price: 3499,
    popular: false,
    includes: ["Custom Web App", "API Integration", "Database Design"],
    features: [
      "Custom Web Application",
      "Advanced Database Design",
      "Third-party API Integrations",
      "Priority Delivery: 4 Weeks",
      "Performance Optimization",
      "Security Audits",
      "Automated Backups",
      "1 Year Support",
    ],
  },
  {
    id: 5,
    name: "Enterprise",
    price: 7999,
    popular: false,
    includes: ["Full Scale Solution", "Mobile App", "Dedicated Team", "Cloud Infrastructure"],
    features: [
      "Enterprise Grade Solution",
      "Mobile Application (iOS & Android)",
      "Dedicated Development Team",
      "Cloud Infrastructure Setup",
      "Custom Features & Modules",
      "24/7 Priority Support",
      "SLA Guarantee",
      "Scalable Architecture",
      "Consulting & Strategy",
      "Lifetime Maintenance",
    ],
  },
];

export const portfolioImages = [
  {
    id: 1,
    title: "Fintech Dashboard",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=800&fit=crop",
  },
  {
    id: 2,
    title: "Healthcare App",
    category: "Mobile Apps",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=800&fit=crop",
  },
  {
    id: 3,
    title: "E-commerce Store",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=800&h=800&fit=crop",
  },
  {
    id: 4,
    title: "Real Estate Platform",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=800&fit=crop",
  },
  {
    id: 5,
    title: "Education Portal",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=800&fit=crop",
  },
  {
    id: 6,
    title: "Restaurant Booking",
    category: "App Development",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=800&fit=crop",
  },
  {
    id: 7,
    title: "Travel Agency Site",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=800&fit=crop",
  },
  {
    id: 8,
    title: "Fitness Tracker",
    category: "Mobile Apps",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=800&fit=crop",
  },
  {
    id: 9,
    title: "Corporate Portal",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=800&fit=crop",
  },
  {
    id: 10,
    title: "Social Media Campaign",
    category: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=800&fit=crop",
  },
  {
    id: 11,
    title: "Tech Brand Identity",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=800&fit=crop",
  },
  {
    id: 12,
    title: "Event Promotion",
    category: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=800&fit=crop",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    company: "Tech Solutions Pvt Ltd",
    content: "Infrio Infotech delivered an exceptional website that perfectly represents our brand. The turnaround time was impressive!",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    company: "Boutique Fashion",
    content: "Amazing work on our custom software solution. Very professional and skilled team!",
    rating: 5,
  },
  {
    id: 3,
    name: "Amit Patel",
    company: "Food Junction",
    content: "The festival posters have been a huge hit on our social media. Great value for money!",
    rating: 5,
  },
];

export const whyChooseUs = [
  {
    title: "Fast Delivery",
    description: "Get your designs within 24-48 hours with our express delivery options.",
    icon: "Zap",
  },
  {
    title: "Professional Quality",
    description: "Premium designs crafted by experienced graphic designers with attention to detail.",
    icon: "Award",
  },
  {
    title: "Affordable Pricing",
    description: "Competitive prices without compromising on quality. Best value in the market.",
    icon: "IndianRupee",
  },
  {
    title: "Dedicated Support",
    description: "We ensure your software runs smoothly with our dedicated support team.",
    icon: "RefreshCw",
  },
];

export const iconComponents = {
  Zap: <Zap size={28} />,
  Award: <Award size={28} />,
  IndianRupee: <IndianRupee size={28} />,
  RefreshCw: <RefreshCw size={28} />,
};
