'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi';

const collections = [
  {
    title: 'Tailored Suits',
    description: 'Impeccably crafted suits for the modern gentleman',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
    category: 'suits',
    color: 'from-espresso/90 via-espresso/60 to-transparent',
    number: '01',
  },
  {
    title: 'Luxury Timepieces',
    description: 'Precision-crafted watches that define your legacy',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80',
    category: 'watches',
    color: 'from-slate-900/90 via-slate-950/60 to-transparent',
    number: '02',
  },
  {
    title: 'Premium Footwear',
    description: 'Handcrafted shoes for every occasion',
    image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80',
    category: 'shoes',
    color: 'from-stone-900/90 via-stone-950/60 to-transparent',
    number: '03',
  },
  {
    title: 'Leather Accessories',
    description: 'Refined accessories that complete the look',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    category: 'accessories',
    color: 'from-amber-900/90 via-amber-950/60 to-transparent',
    number: '04',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export default function FeaturedCollections() {
  return (
    <section className="py-28 bg-cream relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-gold-500/3 to-transparent rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-gold-500 tracking-[0.3em] uppercase text-sm font-medium flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-gold-500/60" />
            Curated For You
            <span className="w-8 h-[1px] bg-gold-500/60" />
          </span>
          <h2 className="section-heading mt-6">Featured Collections</h2>
          <p className="section-subtitle">
            Explore our handpicked selections, crafted with passion and attention to every detail.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {collections.map((collection) => (
            <motion.div
              key={collection.title}
              variants={item}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group relative h-[520px] overflow-hidden cursor-pointer"
            >
              <motion.img
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${collection.color} opacity-90 transition-opacity duration-500 group-hover:opacity-95`} />
              
              <div className="absolute top-6 left-6">
                <span className="text-6xl md:text-7xl font-display font-bold text-white/5 group-hover:text-white/10 transition-colors duration-500">
                  {collection.number}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="font-display text-3xl md:text-4xl text-white font-bold mb-3">
                    {collection.title}
                  </h3>
                  <p className="text-white/60 mb-6 text-sm md:text-base leading-relaxed max-w-sm">
                    {collection.description}
                  </p>
                  <Link
                    href={`/shop?category=${collection.category}`}
                    className="inline-flex items-center gap-3 text-gold-500 hover:text-gold-400 
                             tracking-[0.2em] uppercase text-xs font-medium transition-all duration-300 group/link"
                  >
                    <span className="relative">
                      Shop Now
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold-500 group-hover/link:w-full transition-all duration-500" />
                    </span>
                    <HiOutlineArrowRight className="w-4 h-4 group-hover/link:translate-x-1.5 transition-transform" />
                  </Link>
                </motion.div>
              </div>

              <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
