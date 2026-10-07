import re

with open('src/pages/HomePage.jsx', 'r') as f:
    content = f.read()

# We want to replace the whole <section id="process">
# Let's find its start and end
start_tag = '<section className="py-16 md:py-24 bg-surface border-b border-outline-variant/30" id="process">'
start_idx = content.find(start_tag)
if start_idx == -1:
    print("Could not find start tag")
    exit(1)

end_tag = '</section>\n{/*  FINAL DUAL CTA'
end_idx = content.find(end_tag, start_idx)
if end_idx == -1:
    print("Could not find end tag")
    exit(1)

replacement = """<section className="py-16 md:py-24 bg-surface border-b border-outline-variant/30 relative overflow-hidden" id="process">
  <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
    <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/30 text-secondary text-label-sm font-label-sm uppercase tracking-widest border border-secondary/20 mb-6 font-mono">
        <span className="material-symbols-outlined text-sm">verified_user</span> ENTERPRISE B2B COMMITMENT
      </span>
      <h2 className="text-headline-lg md:text-display-sm font-headline-lg md:font-display-sm font-bold text-primary tracking-tight mb-4 leading-tight">
        Why Choose Our Eco-Friendly Disposable Products
      </h2>
      <p className="text-body-md md:text-body-lg font-body-md md:font-body-lg text-on-surface-variant leading-relaxed">
        Choose factory-direct compostable food packaging manufactured from renewable sugarcane bagasse and bamboo fiber. Designed for restaurants, hotels, airlines, retailers, distributors and food service brands seeking reliable bulk supply and OEM manufacturing.
      </p>
    </div>

    {/* Responsive Layout Container */}
    <div className="relative">
      
      {/* --- DESKTOP/TABLET (HORIZONTAL) --- */}
      <div className="hidden md:flex justify-between items-start relative w-full pt-8">
        {/* Background Squiggle/Line SVG */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 -z-10 text-secondary opacity-50 px-12">
           <svg width="100%" height="60" preserveAspectRatio="none" viewBox="0 0 1000 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,30 Q 125,0 250,30 T 500,30 T 750,30 T 1000,30" stroke="currentColor" strokeWidth="2" fill="none" />
           </svg>
        </div>

        {/* The 5 steps */}
        {[
          { icon: 'inventory_2', title: 'Free physical samples', desc: 'Shipped to your office, freight included.' },
          { icon: 'edit_calendar', title: 'Custom design quote', desc: 'Submit a CAD or mould design. Tooling timeline returned within five working days.' },
          { icon: 'verified', title: 'Audit-ready paperwork', desc: 'BRCGS Grade A, FDA, SGS, Intertek, Sedex documents shipped with every order.' },
          { icon: 'schedule', title: '48-hour quote SLA', desc: 'Specifications and volume returned with pricing within two working days.' },
          { icon: 'pallet', title: 'Container-load supply', desc: 'FCL minimums for export buyers. Pallet quantities for select SKUs domestically.' }
        ].map((step, idx) => (
          <div key={idx} className="flex flex-col items-center text-center w-1/5 px-2 relative group">
            <div className="w-24 h-24 mb-6 rounded-full bg-surface-container-lowest border-2 border-outline-variant/50 shadow-md flex items-center justify-center group-hover:scale-105 group-hover:border-secondary transition-all">
              <div className="w-16 h-16 rounded-full border border-outline-variant/30 flex items-center justify-center text-primary group-hover:bg-secondary/10 transition-colors">
                <span className="material-symbols-outlined text-3xl">{step.icon === 'pallet' ? 'view_module' : step.icon}</span>
              </div>
            </div>
            <h4 className="text-label-lg font-label-lg font-bold text-primary mb-2">{step.title}</h4>
            <p className="text-body-sm font-body-sm text-on-surface-variant leading-relaxed px-2">{step.desc}</p>
          </div>
        ))}
      </div>

      {/* --- MOBILE (VERTICAL) --- */}
      <div className="md:hidden relative py-6">
        <div className="absolute left-1/2 top-4 bottom-4 w-[1px] -translate-x-1/2 bg-outline-variant/40 border-l border-dashed border-secondary/50"></div>
        <div className="space-y-12 relative">
          {[
            { icon: 'inventory_2', title: 'Free physical samples', desc: 'Shipped to your office, freight included.' },
            { icon: 'edit_calendar', title: 'Custom design quote', desc: 'Submit a CAD or mould design. Tooling timeline returned within five working days.' },
            { icon: 'verified', title: 'Audit-ready paperwork', desc: 'BRCGS Grade A, FDA, SGS, Intertek, Sedex documents shipped with every order.' },
            { icon: 'schedule', title: '48-hour quote SLA', desc: 'Specifications and volume returned with pricing within two working days.' },
            { icon: 'view_module', title: 'Container-load supply', desc: 'FCL minimums for export buyers. Pallet quantities for select SKUs domestically.' }
          ].map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className="flex flex-row items-center w-full">
                {isEven ? (
                  <>
                    <div className="w-1/2 pr-5 text-right">
                      <span className="text-label-sm font-label-sm text-secondary font-mono block mb-1">0{idx + 1}</span>
                      <h4 className="text-headline-sm font-headline-sm font-bold text-primary uppercase leading-tight mb-1">{step.title}</h4>
                      <p className="text-body-sm font-body-sm text-on-surface-variant leading-snug">{step.desc}</p>
                    </div>
                    <div className="relative z-10 w-14 h-14 rounded-full bg-surface-container-lowest border-2 border-outline-variant/50 flex items-center justify-center shadow-md shrink-0">
                      <div className="w-10 h-10 rounded-full bg-secondary-container/40 flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-xl">{step.icon}</span>
                      </div>
                    </div>
                    <div className="w-1/2 pl-5"></div>
                  </>
                ) : (
                  <>
                    <div className="w-1/2 pr-5"></div>
                    <div className="relative z-10 w-14 h-14 rounded-full bg-surface-container-lowest border-2 border-outline-variant/50 flex items-center justify-center shadow-md shrink-0">
                      <div className="w-10 h-10 rounded-full bg-secondary-container/40 flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-xl">{step.icon}</span>
                      </div>
                    </div>
                    <div className="w-1/2 pl-5 text-left">
                      <span className="text-label-sm font-label-sm text-secondary font-mono block mb-1">0{idx + 1}</span>
                      <h4 className="text-headline-sm font-headline-sm font-bold text-primary uppercase leading-tight mb-1">{step.title}</h4>
                      <p className="text-body-sm font-body-sm text-on-surface-variant leading-snug">{step.desc}</p>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
</section>"""

new_content = content[:start_idx] + replacement + content[end_idx:]

with open('src/pages/HomePage.jsx', 'w') as f:
    f.write(new_content)
