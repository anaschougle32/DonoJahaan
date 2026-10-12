import glob, os, re
from collections import Counter

base_dir = r"C:\Users\choug\OneDrive\Desktop\DonoJaha\stitch_duplicate_of_matrimony_app_green_palate\stitch_duplicate_of_matrimony_app_green_palate"
html_files = sorted(glob.glob(os.path.join(base_dir, "*", "code.html")))

images = set()
icons = Counter()
fonts = set()
screens_meta = []

for h in html_files:
    folder = os.path.basename(os.path.dirname(h))
    screen_png_path = os.path.join(os.path.dirname(h), "screen.png")
    has_valid_png = False
    if os.path.exists(screen_png_path):
        with open(screen_png_path, "rb") as fp:
            if b"FIFE Image" not in fp.read(100):
                has_valid_png = True

    with open(h, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    # Extract title
    title_match = re.search(r"<h1[^>]*>(.*?)</h1>", content, re.DOTALL)
    title = ""
    if title_match:
        title = re.sub(r"<[^>]+>", "", title_match.group(1)).strip()
    if not title:
        title_match2 = re.search(r"<h2[^>]*>(.*?)</h2>", content, re.DOTALL)
        if title_match2:
            title = re.sub(r"<[^>]+>", "", title_match2.group(1)).strip()

    # Extract images
    found_imgs = re.findall(r'src=["\'](https?://[^"\']+)["\']', content)
    for img in found_imgs:
        if not img.endswith(".js"):
            images.add(img)

    # Extract Material Symbols
    found_icons = re.findall(r'<span class=["\'][^"\']*material-symbols-outlined[^"\']*["\'][^>]*>\s*([a-z0-9_]+)\s*</span>', content)
    for ic in found_icons:
        icons[ic] += 1

    screens_meta.append({
        "folder": folder,
        "title": title[:40],
        "valid_png": has_valid_png,
        "icons": len(found_icons),
        "lines": len(content.splitlines())
    })

print(f"Total HTML files analyzed: {len(screens_meta)}")
print(f"Total unique images: {len(images)}")
print(f"Total unique icons: {len(icons)}")
print("Most frequent icons:")
for ic, count in icons.most_common(20):
    print(f"  {ic}: {count}")

print("\nScreen Inventory Sample (first 10):")
for s in screens_meta[:10]:
    print(f"  {s['folder']} | Title: {s['title']} | Valid PNG: {s['valid_png']} | Lines: {s['lines']}")
