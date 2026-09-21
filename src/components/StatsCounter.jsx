import React, { useState, useEffect, useRef } from 'react';

const STATS_DATA = [
  { target: 29, suffix: '+', label: 'YEARS', sub: 'Heritage of Craftsmanship' },
  { target: 70, suffix: '+', label: 'COUNTRIES', sub: 'Global Export Reach' },
  { target: 350, suffix: '+', label: 'CLIENTS', sub: 'International B2B Brands' },
  { target: 930, suffix: 'K+', label: 'DISPATCHED', sub: 'Handcrafted Pieces Shipped' }
];

export default function StatsCounter() {
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1800; // ms
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);

            const nextCounts = STATS_DATA.map((item) =>
              Math.floor(item.target * easeOut)
            );

            setCounts(nextCounts);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts(STATS_DATA.map((item) => item.target));
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section className="stats-section" ref={sectionRef} aria-label="Company Statistics">
      <div className="container">
        <div className="stats-grid">
          {STATS_DATA.map((item, idx) => (
            <div className="stat-item" key={item.label}>
              <div className="stat-number-wrapper">
                <span>{counts[idx]}</span>
                <span className="stat-suffix">{item.suffix}</span>
              </div>
              <div className="stat-label">{item.label}</div>
              <div className="stat-sub">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
