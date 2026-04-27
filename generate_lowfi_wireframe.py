#!/usr/bin/env python3
"""Generate a hand-drawn low-fi wireframe for the mobile scan screen."""

import random
import math
from PIL import Image, ImageDraw, ImageFont

random.seed(42)

W, H = 320, 640
BG = (255, 255, 255)  # white paper
LINE = (40, 40, 40)   # pencil black
GRAY = (150, 150, 150)

img = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(img)

try:
    font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 14)
    font_small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 11)
    font_tiny = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 9)
except:
    font = ImageFont.load_default()
    font_small = font
    font_tiny = font

def jitter_line(x1, y1, x2, y2, fill=LINE, width=2):
    seg = max(1, int(math.hypot(x2 - x1, y2 - y1) / 8))
    pts = []
    for i in range(seg + 1):
        t = i / seg
        px = x1 + (x2 - x1) * t + random.uniform(-1.5, 1.5)
        py = y1 + (y2 - y1) * t + random.uniform(-1.5, 1.5)
        pts.append((px, py))
    for i in range(len(pts) - 1):
        draw.line([pts[i], pts[i+1]], fill=fill, width=width)

def jitter_rect(x, y, w, h, r=0, outline=LINE, width=2):
    jitter_line(x + r, y, x + w - r, y, outline, width)
    jitter_line(x + w, y + r, x + w, y + h - r, outline, width)
    jitter_line(x + w - r, y + h, x + r, y + h, outline, width)
    jitter_line(x, y + h - r, x, y + r, outline, width)

# Phone frame
mx, my, mw, mh = 40, 20, 240, 600
jitter_rect(mx, my, mw, mh, r=30, outline=LINE, width=3)
# inner screen
jitter_rect(mx + 10, my + 40, mw - 20, mh - 60, r=6, outline=GRAY, width=1)
# notch
jitter_line(mx + mw//2 - 20, my + 18, mx + mw//2 + 20, my + 18, GRAY, 2)

# Header pill
draw.rectangle([mx + 40, my + 55, mx + 200, my + 78], outline=GRAY, width=1)
draw.text((mx + 70, my + 63), "NFC Demo Ready", font=font_tiny, fill=GRAY)

# Title
draw.text((mx + 70, my + 105), "TimeLens", font=font, fill=LINE)
draw.text((mx + 85, my + 128), "MEMORY PORTAL", font=font_tiny, fill=GRAY)

# Selected keepsake card
jitter_rect(mx + 25, my + 160, mw - 50, 110, r=12, outline=LINE, width=2)
draw.text((mx + 40, my + 175), "SELECTED KEEPSAKE", font=font_tiny, fill=GRAY)
draw.text((mx + 180, my + 175), "Ready", font=font_tiny, fill=(200, 180, 100))
draw.text((mx + 40, my + 205), "Grandfather's", font=font, fill=LINE)
draw.text((mx + 40, my + 228), "Pocket Watch", font=font, fill=LINE)
draw.text((mx + 40, my + 250), "1985 · Grandparent", font=font_small, fill=GRAY)

# NFC button (circle)
cx, cy = mx + mw//2, my + 320
jitter_line(cx - 35, cy, cx + 35, cy, GRAY, 1)  # rough circle approx
for angle in range(0, 361, 20):
    a = math.radians(angle)
    r = 38 + random.uniform(-1, 1)
    px = cx + math.cos(a) * r
    py = cy + math.sin(a) * r
    if angle == 0:
        prev = (px, py)
    else:
        draw.line([prev, (px, py)], fill=LINE, width=2)
        prev = (px, py)
# inner ring
for angle in range(0, 361, 20):
    a = math.radians(angle)
    r = 26 + random.uniform(-1, 1)
    px = cx + math.cos(a) * r
    py = cy + math.sin(a) * r
    if angle == 0:
        prev = (px, py)
    else:
        draw.line([prev, (px, py)], fill=GRAY, width=1)
        prev = (px, py)

draw.text((mx + 75, my + 370), "TAP TO REVEAL", font=font_tiny, fill=GRAY)

# Bottom buttons
jitter_rect(mx + 30, my + 410, 80, 32, r=16, outline=GRAY, width=1)
draw.text((mx + 48, my + 420), "NFC Tools", font=font_small, fill=LINE)
jitter_rect(mx + 130, my + 410, 80, 32, r=16, outline=GRAY, width=1)
draw.text((mx + 155, my + 420), "Map", font=font_small, fill=LINE)

# List item
jitter_rect(mx + 30, my + 460, mw - 60, 36, r=6, outline=GRAY, width=1)
draw.text((mx + 45, my + 470), "Pocket Watch", font=font_small, fill=LINE)

# Add subtle paper texture noise
pixels = img.load()
for y in range(H):
    for x in range(W):
        noise = random.randint(-3, 3)
        r, g, b = pixels[x, y]
        pixels[x, y] = (min(255, max(0, r + noise)), min(255, max(0, g + noise)), min(255, max(0, b + noise)))

img.save("portfolio/assets/images/lowfi-wireframe.png", "PNG")
print("Saved portfolio/assets/images/lowfi-wireframe.png")
