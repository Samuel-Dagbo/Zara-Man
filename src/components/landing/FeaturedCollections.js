'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi';

const collections = [
  {
    title: 'Evening Elegance',
    description: 'Exquisite dresses for those unforgettable nights',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    category: 'dresses',
    color: 'from-rose-900/80 to-rose-950/80',
  },
  {
    title: 'Artisan Accessories',
    description: 'Handcrafted pieces that tell a story',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80',
    category: 'accessories',
    color: 'from-amber-900/80 to-amber-950/80',
  },
  {
    title: 'Fine Jewelry',
    description: 'Timeless treasures for the modern woman',
    image: 'https://images.unsplash.com/photo-1515562141589-67710e0e717b?w=800&q=80',
    category: 'jewelry',
    color: 'from-slate-900/80 to-slate-950/80',
  },
  {
    title: 'Designer Bags',
    description: 'The perfect companion for every journey',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
    category: 'bags',
    color: 'from-stone-900/80 to-stone-950/80',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function FeaturedCollections() {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold-500 tracking-[0.3em] uppercase text-sm">Curated For You</span>
          <h2 className="section-heading mt-4">Featured Collections</h2>
          <p className="section-subtitle">
            Explore our handpicked selections, crafted with passion and attention to every detail.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {collections.map((collection) => (
            <motion.div
              key={collection.title}
              variants={item}
              className="group relative h-[500px] overflow-hidden cursor-pointer"
            >
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${collection.color} opacity-80`} />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-display text-3xl text-white font-bold mb-2">
                  {collection.title}
                </h3>
                <p className="text-white/70 mb-4">{collection.description}</p>
                <Link
                  href={`/shop?category=${collection.category}`}
                  className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-400 
                           tracking-wider uppercase text-sm font-medium transition-colors group/link"
                >
                  Shop Now
                  <HiOutlineArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
