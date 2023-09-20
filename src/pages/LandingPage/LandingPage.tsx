import React from 'react';
import Features from 'src/components/LandingPage/Features';
import Hero from 'src/components/LandingPage/Hero';
import Zigzag from 'src/components/LandingPage/Zigzag';
import MainLayout from 'src/layout/MainLayout';

const LandingPage = () => {
  return (
    //TODO: ADD AOS ANIMATION
    <MainLayout>
      <Hero />
      <Features />
      <Zigzag />
    </MainLayout>
  );
};

export default LandingPage;
