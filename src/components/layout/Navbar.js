'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineShoppingBag, HiOutlineUser, HiOutlineMenu, HiOutlineX, HiOutlineSearch, HiOutlineLogout, HiOutlineTemplate } from 'react-icons/hi';
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const dashboardHref = session
    ? `/dashboard/${session.user.role === 'admin' ? 'admin' : 'user'}`
    : '/auth/signin';

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link
              href="/"
              className="font-display text-2xl md:text-3xl font-bold tracking-[0.15em] text-espresso"
            >
              ZARA MAN 247
            </Link>

            <div className="hidden md:flex items-center gap-10">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm tracking-[0.2em] uppercase font-medium text-espresso/80 hover:text-espresso transition-all duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gold-500 transition-all duration-500 group-hover:w-full" />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 text-espresso hover:text-gold-500 transition-colors"
                aria-label="Search"
              >
                <HiOutlineSearch className="w-5 h-5" />
              </button>

              <button
                onClick={() => setCartOpen(!cartOpen)}
                className="relative p-2 text-espresso hover:text-gold-500 transition-colors"
                aria-label="Cart"
              >
                <HiOutlineShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg">
                    {cartCount}
                  </span>
                )}
              </button>

              {session ? (
                <div className="flex items-center gap-3">
                  <span className="hidden lg:inline text-sm text-luxury-500">
                    Hi, <span className="text-espresso font-medium">{session.user.name?.split(' ')[0] || 'User'}</span>
                  </span>
                  <Link
                    href={dashboardHref}
                    className="hidden lg:flex items-center gap-2 px-4 py-2 text-xs tracking-[0.2em] uppercase font-medium bg-espresso text-cream hover:bg-gold-500 hover:text-espresso transition-all duration-300"
                  >
                    <HiOutlineTemplate className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <Link
                    href={dashboardHref}
                    className="lg:hidden p-2 text-espresso hover:text-gold-500 transition-colors"
                    aria-label="Dashboard"
                  >
                    <HiOutlineUser className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="hidden lg:flex items-center gap-2 px-4 py-2 text-xs tracking-[0.2em] uppercase font-medium border border-espresso/30 text-espresso/70 hover:border-red-500 hover:text-red-500 transition-all duration-300"
                    aria-label="Sign out"
                  >
                    <HiOutlineLogout className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="hidden md:inline-block text-sm tracking-[0.2em] uppercase font-medium text-espresso/80 hover:text-espresso transition-colors"
                >
                  Sign In
                </Link>
              )}

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-espresso"
                aria-label="Menu"
              >
                {mobileOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
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
              className="border-t border-luxury-100 bg-cream"
            >
              <div className="max-w-3xl mx-auto px-4 py-6">
                <div className="relative group">
                  <HiOutlineSearch className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-400 group-focus-within:text-gold-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search for products, categories, collections..."
                    className="w-full pl-14 pr-6 py-4 bg-luxury-50 border-0 focus:ring-2 focus:ring-gold-500/30 focus:bg-white transition-all duration-300 text-espresso placeholder:text-luxury-400 rounded-none"
                    autoFocus
                  />
                  <button
                    onClick={() => setShowSearch(false)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-luxury-400 hover:text-espresso transition-colors"
                  >
                    <HiOutlineX className="w-5 h-5" />
                  </button>
                </div>
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
              className="fixed inset-0 top-0 bg-espresso/98 z-40 md:hidden"
            >
              <div className="flex flex-col items-center justify-center h-full px-8">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="absolute top-6 right-6 text-cream/80 hover:text-cream"
                  aria-label="Close menu"
                >
                  <HiOutlineX className="w-8 h-8" />
                </button>
                <nav className="space-y-8 text-center">
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
                        className="text-3xl font-display text-cream hover:text-gold-500 transition-colors tracking-wider"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  {session && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <p className="text-cream/60 text-sm tracking-wider">Welcome, {session.user.name?.split(' ')[0] || 'User'}</p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Link
                          href={dashboardHref}
                          onClick={() => setMobileOpen(false)}
                          className="block mt-4 border-2 border-gold-500 text-gold-500 px-10 py-4 tracking-[0.2em] uppercase text-sm font-medium hover:bg-gold-500 hover:text-espresso transition-all duration-300"
                        >
                          Dashboard
                        </Link>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <button
                          onClick={() => {
                            setMobileOpen(false);
                            signOut({ callbackUrl: '/' });
                          }}
                          className="block mt-4 border-2 border-cream/30 text-cream/70 px-10 py-4 tracking-[0.2em] uppercase text-sm font-medium hover:border-red-400 hover:text-red-400 transition-all duration-300 w-full"
                        >
                          Sign Out
                        </button>
                      </motion.div>
                    </>
                  )}
                  {!session && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Link
                        href="/auth/signin"
                        onClick={() => setMobileOpen(false)}
                        className="inline-block mt-8 border-2 border-gold-500 text-gold-500 px-10 py-4 tracking-[0.2em] uppercase text-sm font-medium hover:bg-gold-500 hover:text-espresso transition-all duration-300"
                      >
                        Sign In
                      </Link>
                    </motion.div>
                  )}
                  {!session && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                    >
                      <Link
                        href="/auth/signup"
                        onClick={() => setMobileOpen(false)}
                        className="block mt-4 text-cream/50 hover:text-cream text-sm tracking-wider uppercase transition-colors"
                      >
                        Create Account
                      </Link>
                    </motion.div>
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-cream z-50 shadow-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-luxury-200">
                  <div>
                    <h2 className="font-display text-2xl font-semibold">Shopping Cart</h2>
                    <p className="text-sm text-luxury-500 mt-1">{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
                  </div>
                  <button onClick={() => setCartOpen(false)} className="p-2 hover:text-gold-500 transition-colors" aria-label="Close cart">
                    <HiOutlineX className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-luxury-100 flex items-center justify-center">
                        <HiOutlineShoppingBag className="w-10 h-10 text-luxury-400" />
                      </div>
                      <p className="font-display text-xl text-espresso mb-2">Your cart is empty</p>
                      <p className="text-luxury-500 text-sm">Add some luxury pieces to get started</p>
                      <button
                        onClick={() => { setCartOpen(false); }}
                        className="mt-6 bg-espresso text-cream px-8 py-3 tracking-wider uppercase text-sm font-medium hover:bg-gold-500 hover:text-espresso transition-all duration-300"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  ) : (
                    cart.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex gap-4 bg-white p-4 border border-luxury-100 group hover:border-gold-500/30 transition-all duration-300"
                      >
                        <div className="w-20 h-24 bg-luxury-100 flex-shrink-0 overflow-hidden">
                          {item.image && (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm truncate">{item.name}</h3>
                          {item.size && <p className="text-xs text-luxury-500 mt-0.5">Size: {item.size}</p>}
                          {item.color && <p className="text-xs text-luxury-500">Color: {item.color}</p>}
                          <p className="text-sm font-semibold mt-1 text-gold-600">{formatPrice(item.price)}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center border border-luxury-200">
                              <button
                                onClick={() => updateQuantity(index, item.quantity - 1)}
                                className="w-7 h-7 flex items-center justify-center text-sm hover:bg-luxury-100 transition-colors"
                                aria-label="Decrease quantity"
                              >−</button>
                              <span className="text-sm w-8 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(index, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center text-sm hover:bg-luxury-100 transition-colors"
                                aria-label="Increase quantity"
                              >+</button>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-luxury-400 hover:text-red-500 text-xs uppercase tracking-wider transition-colors self-start"
                          aria-label="Remove item"
                        >
                          Remove
                        </button>
                      </motion.div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="border-t border-luxury-200 p-6 space-y-4 bg-white">
                    <div className="flex justify-between items-center">
                      <span className="font-display text-lg text-espresso">Subtotal</span>
                      <span className="font-display text-xl font-bold text-gold-600">{formatPrice(cartTotal)}</span>
                    </div>
                    <p className="text-xs text-luxury-500">Shipping & taxes calculated at checkout</p>
                    <Link
                      href={session ? '/checkout' : '/auth/signin'}
                      onClick={() => setCartOpen(false)}
                      className="block w-full bg-espresso text-cream text-center py-4 tracking-[0.2em] uppercase text-sm font-medium hover:bg-gold-500 hover:text-espresso transition-all duration-300"
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
