'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  HiOutlineHome, HiOutlineShoppingBag, HiOutlineUser, HiOutlineLogout,
  HiOutlineCollection, HiOutlineGlobeAlt, HiOutlineMenu, HiOutlineX,
} from 'react-icons/hi';

const links = [
  { href: '/', label: 'Home', icon: HiOutlineGlobeAlt },
  { href: '/dashboard/admin', label: 'Dashboard', icon: HiOutlineHome },
  { href: '/dashboard/admin/menu', label: 'Products', icon: HiOutlineCollection },
  { href: '/dashboard/admin/orders', label: 'Orders', icon: HiOutlineShoppingBag },
  { href: '/dashboard/admin/users', label: 'Users', icon: HiOutlineUser },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-espresso text-cream rounded-lg flex items-center justify-center shadow-lg hover:bg-gold-500 transition-colors"
        aria-label="Open menu"
      >
        <HiOutlineMenu className="w-5 h-5" />
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 premium-gradient min-h-screen flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-6 border-b border-luxury-700/50">
          <Link href="/" className="font-display text-xl font-bold text-cream tracking-wider hover:text-gold-500 transition-colors">
            ZARA MAN 247
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-cream/60 hover:text-cream transition-colors"
            aria-label="Close menu"
          >
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>
        <p className="px-6 pb-2 text-gold-500 text-xs tracking-wider uppercase font-medium">Admin Panel</p>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {links.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-espresso font-medium shadow-lg shadow-gold-500/20'
                    : 'text-luxury-300 hover:bg-luxury-700/50 hover:text-cream hover:translate-x-1'
                }`}
              >
                <link.icon className="w-5 h-5 flex-shrink-0" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-luxury-700/50">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-3 px-4 py-3 text-sm text-luxury-400 hover:bg-red-500/20 hover:text-red-400 w-full transition-all duration-200 rounded-lg"
          >
            <HiOutlineLogout className="w-5 h-5 flex-shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
