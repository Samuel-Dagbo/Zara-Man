'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi';

const floatingShapes = [
  { size: 'w-24 h-24', top: '15%', left: '5%', delay: 0 },
  { size: 'w-16 h-16', top: '25%', right: '10%', delay: 0.3 },
  { size: 'w-32 h-32', bottom: '20%', right: '5%', delay: 0.6 },
];

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-espresso pt-20">
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/95 via-espresso/60 to-espresso/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-espresso/20 z-10" />
        <img
          src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1920&q=80"
          alt="Men's luxury fashion"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08, y: [0, -15, 0] }}
          transition={{ opacity: { delay: 1 + shape.delay, duration: 1.5 }, y: { repeat: Infinity, duration: 6 + i * 2, ease: 'easeInOut' } }}
          className={`absolute ${shape.size} border border-gold-500 rounded-full pointer-events-none`}
          style={{ top: shape.top, left: shape.left, right: shape.right, bottom: shape.bottom }}
        />
      ))}

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp} className="overflow-hidden">
            <motion.span
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 text-gold-500 tracking-[0.3em] uppercase text-sm font-medium mb-8"
            >
              <span className="w-8 h-[1px] bg-gold-500/60" />
              New Collection 2026
              <span className="w-8 h-[1px] bg-gold-500/60" />
            </motion.span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-cream leading-[0.9] tracking-tight"
          >
            Redefine
            <br />
            <span className="text-gradient-light">Masculine</span>
            <br />
            Elegance
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-lg md:text-xl text-cream/60 max-w-xl leading-relaxed font-light"
          >
            Curated collections of premium menswear and accessories for the modern gentleman who appreciates refined craftsmanship.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-12 flex flex-wrap gap-5">
            <Link
              href="/shop"
              className="group bg-gold-500 text-espresso px-10 py-4 tracking-[0.2em] uppercase text-sm font-medium 
                         hover:bg-gold-400 transition-all duration-500 flex items-center gap-3 relative overflow-hidden"
            >
              <span className="relative z-10">Explore Collection</span>
              <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>
            <Link
              href="/about"
              className="group border border-cream/20 text-cream px-10 py-4 tracking-[0.2em] uppercase text-sm font-medium 
                         hover:bg-cream hover:text-espresso transition-all duration-500 flex items-center gap-2 backdrop-blur-sm"
            >
              Our Story
              <HiOutlineArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </Link>
          </motion.div>

          <motion.div variants={scaleIn} className="mt-20 flex gap-12 md:gap-16">
            {[
              { value: '500+', label: 'Crafted Pieces' },
              { value: '10K+', label: 'Gentlemen Served' },
              { value: '50+', label: 'Designer Brands' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + i * 0.15, duration: 0.6 }}
                className="relative"
              >
                <p className="font-display text-4xl md:text-5xl text-gradient font-bold">{stat.value}</p>
                <p className="text-cream/40 text-xs tracking-[0.2em] uppercase mt-2 font-light">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-cream/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-cream/40 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: [-24, 24] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-full h-1/3 bg-gold-500"
          />
        </div>
      </motion.div>
    </section>
  );
}
