'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/landing/Hero';
import FeaturedCollections from '@/components/landing/FeaturedCollections';
import Testimonials from '@/components/landing/Testimonials';
import Newsletter from '@/components/landing/Newsletter';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedCollections />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  );
}
