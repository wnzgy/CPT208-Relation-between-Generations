# TimeLens

A playful intergenerational memory portal for CPT208 Human-Centric Computing.

**Theme:** B4 — Relation Between Generations  
**Group:** B4-1  
**Device:** Mobile (Web App)  
**Stack:** React + Vite + React Three Fiber + Tailwind CSS + Web NFC API

---

## 🌐 Live URLs

| Resource | URL |
|----------|-----|
| **Portfolio** | https://wnzgy.github.io/CPT208-Relation-between-Generations/portfolio/ |
| **Prototype** | https://wnzgy.github.io/CPT208-Relation-between-Generations/prototype/ |
| **Demo Mode** | https://wnzgy.github.io/CPT208-Relation-between-Generations/prototype/?demo=video |

---

## 🚀 Quick Start

### 1. Run the prototype locally

```bash
cd timelens
npm install
npm run dev
```

Open: http://localhost:5173

### 2. Video demo mode

```
http://localhost:5173/?demo=video
```

Use arrow keys to navigate scenes, `Space` to toggle autoplay, `C` to toggle captions.

### 3. Deploy to GitHub Pages

```bash
cd timelens
npm run deploy
```

---

## 🛠 Tech Stack

- **Framework:** React 19 + Vite 6
- **3D Rendering:** React Three Fiber + React Three Drei
- **Styling:** Tailwind CSS 4 + PostCSS + Autoprefixer
- **Icons:** Lucide React
- **Deployment:** GitHub Pages (via gh-pages)
- **Data:** LocalStorage (client-side only, no server)

---

## 📁 Repository Structure

```
CPT208-Relation-between-Generations/
├── portfolio/              # Process Portfolio (GitHub Pages)
│   ├── index.html
│   ├── research.html
│   ├── design.html
│   ├── system.html
│   ├── evaluation.html
│   ├── timeline.html
│   └── assets/
├── timelens/               # React Web App prototype
│   ├── src/App.jsx         # Main application
│   ├── src/main.jsx
│   ├── public/             # Static assets
│   ├── ai-logs/            # AI coding session logs
│   └── package.json
├── prototype/              # Built static prototype (deployed)
├── index.html              # Root redirect
└── README.md               # This file
```

---

## 👥 Team (Group B4-1)

| Member | Student ID | Role | Key Contributions |
|--------|-----------|------|-------------------|
| Chenlong Wei | 2363235 | Frontend Engineer | React architecture, responsive UI, LocalStorage, scan fallback |
| Zixuan Wang | 2363717 | 3D & Hardware Lead | React Three Fiber 3D scene, Web NFC, haptic/audio feedback |
| Puwei Fan | 2362997 | Research & Portfolio | Personas, journey map, questionnaire, portfolio content |
| Wenhe Li | 2364596 | Testing & Media | Usability testing, poster, video demo, final review |

---

## 🤖 AI Usage Disclosure

This project made **substantive use** of generative AI for:

- Code scaffolding and debugging (React components, CSS, interaction logic)
- Visual asset generation (hero images, sketches, diagrams)
- Grammatical refinement of portfolio text

The **core design logic**, **user research findings**, and **human-centric justification** are the group's original work.

All AI-generated components were manually reviewed, tested against user requirements, and checked for accessibility and bias.

**AI logs:** See `/timelens/ai-logs/` for primary prompts and verification notes.

**Citations:** Full AI tool citations are included in the Portfolio's References section per university policy.

---

## 📄 License & Academic Integrity

This project is submitted as coursework for CPT208 Human-Centric Computing at XJTLU.
All group members adhere to the university's Academic Integrity Policy.
