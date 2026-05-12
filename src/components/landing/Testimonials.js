'use client';

import { motion } from 'framer-motion';
import { HiOutlineStar, HiOutlineHeart } from 'react-icons/hi';

const testimonials = [
  {
    name: 'Isabella Rossi',
    role: 'Fashion Blogger',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    content: 'The quality and craftsmanship of every piece I have purchased from Boutique is simply outstanding. It is my go-to for timeless elegance.',
    rating: 5,
  },
  {
    name: 'Amanda Chen',
    role: 'Style Director',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    content: 'An extraordinary curation of luxury fashion. The attention to detail in both products and presentation sets Boutique apart.',
    rating: 5,
  },
  {
    name: 'Sophie Laurent',
    role: 'Interior Designer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    content: 'Boutique redefines luxury shopping. From the exquisite packaging to the flawless customer service, every detail matters.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold-500 tracking-[0.3em] uppercase text-sm">Testimonials</span>
          <h2 className="section-heading mt-4">What Our Clients Say</h2>
          <p className="section-subtitle">
            Hear from those who have experienced the Boutique difference.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative p-8 bg-cream border border-luxury-100"
            >
              <HiOutlineHeart className="absolute top-6 right-6 w-6 h-6 text-gold-500/20" />
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <HiOutlineStar key={i} className="w-5 h-5 text-gold-500 fill-current" />
                ))}
              </div>
              <p className="text-luxury-600 leading-relaxed mb-6">&ldquo;{testimonial.content}&rdquo;</p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-display font-semibold text-espresso">{testimonial.name}</h4>
                  <p className="text-sm text-luxury-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
