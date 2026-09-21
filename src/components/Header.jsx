import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Header({ currentPath, navigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = currentPath === '/' || currentPath === '';
  const isTransparent = isHome && !scrolled;

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`site-header ${isTransparent ? 'transparent' : 'scrolled'}`}
        id="main-header"
      >
        <div className="container header-container">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/');
            }}
            className="logo-wrapper"
            aria-label="MCRC Exports Home"
          >
            <img
              src="/assets/branding/logo.png"
              alt="MCRC Exports Logo"
              className="site-logo"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="nav-links" aria-label="Main Navigation">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/');
              }}
              className={`nav-link ${currentPath === '/' ? 'active' : ''}`}
            >
              Home
            </a>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/about');
              }}
              className={`nav-link ${currentPath === '/about' ? 'active' : ''}`}
            >
              About
            </a>
            <a
              href="/products"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/products');
              }}
              className={`nav-link ${currentPath.startsWith('/products') ? 'active' : ''}`}
            >
              Products
            </a>
          </nav>

          <button
            type="button"
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-nav-header">
          <img
            src="/assets/branding/logo.png"
            alt="MCRC Exports Logo"
            style={{ height: '40px', width: 'auto', filter: 'brightness(0) invert(1)' }}
          />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#FFFFFF', padding: '8px' }}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
        </div>

        <nav className="mobile-nav-links">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/');
            }}
            className={`mobile-nav-link ${currentPath === '/' ? 'active' : ''}`}
          >
            <span>Home</span>
            <ArrowRight size={20} />
          </a>
          <a
            href="/about"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/about');
            }}
            className={`mobile-nav-link ${currentPath === '/about' ? 'active' : ''}`}
          >
            <span>About</span>
            <ArrowRight size={20} />
          </a>
          <a
            href="/products"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/products');
            }}
            className={`mobile-nav-link ${currentPath.startsWith('/products') ? 'active' : ''}`}
          >
            <span>Products</span>
            <ArrowRight size={20} />
          </a>
        </nav>

        <div className="mobile-nav-footer">
          <span className="eyebrow" style={{ color: 'var(--color-gold-light)' }}>
            Direct B2B Sourcing Hotline
          </span>
          <a
            href="tel:+919830920676"
            style={{ color: '#FFFFFF', fontSize: '1.25rem', fontFamily: 'var(--font-serif)', display: 'block', marginBottom: '8px' }}
          >
            +91 9830920676
          </a>
          <a
            href="mailto:mcrcpltd@gmail.com"
            style={{ color: 'var(--color-text-light-muted)', fontSize: '0.9rem' }}
          >
            mcrcpltd@gmail.com
          </a>
        </div>
      </div>
    </>
  );
}
