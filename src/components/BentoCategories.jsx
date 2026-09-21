import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';

export default function BentoCategories({ navigate }) {
  const { catalog } = useCatalog();

  if (!catalog || !catalog.categories) {
    return null;
  }

  const categories = catalog.categories;

  const handleCategoryClick = (categoryId) => {
    navigate(`/products/${categoryId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="section-wrapper bento-section" id="collections-section">
      <div className="container">
        <div className="bento-header">
          <div>
            <span className="eyebrow">Export Collections</span>
            <h2 className="section-title">Product Categories</h2>
            <p className="section-desc">
              Discover six mastercrafted collections of genuine handcrafted and hand-painted
              leather goods, built to international B2B export standards.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                navigate('/products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>View All Products</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        <div className="bento-grid">
          {categories.map((cat, idx) => {
            const cardClass = `bento-card bento-card-${idx + 1}`;
            const count = cat.products ? cat.products.length : 0;

            return (
              <div
                key={cat.id}
                className={cardClass}
                onClick={() => handleCategoryClick(cat.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCategoryClick(cat.id);
                  }
                }}
                aria-label={`View ${cat.name} Collection, ${count} products`}
              >
                <img
                  src={cat.coverImage}
                  alt={`${cat.name} cover`}
                  className="bento-img"
                  loading="lazy"
                />
                <div className="bento-overlay" />
                <div className="bento-content">
                  <h3 className="bento-title">{cat.name}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
