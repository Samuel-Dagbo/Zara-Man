'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { HiOutlineSparkles, HiOutlineGlobe, HiOutlineShieldCheck, HiOutlineTruck } from 'react-icons/hi';

const values = [
  { icon: HiOutlineSparkles, title: 'Timeless Craftsmanship', description: 'Every piece in our collection is selected for its exceptional quality and enduring design.' },
  { icon: HiOutlineGlobe, title: 'Sustainable Luxury', description: 'We partner with artisans who share our commitment to ethical practices and sustainable materials.' },
  { icon: HiOutlineShieldCheck, title: 'Curated Excellence', description: 'Our team meticulously curates each item to ensure it meets our standards of sophistication.' },
  { icon: HiOutlineTruck, title: 'White-Glove Service', description: 'From packaging to delivery, every step reflects our dedication to an extraordinary experience.' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="relative py-32 bg-espresso overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <img src="https://images.unsplash.com/photo-1553034545-4d879681c5d1?w=1920&q=80" alt="Men's fashion" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-espresso/80 via-espresso/60 to-espresso" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <span className="text-gold-500 tracking-[0.3em] uppercase text-sm">Our Story</span>
              <h1 className="text-5xl md:text-7xl font-display text-cream font-bold mt-4">The Art of Menswear</h1>
              <p className="text-cream/60 text-lg max-w-3xl mx-auto mt-6 leading-relaxed">
                Born from a passion for timeless elegance, Boutique is more than a fashion destination — 
                Zara Man 247 is a celebration of craftsmanship, individuality, and the beauty of refined living for the modern gentleman.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-gold-500 tracking-[0.3em] uppercase text-sm">Since 2024</span>
                <h2 className="text-4xl font-display font-bold text-espresso mt-4 mb-6">
                  Where Passion <br/>Meets <span className="text-gold-500">Elegance</span>
                </h2>
                <div className="space-y-4 text-luxury-600 leading-relaxed">
                  <p>
                    Founded in 2024, Zara Man 247 emerged from a simple belief: that men&apos;s fashion should be an 
                    experience, not just a transaction. Our founders, lifelong connoisseurs of style, 
                    envisioned a space where every piece tells a story of refined masculinity.
                  </p>
                  <p>
                    We travel the globe to discover emerging designers and established ateliers who 
                    share our commitment to exceptional quality. Each collection is handpicked to 
                    offer our clients a curated journey through the world&apos;s finest menswear.
                  </p>
                  <p>
                    From our atelier to your wardrobe, every detail is considered. We believe that 
                    true luxury lies in the harmony of impeccable design, superior materials, and 
                    the confidence of self-expression.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                    alt="Zara Man 247 atelier"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-gold-500 text-espresso p-8 max-w-xs">
                  <p className="font-display text-4xl font-bold">50+</p>
                  <p className="text-sm tracking-wider uppercase mt-1">Designer Brands Curated</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-gold-500 tracking-[0.3em] uppercase text-sm">Our Values</span>
              <h2 className="section-heading mt-4">What We Stand For</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-8 border border-luxury-100 hover:border-gold-500/30 transition-colors"
                >
                  <div className="w-16 h-16 bg-gold-500/10 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-gold-500" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-espresso mb-3">{value.title}</h3>
                  <p className="text-luxury-500 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative order-2 lg:order-1"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=80"
                    alt="Zara Man 247 craftsmanship"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-6 -right-6 bg-espresso text-cream p-8 max-w-xs">
                  <p className="font-display text-4xl font-bold">10K+</p>
                  <p className="text-sm tracking-wider uppercase mt-1">Satisfied Clients Worldwide</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <span className="text-gold-500 tracking-[0.3em] uppercase text-sm">Our Promise</span>
                <h2 className="text-4xl font-display font-bold text-espresso mt-4 mb-6">
                  Crafting Experiences,<br/>Not Just <span className="text-gold-500">Products</span>
                </h2>
                <div className="space-y-4 text-luxury-600 leading-relaxed">
                  <p>
                    At Zara Man 247, we believe that true luxury is personal. It&apos;s about the way a fabric 
                    feels against your skin, the confidence a well-tailored suit inspires, and the 
                    joy of owning something truly special.
                  </p>
                  <p>
                    Our team of style advisors works closely with each client to understand their 
                    unique aesthetic, offering personalized recommendations that transcend trends. 
                    We are here to help you build a wardrobe that reflects your individuality.
                  </p>
                  <p>
                    Welcome to Zara Man 247. Welcome to a world where masculine elegance knows no bounds.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
