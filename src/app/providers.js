'use client';

import { SessionProvider } from 'next-auth/react';
import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children, session }) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <CartProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#111111',
                color: '#D4AF37',
                borderRadius: 0,
                border: '1px solid #2a2a2a',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '13px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                padding: '16px 24px',
              },
            }}
          />
        </CartProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
