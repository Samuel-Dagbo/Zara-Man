'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineShoppingBag, HiOutlineUser, HiOutlineMenu, HiOutlineX, HiOutlineHeart } from 'react-icons/hi';
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-cream/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="font-display text-2xl md:text-3xl font-bold text-espresso tracking-wider">
              BOUTIQUE
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm tracking-widest uppercase text-espresso/80 hover:text-espresso transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setCartOpen(!cartOpen)}
                className="relative p-2 text-espresso hover:text-gold-500 transition-colors"
              >
                <HiOutlineShoppingBag className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>

              {session ? (
                <Link
                  href={`/dashboard/${session.user.role === 'admin' ? 'admin' : 'user'}`}
                  className="p-2 text-espresso hover:text-gold-500 transition-colors"
                >
                  <HiOutlineUser className="w-6 h-6" />
                </Link>
              ) : (
                <Link
                  href="/auth/signin"
                  className="hidden md:inline-block text-sm tracking-widest uppercase text-espresso/80 hover:text-espresso transition-colors"
                >
                  Sign In
                </Link>
              )}

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-espresso"
              >
                {mobileOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-cream border-t border-luxury-100"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm tracking-widest uppercase text-espresso/80 hover:text-espresso py-2"
                  >
                    {link.label}
                  </Link>
                ))}
                {!session && (
                  <Link
                    href="/auth/signin"
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm tracking-widest uppercase text-espresso bg-gold-500/10 px-4 py-2"
                  >
                    Sign In
                  </Link>
                )}
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
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-cream z-50 shadow-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-luxury-200">
                  <h2 className="font-display text-xl font-semibold">Your Cart</h2>
                  <button onClick={() => setCartOpen(false)} className="p-2 hover:text-gold-500">
                    <HiOutlineX className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <HiOutlineShoppingBag className="w-16 h-16 mx-auto text-luxury-300 mb-4" />
                      <p className="text-luxury-500">Your cart is empty</p>
                    </div>
                  ) : (
                    cart.map((item, index) => (
                      <div key={index} className="flex gap-4 bg-white p-4 border border-luxury-100">
                        <div className="w-20 h-24 bg-luxury-100 flex-shrink-0">
                          {item.image && (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm truncate">{item.name}</h3>
                          {item.size && <p className="text-xs text-luxury-500">Size: {item.size}</p>}
                          {item.color && <p className="text-xs text-luxury-500">Color: {item.color}</p>}
                          <p className="text-sm font-semibold mt-1">{formatPrice(item.price)}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                              className="w-7 h-7 border border-luxury-200 flex items-center justify-center text-sm hover:bg-luxury-100"
                            >-</button>
                            <span className="text-sm w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                              className="w-7 h-7 border border-luxury-200 flex items-center justify-center text-sm hover:bg-luxury-100"
                            >+</button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-luxury-400 hover:text-red-500 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="border-t border-luxury-200 p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-display text-lg">Total</span>
                      <span className="font-display text-xl font-bold">{formatPrice(cartTotal)}</span>
                    </div>
                    <Link
                      href="/checkout"
                      onClick={() => setCartOpen(false)}
                      className="block w-full bg-espresso text-cream text-center py-3 tracking-wider uppercase text-sm hover:bg-gold-500 hover:text-espresso transition-colors"
                    >
                      Checkout
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
