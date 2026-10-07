import re

with open('src/pages/HomePage.jsx', 'r') as f:
    content = f.read()

# 1. Add state variable
content = content.replace(
    'export default function HomePage() {',
    'export default function HomePage() {\n  const [activeFormTab, setActiveFormTab] = useState(\'buyer\');'
)

# 2. Extract and replace FAQ section
faq_start = content.find('<div className=\"space-y-4\">')
faq_end = content.find('</div>\n</div>\n{/*  Right Column')
if faq_start != -1 and faq_end != -1:
    original_faq = content[faq_start:faq_end]
    
    distributor_faq = '''<div className=\"space-y-4\">
<details className=\"group bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-5 open:shadow-sm transition-all\" open>
<summary className=\"flex justify-between items-center font-headline-sm font-headline-sm text-primary font-bold cursor-pointer list-none gap-4\">
<span className=\"text-body-md md:text-headline-sm font-semibold\">What are the minimum requirements to become a distributor?</span>
<span className=\"material-symbols-outlined text-secondary transition-transform duration-200 group-open:rotate-180 shrink-0\">expand_more</span>
</summary>
<p className=\"text-body-sm font-body-sm text-on-surface-variant mt-3 leading-relaxed\">We require our distribution partners to have an established regional logistics network, warehouse capacity for palletized goods, and a commitment to sustainable packaging solutions.</p>
</details>
<details className=\"group bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-5 open:shadow-sm transition-all\">
<summary className=\"flex justify-between items-center font-headline-sm font-headline-sm text-primary font-bold cursor-pointer list-none gap-4\">
<span className=\"text-body-md md:text-headline-sm font-semibold\">Do you offer exclusive territory distribution rights?</span>
<span className=\"material-symbols-outlined text-secondary transition-transform duration-200 group-open:rotate-180 shrink-0\">expand_more</span>
</summary>
<p className=\"text-body-sm font-body-sm text-on-surface-variant mt-3 leading-relaxed\">Yes. Based on committed quarterly volume and regional market penetration, we offer exclusive master-distributor rights to secure your territory.</p>
</details>
<details className=\"group bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-5 open:shadow-sm transition-all\">
<summary className=\"flex justify-between items-center font-headline-sm font-headline-sm text-primary font-bold cursor-pointer list-none gap-4\">
<span className=\"text-body-md md:text-headline-sm font-semibold\">How are wholesale prices and tiered discounts structured?</span>
<span className=\"material-symbols-outlined text-secondary transition-transform duration-200 group-open:rotate-180 shrink-0\">expand_more</span>
</summary>
<p className=\"text-body-sm font-body-sm text-on-surface-variant mt-3 leading-relaxed\">Pricing is structured into tiers based on annual volume commitments. Partners achieving higher volume thresholds automatically unlock deep factory-direct wholesale discounts.</p>
</details>
<details className=\"group bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-5 open:shadow-sm transition-all\">
<summary className=\"flex justify-between items-center font-headline-sm font-headline-sm text-primary font-bold cursor-pointer list-none gap-4\">
<span className=\"text-body-md md:text-headline-sm font-semibold\">What marketing and sales collateral do you provide?</span>
<span className=\"material-symbols-outlined text-secondary transition-transform duration-200 group-open:rotate-180 shrink-0\">expand_more</span>
</summary>
<p className=\"text-body-sm font-body-sm text-on-surface-variant mt-3 leading-relaxed\">All approved distributors receive a comprehensive digital asset library, white-label product spec sheets, certification dossiers, and physical presentation kits for your sales teams.</p>
</details>
<details className=\"group bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-5 open:shadow-sm transition-all\">
<summary className=\"flex justify-between items-center font-headline-sm font-headline-sm text-primary font-bold cursor-pointer list-none gap-4\">
<span className=\"text-body-md md:text-headline-sm font-semibold\">How do you handle regional shipping and container routing?</span>
<span className=\"material-symbols-outlined text-secondary transition-transform duration-200 group-open:rotate-180 shrink-0\">expand_more</span>
</summary>
<p className=\"text-body-sm font-body-sm text-on-surface-variant mt-3 leading-relaxed\">We offer full turnkey logistics support, including CIF delivery directly to your regional port hubs. We manage all export documentation, customs clearance coordination, and final delivery logistics.</p>
</details>
</div>'''
    
    new_faq = f'{{activeFormTab === "buyer" ? (\n{original_faq}\n) : (\n{distributor_faq}\n)}}'
    content = content[:faq_start] + new_faq + content[faq_end:]

# 3. Update the Tab Switcher
tab_switcher_regex = r'<button className=\"px-6 py-2\.5 rounded-lg text-label-lg font-label-lg transition-all bg-surface-container-lowest text-primary shadow-sm font-bold\" id=\"tabBtnBuyer\" onClick=\{\(\) => \{ /\* switchTab\(\'buyer\'\) \*/ \}\} type=\"button\">Buyer Product Enquiry</button>\\s*<button className=\"px-6 py-2\.5 rounded-lg text-label-lg font-label-lg transition-all text-on-surface-variant hover:text-primary\" id=\"tabBtnSupplier\" onClick=\{\(\) => \{ /\* switchTab\(\'supplier\'\) \*/ \}\} type=\"button\">Become a Distributor</button>'
new_tabs = '''<button className={`px-6 py-2.5 rounded-lg text-label-lg font-label-lg transition-all ${activeFormTab === 'buyer' ? 'bg-surface-container-lowest text-primary shadow-sm font-bold' : 'text-on-surface-variant hover:text-primary'}`} id=\"tabBtnBuyer\" onClick={() => setActiveFormTab('buyer')} type=\"button\">Buyer Product Enquiry</button>
<button className={`px-6 py-2.5 rounded-lg text-label-lg font-label-lg transition-all ${activeFormTab === 'supplier' ? 'bg-surface-container-lowest text-primary shadow-sm font-bold' : 'text-on-surface-variant hover:text-primary'}`} id=\"tabBtnSupplier\" onClick={() => setActiveFormTab('supplier')} type=\"button\">Become a Distributor</button>'''

content = re.sub(tab_switcher_regex, new_tabs, content, flags=re.DOTALL)

# 4. Update the forms visibility
content = content.replace(
    '<div className=\"bg-surface-container-lowest rounded-2xl border border-outline-variant/50 shadow-xl p-6 md:p-10\" id=\"formBuyer\">',
    '<div className={`${activeFormTab === \'buyer\' ? \'block\' : \'hidden\'} bg-surface-container-lowest rounded-2xl border border-outline-variant/50 shadow-xl p-6 md:p-10`} id=\"formBuyer\">'
)

content = content.replace(
    '<div className=\"hidden bg-surface-container-lowest rounded-2xl border border-outline-variant/50 shadow-xl p-6 md:p-10\" id=\"formSupplier\">',
    '<div className={`${activeFormTab === \'supplier\' ? \'block\' : \'hidden\'} bg-surface-container-lowest rounded-2xl border border-outline-variant/50 shadow-xl p-6 md:p-10`} id=\"formSupplier\">'
)

with open('src/pages/HomePage.jsx', 'w') as f:
    f.write(content)
