import { Palette, Layout, FileText, Video, Globe, Smartphone, Server, Database, Cloud, Code, CheckCircle, Monitor, Shield } from "lucide-react";

export const services = [
  {
    id: 1,
    title: "Web Development",
    description: "Modern websites built with passion using React, Next.js, and Node.js. We focus on creating clean, responsive, and functional web experiences.",
    icon: Globe,
    slug: "web-development",
  },
  {
    id: 2,
    title: "Software Solutions",
    description: "Efficient software tools tailored to solve real problems. From simple management systems to automation scripts, we build what you need.",
    icon: Code,
    slug: "software-solutions",
  },
  {
    id: 3,
    title: "App Development",
    description: "User-friendly mobile apps for Android and iOS. We apply our learning to build functional and engaging mobile experiences.",
    icon: Smartphone,
    slug: "app-development",
  },
  {
    id: 4,
    title: "UI/UX Design",
    description: "Clean and intuitive designs. We focus on usability and simplicity to ensure users can navigate your product with ease.",
    icon: Layout,
    slug: "ui-ux-design",
  },
  {
    id: 5,
    title: "Cloud Basics",
    description: "Helping you get started with cloud hosting. We assist with deployment and basic infrastructure on platforms like AWS and Vercel.",
    icon: Cloud,
    slug: "cloud-basics",
  },
  {
    id: 6,
    title: "Tech Consulting",
    description: "Honest technology advice for your ideas. We help you choose the right tools and stack for your specific project needs.",
    icon: Server,
    slug: "tech-consulting",
  },
];
export const portfolioImages = [
  {
    id: 1,
    title: "VisitSafe",
    category: "Security System",
    description: "A smart, cloud-based visitor management and society security system for residential societies and gated communities. Features digital visitor entry, real-time approval notifications, and centralized admin dashboard.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    id: 2,
    title: "SSEMS",
    category: "Event Management",
    description: "Smart Seminar & Event Management System - A full-stack web application to digitize and automate seminar and academic event management in educational institutions with real-time data management.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=800&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    id: 3,
    title: "DineEasy",
    category: "Restaurant Software",
    description: "QR-based restaurant management software for cafes and restaurants. Customers scan QR at tables to order and pay online, streamlining the entire dining experience.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=800&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    id: 4,
    title: "AI Robotic Interview",
    category: "AI Solutions",
    description: "AI-powered automated interview system that helps HR and companies screen candidates in the first round efficiently, saving time and resources in the recruitment process.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=800&fit=crop",
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
  },
  {
    id: 5,
    title: "AI Resume Parser",
    category: "AI Solutions",
    description: "Intelligent resume parsing system that automatically extracts and analyzes candidate information, helping HR teams quickly identify the best candidates from large applicant pools.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=800&fit=crop",
    technologies: ["Python", "NLP", "React", "Node.js"],
  },
  {
    id: 6,
    title: "SmallShopStocker",
    category: "Inventory Management",
    description: "A perfect inventory management application for small shops like Pan Parlours in India. Track stock levels, get low-stock alerts, discover nearby wholesalers, and order directly from the dashboard.",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=800&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
  },
];

export const bestWorkProjects = [
  {
    id: 1,
    title: "AI Robotic Interview",
    category: "AI Solutions",
    description:
      "AI-powered automated interview system that helps HR and companies screen candidates in the first round efficiently, saving time and resources in the recruitment process.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=800&fit=crop",
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
  },
  {
    id: 2,
    title: "SSEMS",
    category: "Event Management",
    description:
      "Smart Seminar & Event Management System - A full-stack web application to digitize and automate seminar and academic event management in educational institutions with real-time data management.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=800&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    id: 3,
    title: "DineEasy",
    category: "Restaurant Software",
    description:
      "QR-based restaurant management software for cafes and restaurants. Customers scan QR at tables to order and pay online, streamlining the entire dining experience.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=800&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
  },
];

export const allProjects = [
  ...portfolioImages,
  {
    id: 7,
    title: "Medical Payment Reminder",
    category: "Healthcare Software",
    description:
      "Medical Payment Reminder is a lightweight system that helps clinics and hospitals automatically remind patients about pending medical bills and follow-ups through digital notifications.",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=800&fit=crop",
    technologies: ["Node.js", "Express", "MongoDB", "React"],
    link: "https://github.com/infrioinfotech/Medical-Payment-Reminder",
  },
];

// export const portfolioImages = [
//   {
//     id: 1,
//     title: "E-commerce Concept",
//     category: "Web Development",
//     image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 2,
//     title: "Inventory System Demo",
//     category: "Software Solutions",
//     image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 3,
//     title: "Fitness App Prototype",
//     category: "Mobile App",
//     image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 4,
//     title: "Website Redesign Project",
//     category: "Web Design",
//     image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 5,
//     title: "Cloud Setup Demo",
//     category: "Cloud Services",
//     image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 6,
//     title: "Banking App Concept",
//     category: "UI/UX Design",
//     image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//   },
// ];

export const pricingPackages = [
  {
    id: 1,
    name: "Starter",
    price: "499",
    description: "Perfect for personal projects and small startups getting started.",
    includes: ["Basic Website", "Hosting Setup"],
    features: [
      "Custom 5-Page Website",
      "Mobile Responsive Design",
      "Basic SEO Setup",
      "Contact Form Integration",
      "1 Month Support",
    ],
  },
  {
    id: 2,
    name: "Business",
    price: "999",
    description: "Great for growing businesses needing dynamic features.",
    includes: ["Dynamic Website", "CMS Integration", "SEO Basic"],
    features: [
      "Dynamic Web Application",
      "Content Management System",
      "Standard SEO Setup",
      "Social Media Links",
      "3 Months Support",
      "Performance Tuning",
    ],
    popular: true,
  },
  {
    id: 3,
    name: "Custom",
    price: "1999",
    description: "Tailored solutions for specific business requirements.",
    includes: ["E-commerce", "Custom Logic", "Admin Dashboard"],
    features: [
      "Custom Software Development",
      "Cloud Deployment",
      "API Integration",
      "Security Best Practices",
      "6 Months Support",
      "Direct Developer Access",
    ],
  },
];

export const testimonials = [];

export const whyChooseUs = [
  {
    title: "Passionate Team",
    description: "We are a team of dedicated learners and developers who put heart into every line of code.",
    icon: "Users",
  },
  {
    title: "Custom Approach",
    description: "We treat every project as a unique opportunity to create something special and tailored to you.",
    icon: "Settings",
  },
  {
    title: "Reliable Support",
    description: "We are always available to help you with updates, fixes, and questions about your project.",
    icon: "Clock",
  },
  {
    title: "Learning & Growth",
    description: "We constantly upgrade our skills to bring you the latest and most efficient technology solutions.",
    icon: "Award",
  },
];
