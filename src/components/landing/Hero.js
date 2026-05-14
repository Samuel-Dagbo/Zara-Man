'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { HiOutlineArrowRight } from 'react-icons/hi';

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: 'calc(100vh - 80px)', marginTop: '80px' }}
    >
      {/* Main background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-950 to-black" />

      {/* Large ambient light glows */}
      <div className="absolute -top-40 -right-40 w-[900px] h-[900px] bg-gradient-radial from-gold-500/20 via-gold-500/5 to-transparent rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[700px] h-[700px] bg-gradient-radial from-gold-500/12 via-gold-500/3 to-transparent rounded-full pointer-events-none" />
      
      {/* Central warm glow behind headline */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/4 -translate-y-1/3 w-[600px] h-[600px]">
        <div className="absolute inset-0 bg-gradient-radial from-gold-500/10 via-gold-500/3 to-transparent rounded-full" />
      </div>

      {/* Decorative geometric elements */}
      <div className="absolute top-16 left-8 lg:left-16 w-px h-60 bg-gradient-to-b from-gold-500/30 via-gold-500/10 to-transparent" />
      <div className="absolute top-16 left-8 lg:left-16 w-20 h-px bg-gold-500/20" />
      <div className="absolute bottom-24 right-8 lg:right-16 w-px h-40 bg-gradient-to-t from-gold-500/30 via-gold-500/10 to-transparent" />
      <div className="absolute bottom-24 right-8 lg:right-16 w-16 h-px bg-gold-500/20" />

      {/* Large decorative gold frame - top right */}
      <div className="absolute top-12 right-12 w-32 h-32 border border-gold-500/10 hidden lg:block" />
      <div className="absolute top-14 right-14 w-28 h-28 border border-gold-500/5 hidden lg:block" />

      {/* Subtle gold grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(var(--gold-500) 1px, transparent 1px), linear-gradient(90deg, var(--gold-500) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

      <div className="relative h-full flex">
        {/* Left content panel */}
        <div className="w-full lg:w-1/2 flex items-center relative z-10">
          <div className="w-full py-16 px-6 md:px-12 xl:px-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-4 text-gold-500 tracking-[0.3em] uppercase text-[11px] font-bold mb-10"
              >
                <span className="w-12 h-px bg-gold-500/60" />
                New Collection 2026
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-[0.9] tracking-tight"
              >
                <span className="text-gold-500">Refined</span>
                <br />
                <span className="text-gold-400">Masculine</span>
                <br />
                <span className="text-gold-500">Elegance</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 text-base text-gold-500/50 max-w-md leading-relaxed font-light"
              >
                Curated collections of premium menswear and accessories for the modern gentleman who appreciates refined craftsmanship and timeless design.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mt-12 flex flex-wrap items-center gap-8"
              >
                <Link
                  href="/shop"
                  className="group relative bg-gold-500 text-dark-950 px-10 py-5 tracking-[0.2em] uppercase text-xs font-bold overflow-hidden flex items-center gap-3 hover:bg-gold-400 transition-all duration-500 shadow-xl shadow-gold-500/20"
                >
                  <span className="relative z-10">Explore Collection</span>
                  <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Link>
                <Link
                  href="/about"
                  className="group text-gold-500/60 hover:text-gold-400 tracking-[0.2em] uppercase text-xs font-bold flex items-center gap-3 transition-colors duration-300 border-2 border-gold-500/20 px-8 py-5 hover:border-gold-500/40"
                >
                  <span>Our Story</span>
                  <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Right image panel */}
        <div className="hidden lg:flex w-1/2 items-center justify-center p-8 xl:p-16 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md"
          >
            {/* Three layered glow behind image */}
            <div className="absolute -inset-8 bg-gradient-to-r from-gold-500/25 via-gold-500/10 to-transparent rounded-[3rem] blur-3xl" />
            <div className="absolute -inset-4 bg-gradient-to-b from-gold-500/15 to-transparent rounded-[2rem] blur-2xl" />
            
            {/* Image with premium frame */}
            <div className="relative overflow-hidden" style={{ boxShadow: '0 0 60px rgba(212,175,55,0.1), 0 0 120px rgba(212,175,55,0.05)' }}>
              {/* Gold border frame */}
              <div className="absolute inset-0 z-10 border-[3px] border-gold-500/20 pointer-events-none" />
              <div className="absolute inset-[12px] z-10 border border-gold-500/10 pointer-events-none" />
              
              <Image
                src="https://images.pexels.com/photos/6626361/pexels-photo-6626361.jpeg?auto=compress&cs=tinysrgb&w=1080"
                alt="Elegant menswear"
                width={500}
                height={700}
                className="w-full h-auto object-cover"
                priority
              />
              
              {/* Gradient overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-gold-500/10" />
            </div>

            {/* Corner decorative brackets */}
            <div className="absolute -top-3 -left-3 w-12 h-12 border-t-[3px] border-l-[3px] border-gold-500/40 z-20" />
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-[3px] border-r-[3px] border-gold-500/40 z-20" />
          </motion.div>
        </div>
      </div>

      {/* Mobile overlay */}
      <div className="absolute inset-0 lg:hidden">
        <div className="flex flex-col justify-center h-full py-12 px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-3 text-gold-500 tracking-[0.25em] uppercase text-[10px] font-bold mb-6">
              <span className="w-8 h-px bg-gold-500/60" />
              New Collection 2026
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold leading-[0.9] tracking-tight">
              <span className="text-gold-500">Refined</span>
              <br />
              <span className="text-gold-400">Masculine</span>
              <br />
              <span className="text-gold-500">Elegance</span>
            </h1>
            <p className="mt-5 text-sm text-gold-500/50 max-w-xs leading-relaxed font-light">
              Curated collections for the modern gentleman who appreciates refined craftsmanship.
            </p>
            <div className="mt-8 flex items-center gap-5">
              <Link
                href="/shop"
                className="group relative bg-gold-500 text-dark-950 px-8 py-4 tracking-[0.2em] uppercase text-[10px] font-bold overflow-hidden flex items-center gap-2 shadow-lg shadow-gold-500/20"
              >
                <span className="relative z-10">Explore</span>
                <HiOutlineArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300 relative z-10" />
              </Link>
              <Link
                href="/about"
                className="text-gold-500/60 hover:text-gold-400 tracking-[0.2em] uppercase text-[10px] font-bold flex items-center gap-2 transition-colors duration-300 border-2 border-gold-500/20 px-6 py-4"
              >
                <span>Our Story</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-3"
      >
        <span className="text-gold-500/40 text-[9px] tracking-[0.4em] uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold-500/40 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: ['0%', '150%'] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="absolute top-0 left-0 right-0 h-1/3 bg-gold-500"
          />
        </div>
      </motion.div>
    </section>
  );
}
