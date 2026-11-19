# IVORY — Where Precision Meets Perfection

A complete, high-fidelity replica of the **IVORY Dental Studio** luxury website ([ivory-tooth.vercel.app](https://ivory-tooth.vercel.app/)).

Built with custom editorial typography, multi-theme aesthetics, GSAP ScrollTrigger cinematic video and scroll animations, interactive 3D/carousel specialist selector, treatment slideout drawer, case study gallery modal, and booking flow.

---

## ✨ Features & Architecture

1. **Multi-Theme Engine**:
   - `NOIR`: Dark electric aesthetic
   - `CRYSTAL`: Midnight gold aesthetic
   - `AMBER`: Warm amber glow
   - `VERDE`: Deep emerald aesthetic
   - `AZUR`: Modern electric blue
   - `BLANC`: Crisp minimalist ivory
   - `DUO`: Dual-tone contrast mode
   - Persistent theme state via `localStorage` with real-time UI synchronization.

2. **Cinematic Hero & Tooth Scroll Video**:
   - High-definition responsive background and focal reels (`aurea-tooth.mp4`, `hero-team.mp4`).
   - Seamless poster fallbacks for instant LCP optimization.
   - Smooth GSAP ScrollTrigger timeline reveals.

3. **Specialist Selector ("Choose Your Specialist")**:
   - Carousel & orbital layout supporting Dr. Elena Vance, Dr. Marcus Thorne, Dr. Sofia Chen, Dr. Kai Mercer, and Dr. Aria Sterling.
   - Dynamic action poses, specialization badges, philosophy quotes, and slide-in doctor stories.

4. **Interactive Treatment Drawer & Modals**:
   - Slide-in side drawer (`tx-panel`) showcasing procedure details, inclusions, recovery timelines, and direct booking links.
   - Case study gallery modal (`gal-modal`) covering Veneers, Implants, Whitening, Orthodontics, Crowns, and Full Mouth Rehabilitation.

5. **Patient Journey & State-of-the-Art Technology**:
   - 4-step structured clinical path (Consultation, Diagnosis, Treatment, Aftercare).
   - High-tech dental innovations (3D CBCT Imaging, CEREC Same-Day, Digital Smile Design).

6. **Interactive Consultation Booking**:
   - Step-by-step booking journey with calendar date picker, time slot selector, specialist matching, and friction-free inquiry submission.
   - WhatsApp quick-contact floating trigger.

---

## 🚀 Quick Start

### Option 1: Direct Node.js Server (Zero Dependencies)
```bash
npm start
# or
node server.js
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Python HTTP Server
```bash
python -m http.server 3000
```
Open [http://localhost:3000](http://localhost:3000).

### Option 3: Direct File Opening
Double-click `index.html` to open directly in any modern browser.

---

## 📁 Project Structure

```text
├── index.html            # Main HTML document with full CSS styling and structure
├── server.js             # Lightweight Node.js server with HTTP range request support for video streaming
├── package.json          # Project metadata and start scripts
├── README.md             # Project documentation
└── assets/
    ├── app.js            # Core interactive application logic (GSAP, Themes, Doctor Carousel, Modals)
    ├── images/           # All high-res doctor portraits, treatment assets, clinic photos, and posters
    └── videos/           # HD hero reels and tooth 3D animation videos (desktop + mobile)
```
