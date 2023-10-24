import React from 'react';
import Features from 'src/components/LandingPage/Features';
import Hero from 'src/components/LandingPage/Hero';
import Zigzag from 'src/components/LandingPage/Zigzag';
import MainLayout from 'src/layout/MainLayout';

import AOS from 'aos';
import 'aos/dist/aos.css';

const LandingPage = () => {
  React.useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    });
  });

  return (
    //TODO: ADD AOS ANIMATION
    <MainLayout>
      {/* <Hero /> */}
      {/* <Features /> */}
      <Zigzag />
    </MainLayout>
  );
};

export default LandingPage;
