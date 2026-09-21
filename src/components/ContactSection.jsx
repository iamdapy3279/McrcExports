import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Compose mailto link for seamless local mail client dispatch
    const subject = encodeURIComponent(`B2B Sourcing Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Full Name: ${formData.name}\nContact Phone: ${formData.phone}\n\nInquiry Details:\n${formData.message || 'I am interested in sourcing handcrafted genuine leather products from MCRC Exports.'}`
    );
    const mailtoUrl = `mailto:mcrcpltd@gmail.com?subject=${subject}&body=${body}`;

    // Open mail client
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  return (
    <section className="section-wrapper contact-section" id="contact-section">
      <div className="container">
        <div className="contact-grid">
          {/* Form Column */}
          <div className="contact-form-box">
            <span className="eyebrow">Get in Touch</span>
            <h2 className="section-title" style={{ fontSize: '2.4rem', marginBottom: '1.5rem' }}>
              Contact Us
            </h2>

            {submitted ? (
              <div style={{ padding: '32px 0', textAlign: 'center' }}>
                <CheckCircle2 size={48} color="var(--color-gold)" style={{ margin: '0 auto 16px auto' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '8px' }}>
                  Inquiry Initiated
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
                  Thank you, <strong>{formData.name}</strong>. Your inquiry has been queued to launch your email client.
                  Our Kolkata team reviews all B2B requests promptly.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', message: '' });
                  }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name / Company Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. John Doe / Global Imports Ltd"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone Number / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="e.g. +1 (555) 234-5678"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message / Specifications
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Please specify your product categories of interest, estimated quantities, or custom branding requirements..."
                    className="form-textarea"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '8px' }}
                >
                  <span>Submit Sourcing Request</span>
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>

          {/* Sourcing Info Column */}
          <div className="contact-info-col">
            <span className="eyebrow">B2B Manufacturing & Partnership</span>
            <h2 className="sourcing-title">
              Start Your <br />
              Sourcing Journey.
            </h2>

            <p className="sourcing-desc">
              For catalogs, pricing, samples, or partnership inquiries, please get in touch with our
              team. We look forward to understanding your requirements and working together.
            </p>

            <div className="contact-direct-blocks">
              <div className="direct-block">
                <div className="direct-label">BUSINESS HOTLINE</div>
                <a href="tel:+919830920676" className="direct-link">
                  +91 9830920676
                </a>
              </div>

              <div className="direct-block">
                <div className="direct-label">GENERAL INQUIRIES</div>
                <a href="mailto:mcrcpltd@gmail.com" className="direct-link">
                  mcrcpltd@gmail.com
                </a>
              </div>

              <div className="direct-block">
                <div className="direct-label">MANUFACTURING BASE</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--color-text-primary)' }}>
                  Kolkata, West Bengal, India
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
