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
    number: '01',
  },
  {
    title: 'Luxury Timepieces',
    description: 'Precision-crafted watches that define your legacy',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80',
    category: 'watches',
    number: '02',
  },
  {
    title: 'Premium Footwear',
    description: 'Handcrafted shoes for every occasion',
    image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80',
    category: 'shoes',
    number: '03',
  },
  {
    title: 'Leather Accessories',
    description: 'Refined accessories that complete the look',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    category: 'accessories',
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
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function FeaturedCollections() {
  return (
    <section className="py-28 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-gold-500/8 to-transparent rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-gold-500/5 to-transparent rounded-full pointer-events-none" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-gold-500 tracking-[0.3em] uppercase text-xs font-bold flex items-center justify-center gap-3">
            <span className="w-10 h-px bg-gold-500/40" />
            Curated For You
            <span className="w-10 h-px bg-gold-500/40" />
          </span>
          <h2 className="section-heading mt-6">Featured Collections</h2>
          <p className="section-subtitle mt-4">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />
              
              <div className="absolute top-6 left-6">
                <span className="text-7xl font-display font-bold text-gold-500/10 group-hover:text-gold-500/30 transition-colors duration-500">
                  {collection.number}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <h3 className="font-display text-3xl md:text-4xl text-gold-400 font-bold mb-3">
                  {collection.title}
                </h3>
                <p className="text-gold-500/40 mb-6 text-sm md:text-base leading-relaxed max-w-sm">
                  {collection.description}
                </p>
                <Link
                  href={`/shop?category=${collection.category}`}
                  className="inline-flex items-center gap-3 text-gold-500 hover:text-gold-400 
                           tracking-[0.2em] uppercase text-xs font-bold transition-all duration-300 group/link"
                >
                  <span className="relative">
                    Shop Now
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-500 group-hover/link:w-full transition-all duration-500" />
                  </span>
                  <HiOutlineArrowRight className="w-4 h-4 group-hover/link:translate-x-1.5 transition-transform" />
                </Link>
              </div>

              <div className="absolute inset-0 border-2 border-gold-500/0 group-hover:border-gold-500/30 transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
