import React, { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';

export default function CatalogPage({ categoryFilter, navigate }) {
  const { catalog, openProductModal } = useCatalog();

  const categories = catalog?.categories || [];

  // Active category determination
  const activeCategoryId = categoryFilter || 'all';

  const currentCategory = useMemo(() => {
    if (activeCategoryId === 'all') return null;
    return categories.find((c) => c.id === activeCategoryId);
  }, [categories, activeCategoryId]);

  // Aggregate products based on active category
  const displayedProducts = useMemo(() => {
    let prods = [];
    if (activeCategoryId === 'all') {
      categories.forEach((cat) => {
        if (cat.products) prods.push(...cat.products);
      });
    } else if (currentCategory && currentCategory.products) {
      prods = [...currentCategory.products];
    }
    return prods;
  }, [categories, activeCategoryId, currentCategory]);

  const handleCategorySelect = (id) => {
    if (id === 'all') {
      navigate('/products');
    } else {
      navigate(`/products/${id}`);
    }
  };

  return (
    <div className="catalog-page">
      {/* Header Bar */}
      <section className="catalog-page-header">
        <div className="container">
          <span className="eyebrow">Export Catalog & Sourcing</span>
          <h1 className="section-title">
            {currentCategory ? currentCategory.name : 'All Product Collections'}
          </h1>
          <p className="section-desc">
            {currentCategory
              ? currentCategory.description
              : 'Browse our complete catalog of handcrafted and hand-painted genuine leather export models. Select any item to inspect multi-angle craftsmanship.'}
          </p>

          {/* Category Filter Pills */}
          <div className="category-filter-bar">
            <button
              type="button"
              className={`filter-btn ${activeCategoryId === 'all' ? 'active' : ''}`}
              onClick={() => handleCategorySelect('all')}
            >
              All Collections
            </button>
            {categories.map((cat) => (
              <button
                type="button"
                key={cat.id}
                className={`filter-btn ${activeCategoryId === cat.id ? 'active' : ''}`}
                onClick={() => handleCategorySelect(cat.id)}
              >
                {cat.name} ({cat.products ? cat.products.length : 0})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section-wrapper" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              Showing <strong>{displayedProducts.length}</strong> handcrafted models
            </span>
          </div>

          {displayedProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', background: '#FFFFFF', border: '1px solid var(--border-subtle)', marginTop: '24px' }}>
              <p style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: 'var(--color-text-secondary)' }}>
                No products found in this category.
              </p>
            </div>
          ) : (
            <div className="products-grid">
              {displayedProducts.map((prod) => (
                <article
                  key={prod.id}
                  className="product-card"
                  onClick={() => openProductModal(prod)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      openProductModal(prod);
                    }
                  }}
                  aria-label={`View details for ${prod.name}, Model ${prod.modelNumber}`}
                >
                  <div className="product-thumb-container">
                    <img
                      src={prod.thumbnail}
                      alt={`${prod.name} (${prod.modelNumber})`}
                      className="product-thumb"
                      loading="lazy"
                    />
                  </div>

                  <div className="product-card-body">
                    <div className="product-meta-row">
                      <span className="product-model">{prod.modelNumber}</span>
                      <span className="product-images-count">
                        {prod.images ? prod.images.length : 1} photos
                      </span>
                    </div>

                    <h3 className="product-name">{prod.name}</h3>

                    <div className="product-card-cta">
                      <span>Inspect Details</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
