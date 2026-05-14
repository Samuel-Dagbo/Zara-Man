'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  HiOutlineHome, HiOutlineShoppingBag, HiOutlineUser, HiOutlineLogout,
  HiOutlineCollection, HiOutlineGlobeAlt, HiOutlineMenu, HiOutlineX, HiOutlineMail,
  HiOutlineCash, HiOutlineChartBar, HiOutlineTrendingUp,
} from 'react-icons/hi';

const links = [
  { href: '/', label: 'Home', icon: HiOutlineGlobeAlt },
  { href: '/dashboard/admin', label: 'Dashboard', icon: HiOutlineHome },
  { href: '/dashboard/admin/pos', label: 'POS', icon: HiOutlineCash },
  { href: '/dashboard/admin/sales', label: 'Sales', icon: HiOutlineChartBar },
  { href: '/dashboard/admin/menu', label: 'Products', icon: HiOutlineCollection },
  { href: '/dashboard/admin/orders', label: 'Orders', icon: HiOutlineShoppingBag },
  { href: '/dashboard/admin/analytics', label: 'Analytics', icon: HiOutlineTrendingUp },
  { href: '/dashboard/admin/contacts', label: 'Messages', icon: HiOutlineMail },
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
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-gold-500 text-dark-950 flex items-center justify-center shadow-lg shadow-gold-500/20 hover:bg-gold-400 transition-colors"
        aria-label="Open menu"
      >
        <HiOutlineMenu className="w-5 h-5" />
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-dark-950 min-h-screen flex flex-col border-r border-gold-500/10 transform transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gold-500/10">
          <Link href="/" className="font-display text-lg font-bold tracking-wider text-gold-500">
            <span className="text-gold-400">OSEBO</span> 247
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-gold-500/40 hover:text-gold-500 transition-colors"
            aria-label="Close menu"
          >
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>
        <p className="px-6 py-3 text-gold-500 text-[10px] tracking-[0.2em] uppercase font-bold border-b border-gold-500/10">Admin Panel</p>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {links.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 text-xs transition-all duration-200 ${
                  isActive
                    ? 'bg-gold-500 text-dark-950 font-bold shadow-lg shadow-gold-500/10'
                    : 'text-gold-500/60 hover:bg-gold-500/10 hover:text-gold-400 hover:translate-x-1'
                }`}
              >
                <link.icon className="w-4 h-4 flex-shrink-0" />
                <span className="tracking-wider uppercase text-[10px]">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gold-500/10">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-3 px-4 py-3 text-xs text-gold-500/40 hover:bg-gold-500/10 hover:text-gold-500 w-full transition-all duration-200"
          >
            <HiOutlineLogout className="w-4 h-4 flex-shrink-0" />
            <span className="tracking-wider uppercase text-[10px]">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
