"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PortfolioCardProps {
  title: string;
  category: string;
  image: string;
  index: number;
}

export function PortfolioCard({ title, category, image, index }: PortfolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-square"
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <span className="text-[#e11d48] text-sm font-medium">{category}</span>
        <h3 className="text-white text-xl font-bold mt-1">{title}</h3>
      </div>
    </motion.div>
  );
}
