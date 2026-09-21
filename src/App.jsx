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
  const { notification, catalog, openProductModal } = useCatalog();

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
  const isAbout = currentPath === '/about';
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
      ) : isAbout ? (
        <AboutPage navigate={navigate} />
      ) : isProducts ? (
        <CatalogPage categoryFilter={categoryFilter} navigate={navigate} />
      ) : (
        <HomePage navigate={navigate} />
      )}

      {/* Public Footer */}
      {!isAdmin && <Footer navigate={navigate} />}

      {/* Global Product Viewer Modal / Lightbox */}
      <ProductViewerModal />
    </div>
  );
}
