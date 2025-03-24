
import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Philosophy from '../components/Philosophy';
import Analysis from '../components/Analysis';
import ContentAnalyzer from '../components/ContentAnalyzer';
import Login from '../components/Login';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <Philosophy />
      <Analysis />
      <ContentAnalyzer />
      <Login />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
