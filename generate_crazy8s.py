#!/usr/bin/env python3
"""
Generate 8 hand-drawn sketch style images for Crazy 8s.
Saved as JPG with a paper texture background and jittery lines.
"""

import os
import random
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# Seed for reproducibility
random.seed(42)

OUTPUT_DIR = "portfolio/assets/crazy8s"
WIDTH, HEIGHT = 400, 300

def paper_background():
    """Create a textured paper-like background."""
    img = Image.new("RGB", (WIDTH, HEIGHT), (250, 248, 245))
    pixels = img.load()
    for y in range(HEIGHT):
        for x in range(WIDTH):
            noise = random.randint(-6, 6)
            r = min(255, max(0, 250 + noise))
            g = min(255, max(0, 248 + noise))
            b = min(255, max(0, 245 + noise))
            pixels[x, y] = (r, g, b)
    return img

def jitter_line(draw, x1, y1, x2, y2, fill=(60, 60, 80), width=2):
    """Draw a line with slight hand-drawn jitter."""
    segments = max(1, int(math.hypot(x2 - x1, y2 - y1) / 8))
    pts = []
    for i in range(segments + 1):
        t = i / segments
        jx = random.uniform(-1.2, 1.2)
        jy = random.uniform(-1.2, 1.2)
        px = x1 + (x2 - x1) * t + jx
        py = y1 + (y2 - y1) * t + jy
        pts.append((px, py))
    for i in range(len(pts) - 1):
        draw.line([pts[i], pts[i+1]], fill=fill, width=width)

def jitter_rect(draw, x, y, w, h, radius=0, fill=None, outline=(60, 60, 80), width=2):
    """Draw a rectangle with rounded corners using jittery lines."""
    # Simplified: draw four sides with jitter
    jitter_line(draw, x + radius, y, x + w - radius, y, outline, width)
    jitter_line(draw, x + w, y + radius, x + w, y + h - radius, outline, width)
    jitter_line(draw, x + w - radius, y + h, x + radius, y + h, outline, width)
    jitter_line(draw, x, y + h - radius, x, y + radius, outline, width)
    # Approximate corners with small arcs
    # (For sketch style, straight corners are often okay; we keep it simple.)
    if fill:
        draw.rectangle([x+2, y+2, x+w-2, y+h-2], fill=fill)

def jitter_circle(draw, cx, cy, r, fill=None, outline=(60, 60, 80), width=2):
    """Draw an imperfect circle."""
    pts = []
    steps = max(12, int(2 * math.pi * r / 6))
    for i in range(steps + 1):
        angle = 2 * math.pi * i / steps
        jr = r + random.uniform(-1.5, 1.5)
        px = cx + math.cos(angle) * jr
        py = cy + math.sin(angle) * jr
        pts.append((px, py))
    for i in range(len(pts) - 1):
        draw.line([pts[i], pts[i+1]], fill=outline, width=width)
    if fill:
        # rough fill by drawing radial lines
        for i in range(0, steps, 3):
            draw.line([(cx, cy), pts[i]], fill=fill, width=1)

def sketch_text(draw, text, x, y, font_size=16, fill=(60, 60, 80), center=False, font_name="Arial"):
    """Draw text using a TrueType font."""
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", font_size)
    except:
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
        except:
            font = ImageFont.load_default()
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    tx = x - tw // 2 if center else x
    ty = y - th // 2
    draw.text((tx, ty), text, font=font, fill=fill)

def phone_frame(draw, x, y, w, h):
    """Draw a sketchy phone outline."""
    jitter_rect(draw, x, y, w, h, radius=18, outline=(50, 50, 70), width=2)
    # screen area
    jitter_rect(draw, x + 6, y + 20, w - 12, h - 30, radius=4, outline=(180, 180, 190), width=1)
    # notch / speaker
    jitter_line(draw, x + w//2 - 15, y + 8, x + w//2 + 15, y + 8, (120, 120, 130), 2)

# ---------------------------------------------------------------------------
# 1. NFC Scan Interface
# ---------------------------------------------------------------------------
def draw_sketch_1():
    img = paper_background()
    draw = ImageDraw.Draw(img)
    # Phone
    phone_frame(draw, 120, 40, 160, 220)
    # NFC waves
    jitter_circle(draw, 200, 120, 35, outline=(100, 100, 200), width=2)
    jitter_circle(draw, 200, 120, 25, outline=(100, 100, 200), width=2)
    jitter_circle(draw, 200, 120, 15, outline=(100, 100, 200), width=2)
    # Keepsake object (watch) to the left
    jitter_rect(draw, 60, 130, 40, 30, radius=6, outline=(80, 60, 60), width=2)
    jitter_line(draw, 80, 130, 80, 110, (80, 60, 60), 2)
    jitter_line(draw, 80, 160, 80, 180, (80, 60, 60), 2)
    # Tap text
    sketch_text(draw, "TAP TO REVEAL", 200, 190, font_size=14, fill=(80, 80, 120), center=True)
    sketch_text(draw, "1. NFC Scan", 200, 270, font_size=12, fill=(120, 120, 120), center=True)
    return img

# ---------------------------------------------------------------------------
# 2. Scanning Animation
# ---------------------------------------------------------------------------
def draw_sketch_2():
    img = paper_background()
    draw = ImageDraw.Draw(img)
    phone_frame(draw, 120, 40, 160, 220)
    # Circular progress
    cx, cy = 200, 130
    for i in range(8):
        angle = math.radians(i * 45)
        x1 = cx + math.cos(angle) * 20
        y1 = cy + math.sin(angle) * 20
        x2 = cx + math.cos(angle) * 30
        y2 = cy + math.sin(angle) * 30
        jitter_line(draw, x1, y1, x2, y2, (100, 100, 200), 2)
    # Dashed arc for incomplete progress
    steps = 20
    for i in range(steps):
        if i % 2 == 0:
            angle = math.radians(180 + i * 6)
            x1 = cx + math.cos(angle) * 38
            y1 = cy + math.sin(angle) * 38
            x2 = cx + math.cos(angle) * 44
            y2 = cy + math.sin(angle) * 44
            jitter_line(draw, x1, y1, x2, y2, (150, 150, 160), 2)
    sketch_text(draw, "Syncing...", 200, 175, font_size=14, fill=(80, 80, 100), center=True)
    sketch_text(draw, "67%", 200, 195, font_size=18, fill=(60, 60, 80), center=True)
    sketch_text(draw, "2. Scanning", 200, 270, font_size=12, fill=(120, 120, 120), center=True)
    return img

# ---------------------------------------------------------------------------
# 3. 3D Memory View
# ---------------------------------------------------------------------------
def draw_sketch_3():
    img = paper_background()
    draw = ImageDraw.Draw(img)
    phone_frame(draw, 120, 40, 160, 220)
    # 3D cube wireframe
    cx, cy = 200, 130
    size = 35
    # front face
    jitter_rect(draw, cx - size, cy - size, size*2, size*2, outline=(80, 80, 120), width=2)
    # back face (offset)
    off = 15
    jitter_rect(draw, cx - size + off, cy - size - off, size*2, size*2, outline=(120, 120, 150), width=1)
    # connecting edges
    jitter_line(draw, cx - size, cy - size, cx - size + off, cy - size - off, (120, 120, 150), 1)
    jitter_line(draw, cx + size, cy - size, cx + size + off, cy - size - off, (120, 120, 150), 1)
    jitter_line(draw, cx + size, cy + size, cx + size + off, cy + size - off, (120, 120, 150), 1)
    jitter_line(draw, cx - size, cy + size, cx - size + off, cy + size - off, (120, 120, 150), 1)
    # sparkles
    for sx, sy in [(170, 100), (230, 110), (220, 170)]:
        draw.line([(sx-4, sy), (sx+4, sy)], fill=(200, 180, 100), width=2)
        draw.line([(sx, sy-4), (sx, sy+4)], fill=(200, 180, 100), width=2)
    sketch_text(draw, "Grandpa's Watch", 200, 195, font_size=13, fill=(80, 80, 100), center=True)
    sketch_text(draw, "3. 3D Memory", 200, 270, font_size=12, fill=(120, 120, 120), center=True)
    return img

# ---------------------------------------------------------------------------
# 4. Story Card Display
# ---------------------------------------------------------------------------
def draw_sketch_4():
    img = paper_background()
    draw = ImageDraw.Draw(img)
    phone_frame(draw, 120, 40, 160, 220)
    # Card
    jitter_rect(draw, 140, 70, 120, 150, radius=8, outline=(80, 80, 100), width=2)
    # Photo placeholder inside card
    jitter_rect(draw, 150, 80, 100, 70, radius=4, outline=(150, 150, 160), width=1)
    # Lines for text
    for i, y in enumerate([160, 175, 190]):
        w = 80 if i < 2 else 50
        jitter_line(draw, 150, y, 150 + w, y, (120, 120, 130), 1)
    # Heart icon
    hx, hy = 240, 210
    jitter_circle(draw, hx - 6, hy - 3, 6, outline=(200, 100, 100), width=1)
    jitter_circle(draw, hx + 6, hy - 3, 6, outline=(200, 100, 100), width=1)
    jitter_line(draw, hx - 12, hy, hx, hy + 12, (200, 100, 100), 1)
    jitter_line(draw, hx + 12, hy, hx, hy + 12, (200, 100, 100), 1)
    sketch_text(draw, "4. Story Card", 200, 270, font_size=12, fill=(120, 120, 120), center=True)
    return img

# ---------------------------------------------------------------------------
# 5. Message Interface
# ---------------------------------------------------------------------------
def draw_sketch_5():
    img = paper_background()
    draw = ImageDraw.Draw(img)
    phone_frame(draw, 120, 40, 160, 220)
    # Chat bubbles
    # Left bubble (grandparent)
    jitter_rect(draw, 145, 80, 90, 30, radius=10, outline=(120, 120, 140), width=1)
    jitter_line(draw, 155, 95, 210, 95, (80, 80, 80), 1)
    jitter_line(draw, 155, 105, 190, 105, (80, 80, 80), 1)
    # Right bubble (grandchild)
    jitter_rect(draw, 165, 120, 90, 30, radius=10, outline=(100, 100, 180), width=1)
    jitter_line(draw, 175, 135, 240, 135, (80, 80, 80), 1)
    jitter_line(draw, 175, 145, 220, 145, (80, 80, 80), 1)
    # Input bar
    jitter_rect(draw, 140, 210, 120, 25, radius=12, outline=(150, 150, 160), width=1)
    jitter_line(draw, 150, 222, 200, 222, (180, 180, 180), 1)
    sketch_text(draw, "5. Messages", 200, 270, font_size=12, fill=(120, 120, 120), center=True)
    return img

# ---------------------------------------------------------------------------
# 6. Memory Map View
# ---------------------------------------------------------------------------
def draw_sketch_6():
    img = paper_background()
    draw = ImageDraw.Draw(img)
    phone_frame(draw, 120, 40, 160, 220)
    # Grid of small cards
    positions = [(145, 75), (205, 75), (145, 125), (205, 125), (145, 175), (205, 175)]
    for px, py in positions:
        jitter_rect(draw, px, py, 50, 40, radius=4, outline=(120, 120, 140), width=1)
        # tiny image placeholder
        jitter_rect(draw, px + 5, py + 5, 40, 20, radius=2, outline=(180, 180, 190), width=1)
    sketch_text(draw, "6. Collection", 200, 270, font_size=12, fill=(120, 120, 120), center=True)
    return img

# ---------------------------------------------------------------------------
# 7. Create Memory Form
# ---------------------------------------------------------------------------
def draw_sketch_7():
    img = paper_background()
    draw = ImageDraw.Draw(img)
    phone_frame(draw, 120, 40, 160, 220)
    # Form fields
    for i, y in enumerate([80, 115, 150]):
        label = ["Title", "Story", "Tag"][i]
        sketch_text(draw, label, 145, y - 10, font_size=10, fill=(100, 100, 100))
        jitter_rect(draw, 140, y, 120, 28, radius=4, outline=(150, 150, 160), width=1)
    # Photo upload box
    jitter_rect(draw, 140, 185, 120, 40, radius=4, outline=(150, 150, 160), width=1)
    jitter_line(draw, 180, 195, 220, 195, (180, 180, 180), 1)
    jitter_line(draw, 200, 185, 200, 205, (180, 180, 180), 1)
    # Save button
    jitter_rect(draw, 160, 235, 80, 22, radius=11, outline=(80, 140, 80), width=2)
    sketch_text(draw, "Save", 200, 245, font_size=11, fill=(60, 100, 60), center=True)
    sketch_text(draw, "7. Create Memory", 200, 270, font_size=12, fill=(120, 120, 120), center=True)
    return img

# ---------------------------------------------------------------------------
# 8. User Switch / Settings
# ---------------------------------------------------------------------------
def draw_sketch_8():
    img = paper_background()
    draw = ImageDraw.Draw(img)
    phone_frame(draw, 120, 40, 160, 220)
    # Two user avatars
    jitter_circle(draw, 170, 100, 22, outline=(100, 100, 120), width=2)
    jitter_circle(draw, 170, 100, 10, outline=(150, 150, 160), width=1)  # face
    sketch_text(draw, "Grandpa", 170, 135, font_size=10, fill=(80, 80, 80), center=True)
    # Toggle switch between them
    jitter_rect(draw, 180, 160, 40, 20, radius=10, outline=(120, 120, 140), width=1)
    jitter_circle(draw, 190, 170, 6, outline=(80, 120, 80), width=2)
    # Other avatar faint
    jitter_circle(draw, 230, 100, 22, outline=(180, 180, 190), width=1)
    sketch_text(draw, "Me", 230, 135, font_size=10, fill=(160, 160, 160), center=True)
    sketch_text(draw, "8. Switch User", 200, 270, font_size=12, fill=(120, 120, 120), center=True)
    return img

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
SKETCHES = [
    ("crazy8s-1.jpg", draw_sketch_1),
    ("crazy8s-2.jpg", draw_sketch_2),
    ("crazy8s-3.jpg", draw_sketch_3),
    ("crazy8s-4.jpg", draw_sketch_4),
    ("crazy8s-5.jpg", draw_sketch_5),
    ("crazy8s-6.jpg", draw_sketch_6),
    ("crazy8s-7.jpg", draw_sketch_7),
    ("crazy8s-8.jpg", draw_sketch_8),
]

if __name__ == "__main__":
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    for filename, fn in SKETCHES:
        img = fn()
        path = os.path.join(OUTPUT_DIR, filename)
        img.save(path, "JPEG", quality=90)
        print(f"Saved {path}")
