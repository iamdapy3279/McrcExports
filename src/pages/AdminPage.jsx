import React, { useState, useRef } from 'react';
import { useCatalog } from '../context/CatalogContext';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [currentView, setCurrentView] = useState('grid');
  const [editingProduct, setEditingProduct] = useState(null);

  const { catalog, addProduct, updateProduct, deleteProduct, addCategory } = useCatalog();
  const allProducts = (catalog?.categories || []).flatMap(category => {
    return (category.products || []).map(p => ({ ...p, categoryId: category.id }));
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginEmail.trim().toLowerCase() === 'notch@admin.com' && loginPassword === 'notch') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid email or password.');
    }
  };

  const handleSaveForm = (productData) => {
    const categoryName = productData.category || 'Uncategorized';
    let targetCat = catalog?.categories?.find(c => 
      c.name.toLowerCase() === categoryName.toLowerCase() || c.id === categoryName
    );
    
    let catId = targetCat ? targetCat.id : categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingProduct) {
      updateProduct(editingProduct.categoryId, catId, productData, categoryName);
    } else {
      addProduct(catId, productData, categoryName);
    }
    setCurrentView('grid');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-container-low">
        <form onSubmit={handleLogin} className="p-8 bg-surface-container-lowest rounded-2xl shadow-xl max-w-sm w-full border border-outline-variant/40">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-white text-2xl">shield_person</span>
          </div>
          <h2 className="text-2xl font-bold font-outfit text-primary mb-2 text-center">Admin Access</h2>
          <p className="text-sm text-on-surface-variant mb-6 text-center">Enter your credentials to continue</p>
          
          {loginError && <p className="text-red-500 mb-4 text-sm font-semibold text-center bg-red-50 py-2 rounded-lg">{loginError}</p>}
          
          <div className="mb-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">Email</label>
            <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="w-full px-4 py-2 border border-outline-variant/70 rounded-lg focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none text-sm bg-surface-container-lowest text-primary" required />
          </div>
          <div className="mb-8">
            <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">Password</label>
            <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className="w-full px-4 py-2 border border-outline-variant/70 rounded-lg focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none text-sm bg-surface-container-lowest text-primary" required />
          </div>
          <button type="submit" className="w-full bg-primary text-white py-2.5 rounded-lg font-bold hover:bg-primary-container transition-colors shadow-sm">Sign In</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-body-md text-on-surface bg-background antialiased selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      <header className="docked full-width top-0 sticky z-40 bg-surface-container-lowest dark:bg-inverse-surface border-b border-outline-variant dark:border-outline shadow-sm dark:shadow-none">
<div className="w-full max-w-[1440px] mx-auto px-margin-sm md:px-margin lg:px-margin-lg flex items-center justify-between h-16">

<div className="flex items-center gap-space-lg flex-1">
<span className="font-headline-sm text-headline-sm font-semibold tracking-tight text-primary dark:text-inverse-primary shrink-0 select-none">
          Notch
        </span>

<div className="hidden sm:flex items-center relative w-full max-w-xs">
<span className="material-symbols-outlined absolute left-3 text-outline pointer-events-none text-[18px]">search</span>
<input className="w-full pl-9 pr-3 py-1.5 bg-surface-container-low border border-outline-variant rounded-lg font-body-sm text-body-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-on-surface" placeholder="Search specs, SKUs, batches..." type="text"/>
</div>
</div>

<nav className="hidden md:flex items-center gap-space-lg mx-space-md">
<a className="text-primary dark:text-primary-fixed border-b-2 border-primary dark:border-primary-fixed font-semibold pb-1 font-body-md text-body-md" href="#">Inventory</a>
<a className="text-on-surface-variant dark:text-inverse-on-surface hover:text-primary dark:hover:text-primary-fixed pb-1 transition-colors font-body-md text-body-md" href="#">Batches</a>
<a className="text-on-surface-variant dark:text-inverse-on-surface hover:text-primary dark:hover:text-primary-fixed pb-1 transition-colors font-body-md text-body-md" href="#">Procurement</a>
<a className="text-on-surface-variant dark:text-inverse-on-surface hover:text-primary dark:hover:text-primary-fixed pb-1 transition-colors font-body-md text-body-md" href="#">Analytics</a>
</nav>

<div className="flex items-center gap-space-sm sm:gap-space-md">
<button className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low dark:hover:bg-surface-variant transition-colors rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined">notifications</span>
</button>
<button className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low dark:hover:bg-surface-variant transition-colors rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined">tune</span>
</button>
<button className="hidden sm:inline-flex items-center gap-1.5 bg-primary-container text-on-primary px-space-md py-2 rounded-lg font-label-md text-label-md hover:bg-primary transition-colors active:scale-[0.98]">
<span className="material-symbols-outlined text-[16px]">add</span>
<span>Add New Item</span>
</button>

<div className="relative shrink-0 ml-1">
<img alt="Enterprise procurement manager portrait" className="w-8 h-8 rounded-full border border-outline-variant object-cover" data-alt="Close-up professional photographic portrait of an enterprise procurement manager wearing a dark forest-green tailored blazer in a bright, modern architectural office with soft daylight and warm bamboo wall accents." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmk6sGUS3kvvCbn6z6t2G7lfQQ4wQ16VDG6KfIjvyhnhkI03N21XHmNPFQKpkEU15k_KJaftKb5uBdotjkE_gmb2Vw3NuUb8PpTSg88joqZ4N0cKzlPCjzuRQqjZfnFIRQGucGenkG__6uuibdPmv5i4ToUduWEMsCX5hbpTL_cf21905gdczmEqCSmG96Y0w8Ub---7IUCLBmWqWBb1S6pEjzHQRyzzaV-fL1y_I"/>
<span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-secondary rounded-full ring-2 ring-surface-container-lowest"></span>
</div>
</div>
</div>
</header>
      <div className="w-full max-w-[1440px] mx-auto flex-1 flex flex-row">
        <aside className="hidden lg:flex flex-col justify-between p-space-md shrink-0 h-[calc(100vh-4rem)] sticky top-16 w-64 border-r border-outline-variant dark:border-outline bg-surface dark:bg-inverse-surface">
<div className="flex flex-col gap-space-lg">

<div className="p-space-sm border border-outline-variant rounded-xl bg-surface-container-lowest">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border border-outline-variant text-primary font-bold">
<span className="material-symbols-outlined text-secondary">recycling</span>
</div>
<div className="overflow-hidden">
<h2 className="font-headline-sm text-headline-sm text-primary dark:text-inverse-primary truncate">Industrial Circularity</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant truncate">Enterprise Tier #4892</p>
</div>
</div>
</div>

<nav className="flex flex-col gap-1">
<a className="bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary font-semibold rounded-lg px-space-md py-space-sm flex items-center gap-space-sm" href="#">
<span className="material-symbols-outlined text-primary text-[20px]" data-weight="fill" style={{fontVariationSettings: "'FILL' 1"}}>inventory_2</span>
<span className="font-label-md text-label-md">Catalog Overview</span>
</a>
<a className="text-on-surface-variant dark:text-inverse-on-surface hover:bg-surface-container-high dark:hover:bg-surface-variant rounded-lg px-space-md py-space-sm flex items-center gap-space-sm transition-colors" href="#">
<span className="material-symbols-outlined text-[20px]">warehouse</span>
<span className="font-label-md text-label-md">Stock Inventory</span>
</a>
<a className="text-on-surface-variant dark:text-inverse-on-surface hover:bg-surface-container-high dark:hover:bg-surface-variant rounded-lg px-space-md py-space-sm flex items-center gap-space-sm transition-colors" href="#">
<span className="material-symbols-outlined text-[20px]">precision_manufacturing</span>
<span className="font-label-md text-label-md">Batch Processing</span>
</a>
<a className="text-on-surface-variant dark:text-inverse-on-surface hover:bg-surface-container-high dark:hover:bg-surface-variant rounded-lg px-space-md py-space-sm flex items-center gap-space-sm transition-colors" href="#">
<span className="material-symbols-outlined text-[20px]">description</span>
<span className="font-label-md text-label-md">Spec Sheets</span>
</a>
<a className="text-on-surface-variant dark:text-inverse-on-surface hover:bg-surface-container-high dark:hover:bg-surface-variant rounded-lg px-space-md py-space-sm flex items-center gap-space-sm transition-colors" href="#">
<span className="material-symbols-outlined text-[20px]">local_shipping</span>
<span className="font-label-md text-label-md">Export Logistics</span>
</a>
</nav>
</div>


</aside>
        <main className="flex-1 p-6 md:p-8 lg:p-10 max-w-[1200px] overflow-y-auto">
          {currentView === 'grid' ? (
            <AdminGrid 
              products={allProducts} 
              onAdd={() => { setEditingProduct(null); setCurrentView('form'); }} 
              onEdit={(prod) => { setEditingProduct(prod); setCurrentView('form'); }}
              onDelete={(id, catId) => deleteProduct(catId, id)}
            />
          ) : (
            <AdminForm 
              initialData={editingProduct} 
              onSave={handleSaveForm} 
              onCancel={() => setCurrentView('grid')} 
            />
          )}
        </main>
      </div>
    </div>
  );
}

function AdminGrid({ products, onAdd, onEdit, onDelete }) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant pb-space-sm">
        <nav className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
          <span className="hover:text-primary transition-colors cursor-pointer">Master Catalogue</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary font-semibold">All Items</span>
        </nav>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-secondary-container/40 border border-secondary text-primary font-label-sm text-label-sm uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            ASTM D6400 Verified
          </span>
          <span className="font-label-sm text-label-sm text-outline">Sync Latency: 14ms</span>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mt-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">Catalogue Inventory &amp; Master Products</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-3xl">
            Manage, filter, and inspect enterprise B2B product specifications, SKU batches, and export packaging models.
          </p>
        </div>
        <button onClick={onAdd} className="flex items-center justify-center gap-1.5 bg-primary-container text-on-primary px-space-md py-2 rounded-lg font-label-md text-label-md w-full md:w-auto">
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>Add New Item</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-outline-variant mt-8">
        <div className="p-space-md flex flex-col">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Active Product SKUs</span>
          <span className="font-headline-md text-headline-md font-semibold text-primary mt-1 font-mono">{products.length} Models</span>
          <span className="font-label-sm text-label-sm text-secondary mt-0.5">100% Certified Compostable</span>
        </div>
        <div className="p-space-md flex flex-col">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Average Wall Caliper</span>
          <span className="font-headline-md text-headline-md font-semibold text-primary mt-1 font-mono">1.25 ± 0.08 mm</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">High rigidity thermal pressed</span>
        </div>
        <div className="p-space-md flex flex-col">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Export Port Dispatch</span>
          <span className="font-headline-md text-headline-md font-semibold text-primary mt-1 font-mono">Mundra / JNPT</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">FOB / CIF Container Loaded</span>
        </div>
        <div className="p-space-md flex flex-col">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Monthly Production Run</span>
          <span className="font-headline-md text-headline-md font-semibold text-primary mt-1 font-mono">14.8M Units</span>
          <span className="font-label-sm text-label-sm text-secondary mt-0.5">1,240 MT Bio-offset</span>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-space-md border border-outline-variant rounded-xl flex flex-col gap-space-md mt-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">search</span>
              <input className="w-full pl-9 pr-3 py-1.5 bg-surface-container-low border border-outline-variant rounded-lg font-body-sm text-body-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-on-surface" placeholder="Search models, materials..." type="text" />
            </div>
            <select className="bg-surface-container-low border border-outline-variant rounded-lg font-body-sm text-body-sm py-1.5 pl-3 pr-8 focus:border-secondary focus:ring-1 focus:ring-secondary text-on-surface">
              <option>All Statuses</option>
              <option>Published</option>
              <option>Draft</option>
              <option>Export Ready</option>
            </select>
          </div>
          <div className="flex items-center justify-between w-full md:w-auto gap-space-md">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Showing <span className="font-semibold text-primary">{products.length}</span> Products
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-lg mt-6">
        {products.map(prod => (
          <div key={prod.id} className="bg-surface-container-lowest rounded-xl border border-outline-variant hover:border-secondary transition-all duration-200 shadow-sm hover:shadow-md flex flex-col overflow-hidden group">
            <div className="p-space-md bg-surface-container-low relative border-b border-outline-variant">
              <div className="aspect-[16/10] w-full rounded-lg overflow-hidden bg-surface-container relative">
                <img src={prod.images[0] || 'https://placehold.co/600x400/ecefea/717973?text=No+Image'} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded font-label-sm text-label-sm uppercase bg-surface-container-lowest/90 text-primary border border-outline-variant">{prod.category}</span>
                </div>
                <div className="absolute top-2.5 right-2.5">
                  <span className="px-2 py-0.5 rounded font-label-sm text-label-sm uppercase bg-secondary-container text-on-secondary-container font-semibold border border-secondary">Published</span>
                </div>
              </div>
            </div>
            <div className="p-space-md flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-label-md font-bold text-secondary bg-surface-container-low px-2 py-0.5 rounded border border-outline-variant"># {prod.modelCode || prod.id}</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mt-2 group-hover:text-secondary transition-colors">
                  {prod.name}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                  {prod.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {prod.certifications?.map((cert, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-surface-container border border-outline-variant font-label-sm text-label-sm text-on-surface">{cert}</span>
                  ))}
                </div>
              </div>
              <div className="mt-space-md pt-space-sm border-t border-outline-variant flex flex-col gap-space-sm">
                <div className="flex items-center justify-between font-mono text-label-sm text-on-surface-variant">
                  <span>MOQ: <strong className="text-primary font-semibold">{prod.moq || '10,000'} Units</strong></span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button onClick={() => onEdit(prod)} className="flex-1 py-1.5 px-2 bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md rounded border border-outline-variant transition-colors flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                    <span>Edit</span>
                  </button>
                  <button onClick={() => onDelete(prod.id, prod.categoryId)} className="p-1.5 bg-surface-container hover:bg-red-50 text-red-500 rounded border border-outline-variant transition-colors" title="Delete">
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminForm({ initialData, onSave, onCancel }) {
  const { catalog } = useCatalog();
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [formData, setFormData] = useState(initialData || {
    id: 'prod_' + Math.random().toString(36).substr(2, 9),
    name: '',
    category: 'PLATES & TRAYS',
    description: '',
    modelCode: '',
    material: '',
    moq: '10,000',
    images: [],
    certifications: []
  });

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  const processFiles = (files) => {
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, event.target.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    processFiles(Array.from(e.dataTransfer.files));
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-outline-variant/50 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary-container/60 text-secondary border border-secondary/30 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span> Admin Catalog Ingestion
            </span>
            <span className="text-xs text-outline font-mono">v2.4 Live Store Sync</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-outfit text-primary tracking-tight">
            {initialData ? 'Edit Catalogue Item' : 'Add New Catalogue Item'}
          </h1>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={onCancel} className="px-4 py-2 text-sm font-semibold text-on-surface-variant bg-surface-container hover:bg-surface-container-high rounded-lg border border-outline-variant/60 transition-colors" type="button">
            Discard
          </button>
          <button onClick={handleSubmit} className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary-container rounded-lg shadow-sm hover:shadow transition-all" type="button">
            <span className="material-symbols-outlined text-lg">check_circle</span>
            Save & Publish
          </button>
        </div>
      </div>


      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Item Identity & Classification */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-outline-variant/40 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-lg">category</span>
              </div>
              <div>
                <h2 className="text-lg font-bold font-outfit text-primary">Item Identity & Classification</h2>
                <p className="text-xs text-outline">Category hierarchies, product title, and global SKU/Model numbering.</p>
              </div>
            </div>
            <span className="text-xs font-mono text-outline">Required Fields *</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">Category *</label>
              <div className="flex items-center gap-2">
                {isCreatingCategory ? (
                  <input name="category" value={formData.category} onChange={handleChange} placeholder="New Category Name" className="flex-1 w-full px-3.5 py-2.5 rounded-lg border border-outline-variant/70 focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm font-semibold bg-surface-container-lowest text-primary" required type="text" autoFocus />
                ) : (
                  <select name="category" value={formData.category} onChange={handleChange} className="flex-1 w-full px-3.5 py-2.5 rounded-lg border border-outline-variant/70 focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm font-semibold bg-surface-container-lowest text-primary" required>
                    {catalog?.categories?.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                )}
                <button type="button" onClick={() => {
                  if (isCreatingCategory) {
                    setIsCreatingCategory(false);
                    setFormData(prev => ({...prev, category: catalog?.categories?.[0]?.name || ''}));
                  } else {
                    setIsCreatingCategory(true);
                    setFormData(prev => ({...prev, category: ''}));
                  }
                }} className="w-11 h-11 flex items-center justify-center shrink-0 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary border border-outline-variant/70 transition-colors" title={isCreatingCategory ? "Cancel New Category" : "Add New Category"}>
                  <span className="material-symbols-outlined text-lg">{isCreatingCategory ? 'close' : 'add'}</span>
                </button>
              </div>
            </div>
            <div className="md:col-span-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">Product Name *</label>
              <input name="name" value={formData.name} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant/70 focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm font-semibold bg-surface-container-lowest text-primary" required type="text" />
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">Model Code *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline text-xs font-mono">#</span>
                <input name="modelCode" value={formData.modelCode} onChange={handleChange} className="w-full pl-7 pr-3.5 py-2.5 rounded-lg border border-outline-variant/70 focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm font-mono font-bold bg-surface-container-lowest text-primary" required type="text" />
              </div>
            </div>
            <div className="md:col-span-12">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">Catalogue Narrative Description *</label>
              <textarea name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-outline-variant/70 focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm leading-relaxed bg-surface-container-lowest text-on-surface" required rows="3"></textarea>
            </div>
          </div>
        </div>

        {/* Technical Specs & Export Compliance */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-outline-variant/40 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-lg">receipt_long</span>
              </div>
              <div>
                <h2 className="text-lg font-bold font-outfit text-primary">Technical Specs & Export Compliance</h2>
                <p className="text-xs text-outline">Material origins, craftsmanship standards, and customized client options.</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1.5 flex items-center justify-between">
                <span>Artisan Technique</span>
                <span className="text-[11px] font-normal text-outline">Benchmark Standard</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary">
                  <span className="material-symbols-outlined text-base">palette</span>
                </span>
                <input className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-outline-variant/70 focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm bg-surface-container-lowest text-on-surface" type="text" defaultValue="Commercial Export Quality" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1.5 flex items-center justify-between">
                <span>Material Composition</span>
                <span className="text-[11px] font-normal text-outline">Audited Grade</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary">
                  <span className="material-symbols-outlined text-base">eco</span>
                </span>
                <input className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-outline-variant/70 focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm bg-surface-container-lowest text-on-surface" type="text" defaultValue="Premium Sustainable Materials" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1.5 flex items-center justify-between">
                <span>Manufacturing Origin & Port Hub</span>
                <span className="text-[11px] font-normal text-outline">Customs Clearance</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary">
                  <span className="material-symbols-outlined text-base">anchor</span>
                </span>
                <input className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-outline-variant/70 focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm bg-surface-container-lowest text-on-surface" type="text" defaultValue="Export Hub: Mundra & JNPT (India)" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1.5 flex items-center justify-between">
                <span>B2B Customization Options</span>
                <span className="text-[11px] font-normal text-outline">Private Label / OEM</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary">
                  <span className="material-symbols-outlined text-base">design_services</span>
                </span>
                <input className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-outline-variant/70 focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm bg-surface-container-lowest text-on-surface" type="text" defaultValue="Custom Colors, Logos & Dimensions" />
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-outline-variant/30">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary">Sizes & Dimension Variants</label>
              <span className="text-xs text-outline">Press Enter or comma to add dimensions</span>
            </div>
            <div className="p-3 rounded-xl border border-outline-variant/70 bg-surface-container-low focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20 transition-all">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container-lowest text-xs font-semibold text-primary border border-outline-variant/60 shadow-sm">
                  Small (10 x 8 cm)
                  <button className="text-outline hover:text-red-600 transition-colors" type="button">
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container-lowest text-xs font-semibold text-primary border border-outline-variant/60 shadow-sm">
                  Medium (18 x 10 cm)
                  <button className="text-outline hover:text-red-600 transition-colors" type="button">
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container-lowest text-xs font-semibold text-primary border border-outline-variant/60 shadow-sm">
                  Standard B2B Case Pack (24 Units)
                  <button className="text-outline hover:text-red-600 transition-colors" type="button">
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input className="w-full px-3 py-1.5 text-sm bg-transparent border-0 focus:ring-0 text-on-surface placeholder-outline/60 outline-none" placeholder="Add custom dimensions (e.g., Large 22 x 12 cm or Custom Die-Cut)..." type="text" />
                <button className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-container transition-colors shrink-0" type="button">
                  + Add Size
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Multiple Product Media & Photography */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-outline-variant/40 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-lg">photo_library</span>
              </div>
              <div>
                <h2 className="text-lg font-bold font-outfit text-primary">Multiple Product Media & Photography</h2>
                <p className="text-xs text-outline">Upload high-res packshots, macro embossing close-ups, and export packaging photos.</p>
              </div>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-secondary-container/50 text-secondary font-semibold">{formData.images.length} Active Media Assets</span>
          </div>
          <div 
            onClick={() => fileInputRef.current.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-outline-variant/80 hover:border-secondary rounded-2xl p-8 text-center bg-surface-container-low/50 hover:bg-surface-container-low transition-colors cursor-pointer group"
          >
            <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple accept="image/*" className="hidden" />
            <div className="w-14 h-14 rounded-full bg-surface-container-lowest mx-auto flex items-center justify-center text-secondary shadow-sm group-hover:scale-105 transition-transform mb-3">
              <span className="material-symbols-outlined text-2xl">cloud_upload</span>
            </div>
            <h3 className="text-sm font-bold text-primary font-outfit">Drag & drop multiple product images or <span className="text-secondary underline">browse files</span></h3>
            <p className="text-xs text-outline mt-1">Supports high-res JPG, PNG, WEBP, or RAW packshots up to 25MB each</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {formData.images.map((imgUrl, idx) => (
              <div key={idx} className="relative group rounded-xl overflow-hidden border-2 border-transparent hover:border-secondary bg-surface-container aspect-square shadow-sm">
                <img alt={`Product View ${idx + 1}`} className="w-full h-full object-cover" src={imgUrl} />
                {idx === 0 && <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-primary text-white">Cover</span>}
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {idx !== 0 && (
                    <button type="button" onClick={(e) => { e.stopPropagation(); /* TODO: Set as cover */ }} className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center hover:bg-secondary hover:text-white transition-colors" title="Set as Cover">
                      <span className="material-symbols-outlined text-base">star</span>
                    </button>
                  )}
                  <button type="button" onClick={(e) => { e.stopPropagation(); removeImage(idx); }} className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors" title="Delete">
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>
              </div>
            ))}
            
            <div onClick={() => fileInputRef.current.click()} className="rounded-xl border-2 border-dashed border-outline-variant/60 hover:border-secondary flex flex-col items-center justify-center aspect-square text-outline hover:text-secondary bg-surface-container-low transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-2xl mb-1">add_photo_alternate</span>
              <span className="text-xs font-semibold">+ Add Image</span>
            </div>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-outline">
            <span className="material-symbols-outlined text-base text-secondary">verified_user</span>
            <span>Automatic audit validation: B2B Export Compliance metadata initialized.</span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 py-3 rounded-lg border border-outline-variant/70 text-sm font-semibold text-on-surface hover:bg-surface-container-high transition-colors" type="button">
              Save as Draft
            </button>
            <button className="w-full sm:w-auto px-8 py-3 rounded-lg bg-primary hover:bg-primary-container text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2" type="submit">
              <span className="material-symbols-outlined text-lg">publish</span>
              <span>Publish to Catalogue</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
