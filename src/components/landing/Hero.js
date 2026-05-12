'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { HiOutlineArrowRight } from 'react-icons/hi';

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-espresso"
      style={{ minHeight: 'calc(100vh - 80px)', marginTop: '80px' }}
    >
      {/* Mobile full-bleed background image */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="https://images.pexels.com/photos/6626361/pexels-photo-6626361.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Elegant menswear"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="absolute inset-0 flex">
        {/* Left side */}
        <div className="hidden lg:flex w-1/2 h-full bg-espresso relative z-10">
          <div className="flex flex-col justify-center w-full h-full py-16 px-12 xl:px-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-3 text-gold-500 tracking-[0.25em] uppercase text-xs font-semibold mb-8"
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

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 text-base text-cream/50 max-w-sm leading-relaxed font-light"
              >
                Curated collections of premium menswear and accessories for the modern gentleman who appreciates refined craftsmanship.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mt-12 mb-8 flex items-center gap-6"
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

        {/* Right side */}
        <div className="hidden lg:flex w-1/2 h-full items-center justify-center bg-espresso p-12">
          <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            <Image
              src="https://images.pexels.com/photos/6626361/pexels-photo-6626361.jpeg?auto=compress&cs=tinysrgb&w=1080"
              alt="Elegant menswear"
              width={400}
              height={600}
              className="block max-w-[42vw] max-h-[78vh] w-auto h-auto"
              priority
            />
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      <div className="absolute inset-0 z-10 lg:hidden bg-gradient-to-r from-espresso/80 via-espresso/60 to-transparent">
        <div className="flex flex-col justify-center h-full py-12 px-6">
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
                className="mt-8 mb-6 flex items-center gap-5"
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-3"
      >
        <span className="text-cream/25 text-[9px] tracking-[0.35em] uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-cream/25 to-transparent relative overflow-hidden">
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
