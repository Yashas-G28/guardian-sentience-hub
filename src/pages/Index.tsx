
import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import ProductShowcase from '../components/ProductShowcase';
import Philosophy from '../components/Philosophy';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ProductShowcase />
      <Philosophy />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
