// IVORY DENTAL — app.js
// GSAP and ScrollTrigger are loaded via CDN in index.html before this script

gsap.registerPlugin(ScrollTrigger);

/* ─── DOCTOR DATA ─────────────────────────── */
const DOCTORS = [
  { id:'elena', name:'Dr. Elena Voss', specialty:'Implantology & Oral Surgery', color:'#B0B4BB',
    img:'assets/images/doctor-elena.webp', thumb:'assets/images/doctor-elena-thumb.webp', years:14,
    action:'assets/images/action-elena.webp', edu:'DDS · MSc Oral Implantology', cases:'2,400+ implants placed',
    stats:{precision:98,technique:95,experience:92},
    quote:'I restore what time has taken — with precision that lasts a lifetime.',
    treatments:['Dental Implants','Oral Surgery','All-on-4®','Bone Grafting'] },
  { id:'marcus', name:'Dr. Marcus Grey', specialty:'Endodontology', color:'#C05050',
    img:'assets/images/doctor-marcus.webp', thumb:'assets/images/doctor-marcus-thumb.webp', years:18,
    action:'assets/images/action-marcus.webp', edu:'DDS · Endodontic Specialist', cases:'5,000+ root canals',
    stats:{precision:99,technique:97,experience:96},
    quote:'Where others give up, I begin. Every root tells a story.',
    treatments:['Root Canal Therapy','Apicoectomy','Pulp Capping','Retreatment'] },
  { id:'sofia', name:'Dr. Sofia Dante', specialty:'Cosmetic & Orthodontics', color:'#C9A84C',
    img:'assets/images/doctor-sofia.webp', thumb:'assets/images/doctor-sofia-thumb.webp', years:11,
    action:'assets/images/action-sofia.webp', edu:'DDS · Cosmetic & Orthodontics', cases:'900+ smile makeovers',
    stats:{precision:96,technique:99,experience:94},
    quote:'Your smile is your first statement. Make it unforgettable.',
    treatments:['Clear Aligners','Porcelain Veneers','Smile Design','Teeth Whitening'] },
  { id:'kai', name:'Dr. Kai Nakamura', specialty:'Restorative', color:'#00BFFF',
    img:'assets/images/doctor-kai.webp', thumb:'assets/images/doctor-kai-thumb.webp', years:10,
    action:'assets/images/action-kai.webp', edu:'DDS · CAD/CAM Restorative', cases:'3,000+ ceramic restorations',
    stats:{precision:97,technique:98,experience:90},
    quote:'Craftsmanship measured in microns. Results measured in confidence.',
    treatments:['Ceramic Crowns','Inlays & Onlays','Full Mouth Rehab','CAD/CAM'] },
  { id:'aria', name:'Dr. Aria Renault', specialty:'Periodontics', color:'#2ECC71',
    img:'assets/images/doctor-aria.webp', thumb:'assets/images/doctor-aria-thumb.webp', years:16,
    action:'assets/images/action-aria.webp', edu:'DDS · Periodontology', cases:'1,800+ perio treatments',
    stats:{precision:95,technique:94,experience:97},
    quote:'No lasting smile without a perfect foundation. I build from the ground up.',
    treatments:['Gum Treatment','Bone Regeneration','Gum Contouring','Perio Surgery'] }
];

const SPEC_DESCS = [
  'Permanent tooth replacement using titanium implants that feel and function exactly like natural teeth. Built to last a lifetime.',
  'Precision root canal treatment that saves teeth others would extract. Pain-free, same-day results with microscopic accuracy.',
  'Ultra-thin porcelain veneers crafted to your exact smile design. Celebrity results, completely natural feel.',
  'Full-mouth rehabilitation using CAD/CAM technology. Crowns, inlays, and bridges designed with micron precision.',
  'Advanced gum health therapy and regeneration. The strong, healthy foundation every beautiful smile is built upon.'
];

/* ─── HELPER ──────────────────────────────── */
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

/* ─── ECHOES-STYLE CHARACTER SELECT ─────────── */
const CS_DOCTORS = DOCTORS.map((d, i) => ({
  ...d,
  mapPos: [{x:20,y:12},{x:75,y:28},{x:50,y:8},{x:22,y:58},{x:74,y:62}][i],
  hHeight: ['92%','96%','98%','90%','94%'][i],
  groundOffset: ['0%','8%','5%','0%','6%'][i],
  hX: 50,
  bio: [
    "14 years placing implants with sub-millimeter precision. Specialist in full-arch rehabilitation and bone reconstruction.",
    "The tooth you were told to extract is the tooth Dr. Grey saves. 18 years of microscopic endodontics.",
    "Cosmetic dentistry at its highest level. Every veneer is a collaboration between patient vision and artistic precision.",
    "Trained in Japan, certified in CAD/CAM mastery. Full-mouth rehabilitation — in a single appointment.",
    "No smile lasts without healthy gums. Dr. Renault's regenerative techniques are the foundation every case deserves."
  ][i]
}));

const csStage = document.getElementById('cs-stage');
const csCharEls = [], csHotspotEls = [], csHudEntries = [];
let csActive = 2; // Sofia default
let csAnimating = false;

// build chars + hotspots
CS_DOCTORS.forEach((d, i) => {
  const el = document.createElement('div');
  el.className = 'char-item';
  el.innerHTML = `
    <img src="${d.img}" alt="${d.name}"
      onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
    <div class="char-fallback" style="color:${d.color}">${d.name.split(' ').slice(-1)[0][0]}</div>
  `;
  el.addEventListener('click', () => {
    if (csAnimating) return;
    i === csActive ? openDoctorStory() : csGoTo(i);
  });
  csStage.appendChild(el);
  csCharEls.push(el);

  // hotspot
  const hs = document.createElement('div');
  hs.className = 'hotspot';
  hs.style.setProperty('--spot-color', d.color);
  hs.style.left = d.mapPos.x + '%';
  hs.style.top  = d.mapPos.y + '%';
  hs.innerHTML  = `<div class="hotspot-ring"></div><div class="hotspot-dot"></div><div class="hotspot-label">${d.name.split(' ').slice(-1)[0]}</div>`;
  hs.addEventListener('click', () => { if (!csAnimating) csGoTo(i); });
  csStage.appendChild(hs);
  csHotspotEls.push(hs);
});

// build HUD
const hudEl = document.getElementById('doctor-hud');
CS_DOCTORS.forEach((d, i) => {
  const entry = document.createElement('div');
  entry.className = 'hud-entry';
  entry.style.setProperty('--hud-color', d.color);
  entry.innerHTML = `<img class="hud-thumb" src="${d.thumb}" alt="${d.name}" loading="lazy" onerror="this.style.visibility='hidden'"><div class="hud-meta"><div class="hud-name">${d.name.split(' ').slice(-1)[0]}</div><div class="hud-spec">${d.specialty}</div></div>`;
  entry.addEventListener('click', () => { if (!csAnimating) csGoTo(i); });
  hudEl.appendChild(entry);
  csHudEntries.push(entry);
});

// ── Variant-aware character layout ───────────────────────────
// v1 single+rail | v2 3D coverflow | v3 elliptical orbit | v4 team lineup
let csVariant = localStorage.getItem('ivory-cv') || 'v4';

function csComputeProps(v, i) {
  let rel = i - csActive; if (rel > 2) rel -= 5; if (rel < -2) rel += 5;
  const a = Math.abs(rel);
  // MOBILE (≤640px): keep the cinematic stage but ground the active doctor above the
  // bottom info-card and pull the neighbours in dim + subtle (no cramped tiny figures).
  if (typeof window !== 'undefined' && window.matchMedia('(max-width:640px)').matches) {
    // active = big & grounded; ALL neighbours = equal small size. Grounding is handled in CSS
    // (mobile: object-position bottom + max-width:none) so the figure isn't letterboxed/floated.
    return { left: 50 + rel*27, bottom: a===0 ? -4 : -2, height: a===0 ? 90 : 56,
      scale: 1, rotY: 0, opacity: a>2 ? 0 : (a===0 ? 1 : (a===1 ? 0.85 : 0.55)),
      z: 30 - a*8, filter: a===0 ? 'none' : `brightness(${a===1 ? 0.85 : 0.6})` };
  }
  if (v === 'v3') { // elliptical orbit — back ones lift up & shrink (solid, no tilt)
    return { left: 50 + rel*23, bottom: a*a*4.5, height: 102 - a*a*9,
      scale: 1 - a*0.26, rotY: 0, opacity: a>2 ? 0 : (a<=1 ? 1 : 0.8),
      z: 30 - a*8, filter: a===0 ? 'none' : `brightness(${a===1 ? 0.7 : 0.5})` };
  }
  // v4 + the new effect variants (v5–v10) all share the grounded-semicircle lineup
  if (v === 'v4' || v === 'v5' || v === 'v6' || v === 'v7' || v === 'v8' || v === 'v9' || v === 'v10') {
    const spotlight = (v === 'v5' || v === 'v6'); // dim the others into shadow
    const dim = spotlight
      ? (a === 0 ? 'none' : `brightness(${a === 1 ? 0.22 : 0.1})`)
      : (a === 0 ? 'none' : `brightness(${a === 1 ? 0.2 : 0.09})`);
    return { left: 50 + rel*21, bottom: 0, height: a===0 ? 104 : (a===1 ? 86 : 70),
      scale: 1, rotY: 0, opacity: a>2 ? 0 : (a<=1 ? 1 : 0.82),
      z: 30 - a*8, filter: dim };
  }
  // v1 + v2 — single featured doctor, centered (v2 differs via CSS: spotlight + bottom dock)
  return rel === 0
    ? { left:50, bottom:0, height:104, scale:1, rotY:0, opacity:1, z:10, filter:'none' }
    : { left:50, bottom:0, height:104, scale:1, rotY:0, opacity:0, z:1,  filter:'none' };
}

function csLayout(animate) {
  CS_DOCTORS.forEach((d, i) => {
    const el = csCharEls[i];
    const p = csComputeProps(csVariant, i);
    const t = {
      left: p.left + '%', bottom: p.bottom + '%', height: p.height + '%',
      xPercent: -50, scale: p.scale, rotationY: p.rotY, opacity: p.opacity,
      zIndex: p.z, filter: p.filter, transformPerspective: 1200,
      transformOrigin: 'bottom center', pointerEvents: p.opacity > 0.15 ? 'auto' : 'none'
    };
    animate ? gsap.to(el, { ...t, duration: 0.7, ease: 'power3.out' }) : gsap.set(el, t);
  });
}

function csUpdateUI(idx) {
  const d = CS_DOCTORS[idx];
  document.getElementById('cs-doc-specialty').textContent = d.specialty;
  document.getElementById('cs-doc-specialty').style.color = d.color;
  document.getElementById('cs-doc-name').textContent = d.name;
  document.getElementById('cs-doc-bio').textContent = d.bio;
  document.getElementById('cs-stat-pre').style.width = d.stats.precision+'%';
  document.getElementById('cs-stat-pre-val').textContent = d.stats.precision;
  document.getElementById('cs-stat-tec').style.width = d.stats.technique+'%';
  document.getElementById('cs-stat-tec-val').textContent = d.stats.technique;
  document.getElementById('cs-stat-exp').style.width = d.stats.experience+'%';
  document.getElementById('cs-stat-exp-val').textContent = d.stats.experience;
  document.getElementById('cs-stat-pre').style.background = d.color;
  document.getElementById('cs-stat-tec').style.background = d.color;
  document.getElementById('cs-stat-exp').style.background = d.color;
  document.getElementById('cs-book-btn').style.borderColor = d.color;
  document.getElementById('cs-book-btn').style.color = d.color;
  document.getElementById('cs-counter-num').textContent = String(idx+1).padStart(2,'0');
  csHudEntries.forEach((e, i) => e.classList.toggle('active', i === idx));
  // update accent color for the stage elements
  csStage.style.setProperty('--accent', d.color);
}

function csGoTo(target) {
  const t = ((target % 5) + 5) % 5;
  if (csAnimating || t === csActive) return;
  csAnimating = true;
  csActive = t;
  if (typeof csSwitchFx === 'function') csSwitchFx(t);
  const infoEls = ['#cs-doc-specialty', '#cs-doc-name', '#cs-doc-bio', '#cs-doc-stats', '#cs-book-btn'];
  gsap.to(infoEls, {opacity: 0, y: -8, duration: .18, ease: 'power2.in', onComplete: () => {
    csUpdateUI(t);
    gsap.fromTo(infoEls, {opacity: 0, y: 8}, {opacity: 1, y: 0, stagger: .06, duration: .42, ease: 'power3.out'});
  }});
  csLayout(true);
  setTimeout(() => { csAnimating = false; }, 820);
}

function csSyncAll() { csLayout(false); }

// story panel
const csStoryPanel = document.getElementById('cs-story-panel');
const csStoryOverlay = document.getElementById('cs-story-overlay');
gsap.set(csStoryPanel, {x: '-100%'});

function openDoctorStory() {
  const d = CS_DOCTORS[csActive];
  document.getElementById('cs-story-img').src = d.action || d.img;
  document.getElementById('cs-story-specialty').textContent = d.specialty;
  document.getElementById('cs-story-specialty').style.color = d.color;
  document.getElementById('cs-story-name').textContent = d.name;
  const yrs = document.getElementById('cs-story-years');
  yrs.textContent = d.years + ' Years'; yrs.style.color = d.color;
  document.getElementById('cs-story-edu').textContent = d.edu || '';
  document.getElementById('cs-story-quote').textContent = '“' + d.quote + '”';
  document.getElementById('cs-story-bio').textContent = d.bio;
  document.getElementById('cs-story-cases').textContent = d.cases || '';
  document.getElementById('cs-story-treatments').innerHTML =
    (d.treatments || []).map(t => `<span class="cs-treat-tag">${t}</span>`).join('');
  csStoryPanel.style.setProperty('--doc', d.color);
  ['pre','tec','exp'].forEach((k, i) => {
    const val = [d.stats.precision, d.stats.technique, d.stats.experience][i];
    const fill = document.getElementById('cs-st-'+k);
    fill.style.width = '0%'; fill.style.background = d.color;
    document.getElementById('cs-st-'+k+'-val').textContent = val;
    document.getElementById('cs-st-'+k+'-val').style.color = d.color;
    setTimeout(() => { fill.style.width = val+'%'; }, 350 + i*120);
  });
  document.getElementById('cs-story-body').scrollTop = 0;
  gsap.fromTo('#cs-story-img', {scale: 1.08}, {scale: 1, duration: 1.1, ease: 'power3.out'});
  gsap.to(csStoryPanel, {x: 0, duration: .55, ease: 'power3.out'});
  csStoryOverlay.classList.add('active');
}
window.closeDoctorStory = function() {
  gsap.to(csStoryPanel, {x: '-100%', duration: .4, ease: 'power3.in'});
  csStoryOverlay.classList.remove('active');
};

// arrows + keyboard
document.getElementById('cs-btn-next').addEventListener('click', (e) => { e.stopPropagation(); csGoTo(csActive+1); });
document.getElementById('cs-btn-prev').addEventListener('click', (e) => { e.stopPropagation(); csGoTo(csActive-1); });
// mobile "tap for full profile" hint → opens the active doctor's story panel
var csHintEl = document.getElementById('cs-mobile-hint');
if (csHintEl) csHintEl.addEventListener('click', function(e){ e.stopPropagation(); openDoctorStory(); });
// mobile: swipe left / right to change specialist
var csTouchX = null, csTouchY = null;
csStage.addEventListener('touchstart', function(e){ csTouchX = e.touches[0].clientX; csTouchY = e.touches[0].clientY; }, { passive: true });
csStage.addEventListener('touchend', function(e){
  if (csTouchX === null) return;
  var dx = e.changedTouches[0].clientX - csTouchX;
  var dy = e.changedTouches[0].clientY - csTouchY;
  if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4 && !csAnimating) {
    csGoTo(csActive + (dx < 0 ? 1 : -1)); // swipe left → next, right → previous
  }
  csTouchX = null; csTouchY = null;
}, { passive: true });
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') csGoTo(csActive+1);
  if (e.key === 'ArrowLeft')  csGoTo(csActive-1);
  if (e.key === 'Escape') closeDoctorStory();
});

// init CS
const csSectionEl = document.getElementById('character-select');
csSectionEl.dataset.cv = csVariant;
csUpdateUI(csActive);
csSyncAll();
gsap.set(['#cs-doc-specialty','#cs-doc-name','#cs-doc-bio','#cs-doc-stats','#cs-book-btn'], {opacity: 1, y: 0});

// Character-select layout switcher (V1–V4)
document.querySelectorAll('#cs-vsw .vsw-btn').forEach(btn => {
  btn.classList.toggle('active', btn.dataset.cv === csVariant);
  btn.addEventListener('click', () => {
    if (csAnimating) return;
    csVariant = btn.dataset.cv;
    csSectionEl.dataset.cv = csVariant;
    document.querySelectorAll('#cs-vsw .vsw-btn').forEach(b => b.classList.toggle('active', b === btn));
    localStorage.setItem('ivory-cv', csVariant);
    csLayout(true);
    applyVariantEffects();
  });
});

/* ─── Character-Select V5–V10 effect layers (additive; V1–V4 untouched) ─── */
const csSpot = document.createElement('div'); csSpot.id = 'cs-spotlight'; csStage.appendChild(csSpot);
const csAura = document.createElement('div'); csAura.id = 'cs-aura';
for (let i = 0; i < 14; i++) { const p = document.createElement('span'); p.className = 'cs-aura-p'; p.style.setProperty('--i', i); csAura.appendChild(p); }
csStage.appendChild(csAura);

function csSwitchFx(t) {
  if (csVariant === 'v7' || csVariant === 'v5') {           // holographic scan-in
    const el = csCharEls[t];
    if (el) { el.classList.remove('cs-holo'); void el.offsetWidth; el.classList.add('cs-holo');
      setTimeout(() => el.classList.remove('cs-holo'), 900); }
  }
  if (csVariant === 'v10') {                                 // cinematic motion-blur flash
    csStage.classList.add('cs-mblur');
    setTimeout(() => csStage.classList.remove('cs-mblur'), 600);
  }
}

let csOrbit = null, csHover = false;
csStage.addEventListener('pointerenter', () => { csHover = true; });
csStage.addEventListener('pointerleave', () => { csHover = false; });
function startOrbit() {
  stopOrbit();
  csOrbit = setInterval(() => {
    if (!csAnimating && !csHover && document.visibilityState === 'visible') {
      csGoTo((csActive + 1) % 5);
    }
  }, 4200);
}
function stopOrbit() { if (csOrbit) { clearInterval(csOrbit); csOrbit = null; } }

window.addEventListener('pointermove', (e) => {                // parallax depth (v9)
  if (csVariant !== 'v9') return;
  const px = (e.clientX / window.innerWidth - 0.5), py = (e.clientY / window.innerHeight - 0.5);
  gsap.to(csStage, { x: -px * 26, y: -py * 14, duration: .6, ease: 'power2.out' });
  const bg = document.getElementById('cs-stage-bg');
  if (bg) gsap.to(bg, { x: px * 46, y: py * 26, scale: 1.06, duration: .8, ease: 'power2.out' });
});

function applyVariantEffects() {
  if (csVariant !== 'v9') {                                   // reset parallax transforms
    gsap.to(csStage, { x: 0, y: 0, duration: .4 });
    const bg = document.getElementById('cs-stage-bg');
    if (bg) gsap.to(bg, { x: 0, y: 0, scale: 1, duration: .4 });
  }
  startOrbit();
}
applyVariantEffects();

/* cinematic scroll-entrance for the whole Character-Select section (plays once) */
if (window.ScrollTrigger) {
  ScrollTrigger.create({
    trigger: '#character-select', start: 'top 72%', once: true,
    onEnter: () => {
      gsap.from('#cs-heading', { y: -28, opacity: 0, duration: 1, ease: 'power3.out' });
      gsap.from(csCharEls, { y: 95, opacity: 0, duration: 1.05, stagger: 0.09, ease: 'power3.out' });
      gsap.from('#cs-stage-bg', { scale: 1.14, opacity: 0.35, duration: 1.5, ease: 'power2.out' });
      gsap.from('#cs-info-panel', { x: -45, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.25 });
      gsap.from('#cs-bottombar', { y: 28, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.45 });
      gsap.from('#doctor-hud', { x: 45, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.35 });
    }
  });
}

/* ─── BUILD SPECIALTIES — treatments menu (no doctor redundancy) ─── */
const TREATMENTS = [
  { name:'Implants & Oral Surgery', tag:'Surgical · Permanent', img:'assets/images/treat-implants.webp',
    desc:'Permanent tooth replacement that looks, feels and functions like natural teeth — including bone grafting, All-on-4® and surgical extractions.',
    long:'A dental implant is a titanium root that fuses with your jawbone to carry a crown, bridge or full arch that you can treat exactly like your own teeth. We plan every case in 3D so the implant sits in the ideal position before we ever touch a scalpel — for results that are stable for decades, not years. From a single gap to a full smile rebuilt on four implants in a day, our surgical team handles the most complex cases under one roof.',
    benefits:['3D-guided, minimally invasive placement','Single tooth, bridge or full-arch All-on-4®','Bone grafting & sinus lift in-house','A replacement that lasts decades'],
    meta:['1–3 sessions','Local anesthesia / sedation','Lifetime-grade result'] },
  { name:'Orthodontics', tag:'Clear Aligners · Braces', img:'assets/images/treat-ortho.webp',
    desc:'Discreet clear aligners and modern braces that straighten your smile without interrupting your daily life.',
    long:'Whether you prefer near-invisible aligners or precision ceramic braces, we move your teeth gently and predictably into their ideal position. A digital scan lets you preview your finished smile before you start — no messy impressions, no guesswork. Most adult cases finish in 6–14 months, and we monitor every step so you always know exactly where you are in the journey.',
    benefits:['Near-invisible clear aligners','Digital smile preview before you start','Ceramic & lingual options','Gentle, predictable tooth movement'],
    meta:['6–14 months','Removable or fixed','Adults & teens'] },
  { name:'Cosmetic & Veneers', tag:'Aesthetic Design', img:'assets/images/treat-veneers.webp',
    desc:'Ultra-thin porcelain veneers, bonding and full smile design — crafted to your face, your light and your vision.',
    long:'Veneers are wafer-thin porcelain shells bonded to the front of your teeth to reshape colour, length and symmetry in a single transformation. We start with a smile design tailored to your face — the proportions, the line of your lip, the way light catches the enamel — and let you trial it as a mock-up before anything is permanent. The result is a smile that looks unmistakably like you, only at its absolute best.',
    benefits:['Bespoke smile design to your face','Try-on mock-up before treatment','Minimal-prep, enamel-safe porcelain','Natural translucency, no “fake” look'],
    meta:['2–3 sessions','Minimal prep','10+ year lifespan'] },
  { name:'Endodontics', tag:'Root Canal', img:'assets/images/treat-endo.webp',
    desc:'Pain-free, microscope-precise root canal therapy that saves the teeth others would extract.',
    long:'A root canal has a reputation it no longer deserves. Under high-magnification microscopes and with modern rotary instruments, we remove the infection, disinfect the canals and seal the tooth — comfortably, and usually in a single visit. It’s the difference between losing a tooth and keeping your own for life, with virtually no discomfort during or after.',
    benefits:['Microscope-precise, single-visit therapy','Saves a tooth that would otherwise be lost','Virtually pain-free with modern anesthesia','Same-day crown protection available'],
    meta:['1–2 sessions','Painless','Tooth-saving'] },
  { name:'Restorative & Crowns', tag:'Same-Day CEREC', img:'assets/images/treat-crowns.webp',
    desc:'Same-day ceramic crowns, inlays and full-mouth rehabilitation — digitally designed and milled in-house.',
    long:'With our in-house CEREC system we scan, design and mill your ceramic crown or inlay while you wait — no temporaries, no second appointment, no impression goo. For larger cases we rebuild full bites and worn dentition with the same digital precision, restoring both function and appearance. Everything is colour-matched to your surrounding teeth so the repair simply disappears.',
    benefits:['Same-day ceramic crowns & inlays','No temporaries, no second visit','Full-mouth rehabilitation','Perfectly colour-matched'],
    meta:['Single visit','Digitally milled','Metal-free'] },
  { name:'Periodontics', tag:'Gum Health', img:'assets/images/treat-perio.webp',
    desc:'Advanced gum therapy and regeneration — the healthy foundation every beautiful smile is built on.',
    long:'Healthy gums are the foundation every beautiful smile is built on — and gum disease is the leading cause of tooth loss in adults. We treat it at every stage, from deep cleaning and laser therapy to regenerative grafting that rebuilds lost tissue and bone. Caught early, it’s painless and quick; even advanced cases can be stabilised and reversed with the right care.',
    benefits:['Laser-assisted, minimally invasive therapy','Regeneration of lost gum & bone','Stops the #1 cause of tooth loss','Gentle recall & maintenance program'],
    meta:['1–4 sessions','Laser-assisted','Foundation of health'] },
  { name:'Teeth Whitening', tag:'In-Office', img:'assets/images/treat-whitening.webp',
    desc:'Professional whitening up to ten shades brighter in a single, enamel-safe session.',
    long:'Professional in-office whitening lifts years of coffee, wine and tea staining in about an hour — safely, and far beyond anything a drugstore kit can do. We protect your gums and enamel throughout, then send you home with a custom tray to top up whenever you like. The result is a brighter, younger-looking smile with zero damage to the tooth.',
    benefits:['Up to 10 shades brighter','Single ~60-minute session','Enamel-safe, gum-protected','Custom take-home top-up trays'],
    meta:['~60 minutes','Single session','Instant result'] },
  { name:'Preventive Care', tag:'Prophylaxis · Check-ups', img:'assets/images/treat-prophy.webp',
    desc:'Professional cleanings, fluoride and regular check-ups that stop problems before they start — the simplest way to keep your smile for life.',
    long:'The smartest dentistry is the kind you never need. Regular professional cleanings, fluoride and early detection catch tiny problems while they’re still tiny — long before they need drilling, crowns or surgery. Our hygienists make it a genuinely pleasant ritual, and we tailor your recall interval to your own risk so you’re never over- or under-treated.',
    benefits:['Thorough professional cleaning','Early detection of decay & gum issues','Fluoride & sealant protection','Personalised recall schedule'],
    meta:['~45 minutes','Every 6 months','Prevention first'] }
];
const specGrid = document.getElementById('specialtiesGrid');
if (specGrid) {
  TREATMENTS.forEach((t, i) => {
    const card = document.createElement('div');
    card.className = 'specialty-card reveal';
    card.dataset.tx = i;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.innerHTML = `
      <div class="spec-photo"><img src="${t.img}" alt="${t.name}" loading="lazy"></div>
      <span class="spec-name">${t.name}</span>
      <span class="spec-specialty">${t.tag}</span>
      <p class="spec-desc">${t.desc}</p>
      <span class="spec-more">Learn more →</span>
    `;
    card.addEventListener('click', () => openTx(i));
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openTx(i); } });
    specGrid.appendChild(card);
  });
}

/* ─── TREATMENT DETAIL PANEL — slides in like the patient story ─── */
const txPanel = document.getElementById('tx-panel');
const txOverlay = document.getElementById('tx-overlay');
window.openTx = function(i){
  const t = TREATMENTS[i];
  if (!t || !txPanel) return;
  document.getElementById('tx-img').src = t.img;
  document.getElementById('tx-tag').textContent = t.tag;
  document.getElementById('tx-name').textContent = t.name;
  document.getElementById('tx-desc').textContent = t.long || t.desc;
  document.getElementById('tx-benefits').innerHTML =
    (t.benefits || []).map(b => `<li>${b}</li>`).join('');
  document.getElementById('tx-meta').innerHTML =
    (t.meta || []).map(m => `<span class="tx-chip">${m}</span>`).join('');
  document.getElementById('tx-body').scrollTop = 0;
  txOverlay.classList.add('active');
  txPanel.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (window.gsap) {
    gsap.fromTo('#tx-img', {scale: 1.12}, {scale: 1, duration: 1.1, ease: 'power3.out'});
    gsap.fromTo('#tx-body > *', {opacity: 0, y: 16}, {opacity: 1, y: 0, stagger: .06, duration: .5, ease: 'power3.out', delay: .12});
  }
};
window.closeTx = function(){
  if (!txPanel) return;
  txPanel.classList.remove('open');
  txOverlay.classList.remove('active');
  document.body.style.overflow = '';
};
document.addEventListener('keydown', e => { if (e.key === 'Escape') window.closeTx(); });

/* ─── BUILD FULL TEAM GRID ─────────────────── */
const TEAM = [
  { img:'team-front-desk',  name:'Mia',      role:'Front Desk',           bio:'The first smile you meet. Mia keeps every visit running on time and makes sure you feel at home from the moment you walk in.' },
  { img:'team-guest',       name:'Lea',      role:'Guest Relations',      bio:'Lea looks after every detail of your stay — from your first call to your follow-up — so the whole experience feels effortless.' },
  { img:'team-assistant1',  name:'Amira',    role:'Dental Assistant',     bio:'Calm, precise hands at the chairside. Amira anticipates the dentist’s every move and keeps you relaxed throughout treatment.' },
  { img:'team-assistant2',  name:'Lena',     role:'Dental Assistant',     bio:'Lena combines clinical precision with a warm bedside manner — the steady presence that makes nervous patients feel safe.' },
  { img:'team-hygienist1',  name:'Claudia',  role:'Dental Hygienist',     bio:'A specialist in gentle, thorough cleanings. Claudia turns prevention into a genuinely pleasant ritual you’ll look forward to.' },
  { img:'team-hygienist2',  name:'Jamal',    role:'Dental Hygienist',     bio:'Jamal blends the latest hygiene technology with a light touch, leaving every patient with a brighter, healthier smile.' },
  { img:'team-manager',     name:'Beatrice', role:'Practice Manager',     bio:'The quiet force behind the scenes. Beatrice keeps the whole practice in perfect rhythm so the team can focus entirely on you.' },
  { img:'team-coordinator', name:'Mei',      role:'Treatment Coordinator',bio:'Mei guides you through your treatment plan step by step — clear answers, honest pricing, zero pressure.' },
  { img:'team-barista',     name:'Luca',     role:'Barista',              bio:'Yes, we have a barista. Luca’s espresso turns the waiting room into the best few minutes of your day.' },
  { img:'team-trainee',     name:'Emma',     role:'Apprentice',           bio:'The next generation, learning from the best. Emma brings fresh energy and a genuine passion for patient care.' }
];
const teamGrid = document.getElementById('teamGrid');
if (teamGrid) {
  TEAM.forEach(m => {
    const c = document.createElement('div');
    c.className = 'team-card reveal';
    const cap = `<div class="team-name">${m.name}</div><div class="team-role">${m.role}</div>`;
    const bio = `<p class="team-bio">${m.bio || ''}</p>`;
    c.innerHTML = `<div class="team-photo"><img src="assets/images/${m.img}.webp" alt="${m.name} — ${m.role}" loading="lazy"><div class="team-overlay">${cap}${bio}</div></div><div class="team-below">${cap}${bio}</div>`;
    teamGrid.appendChild(c);
  });
  // Team layout switcher (V1 cards | V2 round avatars | V3 overlay tiles)
  const teamSec = document.getElementById('team');
  let teamV = localStorage.getItem('ivory-tv') || 'v3';
  teamSec.dataset.tv = teamV;
  document.querySelectorAll('#team-vsw .vsw-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tv === teamV);
    b.addEventListener('click', () => {
      teamV = b.dataset.tv; teamSec.dataset.tv = teamV;
      document.querySelectorAll('#team-vsw .vsw-btn').forEach(x => x.classList.toggle('active', x === b));
      localStorage.setItem('ivory-tv', teamV);
    });
  });
}

/* ─── TOOTH HERO ENTRANCE (Version 2) — slow, refined cinematic glide ─────── */
if (document.getElementById('tooth-hero')) {
  const thTl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  thTl
    .from('.th-media',   { scale: 1.16, opacity: 0, filter: 'blur(28px)', duration: 2.8, ease: 'power3.out' }, 0)
    .from('.th-eyebrow', { y: 34, opacity: 0, filter: 'blur(6px)',  duration: 1.7 }, 0.7)
    .from('.th-title',   { y: 84, opacity: 0, filter: 'blur(13px)', duration: 2.4 }, 0.85)
    .from('.th-sub',     { y: 34, opacity: 0, filter: 'blur(6px)',  duration: 1.7 }, 1.3)
    .from('.th-actions', { y: 28, opacity: 0, duration: 1.5 }, 1.6)
    .from('.th-scroll',  { opacity: 0, duration: 1.5 }, 2.2);
}

/* ─── GSAP HERO ENTRANCE ──────────────────── */
gsap.from('.hero-title', { opacity: 0, y: 50, duration: 1.2, ease: 'power3.out', delay: 0.2 });
gsap.from('.hero-sub',   { opacity: 0, y: 20, duration: 1.0, ease: 'power3.out', delay: 0.6 });
gsap.from('.hero-scroll',{ opacity: 0, duration: 0.8, delay: 1.8 });
gsap.from('nav',         { opacity: 0, duration: 0.6, delay: 0.3 });

/* ─── NAV SCROLL ──────────────────────────── */
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 80);
}, { passive: true });

/* ─── SCROLL REVEAL (staggered grids) ───────────────────────── */
// Cards inside a grid reveal one-by-one (stagger via transition-delay)
document.querySelectorAll('.specialties-grid, .team-grid, .tech-grid, .stats-grid, .gallery-grid, .test-grid, .journey-grid').forEach(grid => {
  [...grid.children].forEach((child, i) => {
    if (child.classList && child.classList.contains('reveal')) child.style.transitionDelay = ((i % 8) * 0.07) + 's';
  });
});
document.querySelectorAll('.reveal').forEach(el => {
  ScrollTrigger.create({
    trigger: el,
    start: 'top 90%',
    onEnter: () => el.classList.add('in'),
    once: true
  });
});

/* Section-level "come alive" trigger (journey path draw, stats bars build) */
['journey','stats','technology','gallery'].forEach(id => {
  const sec = document.getElementById(id);
  if (sec) ScrollTrigger.create({ trigger: sec, start: 'top 78%', once: true, onEnter: () => sec.classList.add('animate') });
});

/* ─── VARIANT SWITCHER ──────────────────────────────────── */
document.getElementById('global-theme-sw').style.display = 'flex';

/* Global color theme switcher */
document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const theme = btn.dataset.theme;
    document.documentElement.dataset.theme = theme;
    document.querySelectorAll('.theme-btn').forEach(b => b.classList.toggle('active', b.dataset.theme === theme));
    localStorage.setItem('ivory-theme', theme);
  });
});

/* Per-section variant switcher */
document.querySelectorAll('.vsw-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const v = btn.dataset.v; // 'v1', 'v2', 'v3'
    const sectionId = btn.closest('.vsw').dataset.section;
    const sectionEl = document.getElementById(sectionId);
    if (sectionEl) sectionEl.dataset.v = v;
    btn.closest('.vsw').querySelectorAll('.vsw-btn').forEach(b => b.classList.toggle('active', b === btn));
    localStorage.setItem('ivory-v-' + sectionId, v);
  });
});

/* Restore saved state */
const savedTheme = localStorage.getItem('ivory-theme');
if (savedTheme) document.documentElement.dataset.theme = savedTheme;
// always sync the active theme button to the ACTUAL theme (fixes NOIR-highlight-while-AMBER bug)
const curTheme = document.documentElement.dataset.theme;
document.querySelectorAll('.theme-btn').forEach(b => b.classList.toggle('active', b.dataset.theme === curTheme));
['tooth-hero','hero','specialties','technology','journey','stats','gallery','testimonials','cta'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  const saved = localStorage.getItem('ivory-v-' + id);
  if (saved) el.dataset.v = saved;
  const currentV = el.dataset.v;
  const vsw = document.querySelector(`.vsw[data-section="${id}"]`);
  if (vsw) vsw.querySelectorAll('.vsw-btn').forEach(b => b.classList.toggle('active', b.dataset.v === currentV));
});

/* ─── STATS COUNTER ──────────────────────────────────────────── */
document.querySelectorAll('.stat-num').forEach(el => {
  const target = parseInt(el.dataset.target, 10);
  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.fromTo(el,
        { innerText: 0 },
        {
          innerText: target,
          duration: 2.2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          onUpdate() { el.textContent = Math.round(parseFloat(el.innerText)); }
        }
      );
    }
  });
});

/* ─── CTA BOOKING (demo calendar + WhatsApp) ─────────────────── */
const ctaBook = document.getElementById('ctaBook');
const ctaSuccess = document.getElementById('ctaSuccess');
const WA_NUMBER = '491234567890'; // ← Platzhalter: durch echte WhatsApp-Nummer ersetzen
if (ctaBook) {
  const calGrid = document.getElementById('cal-grid');
  const calMonth = document.getElementById('cal-month');
  const slotGrid = document.getElementById('slot-grid');
  const summary = document.getElementById('bk-summary');
  // Custom treatment dropdown
  const ddRoot = document.getElementById('bk-treatment');
  const ddBtn = document.getElementById('bk-dd-btn');
  const ddVal = ddRoot.querySelector('.bk-dd-val');
  let bkTreatment = '';
  ddBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = ddRoot.classList.toggle('open');
    ddBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  ddRoot.querySelectorAll('.bk-dd-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      bkTreatment = opt.textContent.trim();
      ddVal.textContent = bkTreatment; ddVal.removeAttribute('data-placeholder');
      ddRoot.querySelectorAll('.bk-dd-opt').forEach(o => o.classList.remove('sel'));
      opt.classList.add('sel');
      ddRoot.classList.remove('open'); ddBtn.setAttribute('aria-expanded', 'false');
      updateBooking();
    });
  });
  document.addEventListener('click', (e) => {
    if (!ddRoot.contains(e.target)) { ddRoot.classList.remove('open'); ddBtn.setAttribute('aria-expanded', 'false'); }
  });
  const waBtn = document.getElementById('bk-wa');
  const SLOTS = ['09:00','10:00','11:00','13:00','14:30','16:00','17:30'];
  const today = new Date(); today.setHours(0,0,0,0);
  let viewY = today.getFullYear(), viewM = today.getMonth();
  let selDate = null, selTime = null;
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  function fmtDate(d){ return d.toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'}); }
  function updateBooking(){
    const t = bkTreatment || 'a consultation';
    let txt = `Hi IVORY, I'd like to book ${t}`;
    if (selDate) txt += ` on ${fmtDate(selDate)}`;
    if (selTime) txt += ` at ${selTime}`;
    txt += '.';
    waBtn.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(txt)}`;
    summary.textContent = selDate ? `${fmtDate(selDate)}${selTime ? ' · ' + selTime : ''}` : '';
  }
  function renderSlots(){
    slotGrid.innerHTML = '';
    if (!selDate){ slotGrid.innerHTML = '<span class="slot-hint">Pick a date first</span>'; return; }
    SLOTS.forEach(s => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'slot' + (s===selTime ? ' active' : ''); b.textContent = s;
      b.addEventListener('click', () => { selTime = s; renderSlots(); updateBooking(); });
      slotGrid.appendChild(b);
    });
  }
  function renderCal(){
    calMonth.textContent = `${MONTHS[viewM]} ${viewY}`;
    calGrid.innerHTML = '';
    const first = new Date(viewY, viewM, 1);
    const startDow = (first.getDay()+6)%7; // Mon=0
    const days = new Date(viewY, viewM+1, 0).getDate();
    for (let i=0;i<startDow;i++){ const e=document.createElement('span'); e.className='cal-empty'; calGrid.appendChild(e); }
    for (let d=1;d<=days;d++){
      const date = new Date(viewY, viewM, d);
      const b = document.createElement('button');
      b.type='button'; b.className='cal-day'; b.textContent=d;
      const isPast = date < today;
      const isSun = date.getDay()===0;
      if (isPast || isSun){ b.disabled = true; b.classList.add('off'); }
      if (selDate && date.getTime()===selDate.getTime()) b.classList.add('active');
      if (date.getTime()===today.getTime()) b.classList.add('today');
      if (!b.disabled) b.addEventListener('click', () => { selDate = date; selTime = null; renderCal(); renderSlots(); updateBooking(); });
      calGrid.appendChild(b);
    }
  }
  document.getElementById('cal-prev').addEventListener('click', () => {
    if (viewY===today.getFullYear() && viewM===today.getMonth()) return; // no past months
    viewM--; if (viewM<0){ viewM=11; viewY--; } renderCal();
  });
  document.getElementById('cal-next').addEventListener('click', () => { viewM++; if (viewM>11){ viewM=0; viewY++; } renderCal(); });
  document.getElementById('bk-confirm').addEventListener('click', () => {
    if (!bkTreatment || !selDate || !selTime){
      summary.textContent = 'Please choose treatment, date and time.'; summary.classList.add('warn');
      setTimeout(()=>summary.classList.remove('warn'), 1800);
      return;
    }
    gsap.to(ctaBook, {opacity:0, y:-10, duration:.4, ease:'power2.in', onComplete:()=>{
      ctaBook.style.display='none';
      ctaSuccess.innerHTML = `✓ Request received — <strong>${bkTreatment}</strong>, ${fmtDate(selDate)} at ${selTime}. We'll confirm within 24 hours.`;
      ctaSuccess.classList.add('visible');
      gsap.from(ctaSuccess, {opacity:0, y:12, duration:.5, ease:'power3.out'});
    }});
  });
  renderCal(); renderSlots(); updateBooking();
}

/* ─── GALLERY RESULT MODAL ───────────────────────────────────── */
const GAL_STORIES = {
  'Veneers': 'Twelve ultra-thin porcelain laminates, hand-layered over eight days. The journey began with a full digital smile design — the patient previewed and approved the exact shape, length and shade before a single tooth was touched. Each veneer was individually crafted by our master ceramist, no two alike, shaped to the patient’s face, lip line and the way light falls on their smile. The result reads as entirely, effortlessly natural: brighter and beautifully aligned, yet unmistakably their own — a transformation built not just to look perfect on day one, but to age gracefully for decades.',
  'Implants': 'Four titanium implants restoring a full, permanent bite. After years of avoiding certain foods and hiding his smile, the patient came to us for a definitive solution. Using sub-millimeter CBCT-guided planning, each implant was placed with exacting precision and allowed to fuse naturally with the bone. The final restoration looks, feels and functions exactly like natural teeth — he can bite into anything, speak with total confidence and laugh without a second thought. More than a dental result, it gave him back something he’d quietly lost: the freedom to be himself.',
  'Whitening': 'Professional in-office whitening — ten shades brighter in a single ninety-minute session. Unlike over-the-counter strips, every step was dentist-supervised and enamel-safe, with a custom barrier protecting the gums throughout. The patient came in on a lunch break and left with a noticeably brighter, healthier-looking smile — no sensitivity, no downtime, and none of that artificial “too-white” look. Just their own teeth, restored to their natural brilliance, photographed here the very same afternoon.',
  'Crowns': 'Three CEREC ceramic crowns, digitally designed, milled and seated in a single appointment. No messy impressions, no temporary crowns, no second visit weeks later. We scanned, designed and crafted each crown chairside while the patient relaxed, then bonded them the same day. The ceramic was colour-matched to the surrounding teeth so precisely that even the patient struggles to tell which are restorations — strong, seamless and life-like, a full restoration completed in the time most clinics need just to take the mould.',
  'Orthodontics': 'Fourteen months of clear aligners, fully correcting crowding and alignment without a single visible brace. The patient — a working professional who had always wanted to straighten her smile but dreaded the look of metal — wore the discreet, removable aligners through meetings, dinners and presentations, and almost no one ever noticed. Each set gently guided her teeth a fraction closer to the planned result, mapped out in 3D from the very first day. The outcome: a perfectly aligned, confident smile, achieved entirely on her own terms.',
  'Full Rehab': 'A complete full-mouth rehabilitation, staged carefully over six months. Years of wear and old, failing dental work had left the patient’s bite unstable and her confidence shaken. Our entire team — surgeon, restorative dentist, hygienist and lab technician — worked in concert: implants where teeth were missing, new crowns to rebuild form and function, and gum therapy to restore a healthy foundation. Step by step, we didn’t just repair individual teeth — we rebuilt an entire smile from the ground up. The woman in this photograph is the result: restored function, renewed health, and a smile she is finally proud to share.'
};
const galModal = document.getElementById('gal-modal');
if (galModal) {
  document.querySelectorAll('#gallery .gallery-card').forEach(card => {
    card.addEventListener('click', () => {
      const t = (card.querySelector('.gallery-treatment')||{}).textContent || '';
      const detail = (card.querySelector('.gallery-detail')||{}).textContent || '';
      const photo = card.querySelector('.gallery-photo');
      document.getElementById('gal-modal-title').textContent = t;
      document.getElementById('gal-modal-detail').textContent = detail;
      document.getElementById('gal-modal-story').textContent = GAL_STORIES[t] || '';
      const mImg = document.getElementById('gal-modal-photo');
      if (photo && photo.getAttribute('src')) { mImg.src = photo.getAttribute('src'); mImg.parentElement.style.display = ''; }
      else { mImg.parentElement.style.display = 'none'; }
      galModal.classList.add('open');
      gsap.fromTo('.gal-modal-panel', {scale:.94, opacity:0, y:24}, {scale:1, opacity:1, y:0, duration:.5, ease:'power3.out'});
      gsap.fromTo('#gal-modal-photo', {scale:1.1}, {scale:1, duration:1.1, ease:'power3.out'});
    });
  });
}
window.closeGalleryModal = function() { if (galModal) galModal.classList.remove('open'); };
document.addEventListener('keydown', e => { if (e.key === 'Escape') window.closeGalleryModal(); });

/* ─── TESTIMONIALS V3 SLIDER ─────────────────────────────────── */
(() => {
  const cards = document.querySelectorAll('#testimonials .test-card');
  const dotsWrap = document.getElementById('test-dots');
  const prev = document.getElementById('test-prev');
  const next = document.getElementById('test-next');
  if (!cards.length || !dotsWrap || !prev || !next) return;
  let idx = 0;
  dotsWrap.innerHTML = '';
  cards.forEach((_, k) => {
    const d = document.createElement('button');
    d.className = 'test-dot' + (k === 0 ? ' on' : ''); 
    d.setAttribute('aria-label', 'Review ' + (k + 1));
    d.addEventListener('click', () => { show(k); resetTimer(); });
    dotsWrap.appendChild(d);
  });
  const dots = dotsWrap.querySelectorAll('.test-dot');
  function show(i){
    idx = (i + cards.length) % cards.length;
    cards.forEach((c, k) => {
      const active = (k === idx);
      c.classList.toggle('active', active);
      if (active) c.classList.add('in');
    });
    dots.forEach((d, k) => d.classList.toggle('on', k === idx));
  }
  prev.addEventListener('click', () => { show(idx - 1); resetTimer(); });
  next.addEventListener('click', () => { show(idx + 1); resetTimer(); });
  show(0);

  // Smooth Auto-Rotation every 4.8 seconds
  let timer = setInterval(() => show(idx + 1), 4800);
  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => show(idx + 1), 4800);
  }
  const sec = document.getElementById('testimonials');
  if (sec) {
    sec.addEventListener('mouseenter', () => clearInterval(timer));
    sec.addEventListener('mouseleave', () => resetTimer());
  }
})();

/* ─── CURSOR SPOTLIGHT — injects a glow layer into each card and tracks the pointer ─── */
(function(){
  var sel = '.specialty-card, .tech-card, .gallery-card, .test-card, .stat-item, .team-card, .journey-step';
  var cards = document.querySelectorAll(sel);
  cards.forEach(function(card){
    if (getComputedStyle(card).position === 'static') card.style.position = 'relative';
    var glow = document.createElement('i');
    glow.className = 'cglow';
    card.appendChild(glow);
    card.addEventListener('pointermove', function(e){
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });
})();

/* ─── AUTO-ACTIVATE SOFIA (idx 2) — handled by csActive=2 in ECHOES system ─── */
