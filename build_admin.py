import re

def html_to_jsx(html):
    # Convert class= to className=
    jsx = html.replace('class="', 'className="')
    jsx = jsx.replace("class='", "className='")
    # Convert onclick to onClick, onsubmit to onSubmit
    jsx = jsx.replace('onclick="', 'onClick="')
    jsx = jsx.replace('onsubmit="', 'onSubmit="')
    jsx = jsx.replace('for="', 'htmlFor="')
    # Close unclosed inputs
    jsx = re.sub(r'(<input[^>]*)(?<!/)>', r'\1 />', jsx)
    jsx = re.sub(r'(<img[^>]*)(?<!/)>', r'\1 />', jsx)
    # Convert inline styles if any (heuristic, might need manual fix)
    jsx = re.sub(r'style="([^"]*)"', r'style={{\1}}', jsx) # Not full parsing, but will help
    jsx = jsx.replace("font-variation-settings: 'FILL' 1;", "fontVariationSettings: \"'FILL' 1\"")
    # Remove HTML comments
    jsx = re.sub(r'<!--.*?-->', '', jsx, flags=re.DOTALL)
    # Remove script tags
    jsx = re.sub(r'<script.*?</script>', '', jsx, flags=re.DOTALL)
    # Remove problematic specific things
    jsx = jsx.replace('onClick="document.getElementById(\'publishBtn\').click()"', 'onClick={() => {}}')
    jsx = jsx.replace('onclick="this.parentElement.remove()"', 'onClick={() => {}}')
    jsx = jsx.replace('onSubmit="event.preventDefault(); showSuccessFeedback();"', 'onSubmit={(e) => e.preventDefault()}')
    return jsx

# Read AdminPage shell
with open('WEBSITE DESIGN /AdminPage/code.html', 'r') as f:
    admin_html = f.read()

# Extract header and sidebar
header_match = re.search(r'<header.*?</header>', admin_html, re.DOTALL)
header = header_match.group(0) if header_match else ''

aside_match = re.search(r'<aside.*?</aside>', admin_html, re.DOTALL)
aside = aside_match.group(0) if aside_match else ''

# Read Form code
with open('WEBSITE DESIGN /Form/code.html', 'r') as f:
    form_html = f.read()

# Extract the max-w-5xl div from form
form_match = re.search(r'<div className="max-w-5xl mx-auto".*?(<div.*?)(?=</body>)', html_to_jsx(form_html), re.DOTALL)
form_content = ''
if '<div className="max-w-5xl mx-auto">' in html_to_jsx(form_html):
    parts = html_to_jsx(form_html).split('<div className="max-w-5xl mx-auto">')
    if len(parts) > 1:
        form_content = '<div className="max-w-5xl mx-auto">' + parts[1].split('</body>')[0]

# Now assemble JSX
jsx_content = f"""import React, {{ useState }} from 'react';

export default function AdminPage() {{
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e) => {{
    e.preventDefault();
    if (loginEmail.trim().toLowerCase() === 'notch@admin.com' && loginPassword === 'notch') {{
      setIsAuthenticated(true);
      setLoginError('');
    }} else {{
      setLoginError('Invalid email or password.');
    }}
  }};

  const handleLogout = () => {{
    setIsAuthenticated(false);
    setLoginEmail('');
    setLoginPassword('');
    setLoginError('');
  }};

  if (!isAuthenticated) {{
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-container-low">
        <form onSubmit={{handleLogin}} className="p-8 bg-surface-container-lowest rounded-2xl shadow-xl max-w-sm w-full border border-outline-variant/40">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-white text-2xl">shield_person</span>
          </div>
          <h2 className="text-2xl font-bold font-outfit text-primary mb-2 text-center">Admin Access</h2>
          <p className="text-sm text-on-surface-variant mb-6 text-center">Enter your credentials to continue</p>
          
          {{loginError && <p className="text-red-500 mb-4 text-sm font-semibold text-center bg-red-50 py-2 rounded-lg">{{loginError}}</p>}}
          
          <div className="mb-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">Email</label>
            <input type="email" value={{loginEmail}} onChange={{e => setLoginEmail(e.target.value)}} className="w-full px-4 py-2 border border-outline-variant/70 rounded-lg focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none text-sm bg-surface-container-lowest text-primary" required />
          </div>
          <div className="mb-8">
            <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">Password</label>
            <input type="password" value={{loginPassword}} onChange={{e => setLoginPassword(e.target.value)}} className="w-full px-4 py-2 border border-outline-variant/70 rounded-lg focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none text-sm bg-surface-container-lowest text-primary" required />
          </div>
          <button type="submit" className="w-full bg-primary text-white py-2.5 rounded-lg font-bold hover:bg-primary-container transition-colors shadow-sm">Sign In</button>
        </form>
      </div>
    );
  }}

  return (
    <div className="min-h-screen flex flex-col font-body-md text-on-surface bg-background antialiased selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      {html_to_jsx(header)}
      <div className="w-full max-w-[1440px] mx-auto flex-1 flex flex-row">
        {html_to_jsx(aside).replace('class=', 'className=')}
        <main className="flex-1 p-6 md:p-8 lg:p-10 max-w-[1200px] overflow-y-auto">
          {form_content}
        </main>
      </div>
    </div>
  );
}}
"""

with open('src/pages/AdminPage.jsx', 'w') as f:
    f.write(jsx_content)

print("AdminPage.jsx generated successfully!")
