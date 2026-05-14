'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineStar, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

const testimonials = [
  {
    name: 'James Mitchell',
    role: 'CEO, Mitchell Capital',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    content: 'The quality and craftsmanship of every piece I have purchased from OSEBO 247 is simply outstanding. It is my go-to for timeless elegance.',
    rating: 5,
  },
  {
    name: 'Alexander Stone',
    role: 'Style Director',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    content: 'An extraordinary curation of luxury menswear. The attention to detail in both products and presentation sets OSEBO 247 apart.',
    rating: 5,
  },
  {
    name: 'Marcus Chen',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80',
    content: 'OSEBO 247 redefines luxury shopping for men. From the exquisite packaging to the flawless customer service, every detail matters.',
    rating: 5,
  },
  {
    name: 'Sophie Laurent',
    role: 'Fashion Editor, Vogue',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    content: 'The curation at OSEBO 247 is unmatched. Every piece feels special, carefully chosen with an eye for quality and masculine design.',
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
    <section className="py-28 bg-dark-950 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-gold-500/6 to-transparent rounded-full pointer-events-none" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-gold-500/4 to-transparent rounded-full pointer-events-none" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-gold-500 tracking-[0.3em] uppercase text-xs font-bold flex items-center justify-center gap-3">
            <span className="w-10 h-px bg-gold-500/40" />
            Testimonials
            <span className="w-10 h-px bg-gold-500/40" />
          </span>
          <h2 className="section-heading mt-6">What Our Clients Say</h2>
          <p className="section-subtitle mt-4">
            Hear from those who have experienced the OSEBO 247 difference.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[320px] flex items-center">
            <button
              onClick={prev}
              className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 border-2 border-gold-500/20 flex items-center justify-center hover:bg-gold-500 hover:text-dark-950 hover:border-gold-500 transition-all duration-300 group text-gold-500/40 bg-dark-900/60 backdrop-blur-sm"
              aria-label="Previous testimonial"
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
                  className="bg-dark-900/60 backdrop-blur-sm border border-gold-500/15 p-10 md:p-16 text-center"
                >
                  <div className="flex justify-center gap-1 mb-8">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <HiOutlineStar key={i} className="w-5 h-5 text-gold-500 fill-current" />
                    ))}
                  </div>

                  <p className="text-lg md:text-xl text-gold-400/70 leading-relaxed mb-10 font-light italic">
                    &ldquo;{testimonials[current].content}&rdquo;
                  </p>

                  <div className="flex items-center justify-center gap-5">
                    <div className="relative">
                      <img
                        src={testimonials[current].image}
                        alt={testimonials[current].name}
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-gold-500/30"
                      />
                    </div>
                    <div className="text-left">
                      <h4 className="font-display text-lg font-bold text-gold-500">{testimonials[current].name}</h4>
                      <p className="text-xs text-gold-500/40 tracking-wider uppercase">{testimonials[current].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={next}
              className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 border-2 border-gold-500/20 flex items-center justify-center hover:bg-gold-500 hover:text-dark-950 hover:border-gold-500 transition-all duration-300 group text-gold-500/40 bg-dark-900/60 backdrop-blur-sm"
              aria-label="Next testimonial"
            >
              <HiOutlineChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`transition-all duration-500 ${
                  i === current ? 'bg-gold-500 w-10 h-1' : 'bg-gold-500/20 w-4 h-1 hover:bg-gold-500/40'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
