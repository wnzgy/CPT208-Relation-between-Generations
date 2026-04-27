#!/usr/bin/env python3
"""Generate 2 hand-drawn sketch style low-fi prototype images."""

import random
import math
from PIL import Image, ImageDraw, ImageFont

random.seed(42)

def paper_bg(w, h):
    img = Image.new("RGB", (w, h), (250, 248, 245))
    pixels = img.load()
    for y in range(h):
        for x in range(w):
            noise = random.randint(-6, 6)
            r = min(255, max(0, 250 + noise))
            g = min(255, max(0, 248 + noise))
            b = min(255, max(0, 245 + noise))
            pixels[x, y] = (r, g, b)
    return img

def jitter_line(draw, x1, y1, x2, y2, fill=(60, 60, 80), width=2):
    segments = max(1, int(math.hypot(x2 - x1, y2 - y1) / 8))
    pts = []
    for i in range(segments + 1):
        t = i / segments
        px = x1 + (x2 - x1) * t + random.uniform(-1.2, 1.2)
        py = y1 + (y2 - y1) * t + random.uniform(-1.2, 1.2)
        pts.append((px, py))
    for i in range(len(pts) - 1):
        draw.line([pts[i], pts[i+1]], fill=fill, width=width)

def jitter_rect(draw, x, y, w, h, radius=0, outline=(60, 60, 80), width=2):
    jitter_line(draw, x + radius, y, x + w - radius, y, outline, width)
    jitter_line(draw, x + w, y + radius, x + w, y + h - radius, outline, width)
    jitter_line(draw, x + w - radius, y + h, x + radius, y + h, outline, width)
    jitter_line(draw, x, y + h - radius, x, y + radius, outline, width)

def jitter_circle(draw, cx, cy, r, outline=(60, 60, 80), width=2):
    steps = max(12, int(2 * math.pi * r / 6))
    pts = []
    for i in range(steps + 1):
        angle = 2 * math.pi * i / steps
        jr = r + random.uniform(-1.5, 1.5)
        pts.append((cx + math.cos(angle) * jr, cy + math.sin(angle) * jr))
    for i in range(len(pts) - 1):
        draw.line([pts[i], pts[i+1]], fill=outline, width=width)

def sketch_text(draw, text, x, y, font_size=16, fill=(60, 60, 80), center=False):
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", font_size)
    except:
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
        except:
            font = ImageFont.load_default()
    if center:
        bbox = draw.textbbox((0, 0), text, font=font)
        x -= (bbox[2] - bbox[0]) // 2
    draw.text((x, y), text, font=font, fill=fill)

# ---------------------------------------------------------------------------
# 1. Mobile Wireframe - NFC Scan screen
# ---------------------------------------------------------------------------
def draw_mobile_wireframe():
    W, H = 320, 640
    img = paper_bg(W, H)
    draw = ImageDraw.Draw(img)
    # Phone outline
    mx, my, mw, mh = 60, 40, 200, 560
    jitter_rect(draw, mx, my, mw, mh, radius=25, outline=(50, 50, 70), width=2)
    # Screen inner
    jitter_rect(draw, mx + 8, my + 30, mw - 16, mh - 50, radius=8, outline=(180, 180, 190), width=1)
    # Notch
    jitter_line(draw, mx + mw//2 - 15, my + 12, mx + mw//2 + 15, my + 12, (120, 120, 130), 2)
    # Header pill
    jitter_rect(draw, mx + 30, my + 50, 100, 22, radius=11, outline=(100, 100, 200), width=1)
    sketch_text(draw, "NFC Demo Ready", mx + 80, my + 57, font_size=9, fill=(100, 100, 200), center=True)
    # Title
    sketch_text(draw, "TimeLens", mx + mw//2, my + 100, font_size=22, fill=(40, 40, 60), center=True)
    sketch_text(draw, "MEMORY PORTAL", mx + mw//2, my + 125, font_size=8, fill=(150, 150, 160), center=True)
    # Selected card
    jitter_rect(draw, mx + 20, my + 155, mw - 40, 100, radius=14, outline=(80, 80, 100), width=2)
    sketch_text(draw, "SELECTED KEEPSAKE", mx + 35, my + 170, font_size=8, fill=(100, 100, 200))
    sketch_text(draw, "Ready", mx + mw - 35, my + 170, font_size=8, fill=(200, 180, 100))
    sketch_text(draw, "Grandfather's", mx + 35, my + 200, font_size=14, fill=(40, 40, 60))
    sketch_text(draw, "Pocket Watch", mx + 35, my + 225, font_size=14, fill=(40, 40, 60))
    sketch_text(draw, "1985 · Grandparent", mx + 35, my + 245, font_size=10, fill=(120, 120, 130))
    # NFC button
    jitter_circle(draw, mx + mw//2, my + 310, 40, outline=(150, 150, 170), width=2)
    jitter_circle(draw, mx + mw//2, my + 310, 28, outline=(100, 100, 200), width=1)
    sketch_text(draw, "TAP TO REVEAL", mx + mw//2, my + 365, font_size=8, fill=(150, 150, 160), center=True)
    # Bottom buttons
    jitter_rect(draw, mx + 20, my + 400, 70, 28, radius=14, outline=(120, 120, 140), width=1)
    sketch_text(draw, "NFC Tools", mx + 55, my + 410, font_size=9, fill=(80, 80, 80), center=True)
    jitter_rect(draw, mx + 110, my + 400, 70, 28, radius=14, outline=(100, 100, 200), width=1)
    sketch_text(draw, "Map", mx + 145, my + 410, font_size=9, fill=(100, 100, 200), center=True)
    # List item
    jitter_rect(draw, mx + 20, my + 450, mw - 40, 30, radius=6, outline=(100, 100, 200), width=1)
    sketch_text(draw, "Pocket Watch", mx + 35, my + 460, font_size=11, fill=(40, 40, 60))
    return img

# ---------------------------------------------------------------------------
# 2. Interaction Flow diagram
# ---------------------------------------------------------------------------
def draw_flow():
    W, H = 900, 300
    img = paper_bg(W, H)
    draw = ImageDraw.Draw(img)
    # Title
    sketch_text(draw, "User Interaction Flow", W//2, 30, font_size=20, fill=(40, 40, 60), center=True)
    # Steps
    steps = [
        ("1. Discover", "Find keepsake", "with NFC tag"),
        ("2. Scan", "Tap phone to", "NFC tag"),
        ("3. Unlock", "Scanning", "animation"),
        ("4. Experience", "3D model +", "story card"),
        ("5. Message", "Send reply to", "grandparent"),
        ("6. Collect", "Add to map", "& review later"),
    ]
    box_w, box_h = 110, 70
    gap = 25
    start_x = 55
    y = 100
    for i, (title, line1, line2) in enumerate(steps):
        x = start_x + i * (box_w + gap)
        # Box
        jitter_rect(draw, x, y, box_w, box_h, radius=8, outline=(80, 80, 120), width=2)
        # Text
        sketch_text(draw, title, x + box_w//2, y + 12, font_size=11, fill=(80, 80, 160), center=True)
        sketch_text(draw, line1, x + box_w//2, y + 30, font_size=10, fill=(40, 40, 60), center=True)
        sketch_text(draw, line2, x + box_w//2, y + 46, font_size=9, fill=(120, 120, 130), center=True)
        # Arrow
        if i < len(steps) - 1:
            ax1 = x + box_w
            ax2 = x + box_w + gap
            ay = y + box_h//2
            jitter_line(draw, ax1, ay, ax2, ay, (120, 120, 140), 2)
            # arrow head
            draw.polygon([(ax2, ay), (ax2-6, ay-3), (ax2-6, ay+3)], fill=(120, 120, 140))
    # Alternative flow box
    alt_x = start_x + 4 * (box_w + gap)
    alt_y = 200
    jitter_rect(draw, alt_x, alt_y, 230, 50, radius=8, outline=(200, 160, 80), width=2)
    sketch_text(draw, "Alternative: Create Memory", alt_x + 115, alt_y + 12, font_size=11, fill=(180, 140, 60), center=True)
    sketch_text(draw, "Grandparent adds new keepsake → Programs NFC tag", alt_x + 115, alt_y + 32, font_size=9, fill=(80, 80, 80), center=True)
    # Dotted connection from step 4 to alt
    cx = start_x + 3 * (box_w + gap) + box_w//2
    cy = y + box_h
    for t in range(0, 11):
        px = cx + (alt_x + 115 - cx) * (t/10)
        py = cy + (alt_y - cy) * (t/10)
        if t % 2 == 0:
            draw.ellipse([px-1, py-1, px+1, py+1], fill=(150, 150, 150))
    return img

if __name__ == "__main__":
    import os
    draw_mobile_wireframe().save("portfolio/assets/images/screen-scan.jpg", "JPEG", quality=92)
    draw_flow().save("portfolio/assets/diagrams/user-flow.jpg", "JPEG", quality=92)
    print("Saved low-fi prototypes.")
