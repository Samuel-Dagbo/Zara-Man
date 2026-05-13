import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import './globals.css';
import Providers from './providers';

export const metadata = {
  title: 'Zara Man 247 — Luxury Menswear & Accessories',
  description: 'Discover curated luxury menswear, suits, watches, shoes and accessories at Zara Man 247. Elevate your style with our exclusive gentlemen collections.',
  keywords: 'menswear, zara man 247, luxury, suits, watches, shoes, accessories, gentlemen',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen">
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
