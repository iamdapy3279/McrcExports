import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductViewerModal from './components/ProductViewerModal';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CatalogPage from './pages/CatalogPage';
import AdminPage from './pages/AdminPage';
import { useCatalog } from './context/CatalogContext';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const { notification, catalog, openProductModal, selectedProducts } = useCatalog();

  // Listen to browser popstate (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Route matching
  const isAdmin = currentPath.startsWith('/admin');
  const isExport = currentPath === '/export';
  const isProducts = currentPath.startsWith('/products');

  // Extract category param if on /products/:categoryId
  let categoryFilter = null;
  if (isProducts) {
    const parts = currentPath.split('/').filter(Boolean);
    if (parts.length >= 2 && parts[1] !== '') {
      categoryFilter = parts[1];
    }
  }

  return (
    <div className="app-container">
      {/* Toast Notification Banner */}
      {notification && (
        <div className={`toast-banner ${notification.type}`}>
          {notification.type === 'error' ? (
            <AlertCircle size={20} color="#FF8A80" />
          ) : (
            <CheckCircle2 size={20} color="var(--color-gold)" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Public Header */}
      {!isAdmin && <Header currentPath={currentPath} navigate={navigate} />}

      {/* Main Page Content */}
      {isAdmin ? (
        <AdminPage navigate={navigate} />
      ) : isExport ? (
        <AboutPage navigate={navigate} />
      ) : isProducts ? (
        <CatalogPage categoryFilter={categoryFilter} navigate={navigate} />
      ) : (
        <HomePage navigate={navigate} />
      )}

      {/* Public Footer */}
      {!isAdmin && <Footer navigate={navigate} />}

      
      {/* Sticky Selection Bar */}
      {selectedProducts.length > 0 && !isAdmin && (
        <div className="fixed bottom-4 left-0 right-0 z-50 px-4 pointer-events-none flex justify-center">
          <div className="bg-[#0a1811] text-white px-5 py-3 md:px-6 md:py-4 rounded-xl shadow-2xl pointer-events-auto flex items-center justify-between gap-4 md:gap-6 max-w-4xl w-full border border-white/10">
            <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
              <div className="w-10 h-10 rounded-lg bg-[#01412a] text-[#86ea9a] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">shopping_basket</span>
              </div>
              <div className="overflow-hidden">
                <div className="font-bold text-sm md:text-base">{selectedProducts.length} products selected</div>
                <div className="text-xs text-[#a8efb4]/70 truncate max-w-[150px] sm:max-w-xs md:max-w-md">
                   {selectedProducts.map(p => p.name).join('. ')}
                </div>
              </div>
            </div>
            <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('enquiry-section')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="shrink-0 bg-[#86ea9a] text-[#012d1d] px-4 md:px-6 py-2.5 rounded-lg font-bold text-sm md:text-base flex items-center gap-1.5 md:gap-2 hover:bg-[#5cdc77] transition-colors shadow-md">
              Send Enquiry <span className="material-symbols-outlined text-[18px] md:text-[20px]">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* Global Product Viewer Modal / Lightbox */}
      <ProductViewerModal />
    </div>
  );
}
