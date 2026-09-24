import React from 'react';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export default function Footer({ navigate }) {
  const handleNav = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <img
              src="/assets/branding/logo.png"
              alt="MCRC Exports Logo"
              style={{ height: '42px', width: 'auto', filter: 'brightness(0) invert(1)' }}
            />
            <p>
              MCRC Exports is a premier Kolkata-based manufacturer and global exporter of
              handcrafted, hand-painted genuine leather products. Grounded in traditional
              Shantiniketan craft and built for international commercial excellence.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="footer-heading">Company</h4>
            <div className="footer-links">
              <a href="/" onClick={(e) => { e.preventDefault(); handleNav('/'); }} className="footer-link">
                Home
              </a>
              <a href="/about" onClick={(e) => { e.preventDefault(); handleNav('/about'); }} className="footer-link">
                Our Story & Heritage
              </a>
              <a href="/products" onClick={(e) => { e.preventDefault(); handleNav('/products'); }} className="footer-link">
                Product Collections
              </a>
              <a href="#contact-section" className="footer-link">
                Contact & Sourcing
              </a>
            </div>
          </div>

          {/* Collections Column */}
          <div>
            <h4 className="footer-heading">Collections</h4>
            <div className="footer-links">
              <a href="/products/small-leather-goods" onClick={(e) => { e.preventDefault(); handleNav('/products/small-leather-goods'); }} className="footer-link">
                Small Leather Articles
              </a>
              <a href="/products/pouches" onClick={(e) => { e.preventDefault(); handleNav('/products/pouches'); }} className="footer-link">
                Pouches
              </a>
              <a href="/products/leather-bags" onClick={(e) => { e.preventDefault(); handleNav('/products/leather-bags'); }} className="footer-link">
                Leather Bags
              </a>
              <a href="/products/coin-bags-decor" onClick={(e) => { e.preventDefault(); handleNav('/products/coin-bags-decor'); }} className="footer-link">
                Decor / Coin Banks
              </a>
              <a href="/products/wallets" onClick={(e) => { e.preventDefault(); handleNav('/products/wallets'); }} className="footer-link">
                Wallets
              </a>
              <a href="/products/canvas-bags" onClick={(e) => { e.preventDefault(); handleNav('/products/canvas-bags'); }} className="footer-link">
                Canvas Bags
              </a>
            </div>
          </div>

          {/* Sourcing & Contact Column */}
          <div>
            <h4 className="footer-heading">B2B Sourcing</h4>
            <div className="footer-links">
              <a href="tel:+919830920676" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} color="var(--color-gold)" />
                <span>+91 9830920676</span>
              </a>
              <a href="mailto:mcrcpltd@gmail.com" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={15} color="var(--color-gold)" />
                <span>mcrcpltd@gmail.com</span>
              </a>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--color-text-light-muted)', fontSize: '0.875rem', marginTop: '6px' }}>
                <MapPin size={16} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>Kolkata, West Bengal, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} MCRC Exports. All rights reserved. Handcrafted in India for Global Markets.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Genuine Leather Goods</span>
            <span>•</span>
            <span>Shantiniketan Artisan Heritage</span>
            <span>•</span>
            <span>Global Export Standard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
