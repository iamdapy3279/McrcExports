import React from 'react';
import Hero from '../components/Hero';
import OurLegacy from '../components/OurLegacy';
import StatsCounter from '../components/StatsCounter';
import BentoCategories from '../components/BentoCategories';
import WhyTrustUs from '../components/WhyTrustUs';
import ContactSection from '../components/ContactSection';

export default function HomePage({ navigate }) {
  return (
    <main className="home-page">
      <Hero navigate={navigate} />
      <OurLegacy navigate={navigate} />
      <StatsCounter />
      <BentoCategories navigate={navigate} />
      <WhyTrustUs />
      <ContactSection />
    </main>
  );
}
