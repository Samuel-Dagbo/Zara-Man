import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import './globals.css';
import Providers from './providers';

export const metadata = {
  title: 'OSEBO 247 — Premium Fashion & Style',
  description: 'Discover curated premium fashion and style at OSEBO 247. Elevate your wardrobe with our exclusive collections.',
  keywords: 'fashion, osebo 247, premium, suits, watches, shoes, accessories, style',
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
