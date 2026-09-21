import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero({ navigate }) {
  return (
    <section className="hero-section" id="hero-section">
      <div className="hero-bg-container">
        <img
          src="/assets/hero/Herobg.jpg"
          alt="Handcrafted genuine leather artisanal background"
          className="hero-bg-img"
          loading="eager"
        />
        <div className="hero-overlay" />
      </div>

      <div className="container hero-content">
        <h1 className="hero-title">
          Handcrafted
          <span className="break">Heritage,</span>
          <span className="break">Global Excellence</span>
        </h1>

        <p className="hero-subtitle">
          100% Homemade Hand-Painted Leather Products
        </p>

        <div className="hero-actions">
          <button
            type="button"
            className="btn btn-gold"
            onClick={() => {
              navigate('/products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span>View Collections</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
