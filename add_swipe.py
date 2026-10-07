import re

with open('src/pages/HomePage.jsx', 'r') as f:
    content = f.read()

# Add states inside HomePage
state_injection = """  const [activeFormTab, setActiveFormTab] = useState('buyer');
  const [isBannerHidden, setIsBannerHidden] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState({ x: 0, y: 0 });
  const [touchStartPos, setTouchStartPos] = useState(null);

  useEffect(() => {
    setIsBannerHidden(false);
  }, [selectedProducts.length]);

  const handleTouchStart = (e) => {
    setTouchStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchMove = (e) => {
    if (!touchStartPos) return;
    const dx = Math.max(0, e.touches[0].clientX - touchStartPos.x); // only right
    const dy = Math.max(0, e.touches[0].clientY - touchStartPos.y); // only down
    
    if (dx > dy) {
      setSwipeOffset({ x: dx, y: 0 });
    } else {
      setSwipeOffset({ x: 0, y: dy });
    }
  };

  const handleTouchEnd = () => {
    if (swipeOffset.x > 75 || swipeOffset.y > 75) {
      setIsBannerHidden(true);
    }
    setSwipeOffset({ x: 0, y: 0 });
    setTouchStartPos(null);
  };"""

content = content.replace("  const [activeFormTab, setActiveFormTab] = useState('buyer');", state_injection)

# Now find the banner block
banner_old = """{selectedProducts.length > 0 && (
<div className="fixed bottom-6 inset-x-0 z-40 px-6 transition-all duration-300" id="enquiryBar">
<div className="max-w-4xl mx-auto bg-primary text-on-primary p-4 rounded-xl shadow-2xl border border-primary-container/80 flex flex-col sm:flex-row items-center justify-between gap-4">
<div className="flex items-center gap-3">"""

banner_new = """<div 
  className={`fixed bottom-6 inset-x-0 z-40 px-6 transition-all duration-300 ${(selectedProducts.length === 0 || isBannerHidden) ? 'translate-y-[150%] opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`} 
  id="enquiryBar"
>
<div 
  className="max-w-4xl mx-auto bg-primary text-on-primary p-4 rounded-xl shadow-2xl border border-primary-container/80 flex flex-col sm:flex-row items-center justify-between gap-4"
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
  style={{
    transform: touchStartPos ? `translate(${swipeOffset.x}px, ${swipeOffset.y}px)` : 'none',
    transition: touchStartPos ? 'none' : 'all 0.3s ease-out',
    opacity: touchStartPos ? Math.max(0, 1 - Math.max(swipeOffset.x, swipeOffset.y) / 150) : 1
  }}
>
<div className="flex items-center gap-3">"""

content = content.replace(banner_old, banner_new)

# Also need to remove the closing } from the conditional render {selectedProducts.length > 0 && ( ... )}
# Find the exact place where it closes
# It's right before {/*  WHAT YOU'LL GET
end_old = """</div>
</div>
)}
{/*  WHAT YOU'LL GET:"""

end_new = """</div>
</div>
{/*  WHAT YOU'LL GET:"""

content = content.replace(end_old, end_new)

with open('src/pages/HomePage.jsx', 'w') as f:
    f.write(content)

print("Updated HomePage with swipe logic!")
