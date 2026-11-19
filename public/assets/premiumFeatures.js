/**
 * IVORY Dental — Premium Interactive Features & Client Reviews
 * Before/After Slider, Smile Plan Calculator, and Verified Patient Reviews
 */

(function () {
  'use strict';

  // --- 1. MULTI-CASE INTERACTIVE BEFORE & AFTER SLIDER ---
  const SLIDER_CASES = {
    veneers: {
      title: '💎 Hand-Layered Porcelain Veneers',
      beforeImg: 'assets/images/gallery-veneers.webp',
      afterImg: 'assets/images/gallery-crowns.webp',
      beforeLabel: 'Initial: Fluorosis, Chipping & Asymmetry',
      afterLabel: 'Completed: 8 Upper Custom E.max Veneers (Bleach BL1)',
      patient: 'Aishwarya R. · Tech Lead, Hyderabad',
      procedure: '8 Maxillary Veneers · 0.3mm Ultra-Minimal Prep',
      specialist: 'Dr. Marcus Thorne · Biomimetic Restorative',
      duration: '2 Clinical Visits · 7 Days Total',
      longevity: '15–20+ Years Clinical Durability'
    },
    whitening: {
      title: '✨ Zoom Cold-Laser Whitening',
      beforeImg: 'assets/images/gallery-veneers.webp',
      afterImg: 'assets/images/gallery-whitening.webp',
      beforeLabel: 'Initial: Grade-3 Deep Tannin Stains (A3.5)',
      afterLabel: 'Completed: Radiant Pristine Smile (8 Shades Lift)',
      patient: 'Vikram K. · Corporate Executive',
      procedure: 'Cold-Laser Accelerated Hydrogen Peroxide Prophylaxis',
      specialist: 'Hygiene & Aesthetic Dental Care Team',
      duration: '60 Minutes (Single Visit)',
      longevity: '2–3 Years with Maintenance Polish'
    },
    implants: {
      title: '🦷 Guided Digital Implants',
      beforeImg: 'assets/images/gallery-rehab.webp',
      afterImg: 'assets/images/gallery-implants.webp',
      beforeLabel: 'Initial: Missing Premolar with Localized Bone Loss',
      afterLabel: 'Completed: Osseointegrated Titanium + Zirconia Crown',
      patient: 'Priya N. · Architect',
      procedure: 'Sub-Millimeter CBCT Guided Osteotomy + Bio-Integration',
      specialist: 'Dr. Elena Voss · Oral Surgery & Implantology',
      duration: '1 Immediate Loading Visit + Final Restoration',
      longevity: 'Lifetime Osseointegrated Stability'
    },
    aligners: {
      title: '📐 Clear Invisalign Aligners',
      beforeImg: 'assets/images/gallery-ortho.webp',
      afterImg: 'assets/images/gallery-whitening.webp',
      beforeLabel: 'Initial: Severe Anterior Crowding & Crossbite',
      afterLabel: 'Completed: Class-I Ideal Symmetrical Dental Arch',
      patient: 'Rahul M. · Student & Athlete',
      procedure: 'SmartTrack Polyurethane Digital Micro-Movement Trays',
      specialist: 'Dr. Sofia Chen · Orthodontics & Dento-Facial',
      duration: '6.5 Months (Non-Extraction)',
      longevity: 'Permanent Retention with Night Retainers'
    }
  };

  let currentCase = 'veneers';

  function initBeforeAfterSlider() {
    const sliderContainer = document.getElementById('ba-slider-container');
    if (!sliderContainer) return;

    const handle = document.getElementById('ba-handle');
    const afterImage = document.getElementById('ba-after-layer');
    const divider = document.getElementById('ba-divider');
    const beforeImgEl = document.getElementById('ba-before-img');
    const afterImgEl = document.getElementById('ba-after-img');

    if (!handle || !afterImage || !divider) return;

    let isDragging = false;

    function updateSlider(x) {
      const rect = sliderContainer.getBoundingClientRect();
      let pos = (x - rect.left) / rect.width;
      pos = Math.max(0.04, Math.min(0.96, pos));

      const pct = pos * 100;
      handle.style.left = `${pct}%`;
      divider.style.left = `${pct}%`;
      afterImage.style.clipPath = `polygon(${pct}% 0, 100% 0, 100% 100%, ${pct}% 100%)`;
    }

    sliderContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSlider(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateSlider(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    sliderContainer.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches[0]) updateSlider(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || !e.touches[0]) return;
      updateSlider(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Tab switching
    document.querySelectorAll('.ba-case-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const cKey = tab.dataset.case;
        if (!SLIDER_CASES[cKey]) return;
        currentCase = cKey;

        document.querySelectorAll('.ba-case-tab').forEach(t => t.classList.toggle('active', t === tab));
        const data = SLIDER_CASES[cKey];

        if (beforeImgEl) beforeImgEl.src = data.beforeImg;
        if (afterImgEl) afterImgEl.src = data.afterImg;

        const bDesc = document.getElementById('ba-before-desc');
        const aDesc = document.getElementById('ba-after-desc');
        const patEl = document.getElementById('ba-patient');
        const procEl = document.getElementById('ba-procedure');
        const specEl = document.getElementById('ba-specialist');
        const durEl = document.getElementById('ba-duration');
        const longEl = document.getElementById('ba-longevity');

        if (bDesc) bDesc.textContent = `← ${data.beforeLabel}`;
        if (aDesc) aDesc.textContent = `${data.afterLabel} →`;
        if (patEl) patEl.textContent = data.patient;
        if (procEl) procEl.textContent = data.procedure;
        if (specEl) specEl.textContent = data.specialist;
        if (durEl) durEl.textContent = data.duration;
        if (longEl) longEl.textContent = data.longevity;

        // Reset handle to center
        handle.style.left = '50%';
        divider.style.left = '50%';
        afterImage.style.clipPath = 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)';
      });
    });
  }

  // --- 2. SMART DENTAL COST & 0% EMI CALCULATOR ---
  const PROCEDURES_COST = {
    implant: { name: 'Titanium Implant + Crown', basePrice: 34000, perTooth: true, defaultQty: 1 },
    veneer: { name: 'Porcelain Veneer Makeover', basePrice: 16500, perTooth: true, defaultQty: 4 },
    rct: { name: 'Biomimetic Root Canal + Cap', basePrice: 12500, perTooth: true, defaultQty: 1 },
    aligner: { name: 'Invisalign Clear Aligners', basePrice: 72000, perTooth: false, defaultQty: 1 },
    whitening: { name: 'In-Office Zoom Laser Whitening', basePrice: 11000, perTooth: false, defaultQty: 1 }
  };

  const TIERS_MULTIPLIER = {
    standard: { label: 'Standard Clinical Ceramic', mult: 1.0 },
    zirconia: { label: 'Swiss Translucent Zirconia Pro', mult: 1.25 },
    artisan: { label: 'Hand-Layered Master E.max', mult: 1.45 }
  };

  let calcState = {
    procKey: 'implant',
    qty: 1,
    tier: 'zirconia',
    months: 6
  };

  function initCostCalculator() {
    const calcSection = document.getElementById('calculator');
    if (!calcSection) return;

    function recalculate() {
      const proc = PROCEDURES_COST[calcState.procKey] || PROCEDURES_COST.implant;
      const tierObj = TIERS_MULTIPLIER[calcState.tier] || TIERS_MULTIPLIER.standard;

      const qty = proc.perTooth ? calcState.qty : 1;
      const unitPrice = Math.round(proc.basePrice * tierObj.mult);
      const totalPrice = unitPrice * qty;
      const emi = Math.round(totalPrice / calcState.months);

      // Update UI elements
      const totalAmountEl = document.getElementById('calc-total-amount');
      const emiAmountEl = document.getElementById('calc-emi-amount');
      const emiMonthsEl = document.getElementById('calc-emi-months');
      const unitPriceEl = document.getElementById('calc-unit-price');
      const qtyBadgeEl = document.getElementById('calc-qty-badge');
      const qtySliderEl = document.getElementById('calc-qty-slider');
      const sliderWrapEl = document.getElementById('calc-slider-wrap');

      if (totalAmountEl) totalAmountEl.textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
      if (emiAmountEl) emiAmountEl.textContent = `₹${emi.toLocaleString('en-IN')}`;
      if (emiMonthsEl) emiMonthsEl.textContent = `${calcState.months} Months`;
      if (unitPriceEl) unitPriceEl.textContent = `₹${unitPrice.toLocaleString('en-IN')} / tooth`;
      if (qtyBadgeEl) qtyBadgeEl.textContent = `${qty} ${qty > 1 ? 'Teeth' : 'Tooth'}`;
      if (qtySliderEl) qtySliderEl.value = qty;

      if (sliderWrapEl) {
        sliderWrapEl.style.display = proc.perTooth ? 'block' : 'none';
      }
    }

    // Procedure selection
    document.querySelectorAll('.calc-proc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        calcState.procKey = btn.dataset.proc;
        const proc = PROCEDURES_COST[calcState.procKey];
        if (proc) calcState.qty = proc.defaultQty;
        document.querySelectorAll('.calc-proc-btn').forEach(b => b.classList.toggle('active', b === btn));
        recalculate();
      });
    });

    // Quantity slider
    const qtySlider = document.getElementById('calc-qty-slider');
    if (qtySlider) {
      qtySlider.addEventListener('input', (e) => {
        calcState.qty = parseInt(e.target.value, 10) || 1;
        recalculate();
      });
    }

    // Tier buttons
    document.querySelectorAll('.calc-tier-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        calcState.tier = btn.dataset.tier;
        document.querySelectorAll('.calc-tier-btn').forEach(b => b.classList.toggle('active', b === btn));
        recalculate();
      });
    });

    // EMI month pills
    document.querySelectorAll('.calc-emi-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        calcState.months = parseInt(pill.dataset.months, 10) || 6;
        document.querySelectorAll('.calc-emi-pill').forEach(p => p.classList.toggle('active', p === pill));
        recalculate();
      });
    });

    recalculate();
  }

  window.bookWithEstimate = function() {
    const proc = PROCEDURES_COST[calcState.procKey];
    if (!proc) return;
    const notesInput = document.getElementById('bk-notes');
    if (notesInput) {
      notesInput.value = `Estimated Plan: ${proc.name} (${calcState.qty} teeth · ${TIERS_MULTIPLIER[calcState.tier].label}) · 0% EMI: ${calcState.months} Mo`;
    }
    const bookSec = document.getElementById('book');
    if (bookSec) bookSec.scrollIntoView({ behavior: 'smooth' });
  };

  // --- 3. SMART DENTAL SYMPTOM CHECKER ---
  const SYMPTOM_DATA = {
    steps: {
      area: [
        { id: 'toothache', icon: '🦷', name: 'Sharp Toothache', desc: 'Throbbing, pulsing or sharp pain in a specific tooth' },
        { id: 'gums', icon: '🩸', name: 'Bleeding / Swollen Gums', desc: 'Bleeding during brushing, red swollen margins, tenderness' },
        { id: 'chipped', icon: '💔', name: 'Chipped or Broken Tooth', desc: 'Trauma, sports impact, or fracture while chewing' },
        { id: 'missing', icon: '🕳️', name: 'Missing Tooth Gap', desc: 'Extracted tooth or congenital gap needing replacement' },
        { id: 'sensitive', icon: '❄️', name: 'Hot / Cold Sensitivity', desc: 'Short sharp wincing shock to cold ice or hot beverages' },
        { id: 'cosmetic', icon: '✨', name: 'Discolored / Crooked', desc: 'Aesthetic smile improvement, staining, or bite alignment' }
      ],
      trigger: [
        { id: 'cold_sweet', name: 'Cold or Sweet Foods', desc: 'Zing sensation when drinking cold water or eating sugar' },
        { id: 'night_throb', name: 'Spontaneous Night Throbbing', desc: 'Constant deep ache that radiates and keeps you awake' },
        { id: 'chewing', name: 'Chewing & Biting Pressure', desc: 'Sharp pain whenever food pressure hits the tooth' },
        { id: 'swelling', name: 'Visible Facial / Gum Swelling', desc: 'Puffiness, tender lump or bad taste around gum margin' },
        { id: 'none_visual', name: 'No Physical Pain (Aesthetic)', desc: 'Purely visual concern with tooth shape, color, or gaps' }
      ],
      duration: [
        { id: 'today', name: 'Started Today', desc: 'Acute onset within the past 12–24 hours' },
        { id: 'days', name: '2 to 5 Days', desc: 'Persistent discomfort for several days' },
        { id: 'weeks', name: 'More than 2 Weeks', desc: 'Chronic lingering condition or long-standing issue' }
      ]
    },
    diagnoses: {
      'toothache_night_throb': {
        title: 'Acute Irreversible Pulpitis',
        urgency: 'red',
        urgencyText: '🔴 Urgent Care Required (Within 24 Hours)',
        desc: 'Deep bacterial invasion has penetrated the pulp chamber, causing elevated intrapulpal pressure and nerve inflammation. Prompt vital therapy or rotary endodontics is needed to stop the pain.',
        procedure: 'Biomimetic Rotary Endodontics (Painless Root Canal) + Ceramic Crown',
        doctor: { name: 'Dr. Marcus Thorne', spec: 'Endodontics & Micro-Restorative', img: 'assets/images/avatar-doctor-marcus.webp' }
      },
      'toothache_chewing': {
        title: 'Cracked Tooth Syndrome / Apical Periodontitis',
        urgency: 'yellow',
        urgencyText: '🟡 Prompt Evaluation Recommended (Within 48h)',
        desc: 'Micro-fracture plane extending through the enamel into the dentin, causing discomfort on release of chewing pressure. Cuspal protection is needed before the tooth splits.',
        procedure: 'Full Cuspal Protection Onlay or CAD/CAM Zirconia Crown',
        doctor: { name: 'Dr. Kai Mercer', spec: 'CEREC CAD/CAM & Biomimetic Restorations', img: 'assets/images/avatar-doctor-kai.webp' }
      },
      'sensitive_cold_sweet': {
        title: 'Dentin Hypersensitivity / Incipient Enamel Caries',
        urgency: 'green',
        urgencyText: '🟢 Routine Clinical Consultation',
        desc: 'Exposed microscopic dentinal tubules or early pit-and-fissure enamel demineralization. Highly reversible with biomimetic sealing.',
        procedure: 'Micro-Invasive Composite Bonding & Desensitizing Prophylaxis',
        doctor: { name: 'Dr. Marcus Thorne', spec: 'Biomimetic Restorative', img: 'assets/images/avatar-doctor-marcus.webp' }
      },
      'gums': {
        title: 'Marginal Gingivitis / Periodontal Pocketing',
        urgency: 'yellow',
        urgencyText: '🟡 Prompt Evaluation Recommended (Within 3–5 Days)',
        desc: 'Subgingival bacterial biofilm producing localized inflammation. Reversible with ultrasonic hygiene prophylaxis and laser gingival therapy.',
        procedure: 'Ultrasonic Bio-Debridement & Antimicrobial Therapy',
        doctor: { name: 'Dr. Aria Renault', spec: 'Preventative & Periodontal Health', img: 'assets/images/avatar-doctor-aria.webp' }
      },
      'missing': {
        title: 'Single or Multi-Tooth Edentulism',
        urgency: 'green',
        urgencyText: '🟢 Planned Restorative Consultation',
        desc: 'Tooth loss causes adjacent teeth to drift and alveolar bone resorption over time. Guided titanium implant restores 100% natural mastication.',
        procedure: 'Guided Titanium Implant + Custom Zirconia Abutment & Crown',
        doctor: { name: 'Dr. Elena Voss', spec: 'Implant & Oral Reconstructive Surgery', img: 'assets/images/avatar-doctor-elena.webp' }
      },
      'cosmetic': {
        title: 'Aesthetic Smile Dysmorphology / Dental Misalignment',
        urgency: 'green',
        urgencyText: '🟢 Aesthetic Smile Design Consultation',
        desc: 'Teeth staining, mild crowding, or incisal edge asymmetry. Full digital 3D smile design preview available in 1 visit.',
        procedure: 'Digital Smile Design · Hand-Layered Veneers or Invisalign Aligners',
        doctor: { name: 'Dr. Sofia Chen', spec: 'Orthodontics & Aesthetic Smile Architecture', img: 'assets/images/avatar-doctor-sofia.webp' }
      },
      'chipped': {
        title: 'Enamel-Dentin Incisal Crown Fracture',
        urgency: 'yellow',
        urgencyText: '🟡 Prompt Restorative Care (Within 48h)',
        desc: 'Incisal chipping exposing porous dentin. Smooth composite layering or ceramic fragment bonding fully restores aesthetic contour.',
        procedure: 'Micro-Layered Biomimetic Composite or Ceramic Fragment Bond',
        doctor: { name: 'Dr. Rohan Mehta', spec: 'Pediatric & Minimally Invasive Care', img: 'assets/images/avatar-doctor-rohan.webp' }
      }
    }
  };

  let sympState = {
    area: 'toothache',
    trigger: 'cold_sweet',
    duration: 'days'
  };

  function initSymptomChecker() {
    const sympRoot = document.getElementById('symptom-checker');
    if (!sympRoot) return;

    function renderDiagnostic() {
      // Find diagnosis
      let dKey = `${sympState.area}_${sympState.trigger}`;
      let diag = SYMPTOM_DATA.diagnoses[dKey];
      if (!diag) {
        diag = SYMPTOM_DATA.diagnoses[sympState.area] || SYMPTOM_DATA.diagnoses.sensitive_cold_sweet;
      }

      const urgencyEl = document.getElementById('symp-urgency-badge');
      const titleEl = document.getElementById('symp-diagnosis-title');
      const descEl = document.getElementById('symp-diagnosis-desc');
      const procEl = document.getElementById('symp-diagnosis-proc');
      const docImgEl = document.getElementById('symp-doc-img');
      const docNameEl = document.getElementById('symp-doc-name');
      const docSpecEl = document.getElementById('symp-doc-spec');

      if (urgencyEl) {
        urgencyEl.className = `symp-urgency ${diag.urgency}`;
        urgencyEl.textContent = diag.urgencyText;
      }
      if (titleEl) titleEl.textContent = diag.title;
      if (descEl) descEl.textContent = diag.desc;
      if (procEl) procEl.textContent = diag.procedure;
      if (docImgEl) docImgEl.src = diag.doctor.img;
      if (docNameEl) docNameEl.textContent = diag.doctor.name;
      if (docSpecEl) docSpecEl.textContent = diag.doctor.spec;
    }

    // Step 1: Area
    document.querySelectorAll('.symp-area-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sympState.area = btn.dataset.id;
        document.querySelectorAll('.symp-area-btn').forEach(b => b.classList.toggle('active', b === btn));
        renderDiagnostic();
      });
    });

    // Step 2: Trigger
    document.querySelectorAll('.symp-trigger-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sympState.trigger = btn.dataset.id;
        document.querySelectorAll('.symp-trigger-btn').forEach(b => b.classList.toggle('active', b === btn));
        renderDiagnostic();
      });
    });

    // Step 3: Duration
    document.querySelectorAll('.symp-duration-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sympState.duration = btn.dataset.id;
        document.querySelectorAll('.symp-duration-btn').forEach(b => b.classList.toggle('active', b === btn));
        renderDiagnostic();
      });
    });

    renderDiagnostic();
  }

  window.preselectBooking = function (txName) {
    const card = document.querySelector(`.bk-tx-card[data-treatment*="${txName.split(' ')[1] || txName.split(' ')[0]}"]`);
    if (card) card.click();
  };

  // --- 3. AMBIENT CURSOR GLOW FOR CARDS ---
  function initCardCursorGlow() {
    const cards = document.querySelectorAll('.gallery-card, .tech-card, .team-card, .jw-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  // --- 4. FIRST SIP INSPIRED CUSTOM CURSOR & SPRING FOLLOWER (Disabled per user request)
  function initCustomCursor() {
    // Custom cursor removed to prevent floating circle overlapping text
    const oldC = document.querySelector('.cursor');
    if (oldC) oldC.remove();
    const oldD = document.querySelector('.cursor-dot');
    if (oldD) oldD.remove();
  }

  // --- 5. MAGNETIC BUTTONS (First Sip Inspiration) ---
  function initMagneticButtons() {
    if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) return;

    const magnets = document.querySelectorAll('.th-cta, .bk-btn, .sc-cta-btn, .th-drawer-trigger, #ivory-chat-trigger');
    magnets.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = (e.clientX - centerX) * 0.28;
        const dy = (e.clientY - centerY) * 0.28;
        btn.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate3d(0, 0, 0)';
        btn.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      });
      btn.addEventListener('mouseenter', () => {
        btn.style.transition = 'none';
      });
    });
  }

  // --- 6. 3D TILT EFFECT ON CARDS ---
  function initTiltCards() {
    if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) return;

    const tiltCards = document.querySelectorAll('.gallery-card, .tech-card, .sc-card, .bk-wizard');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * -4.5;
        const rotY = ((x - cx) / cx) * 4.5;

        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      });
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
      });
    });
  }


  // ============================================================
  // 21st.dev ULTRA-PREMIUM 3D TOOTH INSPECTOR (HOTSPOTS + TILT + X-RAY)
  // ============================================================
  function init21stToothInspector() {
    const stage = document.querySelector('.tooth-stage-3d');
    const model = document.querySelector('.tooth-model-wrapper');
    const xrayWrap = document.getElementById('xray-overlay-wrap');
    const xraySlider = document.getElementById('xray-range-input');

    if (stage && model) {
      // 1. Perspective 3D Tilt on Mouse Move
      stage.addEventListener('mousemove', (e) => {
        const rect = stage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotY = ((x - cx) / cx) * 14;
        const rotX = -((y - cy) / cy) * 12;

        model.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      stage.addEventListener('mouseleave', () => {
        model.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        model.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      });

      stage.addEventListener('mouseenter', () => {
        model.style.transition = 'none';
      });
    }

    // 2. Strata X-Ray Slider
    if (xraySlider && xrayWrap) {
      xraySlider.addEventListener('input', (e) => {
        const val = e.target.value;
        xrayWrap.style.width = `${val}%`;
      });
    }

    // 3. Hotspot beacons click / hover
    const beacons = document.querySelectorAll('.hotspot-beacon');
    beacons.forEach(b => {
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        beacons.forEach(other => other.classList.remove('active'));
        b.classList.add('active');
        const struct = b.dataset.struct;
        if (window.DentalVision3D && typeof window.DentalVision3D.selectStructure === 'function') {
          window.DentalVision3D.selectStructure(struct);
        }
      });
    });
  }

  window.set21stToothMode = function(mode) {
    const viewImg = document.getElementById('bento-tooth-img');
    const xrayContainer = document.getElementById('bento-xray-container');
    const singleContainer = document.getElementById('bento-single-container');
    const title = document.getElementById('dv3d-cond-title');
    const badge = document.getElementById('dv3d-cond-badge');
    const desc = document.getElementById('dv3d-cond-desc');
    const clin = document.getElementById('dv3d-cond-clin');

    document.querySelectorAll('.anatomy-pill-nav button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    if (mode === 'real') {
      if (xrayContainer) xrayContainer.style.display = 'none';
      if (singleContainer) singleContainer.style.display = 'flex';
      if (viewImg) {
        viewImg.src = 'assets/images/real-tooth-molar-hd.webp';
        viewImg.alt = 'Natural Biological Human Molar';
      }
      if (title) title.textContent = 'Natural Biological Molar & Enamel';
      if (badge) badge.textContent = '● PHYSIOLOGICAL NORMAL';
      if (desc) desc.textContent = 'Pristine natural human molar with authentic occlusal fissures, wear-resistant 96% hydroxyapatite enamel, and healthy bifurcated root anchors.';
      if (clin) clin.textContent = 'Twice-yearly preventative polish and sub-mm 3D CBCT monitoring recommended.';
      if (window.DentalVision3D && typeof window.DentalVision3D.setHeroMode === 'function') {
        window.DentalVision3D.setHeroMode('real');
      }
    } else if (mode === 'cutaway') {
      if (xrayContainer) xrayContainer.style.display = 'none';
      if (singleContainer) singleContainer.style.display = 'flex';
      if (viewImg) {
        viewImg.src = 'assets/images/real-tooth-cutaway.webp';
        viewImg.alt = 'Biological Strata Cutaway with Neurovascular Core';
      }
      if (title) title.textContent = 'Biological Strata · Neurovascular Pulp';
      if (badge) badge.textContent = '● VITAL INTERNAL STRATA';
      if (desc) desc.textContent = 'Internal biological cross-section: enamel shell, shock-absorbing dentinal tubule matrix, and vital neurovascular pulp chamber branching into radicular root canals.';
      if (clin) clin.textContent = 'Vitality cold/electric pulp testing verified 100% responsive. Zero inflammatory hyperemia.';
      if (window.DentalVision3D && typeof window.DentalVision3D.setHeroMode === 'function') {
        window.DentalVision3D.setHeroMode('cutaway');
      }
    } else if (mode === 'kintsugi') {
      if (xrayContainer) xrayContainer.style.display = 'none';
      if (singleContainer) singleContainer.style.display = 'flex';
      if (viewImg) {
        viewImg.src = 'assets/images/real-tooth-kintsugi.webp';
        viewImg.alt = 'Kintsugi 24K Biomimetic Ceramic Restoration';
      }
      if (title) title.textContent = 'Kintsugi 24K Biomimetic Restoration';
      if (badge) badge.textContent = '✨ AESTHETIC MASTERPIECE';
      if (desc) desc.textContent = 'Artful biomimetic restoration honoring biological structure with radiant 24k gold ceramic fissure bonding. Extreme fracture toughness matching natural dentin.';
      if (clin) clin.textContent = 'Permanent biomimetic bonding certificate with 10-year clinical assurance.';
      if (window.DentalVision3D && typeof window.DentalVision3D.setHeroMode === 'function') {
        window.DentalVision3D.setHeroMode('kintsugi');
      }
    } else if (mode === 'xray') {
      if (singleContainer) singleContainer.style.display = 'none';
      if (xrayContainer) xrayContainer.style.display = 'block';
      if (title) title.textContent = 'Interactive Strata X-Ray Reveal';
      if (badge) badge.textContent = '🔬 DUAL-LAYER SCANNER';
      if (desc) desc.textContent = 'Drag the slider horizontally to peel back the mineralized enamel shell and peer directly into the living neurovascular pulp chamber.';
      if (clin) clin.textContent = 'Sub-millimeter non-ionizing optical coherence tomography (OCT) mode.';
    }
  };

  // Auto initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initBeforeAfterSlider();
      initCostCalculator();
      initSymptomChecker();
      initCardCursorGlow();
      initCustomCursor();
      initMagneticButtons();
      initTiltCards();
      init21stToothInspector();
    });
  } else {
    initBeforeAfterSlider();
    initCostCalculator();
    initSymptomChecker();
    initCardCursorGlow();
    initCustomCursor();
    initMagneticButtons();
    initTiltCards();
      init21stToothInspector();
  }
})();
