# Homepage Design System & Interactivity Specification

> **Status:** Approved & Delivered
> **Assignee:** @member-2 (UI/UX / Motion Designer)
> **Collaborator:** @member-4 (Lead Frontend Architect)

This specification details the web-ready visual assets, CSS keyframe math rules, and interactivity tokens delivered for the PentaLogic homepage and global layout.

---

## 🎨 1. Brand Tokens & Color Palette
All visual assets and CSS rules align with our core dark-mode tech theme:
- **Backdrop Foundation (Deep Onyx):** `#07191E`
- **Primary Text:** `#FFFFFF`
- **Muted Text / Secondary:** `rgba(255, 255, 255, 0.62)` (or `var(--muted)`)
- **Micro-Interaction Highlights / Accent (Spring Green):** `#02F5A1`
- **Soft Glow / Translucents:** `rgba(2, 245, 161, 0.12)` (or `var(--accent-soft)`)
- **Card Borders / Accent Borders:** `rgba(2, 245, 161, 0.28)` (or `var(--accent-border)`)

---

## 📦 2. Optimized UI Graphics Package
The following visual assets have been optimized for load performance (compressed PNG files) and are served from the static assets directory:

- **Hero Background Asset:** 
  - File: `public/assets/images/hero-headset.png`
  - Purpose: Abstract network headset mask graphic representing intelligence and systems. Saturation set to 0.85, brightness 1.05.
- **About Page Background Asset:** 
  - File: `public/assets/images/about-bg.png`
  - Purpose: Tech-themed visual backdrop layer swapped dynamically at the `#about` scroll threshold.

*Note: In Vite bundling, assets are located under the root `/assets/images/` path in the public folder to ensure sub-second viewport load times.*

---

## 🎬 3. Motion & Animation Keyframe Specifications

We utilize CSS keyframe math to run hardware-accelerated animations at 60fps without causing React re-render cycles.

### A. Floating Hero Graphic
Creates a slow, smooth floating movement on the primary dashboard visual:
```css
@keyframes float-visual {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.hero-chart {
  animation: float-visual 5s ease-in-out infinite;
}
```

### B. Branded Logo Pulsating Dot
Notification halo glow surrounding the company logo mark:
```css
@keyframes pulse-dot {
  0% {
    box-shadow: 0 0 0 0 rgba(2, 245, 161, 0.55);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(2, 245, 161, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(2, 245, 161, 0);
  }
}

.logo-dot {
  animation: pulse-dot 2.6s ease-out infinite;
}
```

### C. Background Vector Rings
Slow-speed absolute background rotation behind main layout sections:
```css
@keyframes ring-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.hero-visual-ring {
  animation: ring-spin 24s linear infinite;
}
```

---

## 🔬 4. Interactivity & Spotlight Tokens

### A. Cursor Spotlight Tracking Mask
Mousemove reactive radial illumination mask targeting global sitemap grid borders. Maps client coordinates relative to viewports:
- **Math Formula:** `radial-gradient(circle 240px at var(--mx) var(--my), rgba(2,245,161,0.18), transparent 70%)`
- **Masking property:** `-webkit-mask-image: radial-gradient(circle 240px at var(--mx) var(--my), black 0%, transparent 78%)`
- **Tracking listeners:** Move events assign values to `--mx` and `--my` dynamically on the document body or layout wrapper.

### B. Glassmorphism Card Hover States
Definitive hover highlights applied to interactive card grids (e.g. Services Grid):
- **Base Border:** `1px solid rgba(2, 245, 161, 0.28)`
- **Hover Border:** `1px solid rgba(2, 245, 161, 0.50)`
- **Hover Glow Shadow:** `box-shadow: 0 16px 40px rgba(2, 245, 161, 0.12)`
- **Card Translation:** `transform: translateY(-6px) scale(1.02)`
- **Transition Curve:** `transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.35s ease, border-color 0.3s ease`
