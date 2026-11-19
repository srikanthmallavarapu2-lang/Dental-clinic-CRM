/**
 * IVORY Dental — Intelligent Patient Consultation Chatbot (AI Dental Concierge)
 * Natural Language Symptom Analysis, Patient-Friendly Guidance & Smart Doctor Recommendation
 */

(function () {
  'use strict';

  // --- KNOWLEDGE BASE: SYMPTOMS, CONDITIONS, TREATMENTS & SPECIALIST MATCHING ---
  const CLINICAL_DIAGNOSTICS = [
    {
      id: 'pain_endo',
      keywords: ['pain', 'ache', 'hurts', 'throbbing', 'nerve', 'sensitive', 'cold', 'hot', 'swelling', 'night', 'infection', 'abscess', 'pulp'],
      condition: 'Pulpitis or Deep Nerve Sensitivity',
      patientSummary: 'Throbbing pain or intense sensitivity to hot and cold typically indicates inflammation of the inner pulp nerve. When treated early with modern micro-endodontics, the procedure is completely painless, preserves your natural tooth, and brings immediate relief.',
      treatment: 'Microscopic Endodontic Therapy (Root Canal)',
      treatmentDuration: 'Single Visit · 60 mins',
      painScore: '0/10 (Local Computer-Aided Anesthesia)',
      doctor: {
        name: 'Dr. Kai Mercer',
        role: 'Microscopic Endodontic Specialist',
        exp: '15 Years Experience · 4,200+ Preserved Teeth',
        thumb: 'assets/images/doctor-kai-thumb.webp',
        quote: 'Using 25x surgical magnification, we locate and hermetically seal micro-canals with zero discomfort, saving teeth that others would extract.',
        concernId: 'pain'
      },
      viewerCondition: 'rootCanal',
      urgency: 'Priority (Within 24 Hours)'
    },
    {
      id: 'missing_implant',
      keywords: ['missing', 'lost', 'gap', 'implant', 'extracted', 'broken off', 'chew', 'denture', 'bridge', 'socket', 'fail'],
      condition: 'Missing or Non-Restorable Tooth',
      patientSummary: 'A gap in your bite can cause adjacent teeth to drift and alveolar bone to diminish over time. Modern 3D computer-guided implants look, feel, and function exactly like your biological teeth, with a lifetime durability record.',
      treatment: '3D CBCT Guided Titanium Dental Implant',
      treatmentDuration: 'Same-Day Temporary · Permanent Osseointegration',
      painScore: '0/10 (Micro-Surgical Technique)',
      doctor: {
        name: 'Dr. Elena Voss',
        role: 'Head of Implantology & Oral Surgery',
        exp: '14 Years Experience · Fellow ICOI',
        thumb: 'assets/images/doctor-elena-thumb.webp',
        quote: 'With sub-millimeter 3D surgical guides, implant placement takes under 20 minutes with minimal swelling and immediate natural function.',
        concernId: 'implants'
      },
      viewerCondition: 'implant',
      urgency: 'Recommended within 2–4 Weeks'
    },
    {
      id: 'aesthetic_veneers',
      keywords: ['stain', 'yellow', 'discolor', 'chip', 'broken', 'smile', 'veneer', 'bonding', 'white', 'whitening', 'gap front', 'uneven', 'worn'],
      condition: 'Aesthetic Enamel Imperfection or Discoloration',
      patientSummary: 'Enamel micro-fractures, natural wear, or deep intrinsic discoloration can be beautifully restored using ultra-thin handcrafted porcelain veneers or cold laser whitening, creating a radiant, naturally harmonious smile.',
      treatment: 'Custom Handcrafted Porcelain Veneers & Cold Laser Whitening',
      treatmentDuration: '2 Visits · 3–5 Days Total',
      painScore: '0/10 (Conservative Minimal Prep)',
      doctor: {
        name: 'Dr. Marcus Thorne',
        role: 'Master Aesthetic Ceramist & Cosmetic Architect',
        exp: '16 Years Experience · Master Ceramist',
        thumb: 'assets/images/doctor-marcus-thumb.webp',
        quote: 'We hand-layer feldspathic porcelain with natural enamel translucency. Your smile looks effortlessly pristine, never artificial or bulky.',
        concernId: 'veneers'
      },
      viewerCondition: 'crown',
      urgency: 'Elective / Lifestyle Planning'
    },
    {
      id: 'ortho_aligners',
      keywords: ['crooked', 'crowded', 'overlap', 'spacing', 'gap', 'invisalign', 'aligner', 'braces', 'bite', 'underbite', 'overbite', 'straight'],
      condition: 'Dental Malalignment & Occlusal Spacing',
      patientSummary: 'Teeth crowding or gaps can be smoothly corrected without uncomfortable metal wires or brackets. Clear medical-grade aligners apply gentle, continuous micro-forces guided by 3D AI smile simulations.',
      treatment: 'Invisalign & AI Digital Clear Aligners',
      treatmentDuration: '4–9 Months Average',
      painScore: '0/10 (Gentle Controlled Movement)',
      doctor: {
        name: 'Dr. Sofia Chen',
        role: 'Head of Orthodontics & Clear Aligners',
        exp: '12 Years Experience · Diamond Invisalign Provider',
        thumb: 'assets/images/doctor-sofia-thumb.webp',
        quote: 'We plan every 0.1 mm of tooth movement digitally so you see your completed, straight smile on screen before you ever wear your first tray.',
        concernId: 'ortho'
      },
      viewerCondition: 'healthy',
      urgency: 'Consultation Recommended'
    },
    {
      id: 'perio_gums',
      keywords: ['gums', 'bleeding', 'recession', 'loose', 'bad breath', 'tartar', 'plaque', 'perio', 'halitosis', 'red', 'tender'],
      condition: 'Periodontal Inflammation & Gingival Recession',
      patientSummary: 'Bleeding while brushing or receding gum tissue is an early sign of bacterial biofilm beneath the gumline. Ultrasonic air-polishing and gentle laser therapy restore pink, healthy tissue and protect your jawbone foundation.',
      treatment: 'Biological Laser Periodontics & Ultrasonic Hygiene',
      treatmentDuration: '45 mins',
      painScore: '0/10 (Topical Comfort Gel)',
      doctor: {
        name: 'Dr. Aria Renault',
        role: 'Biological Periodontics & Soft Tissue Regeneration',
        exp: '13 Years Experience · Specialist in Tissue Biology',
        thumb: 'assets/images/doctor-aria-thumb.webp',
        quote: 'Healthy pink gums are the biological cornerstone of every lasting smile. Our gentle laser protocols regenerate tissue without invasive cutting.',
        concernId: 'gums'
      },
      viewerCondition: 'healthy',
      urgency: 'Recommended within 1–2 Weeks'
    },
    {
      id: 'general_checkup',
      keywords: ['checkup', 'clean', 'scan', 'hygiene', 'routine', 'consult', 'exam', 'prevent', 'xray'],
      condition: 'Comprehensive Preventative Examination',
      patientSummary: 'A thorough full-mouth wellness evaluation featuring low-radiation 3D CBCT digital imaging, AI caries detection, and gentle ultrasonic air-flow hygiene to ensure complete oral health.',
      treatment: 'Comprehensive 3D Digital Exam & Biomimetic Hygiene',
      treatmentDuration: '45 mins',
      painScore: '0/10 (Spa-Like Gentle Clean)',
      doctor: {
        name: 'Senior Clinical Hygiene Team',
        role: 'Preventative Oral Health Specialists',
        exp: 'Full Digital 3D Diagnostic Suite',
        thumb: 'assets/images/tech-scanner.webp',
        quote: 'Preventative care done with spa-level gentleness keeps your biological teeth pristine for a lifetime.',
        concernId: 'checkup'
      },
      viewerCondition: 'healthy',
      urgency: 'Flexible Scheduling'
    }
  ];

  // Quick symptom prompt chips
  const QUICK_PROMPTS = [
    { label: '⚡ Severe toothache / pain', query: 'I have severe tooth pain and throbbing sensitive to cold' },
    { label: '🦷 Missing tooth / gap', query: 'I have a missing tooth and want an implant' },
    { label: '✨ Chipped or discolored', query: 'My front tooth is chipped and discolored want veneers' },
    { label: '📐 Crooked teeth / aligners', query: 'I want to straighten my crowded teeth with clear aligners' },
    { label: '🌿 Bleeding gums / loose', query: 'My gums are bleeding and receded' },
    { label: '🛡️ Checkup & 3D scan', query: 'I want a comprehensive checkup and 3D digital scan' }
  ];

  let isOpen = false;
  let chatHistory = [];

  function initChatbot() {
    createChatbotMarkup();
    bindChatEvents();
    renderInitialMessage();
  }

  function createChatbotMarkup() {
    // Floating Trigger Button
    const triggerBtn = document.createElement('div');
    triggerBtn.id = 'ivory-chat-trigger';
    triggerBtn.className = 'ivory-chat-trigger';
    triggerBtn.innerHTML = `
      <div class="chat-trigger-bubble">
        <span class="chat-pulse-dot"></span>
        <svg class="chat-icon-svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span class="chat-trigger-label">Ask IVORY AI</span>
      </div>
    `;
    document.body.appendChild(triggerBtn);

    // Chatbot Modal Window
    const chatModal = document.createElement('div');
    chatModal.id = 'ivory-chat-modal';
    chatModal.className = 'ivory-chat-modal';
    chatModal.innerHTML = `
      <div class="chat-card-glass">
        <!-- Header -->
        <div class="chat-header">
          <div class="chat-header-left">
            <div class="chat-avatar-ring">
              <img src="assets/images/doctor-aria-thumb.webp" alt="AI Concierge" class="chat-avatar-img">
              <span class="chat-status-indicator"></span>
            </div>
            <div class="chat-header-info">
              <div class="chat-header-title">Dr. Ava · IVORY AI</div>
              <div class="chat-header-sub">Clinical Concierge &amp; Specialist Matcher</div>
            </div>
          </div>
          <div class="chat-header-actions">
            <button type="button" class="chat-close-btn" id="ivory-chat-close" title="Minimize Chat">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- Chat Conversation Stream -->
        <div class="chat-stream" id="ivory-chat-stream">
          <!-- Messages will be rendered here -->
        </div>

        <!-- Quick Prompts Chips -->
        <div class="chat-quick-chips" id="ivory-chat-chips">
          ${QUICK_PROMPTS.map(p => `
            <button type="button" class="chat-chip-btn" data-query="${p.query}">${p.label}</button>
          `).join('')}
        </div>

        <!-- Input Bar -->
        <form class="chat-input-bar" id="ivory-chat-form">
          <input type="text" id="ivory-chat-input" class="chat-input" placeholder="Describe your symptom or dental goal..." autocomplete="off">
          <button type="submit" class="chat-send-btn" id="ivory-chat-send" title="Send Consultation Request">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    `;
    document.body.appendChild(chatModal);
  }

  function bindChatEvents() {
    const trigger = document.getElementById('ivory-chat-trigger');
    const closeBtn = document.getElementById('ivory-chat-close');
    const modal = document.getElementById('ivory-chat-modal');
    const form = document.getElementById('ivory-chat-form');
    const input = document.getElementById('ivory-chat-input');
    const chipsContainer = document.getElementById('ivory-chat-chips');

    if (trigger) {
      trigger.addEventListener('click', toggleChat);
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', toggleChat);
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;
        input.value = '';
        handlePatientMessage(text);
      });
    }

    if (chipsContainer) {
      chipsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.chat-chip-btn');
        if (!btn) return;
        const query = btn.dataset.query;
        handlePatientMessage(query);
      });
    }
  }

  function toggleChat() {
    const modal = document.getElementById('ivory-chat-modal');
    const trigger = document.getElementById('ivory-chat-trigger');
    if (!modal) return;

    isOpen = !isOpen;
    if (isOpen) {
      modal.classList.add('is-open');
      if (trigger) trigger.classList.add('is-hidden');
      setTimeout(() => {
        const input = document.getElementById('ivory-chat-input');
        if (input) input.focus();
        scrollChatToBottom();
      }, 300);
    } else {
      modal.classList.remove('is-open');
      if (trigger) trigger.classList.remove('is-hidden');
    }
  }

  function renderInitialMessage() {
    const stream = document.getElementById('ivory-chat-stream');
    if (!stream) return;

    const welcomeHtml = `
      <div class="chat-msg chat-msg-bot">
        <div class="chat-bubble">
          <p><strong>Hello and welcome to IVORY.</strong></p>
          <p>I am Dr. Ava, your AI Clinical Concierge. Tell me what symptom you are experiencing or what you would love to improve about your smile.</p>
          <p class="chat-hint-sub">Tap a symptom below or describe your concern in plain words:</p>
        </div>
        <span class="chat-time">Just now · Clinical AI</span>
      </div>
    `;
    stream.innerHTML = welcomeHtml;
  }

  function handlePatientMessage(userText) {
    appendUserMessage(userText);

    // Show typing indicator
    const stream = document.getElementById('ivory-chat-stream');
    const typingId = 'typing-' + Date.now();
    const typingEl = document.createElement('div');
    typingEl.id = typingId;
    typingEl.className = 'chat-msg chat-msg-bot chat-typing-wrapper';
    typingEl.innerHTML = `
      <div class="chat-bubble chat-typing-bubble">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    stream.appendChild(typingEl);
    scrollChatToBottom();

    // Analyze symptom & match doctor
    setTimeout(() => {
      const match = diagnoseSymptom(userText);
      const typing = document.getElementById(typingId);
      if (typing) typing.remove();
      renderDiagnosticCard(match);
    }, 700);
  }

  function appendUserMessage(text) {
    const stream = document.getElementById('ivory-chat-stream');
    if (!stream) return;

    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg chat-msg-user';
    userMsg.innerHTML = `
      <div class="chat-bubble user-bubble">${escapeHtml(text)}</div>
      <span class="chat-time">Patient</span>
    `;
    stream.appendChild(userMsg);
    scrollChatToBottom();
  }

  function diagnoseSymptom(query) {
    const lower = query.toLowerCase();
    let bestMatch = CLINICAL_DIAGNOSTICS[0];
    let highestScore = 0;

    CLINICAL_DIAGNOSTICS.forEach(item => {
      let score = 0;
      item.keywords.forEach(kw => {
        if (lower.includes(kw)) score += 2;
      });
      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    });

    return bestMatch;
  }

  function renderDiagnosticCard(diag) {
    const stream = document.getElementById('ivory-chat-stream');
    if (!stream) return;

    const botMsg = document.createElement('div');
    botMsg.className = 'chat-msg chat-msg-bot';
    botMsg.innerHTML = `
      <div class="chat-bubble diag-card">
        <div class="diag-badge-row">
          <span class="diag-badge-pill">Clinical Assessment</span>
          <span class="diag-urgency-pill">${diag.urgency}</span>
        </div>

        <h4 class="diag-condition-title">${diag.condition}</h4>
        <p class="diag-summary-text">${diag.patientSummary}</p>

        <!-- Recommended Treatment Box -->
        <div class="diag-treatment-box">
          <div class="diag-box-label">Recommended Clinical Protocol:</div>
          <div class="diag-treatment-title">${diag.treatment}</div>
          <div class="diag-meta-grid">
            <div><span>Duration:</span> <strong>${diag.treatmentDuration}</strong></div>
            <div><span>Discomfort:</span> <strong>${diag.painScore}</strong></div>
          </div>
        </div>

        <!-- Matched Specialist Doctor Card -->
        <div class="diag-doctor-card">
          <img src="${diag.doctor.thumb}" alt="${diag.doctor.name}" class="diag-doc-avatar">
          <div class="diag-doc-info">
            <div class="diag-doc-role">Matched Specialist</div>
            <div class="diag-doc-name">${diag.doctor.name}</div>
            <div class="diag-doc-exp">${diag.doctor.role} · ${diag.doctor.exp}</div>
          </div>
        </div>
        <p class="diag-doc-quote">“${diag.doctor.quote}”</p>

        <!-- Direct Action Buttons -->
        <div class="diag-actions">
          <button type="button" class="diag-act-btn primary" onclick="IVORYChat.bookWithDoctor('${diag.doctor.concernId}', '${diag.doctor.name}')">
            📅 Book with ${diag.doctor.name}
          </button>
          <button type="button" class="diag-act-btn secondary" onclick="IVORYChat.inspect3D('${diag.viewerCondition}')">
            🔬 Inspect in 3D Anatomy Viewer
          </button>
          <a href="https://wa.me/491234567890?text=${encodeURIComponent('Hello IVORY, Dr. Ava suggested ' + diag.treatment + ' with ' + diag.doctor.name + '. I would like to schedule a private consultation.')}" target="_blank" rel="noopener" class="diag-act-btn wa">
            💬 WhatsApp Direct Consult
          </a>
        </div>
      </div>
      <span class="chat-time">Clinical AI Match · Verified by IVORY</span>
    `;
    stream.appendChild(botMsg);
    scrollChatToBottom();
  }

  function scrollChatToBottom() {
    const stream = document.getElementById('ivory-chat-stream');
    if (stream) {
      stream.scrollTop = stream.scrollHeight;
    }
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // --- PUBLIC GLOBAL API ---
  window.IVORYChat = {
    open: function () {
      if (!isOpen) toggleChat();
    },
    close: function () {
      if (isOpen) toggleChat();
    },
    bookWithDoctor: function (concernId, doctorName) {
      toggleChat(); // close chat window
      const bookSection = document.getElementById('book') || document.getElementById('ctaBook') || document.getElementById('cta');
      if (bookSection) {
        bookSection.scrollIntoView({ behavior: 'smooth' });
      }

      // If BookingSystem is available, select concern and advance to doctor match
      if (window.BookingSystem && typeof window.BookingSystem.selectConcern === 'function') {
        window.BookingSystem.selectConcern(concernId);
      } else {
        // Fallback: click matching concern card in DOM
        setTimeout(() => {
          const concernBtn = document.querySelector(`.bk-concern-card[data-id="${concernId}"]`);
          if (concernBtn) concernBtn.click();
        }, 600);
      }
    },
    inspect3D: function (conditionId) {
      toggleChat();
      const toothTarget = document.getElementById('anatomy3d') || document.getElementById('home') || document.getElementById('tooth-hero');
      if (toothTarget) {
        toothTarget.scrollIntoView({ behavior: 'smooth' });
      }
      setTimeout(() => {
        if (window.DentalVision3D && typeof window.DentalVision3D.setCondition === 'function') {
          window.DentalVision3D.setCondition(conditionId || 'rootCanal');
        } else {
          const btn = document.querySelector(`.dv3d-cond-btn[data-cond="${conditionId}"]`);
          if (btn) btn.click();
        }
      }, 700);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }
})();
