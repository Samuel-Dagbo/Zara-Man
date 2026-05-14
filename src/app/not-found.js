import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-display font-bold text-gold-500/20 mb-4">404</div>
        <h1 className="text-3xl font-display font-bold text-gold-500 mb-3">Page Not Found</h1>
        <p className="text-gold-500/50 text-sm mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/" className="btn-primary text-xs">Back to Home</Link>
          <Link href="/shop" className="btn-secondary text-xs">Browse Shop</Link>
        </div>
      </div>
    </div>
  );
}
