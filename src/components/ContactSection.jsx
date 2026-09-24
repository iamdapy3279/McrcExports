import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    company_name: '',
    designation: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' }); // 'success' | 'error' | null

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status.type === 'error') {
      setStatus({ type: null, message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name.trim() || !formData.company_name.trim() || !formData.email.trim()) {
      setStatus({
        type: 'error',
        message: 'Please fill in all required fields (Name, Company Name, and Email).'
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    const accessKey =
      import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'a81f9545-c8c0-4624-a874-c07396b7278b';

    const payload = {
      access_key: accessKey,
      subject: 'New MCRC Exports Website Inquiry',
      from_name: 'MCRC Exports Website',
      name: formData.name.trim(),
      company_name: formData.company_name.trim(),
      designation: formData.designation.trim() || 'Not provided',
      email: formData.email.trim(),
      phone: formData.phone.trim() || 'Not provided',
      message: formData.message.trim() || 'Not provided'
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          type: 'success',
          message: 'Thank you for contacting MCRC Exports. Our team will get back to you shortly.'
        });
        // Clear form after successful submission
        setFormData({
          name: '',
          company_name: '',
          designation: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        setStatus({
          type: 'error',
          message:
            data.message ||
            'Something went wrong while sending your message. Please try again.'
        });
      }
    } catch (err) {
      console.error('Web3Forms submission error:', err);
      setStatus({
        type: 'error',
        message: 'Something went wrong while sending your message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
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

            {status.type === 'success' ? (
              <div className="form-alert-success">
                <CheckCircle2
                  size={48}
                  color="var(--color-gold)"
                  style={{ margin: '0 auto 16px auto' }}
                />
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.8rem',
                    marginBottom: '12px',
                    color: 'var(--color-leather)'
                  }}
                >
                  Inquiry Received
                </h3>
                <p
                  style={{
                    color: 'var(--color-text-secondary)',
                    marginBottom: '28px',
                    lineHeight: '1.6',
                    maxWidth: '480px',
                    margin: '0 auto 28px auto'
                  }}
                >
                  {status.message}
                </p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setStatus({ type: null, message: '' })}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate={false}>
                {status.type === 'error' && (
                  <div className="form-alert-error" role="alert">
                    <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{status.message}</span>
                  </div>
                )}

                {/* Name & Company Name */}
                <div className="form-row-2col">
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">
                      Name <span className="required-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. John Doe"
                      className="form-input"
                      disabled={isSubmitting}
                      autoComplete="name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-company" className="form-label">
                      Company Name <span className="required-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-company"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Global Retail Imports"
                      className="form-input"
                      disabled={isSubmitting}
                      autoComplete="organization"
                    />
                  </div>
                </div>

                {/* Email & Designation */}
                <div className="form-row-2col">
                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">
                      Email <span className="required-star">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="e.g. buyer@company.com"
                      className="form-input"
                      disabled={isSubmitting}
                      autoComplete="email"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-designation" className="form-label">
                      Designation <span className="optional-tag">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="contact-designation"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder="e.g. Sourcing Director"
                      className="form-input"
                      disabled={isSubmitting}
                      autoComplete="organization-title"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="form-group">
                  <label htmlFor="contact-phone" className="form-label">
                    Phone Number <span className="optional-tag">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +1 (555) 234-5678"
                    className="form-input"
                    disabled={isSubmitting}
                    autoComplete="tel"
                  />
                </div>

                {/* Message */}
                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">
                    Message <span className="optional-tag">(Optional)</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Please specify your product categories of interest, estimated quantities, or custom branding requirements..."
                    className="form-textarea"
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '8px' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="spin-animation" style={{ marginRight: '8px' }} />
                      <span>Sending Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Sourcing Request</span>
                      <Send size={16} style={{ marginLeft: '8px' }} />
                    </>
                  )}
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
