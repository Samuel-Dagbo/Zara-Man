'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  HiOutlineHome, HiOutlineShoppingBag, HiOutlineUser, HiOutlineLogout,
  HiOutlineCollection, HiOutlineMail, HiOutlineChartBar,
} from 'react-icons/hi';

const links = [
  { href: '/dashboard/admin', label: 'Dashboard', icon: HiOutlineHome },
  { href: '/dashboard/admin/menu', label: 'Products', icon: HiOutlineCollection },
  { href: '/dashboard/admin/orders', label: 'Orders', icon: HiOutlineShoppingBag },
  { href: '/dashboard/admin/users', label: 'Users', icon: HiOutlineUser },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-espresso min-h-screen flex flex-col">
      <div className="p-6 border-b border-luxury-700">
        <Link href="/" className="font-display text-xl font-bold text-cream tracking-wider">
          ZARA MAN 247
        </Link>
        <p className="text-gold-500 text-xs tracking-wider uppercase mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map(link => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-gold-500 text-espresso'
                  : 'text-luxury-300 hover:bg-luxury-700 hover:text-cream'
              }`}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-luxury-700">
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-3 px-4 py-3 text-sm text-luxury-400 hover:bg-red-500/20 hover:text-red-400 w-full transition-all duration-200"
        >
          <HiOutlineLogout className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
