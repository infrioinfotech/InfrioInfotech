"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-3xl font-black text-[#e11d48]">9</span>
              <span className="text-3xl font-black text-white tracking-tight">GRAPHIX</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-[#e11d48] transition-colors duration-300 font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/order"
              className="bg-[#e11d48] hover:bg-[#be123c] text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-white/80 hover:text-[#e11d48] transition-colors py-2 font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/order"
                onClick={() => setIsOpen(false)}
                className="block bg-[#e11d48] hover:bg-[#be123c] text-white px-6 py-3 rounded-full font-semibold text-center mt-4"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
