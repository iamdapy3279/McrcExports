import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Mail, Phone, Maximize2, Shield } from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';

export default function ProductViewerModal() {
  const { activeProductModal, closeProductModal } = useCatalog();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    setCurrentIdx(0);
  }, [activeProductModal]);

  // Keyboard navigation
  useEffect(() => {
    if (!activeProductModal) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeProductModal();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeProductModal, currentIdx]);

  if (!activeProductModal) return null;

  const product = activeProductModal;
  const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail];

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Touch swipe support for mobile
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const composeInquiryUrl = () => {
    const subject = encodeURIComponent(`B2B Inquiry: Model ${product.modelNumber} (${product.categoryName || 'Leather Product'})`);
    const body = encodeURIComponent(
      `Hello MCRC Exports,\n\nI am interested in sourcing and requesting specifications/samples for:\nProduct: ${product.name}\nModel Number: ${product.modelNumber}\nCategory: ${product.categoryName}\n\nPlease share catalog pricing, minimum order quantities (MOQ), and production lead times.\n\nThank you.`
    );
    return `mailto:mcrcpltd@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div
      className="product-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeProductModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      <div className="product-modal-container">
        {/* Close Button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={closeProductModal}
          aria-label="Close Product Viewer"
        >
          <X size={22} />
        </button>

        {/* Gallery Side */}
        <div
          className="modal-gallery-side"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="modal-main-image-wrap">
            <img
              src={images[currentIdx]}
              alt={`${product.name} - View ${currentIdx + 1}`}
              className="modal-main-image"
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="gallery-nav-btn gallery-nav-prev"
                  onClick={handlePrev}
                  aria-label="Previous Image"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  className="gallery-nav-btn gallery-nav-next"
                  onClick={handleNext}
                  aria-label="Next Image"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="modal-thumbnail-strip">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`strip-thumb ${index === currentIdx ? 'active' : ''}`}
                  onClick={() => setCurrentIdx(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View image ${index + 1}`}
                >
                  <img src={img} alt={`Thumb ${index + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Side */}
        <div className="modal-info-side">
          <div className="modal-category-tag">
            {product.categoryName || 'Handcrafted Collection'}
          </div>

          <h2 className="modal-product-title" id="modal-product-title">
            {product.name}
          </h2>

          <div className="modal-model-badge">
            Model: {product.modelNumber}
          </div>

          <div className="modal-desc-box">
            <p className="modal-desc-text">
              {product.description ||
                `Masterfully handcrafted in Kolkata using traditional Shantiniketan embossing and hand-painting techniques. Model ${product.modelNumber} is built for international commercial durability and distinctive artisanal luxury.`}
            </p>
          </div>

          <div className="modal-spec-list">
            <div className="spec-item">
              <span className="spec-label">Artisan Technique:</span>
              <span className="spec-value">Shantiniketan Hand-Embossed & Painted</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Material:</span>
              <span className="spec-value">100% Genuine Handcrafted Leather</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Manufacturing Origin:</span>
              <span className="spec-value">Kolkata, West Bengal, India</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">B2B Customization:</span>
              <span className="spec-value">Custom Colors, Logos & Dimensions</span>
            </div>
          </div>

          <div className="modal-actions">
            <a
              href={composeInquiryUrl()}
              className="btn btn-primary"
              style={{ width: '100%', textDecoration: 'none' }}
            >
              <Mail size={16} />
              <span>Inquire for B2B Order / Sample</span>
            </a>

            <a
              href="tel:+919830920676"
              className="btn btn-secondary"
              style={{ width: '100%', textDecoration: 'none' }}
            >
              <Phone size={16} />
              <span>Call Hotline: +91 9830920676</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
