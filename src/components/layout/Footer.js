'use client';

import Link from 'next/link';

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
  return (
    <footer className="bg-espresso text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="font-display text-2xl font-bold tracking-[0.15em]">
              ZARA MAN 247
            </Link>
            <p className="mt-4 text-luxury-300 text-sm leading-relaxed">
              Curating elegance for the modern gentleman since 2024. Discover handpicked luxury menswear and accessories that define timeless sophistication.
            </p>
            <div className="flex gap-4 mt-6">
              {['instagram', 'pinterest', 'facebook', 'twitter'].map(social => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 border border-luxury-600 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 transition-all text-sm uppercase tracking-wider"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-luxury-300 hover:text-gold-500 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-luxury-300 hover:text-gold-500 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-luxury-300 hover:text-gold-500 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-luxury-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-luxury-400 text-sm">
              &copy; {new Date().getFullYear()} Zara Man 247. All rights reserved.
            </p>
            <div className="flex gap-6 text-luxury-400 text-sm">
              <Link href="#" className="hover:text-gold-500 transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-gold-500 transition-colors">Terms</Link>
              <Link href="#" className="hover:text-gold-500 transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
