'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineStar, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

const testimonials = [
  {
    name: 'James Mitchell',
    role: 'CEO, Mitchell Capital',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    content: 'The quality and craftsmanship of every piece I have purchased from Zara Man 247 is simply outstanding. It is my go-to for timeless elegance.',
    rating: 5,
  },
  {
    name: 'Alexander Stone',
    role: 'Style Director',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    content: 'An extraordinary curation of luxury menswear. The attention to detail in both products and presentation sets Zara Man 247 apart.',
    rating: 5,
  },
  {
    name: 'Marcus Chen',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80',
    content: 'Zara Man 247 redefines luxury shopping for men. From the exquisite packaging to the flawless customer service, every detail matters.',
    rating: 5,
  },
  {
    name: 'Sophie Laurent',
    role: 'Fashion Editor, Vogue',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    content: 'The curation at Zara Man 247 is unmatched. Every piece feels special, carefully chosen with an eye for quality and masculine design.',
    rating: 5,
  },
  {
    name: 'David Park',
    role: 'Professional Athlete',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    content: 'Finally, a brand that understands modern menswear. The fits are impeccable and the quality speaks for itself.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-gold-500/3 to-transparent rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-gold-500 tracking-[0.3em] uppercase text-sm font-medium flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-gold-500/60" />
            Testimonials
            <span className="w-8 h-[1px] bg-gold-500/60" />
          </span>
          <h2 className="section-heading mt-6">What Our Clients Say</h2>
          <p className="section-subtitle">
            Hear from those who have experienced the Zara Man 247 difference.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[320px] flex items-center">
            <button
              onClick={prev}
              className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-cream border border-luxury-200 flex items-center justify-center hover:bg-espresso hover:text-cream hover:border-espresso transition-all duration-300 group"
            >
              <HiOutlineChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <div className="w-full overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-cream border border-luxury-100 p-10 md:p-14 text-center"
                >
                  <div className="flex justify-center gap-1 mb-8">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <HiOutlineStar key={i} className="w-6 h-6 text-gold-500 fill-current" />
                    ))}
                  </div>

                  <p className="text-lg md:text-xl text-luxury-600 leading-relaxed mb-10 font-light italic">
                    &ldquo;{testimonials[current].content}&rdquo;
                  </p>

                  <div className="flex items-center justify-center gap-5">
                    <img
                      src={testimonials[current].image}
                      alt={testimonials[current].name}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-gold-500/20"
                    />
                    <div className="text-left">
                      <h4 className="font-display text-xl font-semibold text-espresso">{testimonials[current].name}</h4>
                      <p className="text-sm text-luxury-500 tracking-wider uppercase">{testimonials[current].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={next}
              className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-cream border border-luxury-200 flex items-center justify-center hover:bg-espresso hover:text-cream hover:border-espresso transition-all duration-300 group"
            >
              <HiOutlineChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  i === current ? 'bg-gold-500 w-8' : 'bg-luxury-300 hover:bg-luxury-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
