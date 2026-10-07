import re

with open('src/pages/HomePage.jsx', 'r') as f:
    content = f.read()

# Fix className={} on form containers
content = re.sub(
    r'<div className=\{[^\}]*\}\s*id=\"formBuyer\">',
    '<div className={`bg-surface-container-lowest rounded-2xl border border-outline-variant/50 shadow-xl p-6 md:p-10 ${activeFormTab === \\'buyer\\' ? \\'block\\' : \\'hidden\\'}`} id=\"formBuyer\">',
    content
)

content = re.sub(
    r'<div className=\{[^\}]*\}\s*id=\"formSupplier\">',
    '<div className={`bg-surface-container-lowest rounded-2xl border border-outline-variant/50 shadow-xl p-6 md:p-10 ${activeFormTab === \\'supplier\\' ? \\'block\\' : \\'hidden\\'}`} id=\"formSupplier\">',
    content
)

# Fix empty expressions on tabs
content = re.sub(
    r'<button className=\{[^\}]*\}\s*id=\"tabBtnBuyer\"',
    '<button className={`px-6 py-2.5 rounded-lg text-label-lg font-label-lg transition-all ${activeFormTab === \\'buyer\\' ? \\'bg-surface-container-lowest text-primary shadow-sm font-bold\\' : \\'text-on-surface-variant hover:text-primary\\'}`} id=\"tabBtnBuyer\"',
    content
)

content = re.sub(
    r'<button className=\{[^\}]*\}\s*id=\"tabBtnSupplier\"',
    '<button className={`px-6 py-2.5 rounded-lg text-label-lg font-label-lg transition-all ${activeFormTab === \\'supplier\\' ? \\'bg-surface-container-lowest text-primary shadow-sm font-bold\\' : \\'text-on-surface-variant hover:text-primary\\'}`} id=\"tabBtnSupplier\"',
    content
)

# Fix onsubmit -> onSubmit
content = content.replace('onsubmit=\"event.preventDefault(); alert(', 'onSubmit={(e) => { e.preventDefault(); alert(')
content = content.replace('pricing.\');\"', 'pricing.\'); } }')
content = content.replace('credentials.\');\"', 'credentials.\'); } }')

# Fix required=""
content = content.replace('required=\"\"', 'required')

with open('src/pages/HomePage.jsx', 'w') as f:
    f.write(content)
