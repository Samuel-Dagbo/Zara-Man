'use client';

import { SessionProvider } from 'next-auth/react';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children, session }) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#2C1810',
              color: '#FFF8F0',
              borderRadius: 0,
              fontFamily: 'Inter, system-ui, sans-serif',
            },
          }}
        />
      </CartProvider>
    </SessionProvider>
  );
}
