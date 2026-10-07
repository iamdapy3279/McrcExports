import re

with open('WEBSITE DESIGN /AdminPage/code.html', 'r') as f:
    admin_html = f.read()

with open('WEBSITE DESIGN /Form/code.html', 'r') as f:
    form_html = f.read()

def html_to_jsx(html):
    jsx = html.replace('class="', 'className="').replace("class='", "className='")
    jsx = jsx.replace('onclick="', 'onClick="').replace('onsubmit="', 'onSubmit="').replace('for="', 'htmlFor="')
    jsx = re.sub(r'(<input[^>]*)(?<!/)>', r'\1 />', jsx)
    jsx = re.sub(r'(<img[^>]*)(?<!/)>', r'\1 />', jsx)
    jsx = re.sub(r'style="([^"]*)"', r'style={{\1}}', jsx)
    jsx = jsx.replace("font-variation-settings: 'FILL' 1;", "fontVariationSettings: \"'FILL' 1\"")
    jsx = re.sub(r'<!--.*?-->', '', jsx, flags=re.DOTALL)
    jsx = re.sub(r'<script.*?</script>', '', jsx, flags=re.DOTALL)
    return jsx

header_match = re.search(r'<header.*?</header>', admin_html, re.DOTALL)
header = html_to_jsx(header_match.group(0)) if header_match else ''
header = header.replace('PULP &amp; GRAIN B2B', 'Notch')

aside_match = re.search(r'<aside.*?</aside>', admin_html, re.DOTALL)
aside = html_to_jsx(aside_match.group(0)) if aside_match else ''
# Remove the download block from sidebar
aside = re.sub(r'<div className="flex flex-col gap-space-md pt-space-md border-t border-outline-variant">.*?</div>\s*</div>', '', aside, flags=re.DOTALL)

# Find the form HTML wrapper
form_match = re.search(r'<div className="max-w-5xl mx-auto".*?(<div.*?)(?=</body>)', html_to_jsx(form_html), re.DOTALL)
form_jsx_raw = '<div className="max-w-5xl mx-auto">' + html_to_jsx(form_html).split('<div className="max-w-5xl mx-auto">')[1].split('</body>')[0]

# Modify the form JSX to use controlled state
form_final = form_jsx_raw
form_final = form_final.replace('Add New Catalogue Item', '{initialData ? "Edit Catalogue Item" : "Add New Catalogue Item"}')
form_final = form_final.replace('value="SMALL LEATHER GOODS"', 'name="category" value={formData.category} onChange={handleChange}')
form_final = form_final.replace('value="Handcrafted Leather Good"', 'name="name" value={formData.name} onChange={handleChange}')
form_final = form_final.replace('value="OM-7637"', 'name="modelCode" value={formData.modelCode} onChange={handleChange}')
form_final = re.sub(r'<textarea([^>]*)>.*?</textarea>', r'<textarea\1 name="description" value={formData.description} onChange={handleChange}></textarea>', form_final, flags=re.DOTALL)
form_final = form_final.replace("onClick={() => {}}", "onClick={handleSubmit}")
form_final = form_final.replace(">Discard Draft<", " onClick={onCancel}>Discard Draft<")

react_code = """import React, { useState } from 'react';
import { useCatalog } from '../context/CatalogContext';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [currentView, setCurrentView] = useState('grid');
  const [editingProduct, setEditingProduct] = useState(null);

  const { catalog, addProduct, updateProduct, deleteProduct } = useCatalog();

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
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
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
      HEADER_PLACEHOLDER
      <div className="w-full max-w-[1440px] mx-auto flex-1 flex flex-row">
        ASIDE_PLACEHOLDER
        <main className="flex-1 p-6 md:p-8 lg:p-10 max-w-[1200px] overflow-y-auto">
          {currentView === 'grid' ? (
            <AdminGrid 
              products={catalog.products} 
              onAdd={() => { setEditingProduct(null); setCurrentView('form'); }} 
              onEdit={(prod) => { setEditingProduct(prod); setCurrentView('form'); }}
              onDelete={deleteProduct}
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
                  <button onClick={() => onDelete(prod.id)} className="p-1.5 bg-surface-container hover:bg-red-50 text-red-500 rounded border border-outline-variant transition-colors" title="Delete">
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


react_code = react_code.replace('''      <form className="space-y-8" onSubmit={handleSubmit}>
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
              <input name="category" value={formData.category} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant/70 focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm font-semibold bg-surface-container-lowest text-primary" required type="text" />
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
      </form>
    </div>
  );
}
"""

react_code = react_code.replace('''      <form className="space-y-8" onSubmit={handleSubmit}>
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
              <input name="category" value={formData.category} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant/70 focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm font-semibold bg-surface-container-lowest text-primary" required type="text" />
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
      </form>
    </div>''', form_final)

react_code = react_code.replace("HEADER_PLACEHOLDER", header)
react_code = react_code.replace("ASIDE_PLACEHOLDER", aside)

with open('src/pages/AdminPage.jsx', 'w') as f:
    f.write(react_code)

print("AdminPage.jsx successfully built with full CRUD mapping!")
