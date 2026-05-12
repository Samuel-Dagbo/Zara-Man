import { getServerSession } from 'next-auth';
import './globals.css';
import Providers from './providers';

export const metadata = {
  title: 'Boutique — Luxury Fashion & Accessories',
  description: 'Discover curated luxury fashion, accessories, jewelry, and more at Boutique. Elevate your style with our exclusive collections.',
  keywords: 'fashion, boutique, luxury, clothing, accessories, jewelry',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

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
