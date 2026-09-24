import React from 'react';
import { Award, Compass, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';

export default function AboutPage({ navigate }) {
  const { catalog } = useCatalog();
  const team = catalog?.team || [];

  return (
    <div className="about-page">
      {/* Editorial Header */}
      <section className="about-hero">
        <div className="container">
          <span className="eyebrow">Our Heritage & Story</span>
          <h1 className="section-title" style={{ maxWidth: '820px' }}>
            Why We Started
          </h1>

          <div className="about-story-grid">
            <div className="about-story-text">
              <p>
                MCRC Exports was founded with a deep appreciation for leather Craftsmanship. In
                Kolkata, our journey began with the discovery of Shantiniketan leather craft—an art
                form known for its intricate embossing and hand-painted detailing, passed down through
                generations in West Bengal.
              </p>

              <p>
                Recognizing the uniqueness of this craft and its untapped global potential, we set out
                to refine it to meet international quality standards while preserving its authenticity.
                What started as an effort to bring this traditional art to a wider audience has grown
                into a long-term commitment to protect, evolve, and elevate Indian leather craftsmanship
                for global markets.
              </p>

              <p>
                Today, through years of focused refinement, disciplined manufacturing, and close
                collaboration with global partners, MCRC Exports has become one of the most trusted
                names in hand-painted leather from India.
              </p>
            </div>

            <div className="about-craft-box">
              <h3 className="about-craft-title">The Shantiniketan Craft Tradition</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: '1.75', marginBottom: '20px' }}>
                Originating from the cultural enclave of Shantiniketan, this distinct art uses vegetable
                tanned leather, etched metal dies for tactile embossing, and artisan dyes meticulously
                layered by hand. No two pieces are ever identical.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.875rem' }}>
                  <ShieldCheck size={18} color="var(--color-gold)" />
                  <span>100% Genuine Handcrafted Leather</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.875rem' }}>
                  <Award size={18} color="var(--color-gold)" />
                  <span>Strict Export Grade Quality Control</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.875rem' }}>
                  <Compass size={18} color="var(--color-gold)" />
                  <span>Exporting Worldwide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
            <span className="eyebrow">Leadership & Artisanal Direction</span>
            <h2 className="section-title">The People Behind MCRC</h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              Guided by generational commitment, creative vision, and rigorous modern export operations.
            </p>
          </div>

          <div className="team-grid">
            {team.map((member, index) => {
              const initials = member.name
                .split(' ')
                .map((n) => n[0])
                .join('');

              return (
                <div className="team-card" key={member.id || member.name}>
                  <div className="team-avatar-wrap">
                    <span>{initials}</span>
                  </div>
                  <div className="team-role">{member.role}</div>
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-bio">{member.bio}</p>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '64px', textAlign: 'center' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                navigate('/products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Explore Our Product Catalog
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
