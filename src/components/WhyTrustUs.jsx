import React from 'react';
import { Factory, History, Sparkles, Sliders, ShieldCheck, ClockCheck } from 'lucide-react';

const TRUST_CARDS = [
  {
    icon: Factory,
    title: 'Dominant Manufacturing',
    desc: 'Dominant manufacturer and exporter in the handcrafted genuine leather industry'
  },
  {
    icon: History,
    title: 'Years of Experience',
    desc: 'Years of expertise in manufacturing and exporting products across the world'
  },
  {
    icon: Sparkles,
    title: 'Unique Handcrafted',
    desc: 'Machines provide consistency; hands provide soul. Each product is a unique signature of the artisan who shaped it.'
  },
  {
    icon: Sliders,
    title: 'Custom Specification',
    desc: 'Bespoke adjustments to meet your specific brand requirements and architectural scales.'
  },
  {
    icon: ShieldCheck,
    title: 'Stringent Quality',
    desc: 'Every piece undergoes rigorous inspection to meet international luxury standards.'
  },
  {
    icon: ClockCheck,
    title: 'Best Delivering & Pricing',
    desc: 'We provide the best in industry delivery time and pricing.'
  }
];

export default function WhyTrustUs() {
  return (
    <section className="section-wrapper trust-section" id="excellence-section">
      <div className="container">
        <div className="trust-header">
          <span className="eyebrow" style={{ color: 'var(--color-gold)' }}>
            Excellence In Craft
          </span>
          <h2 className="section-title trust-title">Why Global Leaders Trust Us</h2>
          <p style={{ color: 'var(--color-text-light-muted)', fontSize: '1.1rem', margin: '0 auto', maxWidth: '640px' }}>
            Decades of disciplined manufacturing and master artistry make MCRC the chosen partner
            for luxury importers, retailers, and private label brands globally.
          </p>
        </div>

        <div className="trust-grid">
          {TRUST_CARDS.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div className="trust-card" key={card.title}>
                <div className="trust-icon-wrap">
                  <IconComponent size={24} />
                </div>
                <h3 className="trust-card-title">{card.title}</h3>
                <p className="trust-card-desc">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
