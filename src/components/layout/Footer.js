'use client';

import Link from 'next/link';
import { useState } from 'react';
import { HiOutlineArrowRight, HiOutlineHeart } from 'react-icons/hi';

const footerLinks = {
  shop: [
    { label: 'New Arrivals', href: '/shop?category=new-arrivals' },
    { label: 'Suits & Blazers', href: '/shop?category=suits' },
    { label: 'Shirts', href: '/shop?category=shirts' },
    { label: 'Shoes', href: '/shop?category=shoes' },
    { label: 'Watches', href: '/shop?category=watches' },
    { label: 'Accessories', href: '/shop?category=accessories' },
  ],
  support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Shipping & Returns', href: '#' },
    { label: 'Size Guide', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Story', href: '/about' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-dark-950 text-gold-500/80 border-t border-gold-500/10 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="font-display text-2xl font-bold tracking-[0.2em] text-gold-500">
              <span className="text-gold-400">OSEBO</span> 247
            </Link>
            <p className="mt-5 text-gold-500/50 text-sm leading-relaxed max-w-sm">
              Curating elegance for the modern gentleman. Discover handpicked luxury menswear and accessories that define timeless sophistication.
            </p>
            <div className="flex gap-3 mt-8">
              {['instagram', 'pinterest', 'facebook', 'twitter'].map(social => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 border border-gold-500/20 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 hover:text-dark-950 transition-all text-[10px] uppercase tracking-wider text-gold-500/50"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key}>
              <h3 className="font-display text-sm font-bold text-gold-500 mb-5 uppercase tracking-[0.2em]">
                {key}
              </h3>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-gold-500/50 hover:text-gold-400 transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gold-500/10 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gold-500/30 text-xs tracking-wider">
              &copy; {new Date().getFullYear()} OSEBO 247. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-gold-500/30 text-xs tracking-wider">
              <Link href="#" className="hover:text-gold-400 transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-gold-400 transition-colors">Terms</Link>
              <Link href="#" className="hover:text-gold-400 transition-colors">Cookies</Link>
            </div>
            <div className="flex items-center gap-1.5 text-gold-500/30 text-xs">
              <span>Built by</span>
              <a href="https://samtechlabs.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gold-500/50 hover:text-gold-400 transition-colors font-semibold">
                Samtech Labs
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
