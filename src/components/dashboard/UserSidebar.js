'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { HiOutlineHome, HiOutlineShoppingBag, HiOutlineUser, HiOutlineLogout, HiOutlineHeart } from 'react-icons/hi';

const links = [
  { href: '/dashboard/user', label: 'Overview', icon: HiOutlineHome },
  { href: '/dashboard/user/orders', label: 'My Orders', icon: HiOutlineShoppingBag },
  { href: '/dashboard/user/profile', label: 'Profile', icon: HiOutlineUser },
];

export default function UserSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-luxury-100 min-h-screen flex flex-col">
      <div className="p-6 border-b border-luxury-100">
        <Link href="/" className="font-display text-xl font-bold text-espresso tracking-wider">
          ZARA MAN 247
        </Link>
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
                  ? 'bg-espresso text-cream'
                  : 'text-luxury-600 hover:bg-luxury-50 hover:text-espresso'
              }`}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-luxury-100">
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-3 px-4 py-3 text-sm text-luxury-600 hover:bg-red-50 hover:text-red-600 w-full transition-all duration-200"
        >
          <HiOutlineLogout className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
