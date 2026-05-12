'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-espresso">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/90 via-espresso/70 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80"
          alt="Luxury fashion"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-gold-500 tracking-[0.3em] uppercase text-sm mb-6"
          >
            New Collection 2026
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-cream leading-tight"
          >
            Where Elegance
            <br />
            <span className="text-gold-500">Meets Style</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-lg text-cream/70 max-w-lg leading-relaxed"
          >
            Discover curated collections of luxury fashion and accessories, 
            designed for those who appreciate the finer things in life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/shop"
              className="group bg-gold-500 text-espresso px-10 py-4 tracking-wider uppercase text-sm font-medium 
                         hover:bg-gold-600 transition-all duration-300 flex items-center gap-2"
            >
              Explore Collection
              <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="border-2 border-cream/30 text-cream px-10 py-4 tracking-wider uppercase text-sm font-medium 
                         hover:bg-cream hover:text-espresso transition-all duration-300"
            >
              Our Story
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 flex gap-12"
          >
            {[
              { value: '500+', label: 'Curated Pieces' },
              { value: '10K+', label: 'Happy Clients' },
              { value: '50+', label: 'Designer Brands' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="font-display text-3xl text-gold-500 font-bold">{stat.value}</p>
                <p className="text-cream/50 text-sm tracking-wider uppercase mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-cream/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-gold-500 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
