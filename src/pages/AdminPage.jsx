import React, { useState, useRef } from 'react';
import {
  Download,
  Upload,
  RotateCcw,
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  ArrowLeft,
  X,
  ChevronUp,
  ChevronDown,
  Check
} from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';

export default function AdminPage({ navigate }) {
  const {
    catalog,
    updateCategory,
    addCategory,
    deleteCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    exportCatalogJson,
    importCatalogJson,
    resetToDefaultCatalog
  } = useCatalog();

  const [activeCategoryView, setActiveCategoryView] = useState(null);
  const [editingCategoryModal, setEditingCategoryModal] = useState(null);
  const [editingProductModal, setEditingProductModal] = useState(null); // { isNew: bool, product: {...}, categoryId: str }
  const fileImportRef = useRef(null);

  if (!catalog) {
    return <div style={{ padding: '100px', textAlign: 'center' }}>Loading Catalog Data...</div>;
  }

  const categories = catalog.categories || [];
  const currentSelectedCategory = activeCategoryView
    ? categories.find((c) => c.id === activeCategoryView)
    : null;

  // Import JSON handler
  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      importCatalogJson(event.target.result);
      if (fileImportRef.current) fileImportRef.current.value = '';
    };
    reader.readAsText(file);
  };

  // Convert uploaded image file to data URL
  const handleImageUpload = (file, callback) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      callback(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="admin-wrapper">
      {/* Admin Top Bar */}
      <div className="admin-header-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h1 className="admin-title">MCRC Catalog Admin</h1>
          <span className="admin-badge">Internal CMS</span>
        </div>

        <div className="admin-header-actions">
          <button
            type="button"
            className="btn btn-admin"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFF' }}
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={14} style={{ marginRight: '6px' }} />
            <span>Public Site</span>
          </button>

          <button
            type="button"
            className="btn btn-admin btn-gold"
            onClick={exportCatalogJson}
            title="Download current catalog structure as JSON file"
          >
            <Download size={14} style={{ marginRight: '6px' }} />
            <span>Export Catalog JSON</span>
          </button>

          <button
            type="button"
            className="btn btn-admin"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#FFF' }}
            onClick={() => fileImportRef.current?.click()}
            title="Import a catalog JSON file"
          >
            <Upload size={14} style={{ marginRight: '6px' }} />
            <span>Import JSON</span>
          </button>
          <input
            type="file"
            ref={fileImportRef}
            onChange={handleFileImport}
            accept=".json,application/json"
            style={{ display: 'none' }}
          />

          <button
            type="button"
            className="btn btn-admin btn-admin-delete"
            onClick={() => {
              if (window.confirm('Reset all catalog customizations back to original default assets?')) {
                resetToDefaultCatalog();
              }
            }}
            title="Revert localStorage to factory catalog.json"
          >
            <RotateCcw size={14} style={{ marginRight: '6px' }} />
            <span>Reset Default</span>
          </button>
        </div>
      </div>

      <div className="admin-container">
        {!activeCategoryView ? (
          /* ================= CATEGORIES VIEW ================= */
          <div className="admin-card">
            <div className="admin-card-title">
              <span>Categories ({categories.length})</span>
              <button
                type="button"
                className="btn btn-admin btn-admin-edit"
                onClick={() =>
                  setEditingCategoryModal({
                    id: '',
                    name: '',
                    description: '',
                    coverImage: '/assets/branding/logo.png',
                    isNew: true
                  })
                }
              >
                <Plus size={14} style={{ marginRight: '4px' }} />
                <span>Add Category</span>
              </button>
            </div>

            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>Cover</th>
                  <th>Category Name</th>
                  <th>Products</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id}>
                    <td>
                      <img
                        src={cat.coverImage}
                        alt={cat.name}
                        className="admin-table-thumb"
                      />
                    </td>
                    <td>
                      <strong>{cat.name}</strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        ID: {cat.id}
                      </div>
                    </td>
                    <td>{cat.products ? cat.products.length : 0} items</td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="admin-actions-cell" style={{ justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          className="btn btn-admin btn-admin-edit"
                          onClick={() => setEditingCategoryModal(cat)}
                        >
                          <Edit2 size={12} style={{ marginRight: '4px' }} />
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-admin btn-gold"
                          onClick={() => setActiveCategoryView(cat.id)}
                        >
                          Manage Products →
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* ================= SINGLE CATEGORY PRODUCTS VIEW ================= */
          <div className="admin-card">
            <div style={{ marginBottom: '16px' }}>
              <button
                type="button"
                className="btn btn-admin btn-admin-edit"
                onClick={() => setActiveCategoryView(null)}
              >
                <ArrowLeft size={14} style={{ marginRight: '6px' }} />
                <span>Back to Categories</span>
              </button>
            </div>

            <div className="admin-card-title">
              <div>
                <span className="eyebrow" style={{ color: 'var(--color-gold)' }}>Managing Category</span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem' }}>
                  {currentSelectedCategory?.name}
                </h2>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  setEditingProductModal({
                    isNew: true,
                    categoryId: currentSelectedCategory.id,
                    product: {
                      name: '',
                      modelNumber: 'OM-',
                      thumbnail: '',
                      images: [],
                      description: ''
                    }
                  })
                }
              >
                <Plus size={16} style={{ marginRight: '6px' }} />
                <span>+ Add Product</span>
              </button>
            </div>

            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>Thumb</th>
                  <th>Model Number</th>
                  <th>Product Name</th>
                  <th>Gallery</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentSelectedCategory?.products?.map((prod) => (
                  <tr key={prod.id}>
                    <td>
                      <img
                        src={prod.thumbnail}
                        alt={prod.modelNumber}
                        className="admin-table-thumb"
                      />
                    </td>
                    <td>
                      <strong style={{ color: 'var(--color-gold)' }}>
                        {prod.modelNumber}
                      </strong>
                    </td>
                    <td>{prod.name}</td>
                    <td>{prod.images ? prod.images.length : 1} photos</td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="admin-actions-cell" style={{ justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          className="btn btn-admin btn-admin-edit"
                          onClick={() =>
                            setEditingProductModal({
                              isNew: false,
                              categoryId: currentSelectedCategory.id,
                              product: { ...prod }
                            })
                          }
                        >
                          <Edit2 size={12} style={{ marginRight: '4px' }} />
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-admin btn-admin-delete"
                          onClick={() => {
                            if (window.confirm(`Delete product ${prod.modelNumber}?`)) {
                              deleteProduct(currentSelectedCategory.id, prod.id);
                            }
                          }}
                        >
                          <Trash2 size={12} style={{ marginRight: '4px' }} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= EDIT CATEGORY MODAL ================= */}
      {editingCategoryModal && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem' }}>
                {editingCategoryModal.isNew ? 'Add Category' : 'Edit Category'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingCategoryModal(null)}
                style={{ cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editingCategoryModal.isNew) {
                  addCategory(editingCategoryModal);
                } else {
                  updateCategory(editingCategoryModal);
                }
                setEditingCategoryModal(null);
              }}
            >
              <div className="form-group">
                <label className="form-label">Category Name</label>
                <input
                  type="text"
                  required
                  value={editingCategoryModal.name}
                  onChange={(e) =>
                    setEditingCategoryModal({ ...editingCategoryModal, name: e.target.value })
                  }
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  rows="3"
                  value={editingCategoryModal.description || ''}
                  onChange={(e) =>
                    setEditingCategoryModal({
                      ...editingCategoryModal,
                      description: e.target.value
                    })
                  }
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category Cover Image</label>
                {editingCategoryModal.coverImage && (
                  <div style={{ marginBottom: '10px' }}>
                    <img
                      src={editingCategoryModal.coverImage}
                      alt="Cover Preview"
                      style={{ maxHeight: '160px', objectFit: 'cover', border: '1px solid #ccc' }}
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      handleImageUpload(e.target.files[0], (dataUrl) => {
                        setEditingCategoryModal((prev) => ({ ...prev, coverImage: dataUrl }));
                      });
                    }
                  }}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditingCategoryModal(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= EDIT / ADD PRODUCT MODAL ================= */}
      {editingProductModal && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem' }}>
                {editingProductModal.isNew ? 'Add Product' : `Edit Product: ${editingProductModal.product.modelNumber}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingProductModal(null)}
                style={{ cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const prod = editingProductModal.product;
                if (!prod.thumbnail && prod.images && prod.images.length > 0) {
                  prod.thumbnail = prod.images[0];
                }
                if (editingProductModal.isNew) {
                  addProduct(editingProductModal.categoryId, prod);
                } else {
                  updateProduct(editingProductModal.categoryId, prod);
                }
                setEditingProductModal(null);
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Model Number *</label>
                  <input
                    type="text"
                    required
                    value={editingProductModal.product.modelNumber}
                    onChange={(e) =>
                      setEditingProductModal({
                        ...editingProductModal,
                        product: { ...editingProductModal.product, modelNumber: e.target.value }
                      })
                    }
                    placeholder="e.g. OM-1817"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={editingProductModal.product.name}
                    onChange={(e) =>
                      setEditingProductModal({
                        ...editingProductModal,
                        product: { ...editingProductModal.product, name: e.target.value }
                      })
                    }
                    placeholder="e.g. Artisanal Leather Bag (OM-1817)"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  rows="2"
                  value={editingProductModal.product.description || ''}
                  onChange={(e) =>
                    setEditingProductModal({
                      ...editingProductModal,
                      product: { ...editingProductModal.product, description: e.target.value }
                    })
                  }
                  className="form-textarea"
                />
              </div>

              {/* Primary Thumbnail */}
              <div className="form-group">
                <label className="form-label">Thumbnail Image</label>
                {editingProductModal.product.thumbnail && (
                  <div style={{ marginBottom: '8px' }}>
                    <img
                      src={editingProductModal.product.thumbnail}
                      alt="Thumbnail Preview"
                      style={{ width: '80px', height: '80px', objectFit: 'contain', background: '#F8F6F2', border: '1px solid #ddd' }}
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      handleImageUpload(e.target.files[0], (dataUrl) => {
                        setEditingProductModal((prev) => ({
                          ...prev,
                          product: { ...prev.product, thumbnail: dataUrl }
                        }));
                      });
                    }
                  }}
                  className="form-input"
                />
              </div>

              {/* Gallery Images */}
              <div className="form-group">
                <label className="form-label">
                  Gallery Images ({editingProductModal.product.images?.length || 0} images)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    files.forEach((file) => {
                      handleImageUpload(file, (dataUrl) => {
                        setEditingProductModal((prev) => {
                          const existing = prev.product.images || [];
                          return {
                            ...prev,
                            product: {
                              ...prev.product,
                              images: [...existing, dataUrl],
                              thumbnail: prev.product.thumbnail || dataUrl
                            }
                          };
                        });
                      });
                    });
                  }}
                  className="form-input"
                />

                <div className="admin-gallery-previews">
                  {editingProductModal.product.images?.map((imgUrl, idx) => (
                    <div className="admin-gallery-preview-item" key={idx}>
                      <img src={imgUrl} alt={`Preview ${idx + 1}`} />
                      <button
                        type="button"
                        className="admin-preview-remove-btn"
                        onClick={() => {
                          const updated = editingProductModal.product.images.filter((_, i) => i !== idx);
                          setEditingProductModal({
                            ...editingProductModal,
                            product: { ...editingProductModal.product, images: updated }
                          });
                        }}
                        title="Remove image"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditingProductModal(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
