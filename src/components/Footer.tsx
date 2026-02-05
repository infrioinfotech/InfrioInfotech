import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center mb-6">
              <span className="text-3xl font-black text-[#e11d48]">9</span>
              <span className="text-3xl font-black text-white tracking-tight">GRAPHIX</span>
            </div>
            <p className="text-white/70 mb-6 leading-relaxed">
              Professional logo design and graphic design services that help businesses stand out with stunning visuals.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#e11d48] transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#e11d48] transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#e11d48] transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#e11d48] transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/services", label: "Services" },
                { href: "/pricing", label: "Pricing" },
                  { href: "/portfolio", label: "Portfolio" },
                  { href: "/testimonials", label: "Testimonials" },
                  { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-[#e11d48] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              {[
                "Logo Design",
                "Intro Video",
                "Visiting Card Design",
                "Letterhead Design",
                "Envelope Design",
                "Festival Posters",
              ].map((service) => (
                <li key={service}>
                  <span className="text-white/70">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-[#e11d48] mt-1 flex-shrink-0" />
                <span className="text-white/70">+91 9054747808</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-[#e11d48] mt-1 flex-shrink-0" />
                <span className="text-white/70">contact@9graphix.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#e11d48] mt-1 flex-shrink-0" />
                <span className="text-white/70">India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/50">
            &copy; {new Date().getFullYear()} 9Graphix. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
