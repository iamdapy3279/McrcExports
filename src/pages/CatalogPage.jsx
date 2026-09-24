import React, { useMemo } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';

const MOBILE_CATEGORY_DESCRIPTIONS = {
  'small-leather-goods':
    'Premium small leather goods combining craftsmanship, artistic expression, and handcrafted detailing. Designed for refined organization, durability, and everyday use.',
  wallets:
    'Fine leather wallets combining thoughtful utility with vibrant prints, embossed artwork, and contemporary design. Crafted for global fashion and lifestyle markets.',
  pouches:
    'Versatile leather pouches designed for beauty, travel, stationery, gifting, and everyday organization. Available in diverse sizes, constructions, and decorative techniques.',
  'coin-bags-decor':
    'Specialized three-dimensional leather décor and coin banks featuring unique shapes, themes, and handcrafted construction. Designed for gifting, lifestyle, and specialty retail.',
  'leather-bags':
    'Leather bags combining traditional craftsmanship with embossed leather and hand-painted artwork. Designed to deliver distinctive, commercially relevant styles for global brands and retailers.',
  'canvas-bags':
    'Durable 14-ounce canvas bags enhanced with distinctive hand-painted and embossed leather components. A balance of lightweight construction, functionality, and artistic detailing.'
};

const ALL_PRODUCTS_DESC_DESKTOP =
  'Explore a collection of handcrafted and hand-painted genuine leather products, showcasing a variety of designs, techniques, and finishes we can create. This selection offers a glimpse into our manufacturing capabilities and customization abilities. Kindly contact us for a full range of products and prints.';

const ALL_PRODUCTS_DESC_MOBILE =
  'Explore handcrafted and hand-painted genuine leather products showcasing our diverse designs, techniques, and finishes. Contact us for our full product range and customization options.';

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

  const totalProductsCount = useMemo(() => {
    let count = 0;
    categories.forEach((cat) => {
      if (cat.products) count += cat.products.length;
    });
    return count;
  }, [categories]);

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
          <p className="section-desc desktop-desc">
            {currentCategory ? currentCategory.description : ALL_PRODUCTS_DESC_DESKTOP}
          </p>
          <p className="section-desc mobile-desc">
            {currentCategory
              ? (currentCategory.mobileDescription ||
                 MOBILE_CATEGORY_DESCRIPTIONS[currentCategory.id] ||
                 currentCategory.description)
              : ALL_PRODUCTS_DESC_MOBILE}
          </p>

          {/* Category Filter Pills (Desktop) */}
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

          {/* Category Filter Dropdown (Mobile) */}
          <div className="category-filter-dropdown-wrap">
            <label htmlFor="mobile-category-select" className="category-dropdown-label">
              Select Collection
            </label>
            <div className="category-select-container">
              <select
                id="mobile-category-select"
                className="category-filter-select"
                value={activeCategoryId}
                onChange={(e) => handleCategorySelect(e.target.value)}
              >
                <option value="all">All Collections ({totalProductsCount})</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} ({cat.products ? cat.products.length : 0})
                  </option>
                ))}
              </select>
              <ChevronDown size={18} className="category-select-icon" />
            </div>
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
