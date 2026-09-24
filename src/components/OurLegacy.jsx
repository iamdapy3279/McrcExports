import React from 'react';
import { Award, Compass, ShieldCheck } from 'lucide-react';

export default function OurLegacy({ navigate }) {
  return (
    <section className="section-wrapper legacy-section" id="legacy-section">
      <div className="container">
        <div className="legacy-grid">
          {/* Media Column */}
          <div className="legacy-media">
            <div className="legacy-image-frame">
              <img
                src="/assets/story/workers.png"
                alt="Master artisans handcrafting genuine leather products in Kolkata workshop"
                className="legacy-image"
                loading="lazy"
              />
            </div>
          </div>

          {/* Narrative Column */}
          <div className="legacy-text">
            <span className="eyebrow">Excellence in Indian Craft</span>
            <h2 className="legacy-heading">Our Legacy</h2>
            <h3 className="legacy-subheading">A Third Generation Family Tradition</h3>

            <p className="legacy-paragraph">
              MCRC designs and manufactures handcrafted, hand-painted genuine leather products for
              global markets. Based in Kolkata, West Bengal, our work draws from traditional
              Shantiniketan craftsmanship, where leather is embossed and individually hand-painted by
              skilled artisans.
            </p>

            <p className="legacy-paragraph">
              We offer a diverse range of bags, wallets, accessories, and home décor, developed to meet
              both aesthetic and commercial needs. From concept to final production, we collaborate
              closely with brands, importers, and retailers to deliver distinctive, scalable, and
              market-ready products.
            </p>

            <div className="legacy-highlights">
              <div className="legacy-highlight-item">
                <span className="legacy-highlight-label">Artisan Technique</span>
                <span className="legacy-highlight-value">Shantiniketan</span>
              </div>
              <div className="legacy-highlight-item">
                <span className="legacy-highlight-label">Origin</span>
                <span className="legacy-highlight-value">West Bengal, India</span>
              </div>
              <div className="legacy-highlight-item">
                <span className="legacy-highlight-label">Standard</span>
                <span className="legacy-highlight-value">Global B2B Export</span>
              </div>
            </div>

            <div style={{ marginTop: '32px' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  navigate('/about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Read Our Story
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
