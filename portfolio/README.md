# TimeLens Portfolio

Process Portfolio for CPT208 - Relation Between Generations

## 🌐 Live Demo

Visit the portfolio: `https://wnzgy.github.io/CPT208-Relation-between-Generations/portfolio/`

## 📁 Structure

```
portfolio/
├── index.html          # Home page - Project overview
├── research.html       # User research - Personas & Journey Map
├── design.html         # Design process - Crazy 8s & Alternatives
├── system.html         # System - Screenshots & Demo video
├── assets/
│   ├── css/
│   │   └── style.css   # All styles
│   ├── images/         # Screenshots & photos
│   └── crazy8s/        # Crazy 8s sketches
└── README.md           # This file
```

## 📝 How to Update

### 1. Crazy 8s Sketches ✅ Done

8 hand-drawn style sketches have been generated and saved to `assets/crazy8s/crazy8s-1.jpg` through `crazy8s-8.jpg`.

To regenerate or modify styles, run:
```bash
python3 generate_crazy8s.py
```

### 2. Low-Fi Prototypes ✅ Done

Mobile wireframe and user interaction flow diagrams have been generated and linked in `design.html`.

To regenerate, run:
```bash
python3 generate_lowfi.py
```

### 3. Add App Screenshots

1. Take screenshots of the TimeLens app (or ask 组员A for them)
2. Save to `assets/images/`
3. In `system.html`, replace `.svg` placeholders with real images:
   ```html
   <img src="assets/images/screenshot-scan.png" alt="NFC Scan Interface">
   ```

### 4. Add Demo Video

**Option A: YouTube Embed**
```html
<iframe width="100%" height="400" src="https://www.youtube.com/embed/VIDEO_ID" 
  frameborder="0" allowfullscreen></iframe>
```

**Option B: Direct MP4**
```html
<video controls width="100%">
  <source src="assets/video/demo.mp4" type="video/mp4">
</video>
```

### 5. Update Content

All content is in the HTML files. Edit directly:
- `research.html` - Update Persona details if needed
- `design.html` - Design rationale is already filled
- `system.html` - Add technical details and real screenshots

## 🎨 Customization

### Colors
Edit `assets/css/style.css`:
```css
:root {
  --primary: #4f46e5;      /* Main brand color */
  --accent: #fbbf24;       /* Highlight color */
  --bg-dark: #0f172a;      /* Background */
  /* ... */
}
```

### Fonts
Currently using system fonts. To change, add to CSS:
```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');

body {
  font-family: 'Your Font', sans-serif;
}
```

## 🚀 Deployment

The portfolio is automatically deployed via GitHub Pages when pushed to the repository.

```bash
# Add files
git add portfolio/

# Commit
git commit -m "docs: Add portfolio website"

# Push to your branch
git push origin memberC-portfolio

# Merge to main when ready
git checkout main
git merge memberC-portfolio
git push upstream main
```

## ✅ Checklist

- [x] Crazy 8s sketches uploaded (AI-generated hand-drawn style)
- [x] Low-Fi prototypes generated (mobile wireframe + user flow)
- [x] Persona details finalized
- [x] Design alternatives rationale complete
- [ ] App screenshots added (pending 组员A)
- [ ] Demo video embedded or linked (pending 组员D)
- [ ] All links working
- [ ] Mobile responsive tested

## 📞 Questions?

Contact the team or check the main repository:
https://github.com/wnzgy/CPT208-Relation-between-Generations
