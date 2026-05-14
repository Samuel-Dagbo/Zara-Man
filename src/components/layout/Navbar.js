'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineShoppingBag, HiOutlineUser, HiOutlineMenu, HiOutlineX, HiOutlineSearch, HiOutlineLogout, HiOutlineTemplate, HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';
import { formatPrice } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { data: session } = useSession();
  const { cart, cartTotal, cartCount, cartOpen, setCartOpen, removeFromCart, updateQuantity } = useCart();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const dashboardHref = session
    ? `/dashboard/${session.user.role === 'admin' ? 'admin' : 'user'}`
    : '/auth/signin';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-dark-950/98 backdrop-blur-xl shadow-2xl shadow-gold-500/5 border-b border-gold-500/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            <Link
              href="/"
              className="font-display text-xl md:text-2xl font-bold tracking-[0.2em] text-gold-500 hover:text-gold-400 transition-colors duration-300"
            >
              <span className="text-gold-400">OSEBO</span> 247
            </Link>

            <div className="hidden md:flex items-center gap-12">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs tracking-[0.25em] uppercase font-semibold text-gold-500/70 hover:text-gold-400 transition-all duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold-500 transition-all duration-500 group-hover:w-full" />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2.5 text-gold-500/60 hover:text-gold-400 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <HiOutlineSun className="w-5 h-5" /> : <HiOutlineMoon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2.5 text-gold-500/60 hover:text-gold-400 transition-colors"
                aria-label="Search"
              >
                <HiOutlineSearch className="w-5 h-5" />
              </button>

              <button
                onClick={() => setCartOpen(!cartOpen)}
                className="relative p-2.5 text-gold-500/60 hover:text-gold-400 transition-colors"
                aria-label="Cart"
              >
                <HiOutlineShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gold-500 text-dark-950 text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>

              {session ? (
                <div className="hidden md:flex items-center gap-3 ml-2">
                  <Link
                    href={dashboardHref}
                    className="flex items-center gap-2.5 px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase font-bold bg-gold-500 text-dark-950 hover:bg-gold-400 transition-all duration-300 shadow-lg shadow-gold-500/20"
                  >
                    <HiOutlineTemplate className="w-3.5 h-3.5" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center gap-2 px-4 py-2.5 text-[10px] tracking-[0.2em] uppercase font-semibold text-gold-500/60 hover:text-gold-400 transition-colors"
                  >
                    <HiOutlineLogout className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase font-bold bg-gold-500 text-dark-950 hover:bg-gold-400 transition-all duration-300 shadow-lg shadow-gold-500/20 ml-2"
                >
                  <HiOutlineUser className="w-3.5 h-3.5" />
                  Sign In
                </Link>
              )}

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2.5 text-gold-500/60 hover:text-gold-400 transition-colors"
                aria-label="Menu"
              >
                {mobileOpen ? <HiOutlineX className="w-5 h-5" /> : <HiOutlineMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gold-500/10 bg-dark-950/98 backdrop-blur-xl"
            >
              <div className="max-w-3xl mx-auto px-4 py-6">
                <form onSubmit={handleSearch} className="relative group">
                  <HiOutlineSearch className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-500/40 group-focus-within:text-gold-400 transition-colors" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products, categories, collections..."
                    className="w-full pl-14 pr-20 py-4 bg-dark-900/80 border border-gold-500/20 focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/20 transition-all duration-300 text-white placeholder:text-dark-500 text-sm"
                    autoFocus
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gold-500 text-dark-950 text-[10px] font-bold uppercase tracking-wider hover:bg-gold-400 transition-colors"
                    >
                      Search
                    </button>
                    <button
                      type="button"
                      onClick={() => { setShowSearch(false); setSearchQuery(''); }}
                      className="p-2 text-gold-500/40 hover:text-gold-400 transition-colors"
                    >
                      <HiOutlineX className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-0 bg-dark-950/99 z-40 md:hidden"
            >
              <div className="flex flex-col items-center justify-center h-full px-8">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="absolute top-6 right-6 text-gold-500/60 hover:text-gold-400 transition-colors"
                  aria-label="Close menu"
                >
                  <HiOutlineX className="w-8 h-8" />
                </button>
                <nav className="space-y-10 text-center">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="text-3xl font-display text-gold-500 hover:text-gold-400 transition-colors tracking-wider"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="w-16 h-px bg-gold-500/40 mx-auto my-8" />
                  </motion.div>
                  {session ? (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <p className="text-gold-500/60 text-sm tracking-wider">Welcome, {session.user.name?.split(' ')[0] || 'User'}</p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Link
                          href={dashboardHref}
                          onClick={() => setMobileOpen(false)}
                          className="block mt-6 bg-gold-500 text-dark-950 px-12 py-4 tracking-[0.2em] uppercase text-sm font-bold hover:bg-gold-400 transition-all duration-300 shadow-lg shadow-gold-500/30"
                        >
                          Dashboard
                        </Link>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <button
                          onClick={() => { setMobileOpen(false); signOut({ callbackUrl: '/' }); }}
                          className="mt-4 text-gold-500/40 hover:text-gold-400 text-xs tracking-wider uppercase transition-colors"
                        >
                          Sign Out
                        </button>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Link
                          href="/auth/signin"
                          onClick={() => setMobileOpen(false)}
                          className="inline-block bg-gold-500 text-dark-950 px-12 py-4 tracking-[0.2em] uppercase text-sm font-bold hover:bg-gold-400 transition-all duration-300 shadow-lg shadow-gold-500/30"
                        >
                          Sign In
                        </Link>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Link
                          href="/auth/signup"
                          onClick={() => setMobileOpen(false)}
                          className="block mt-6 text-gold-500/60 hover:text-gold-400 text-sm tracking-wider uppercase transition-colors"
                        >
                          Create Account
                        </Link>
                      </motion.div>
                    </>
                  )}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-dark-950 border-l border-gold-500/10 z-50 shadow-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-gold-500/10">
                  <div>
                    <h2 className="font-display text-xl font-bold text-gold-500">Shopping Cart</h2>
                    <p className="text-xs text-gold-500/50 mt-1 tracking-wider uppercase">{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
                  </div>
                  <button onClick={() => setCartOpen(false)} className="p-2 text-gold-500/40 hover:text-gold-400 transition-colors" aria-label="Close cart">
                    <HiOutlineX className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-gold-500/20 flex items-center justify-center">
                        <HiOutlineShoppingBag className="w-8 h-8 text-gold-500/40" />
                      </div>
                      <p className="font-display text-lg text-gold-500 mb-2">Your cart is empty</p>
                      <p className="text-gold-500/40 text-xs tracking-wider uppercase">Add some luxury pieces to get started</p>
                      <Link
                        href="/shop"
                        onClick={() => setCartOpen(false)}
                        className="inline-block mt-8 bg-gold-500 text-dark-950 px-8 py-3.5 tracking-[0.15em] uppercase text-xs font-bold hover:bg-gold-400 transition-all duration-300 shadow-lg shadow-gold-500/20"
                      >
                        Continue Shopping
                      </Link>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <motion.div
                        key={item.cartItemId}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex gap-4 bg-dark-900/60 p-4 border border-gold-500/10 group hover:border-gold-500/30 transition-all duration-300"
                      >
                        <div className="w-20 h-24 bg-dark-800/80 flex-shrink-0 overflow-hidden border border-gold-500/10">
                          {item.image && (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm text-gold-400 truncate">{item.name}</h3>
                          {item.size && <p className="text-[11px] text-gold-500/40 mt-0.5">Size: {item.size}</p>}
                          {item.color && <p className="text-[11px] text-gold-500/40">Color: {item.color}</p>}
                          <p className="text-sm font-bold mt-1 text-gold-500">{formatPrice(item.price)}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center border border-gold-500/20">
                              <button
                                onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                                className="w-7 h-7 flex items-center justify-center text-xs text-gold-500/40 hover:bg-gold-500/10 transition-colors"
                              >−</button>
                              <span className="text-xs w-8 text-center text-gold-400 font-semibold">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center text-xs text-gold-500/40 hover:bg-gold-500/10 transition-colors"
                              >+</button>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-gold-500/30 hover:text-red-400 text-[10px] uppercase tracking-wider transition-colors self-start"
                        >
                          Remove
                        </button>
                      </motion.div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="border-t border-gold-500/10 p-6 space-y-4 bg-dark-900/40">
                    <div className="flex justify-between items-center">
                      <span className="font-display text-base text-gold-400">Subtotal</span>
                      <span className="font-display text-lg font-bold text-gold-500">{formatPrice(cartTotal)}</span>
                    </div>
                    <p className="text-[10px] text-gold-500/30 tracking-wider uppercase">Shipping & taxes calculated at checkout</p>
                    <Link
                      href={session ? '/checkout' : '/auth/signin'}
                      onClick={() => setCartOpen(false)}
                      className="block w-full bg-gold-500 text-dark-950 text-center py-4 tracking-[0.15em] uppercase text-xs font-bold hover:bg-gold-400 transition-all duration-300 shadow-lg shadow-gold-500/20"
                    >
                      {session ? 'Proceed to Checkout' : 'Sign in to Checkout'}
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
