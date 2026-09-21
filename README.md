# MCRC Exports — Handcrafted Leather Manufacturer & Exporter

Official website and digital B2B catalog for **MCRC Exports**, a Kolkata-based manufacturer and exporter of handcrafted, hand-painted genuine leather products drawing from traditional Shantiniketan craftsmanship.

## Highlights
- **100% Frontend Architecture**: Zero external databases or authentication.
- **Structured Catalog**: Stored locally in `/public/data/catalog.json` with multi-image gallery models across 6 categories:
  1. Small Leather Goods
  2. Pouches
  3. Leather Bags
  4. Coin Bags & Decor
  5. Wallets
  6. Canvas Bags
- **B2B Product Viewer**: Lightbox modal with high-resolution gallery, thumbnail selector, touch gestures, and direct sourcing inquiry generation.
- **Admin CMS (`/admin`)**: Client-side content management to add/edit/delete categories and products, upload photos via browser `FileReader`, and Export/Import catalog JSON files.
- **Responsive & Modern Design**: Tailored luxury aesthetic using clean modern typography (*Plus Jakarta Sans* & *Outfit*), animated statistics counter, and asymmetric Bento category grid.

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

### Admin CMS
Navigate directly to:
[http://localhost:5173/admin](http://localhost:5173/admin)
*(Intentionally unlinked from the public navigation bar for internal catalog management)*

---

© 2026 MCRC Exports. All rights reserved. Handcrafted in India for Global Markets.
