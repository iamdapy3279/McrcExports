import os
import shutil
import json
import re

BASE_DIR = '/Users/dev/Desktop/MCRC'
PUBLIC_DIR = os.path.join(BASE_DIR, 'public')
ASSETS_DIR = os.path.join(PUBLIC_DIR, 'assets')
DATA_DIR = os.path.join(PUBLIC_DIR, 'data')

os.makedirs(os.path.join(ASSETS_DIR, 'branding'), exist_ok=True)
os.makedirs(os.path.join(ASSETS_DIR, 'hero'), exist_ok=True)
os.makedirs(os.path.join(ASSETS_DIR, 'story'), exist_ok=True)
os.makedirs(os.path.join(ASSETS_DIR, 'categories'), exist_ok=True)
os.makedirs(os.path.join(ASSETS_DIR, 'products'), exist_ok=True)
os.makedirs(DATA_DIR, exist_ok=True)

# Copy base brand assets
shutil.copy2(os.path.join(BASE_DIR, 'logo.png'), os.path.join(ASSETS_DIR, 'branding', 'logo.png'))
shutil.copy2(os.path.join(BASE_DIR, 'Herobg.jpg'), os.path.join(ASSETS_DIR, 'hero', 'Herobg.jpg'))
shutil.copy2(os.path.join(BASE_DIR, 'workers.png'), os.path.join(ASSETS_DIR, 'story', 'workers.png'))

categories_config = [
    {
        'id': 'small-leather-goods',
        'name': 'Small Leather Goods',
        'cover_source': 'Small Leather Goods/smallleathergood_category_thumbnail.jpg',
        'cover_dest': 'small-leather-goods.jpg',
        'products_dir': 'Small Leather Goods/Small Leather Goods',
        'description': 'Exquisitely handcrafted small accessories, key cases, card holders, and leather utilities with traditional embossed detailing.'
    },
    {
        'id': 'pouches',
        'name': 'Pouches',
        'cover_source': 'Pouches/pouches_category_thumbnail.jpg',
        'cover_dest': 'pouches.jpg',
        'products_dir': 'Pouches/Pouches',
        'description': 'Artisanal hand-painted genuine leather pouches, cosmetic cases, and multipurpose travel organizers.'
    },
    {
        'id': 'leather-bags',
        'name': 'Leather Bags',
        'cover_source': 'LeatherBags/leatherbags_category_thumbnail.jpg',
        'cover_dest': 'leather-bags.jpg',
        'products_dir': 'LeatherBags/Leather Bag',
        'description': 'Premium handcrafted leather shoulder bags, satchels, and totes featuring iconic Shantiniketan motifs.'
    },
    {
        'id': 'coin-bags-decor',
        'name': 'Coin Bags & Decor',
        'cover_source': 'Coin Bank/coinbagcategorythumbnail.jpg',
        'cover_dest': 'coin-bags-decor.jpg',
        'products_dir': 'Coin Bank/COIN BAGS & DECOR',
        'description': 'Handcrafted coin banks, decorative animal figures, and artistic leather desk accessories.'
    },
    {
        'id': 'wallets',
        'name': 'Wallets',
        'cover_source': 'Wallets/wallets_category_thumbnail.jpg',
        'cover_dest': 'wallets.jpg',
        'products_dir': 'Wallets/ALLWALLETSNOBGNOBG/Untitled design',
        'description': 'Classic bi-fold, tri-fold, and zip-around genuine leather wallets with handcrafted floral and geometric art.'
    },
    {
        'id': 'canvas-bags',
        'name': 'Canvas Bags',
        'cover_source': 'CanvasBags/canvasbags_category_thumbnail.jpg',
        'cover_dest': 'canvas-bags.jpg',
        'products_dir': 'CanvasBags',
        'description': 'Durable eco-conscious canvas totes and carryalls trimmed and accented with hand-painted leather.'
    }
]

catalog = {
    'categories': []
}

def clean_file_sort_key(filename):
    match = re.search(r'\((\d+)\)', filename)
    if match:
        return (1, int(match.group(1)))
    return (0, 0)

for cat in categories_config:
    # Copy category cover
    source_cover = os.path.join(BASE_DIR, cat['cover_source'])
    dest_cover_rel = f"categories/{cat['cover_dest']}"
    dest_cover_full = os.path.join(ASSETS_DIR, dest_cover_rel)
    shutil.copy2(source_cover, dest_cover_full)

    cat_entry = {
        'id': cat['id'],
        'name': cat['name'],
        'description': cat['description'],
        'coverImage': f"/assets/{dest_cover_rel}",
        'products': []
    }

    prod_base_dir = os.path.join(BASE_DIR, cat['products_dir'])
    if os.path.exists(prod_base_dir):
        subdirs = sorted([d for d in os.listdir(prod_base_dir) if os.path.isdir(os.path.join(prod_base_dir, d)) and not d.startswith('.')])
        for model in subdirs:
            model_dir = os.path.join(prod_base_dir, model)
            img_files = [f for f in os.listdir(model_dir) if not f.startswith('.') and f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))]
            img_files = sorted(img_files, key=clean_file_sort_key)
            
            if not img_files:
                continue

            # Create product target directory
            safe_model = re.sub(r'[^a-zA-Z0-9_-]', '_', model)
            target_prod_dir = os.path.join(ASSETS_DIR, 'products', cat['id'], safe_model)
            os.makedirs(target_prod_dir, exist_ok=True)

            copied_image_urls = []
            for img in img_files:
                src_img_path = os.path.join(model_dir, img)
                clean_img_name = re.sub(r'[\s\(\)]', '_', img)
                clean_img_name = re.sub(r'_+', '_', clean_img_name)
                dest_img_path = os.path.join(target_prod_dir, clean_img_name)
                shutil.copy2(src_img_path, dest_img_path)
                copied_image_urls.append(f"/assets/products/{cat['id']}/{safe_model}/{clean_img_name}")

            thumbnail_url = copied_image_urls[0]

            cat_singular = {
                'small-leather-goods': 'Handcrafted Leather Good',
                'pouches': 'Hand-Painted Leather Pouch',
                'leather-bags': 'Artisanal Genuine Leather Bag',
                'coin-bags-decor': 'Handcrafted Leather Decor & Coin Bank',
                'wallets': 'Embossed Leather Wallet',
                'canvas-bags': 'Artisan Canvas & Leather Bag'
            }.get(cat['id'], 'Handcrafted Leather Product')

            prod_entry = {
                'id': f"{cat['id']}-{safe_model.lower()}",
                'name': f"{cat_singular}",
                'modelNumber': model,
                'categoryId': cat['id'],
                'categoryName': cat['name'],
                'thumbnail': thumbnail_url,
                'images': copied_image_urls,
                'description': f"Masterfully handcrafted in Kolkata using traditional Shantiniketan embossing and hand-painting techniques. Model {model} is built for international commercial durability and distinctive artisanal luxury."
            }
            cat_entry['products'].append(prod_entry)

    catalog['categories'].append(cat_entry)

catalog_dest = os.path.join(DATA_DIR, 'catalog.json')
with open(catalog_dest, 'w') as f:
    json.dump(catalog, f, indent=2)

print(f"Catalog successfully created at {catalog_dest}")
print(f"Total categories: {len(catalog['categories'])}")
total_products = sum(len(c['products']) for c in catalog['categories'])
print(f"Total products: {total_products}")
