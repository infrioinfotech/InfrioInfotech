"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import Link from "next/link";

interface PricingCardProps {
  name: string;
  price: number;
  popular: boolean;
  includes: string[];
  features: string[];
  index: number;
  onSelect: () => void;
}

export function PricingCard({ name, price, popular, includes, features, index, onSelect }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative bg-white rounded-3xl p-8 {
        popular
          ? "border-2 border-[#e11d48] shadow-2xl shadow-[#e11d48]/20 scale-105"
          : "border border-gray-200 hover:border-[#e11d48]/50"
      } transition-all duration-500 hover:-translate-y-2`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="bg-gradient-to-r from-[#e11d48] to-[#be123c] text-white px-6 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
            <Star size={14} fill="currentColor" />
            Most Popular
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-3xl font-bold text-[#e11d48]">₹</span>
          <span className="text-5xl font-black text-gray-900">{price.toLocaleString()}</span>
        </div>
      </div>

      <div className="mb-6 pb-6 border-b border-gray-100">
        <p className="text-sm font-semibold text-gray-500 mb-3">INCLUDES:</p>
        <div className="flex flex-wrap gap-2">
          {includes.map((item) => (
            <span key={item} className="text-xs bg-[#e11d48]/10 text-[#e11d48] px-3 py-1 rounded-full font-medium">
              {item}
            </span>
          ))}
        </div>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check size={18} className="text-[#e11d48] mt-0.5 flex-shrink-0" />
            <span className="text-gray-600 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/order"
        onClick={onSelect}
        className={`block w-full text-center py-4 rounded-xl font-bold transition-all duration-300 {
          popular
            ? "bg-gradient-to-r from-[#e11d48] to-[#be123c] text-white hover:shadow-lg hover:shadow-[#e11d48]/30"
            : "bg-gray-900 text-white hover:bg-[#e11d48]"
        }`}
      >
        Order Now
      </Link>
    </motion.div>
  );
}
