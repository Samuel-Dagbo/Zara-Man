'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('boutique-cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('boutique-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product, quantity = 1, size = '', color = '') => {
    setCart(prev => {
      const existing = prev.find(item =>
        item._id === product._id && item.size === size && item.color === color
      );
      if (existing) {
        toast.success('Quantity updated in cart');
        return prev.map(item =>
          item._id === product._id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      toast.success('Added to cart');
      return [...prev, {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || '',
        quantity,
        size,
        color,
      }];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
    toast.success('Removed from cart');
  }, []);

  const updateQuantity = useCallback((index, quantity) => {
    if (quantity < 1) return;
    setCart(prev => prev.map((item, i) =>
      i === index ? { ...item, quantity } : item
    ));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    toast.success('Cart cleared');
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      cartOpen, setCartOpen, cartTotal, cartCount,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
