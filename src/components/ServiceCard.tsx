"use client";

import { motion } from "framer-motion";
import { Palette, Video, CreditCard, FileText, Mail, Image, Award } from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, React.ReactNode> = {
  Palette: <Palette size={32} />,
  Video: <Video size={32} />,
  CreditCard: <CreditCard size={32} />,
  FileText: <FileText size={32} />,
  Mail: <Mail size={32} />,
  Image: <Image size={32} />,
  Award: <Award size={32} />,
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
}

export function ServiceCard({ title, description, icon, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-2xl hover:shadow-[#e11d48]/10 transition-all duration-500 hover:-translate-y-2"
    >
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#e11d48] to-[#be123c] flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
        {iconMap[icon] || <Palette size={32} />}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
      <Link
        href="/pricing"
        className="inline-flex items-center text-[#e11d48] font-semibold hover:gap-3 gap-2 transition-all duration-300"
      >
        View Packages
        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
      </Link>
    </motion.div>
  );
}
