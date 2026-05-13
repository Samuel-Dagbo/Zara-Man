'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineClock, HiOutlineCheck } from 'react-icons/hi';

const contactInfo = [
  { icon: HiOutlineMail, label: 'Email', value: 'hello@zaraman247.com', href: 'mailto:hello@zaraman247.com' },
  { icon: HiOutlinePhone, label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  { icon: HiOutlineLocationMarker, label: 'Address', value: '123 Luxury Lane, New York, NY 10001', href: '#' },
  { icon: HiOutlineClock, label: 'Hours', value: 'Mon-Sat: 10AM - 8PM | Sun: 12PM - 6PM' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
        toast.success('Message sent successfully!');
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="relative py-32 bg-espresso overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80" alt="Zara Man 247 store" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-espresso/80 via-espresso/60 to-espresso" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <span className="text-gold-500 tracking-[0.3em] uppercase text-sm">Get in Touch</span>
              <h1 className="text-5xl md:text-7xl font-display text-cream font-bold mt-4">Contact Us</h1>
              <p className="text-cream/60 text-lg max-w-2xl mx-auto mt-6">
                We would love to hear from you. Whether you have a question about our collections, 
                need styling advice, or just want to say hello.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-display font-bold text-espresso mb-8">Send Us a Message</h2>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-12 text-center border border-luxury-100"
                  >
                    <HiOutlineCheck className="w-16 h-16 text-gold-500 mx-auto mb-4" />
                    <h3 className="font-display text-2xl font-semibold text-espresso mb-2">Message Sent!</h3>
                    <p className="text-luxury-500">Thank you for reaching out. We will get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-espresso tracking-wide uppercase mb-2">Name *</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="input-field"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-espresso tracking-wide uppercase mb-2">Email *</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="input-field"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-espresso tracking-wide uppercase mb-2">Phone</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="input-field"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-espresso tracking-wide uppercase mb-2">Subject *</label>
                        <input
                          type="text"
                          required
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          className="input-field"
                          placeholder="How can we help?"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-espresso tracking-wide uppercase mb-2">Message *</label>
                      <textarea
                        required
                        rows={6}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="input-field resize-none"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>
                    <button type="submit" disabled={sending} className="btn-primary w-full disabled:opacity-50">
                      {sending ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-display font-bold text-espresso mb-8">Visit Our Boutique</h2>
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1553034545-4d879681c5d1?w=800&q=80"
                    alt="Our boutique"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-5 h-5 text-gold-500" />
                      </div>
                      <div>
                        <p className="text-sm text-luxury-500 tracking-wider uppercase">{info.label}</p>
                        {info.href ? (
                          <a href={info.href} className="text-espresso font-medium hover:text-gold-500 transition-colors">
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-espresso font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
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
