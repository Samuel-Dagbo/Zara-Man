'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { HiOutlineArrowRight } from 'react-icons/hi';

export default function Hero() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imageParallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const fadeOut = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-espresso">
      <div className="absolute inset-0 flex">
        {/* Left side */}
        <div className="hidden lg:flex w-1/2 h-full bg-espresso relative z-10 overflow-hidden">
          {/* Grain texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '256px 256px',
              opacity: 0.035,
            }}
          />

          {/* Decorative "2026" background */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none">
            <span className="block text-[200px] font-display font-bold text-cream/[0.025] leading-none tracking-tight">
              2026
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center w-full h-full pt-28 pb-12 px-12 xl:px-20 relative">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-3 text-gold-500 tracking-[0.25em] uppercase text-xs font-semibold mb-10"
              >
                <span className="w-10 h-px bg-gold-500" />
                New Collection 2026
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl sm:text-7xl lg:text-8xl font-display font-bold text-cream leading-[0.88] tracking-tight"
              >
                Redefine
                <br />
                <span className="text-gradient-light">Masculine</span>
                <br />
                Elegance
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="h-px bg-gradient-to-r from-gold-500/80 to-transparent w-20 mt-8 origin-left"
              />

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 text-base text-cream/50 max-w-sm leading-relaxed font-light"
              >
                Curated collections of premium menswear and accessories for the modern gentleman who appreciates refined craftsmanship.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 flex items-center gap-6"
              >
                <Link
                  href="/shop"
                  className="group relative bg-gold-500 text-espresso px-10 py-5 tracking-[0.2em] uppercase text-xs font-semibold overflow-hidden flex items-center gap-3"
                >
                  <span className="relative z-10">Explore Collection</span>
                  <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Link>
                <Link
                  href="/about"
                  className="group text-cream/70 hover:text-cream tracking-[0.2em] uppercase text-xs font-semibold flex items-center gap-3 transition-colors duration-300"
                >
                  <span>Our Story</span>
                  <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Right side - Image with parallax */}
        <div className="w-full lg:w-1/2 h-full relative overflow-hidden">
          <motion.div style={{ y: imageParallaxY }} className="absolute inset-0 will-change-transform">
            <Image
              src="https://images.pexels.com/photos/6626361/pexels-photo-6626361.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Elegant menswear"
              fill
              className="object-cover object-top"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-espresso/40 via-espresso/10 to-transparent lg:bg-gradient-to-l lg:from-espresso/30 lg:to-transparent" />
        </div>
      </div>

      {/* Mobile overlay content */}
      <div className="absolute inset-0 z-10 lg:hidden bg-gradient-to-r from-espresso via-espresso/70 to-transparent">
        <div className="flex flex-col justify-center h-full pt-24 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-3 text-gold-500 tracking-[0.2em] uppercase text-[10px] font-semibold mb-6">
              <span className="w-8 h-px bg-gold-500" />
              New Collection 2026
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-cream leading-[0.9] tracking-tight">
              Redefine
              <br />
              <span className="text-gradient-light">Masculine</span>
              <br />
              Elegance
            </h1>

            <p className="mt-5 text-sm text-cream/50 max-w-xs leading-relaxed font-light">
              Curated collections of premium menswear and accessories for the modern gentleman.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex items-center gap-5"
            >
              <Link
                href="/shop"
                className="group relative bg-gold-500 text-espresso px-8 py-4 tracking-[0.15em] uppercase text-[10px] font-semibold overflow-hidden flex items-center gap-2"
              >
                <span className="relative z-10">Explore</span>
                <HiOutlineArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300 relative z-10" />
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
              <Link
                href="/about"
                className="text-cream/70 hover:text-cream tracking-[0.15em] uppercase text-[10px] font-semibold flex items-center gap-2 transition-colors duration-300"
              >
                <span>Our Story</span>
                <HiOutlineArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: fadeOut }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-3"
      >
        <svg width="20" height="32" viewBox="0 0 20 32" fill="none" className="text-cream/25">
          <rect x="1.5" y="1.5" width="17" height="29" rx="8.5" stroke="currentColor" strokeWidth="1.5" />
          <motion.circle
            cx="10" cy="10" r="2.5"
            fill="currentColor"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
        <span className="text-cream/20 text-[9px] tracking-[0.35em] uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}
