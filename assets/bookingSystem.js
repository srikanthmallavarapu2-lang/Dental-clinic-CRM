/**
 * IVORY Dental — Intelligent Concierge Booking Suite
 * Smart Doctor Matching based on Patient Problem & Clinical Needs
 */

(function () {
  'use strict';

  // CLINICAL CONCERNS & SMART DOCTOR MAPPING
  const CONCERNS = [
    {
      id: 'implants',
      icon: '🦷',
      title: 'Missing Teeth or Need Implants',
      subtitle: 'Single gaps, failing bridges, or full-arch restoration',
      treatment: 'Dental Implants & Guided Oral Surgery',
      duration: '60 mins',
      recommendedDoctor: 'Dr. Elena Voss',
      doctorRole: 'Head of Implantology & Oral Surgery',
      doctorThumb: 'assets/images/doctor-elena-thumb.webp',
      matchReason: 'Dr. Voss has 14 years of sub-millimeter surgical experience in computer-guided titanium implants, bone preservation, and immediate teeth-in-a-day.'
    },
    {
      id: 'veneers',
      icon: '✨',
      title: 'Chipped, Worn, or Discolored Teeth',
      subtitle: 'Porcelain veneers, smile makeover, or cosmetic bonding',
      treatment: 'Custom Handcrafted Porcelain Veneers',
      duration: '60 mins',
      recommendedDoctor: 'Dr. Marcus Thorne',
      doctorRole: 'Master Aesthetic Reconstruction',
      doctorThumb: 'assets/images/doctor-marcus-thumb.webp',
      matchReason: 'Dr. Thorne is our master cosmetic architect specializing in ultra-thin, hand-layered ceramic laminates with zero artificial appearance.'
    },
    {
      id: 'ortho',
      icon: '📐',
      title: 'Crooked, Crowded, or Spaced Teeth',
      subtitle: 'Invisalign, clear aligners, or bite correction',
      treatment: 'Invisalign & Digital Clear Aligners',
      duration: '45 mins',
      recommendedDoctor: 'Dr. Sofia Chen',
      doctorRole: 'Head of Orthodontics & Clear Aligners',
      doctorThumb: 'assets/images/doctor-sofia-thumb.webp',
      matchReason: 'Dr. Chen uses AI 3D digital smile simulation to track tooth movement down to 0.1 mm, giving predictable, invisible alignment without traditional braces.'
    },
    {
      id: 'pain',
      icon: '⚡',
      title: 'Severe Toothache or Deep Nerve Pain',
      subtitle: 'Pulp sensitivity, infection, or trauma requiring root canal',
      treatment: 'Microscopic Root Canal & Tooth Preservation',
      duration: '60 mins',
      recommendedDoctor: 'Dr. Kai Mercer',
      doctorRole: 'Microscopic Endodontic Specialist',
      doctorThumb: 'assets/images/doctor-kai-thumb.webp',
      matchReason: 'Dr. Mercer uses surgical microscopes with 25x magnification to clean and hermetically seal root canals in a single painless session.'
    },
        {
      id: 'gums',
      icon: '🌿',
      title: 'Bleeding Gums, Recession, or Bad Breath',
      subtitle: 'Periodontal disease, sensitive roots, or gum reshaping',
      treatment: 'Biological Periodontics & Laser Gum Contouring',
      duration: '45 mins',
      recommendedDoctor: 'Dr. Aria Renault',
      doctorRole: 'Biological Periodontics & Regeneration',
      doctorThumb: 'assets/images/doctor-aria-thumb.webp',
      matchReason: 'Dr. Renault utilizes minimally-invasive laser therapy to eliminate subgingival bacteria and regenerate healthy bone foundation.'
    },
    {
      id: 'pediatric',
      icon: '🧸',
      title: 'Pediatric & Milk Teeth Preventive Care',
      subtitle: 'Gentle child cleanings, cavity sealants, or habit correction',
      treatment: 'Gentle Pediatric Preventive Care & Sealants',
      duration: '30 mins',
      recommendedDoctor: 'Dr. Rohan Mehta',
      doctorRole: 'Pediatric Dentistry & Early Interception',
      doctorThumb: 'assets/images/doctor-rohan-thumb.webp',
      matchReason: 'Dr. Mehta specializes in gentle, anxiety-free pediatric dental care making every child visit a comforting, positive adventure.'
    },
    {
      id: 'tmj',
      icon: '🦴',
      title: 'TMJ Pain, Jaw Clicking or Wisdom Teeth',
      subtitle: 'Jaw joint clicking, facial pain, or complex surgical extraction',
      treatment: '3D TMJ Decompression & Maxillofacial Consultation',
      duration: '45 mins',
      recommendedDoctor: 'Dr. Ananya Sharma',
      doctorRole: 'Oral & Maxillofacial Surgeon · TMJ',
      doctorThumb: 'assets/images/doctor-ananya-thumb.webp',
      matchReason: 'Dr. Sharma is an accredited surgical specialist realigning TMJ joints and providing painless surgical precision.'
    },
    {
      id: 'sedation',
      icon: '😴',
      title: 'Dental Phobia, Anxiety or Sleep Care',
      subtitle: 'IV twilight sedation for complex or sensitive rehabilitation',
      treatment: 'Conscious Twilight IV Sedation Consultation',
      duration: '45 mins',
      recommendedDoctor: 'Dr. David Lin',
      doctorRole: 'Sedation Dentistry & Patient Comfort',
      doctorThumb: 'assets/images/doctor-david-thumb.webp',
      matchReason: 'Dr. Lin is board-certified in conscious IV sedation, enabling painless comprehensive treatment in total peaceful relaxation.'
    },
    {
      id: 'checkup',
      icon: '🛡️',
      title: 'Comprehensive Checkup, 3D Scan & Hygiene',
      subtitle: 'Preventative care, oral cancer screening, ultrasonic polish',
      treatment: 'Comprehensive 3D Digital Exam & Hygiene',
      duration: '45 mins',
      recommendedDoctor: 'Senior Clinical Hygiene Team',
      doctorRole: 'Preventative Oral Health Specialist',
      doctorThumb: 'assets/images/tech-scanner.webp',
      matchReason: 'Complete full-mouth 3D CBCT digital examination, gentle ultrasonic air-polishing, and personalized preventative roadmap.'
    }
  ];

  const ALL_DOCTORS = [
    { name: 'Dr. Elena Voss', role: 'Head of Implantology & Oral Surgery', thumb: 'assets/images/doctor-elena-thumb.webp', specialtyId: 'implants', exp: '14 Years' },
    { name: 'Dr. Marcus Thorne', role: 'Master Aesthetic Reconstruction', thumb: 'assets/images/doctor-marcus-thumb.webp', specialtyId: 'veneers', exp: '16 Years' },
    { name: 'Dr. Sofia Chen', role: 'Head of Orthodontics & Clear Aligners', thumb: 'assets/images/doctor-sofia-thumb.webp', specialtyId: 'ortho', exp: '12 Years' },
    { name: 'Dr. Kai Mercer', role: 'Microscopic Endodontic Specialist', thumb: 'assets/images/doctor-kai-thumb.webp', specialtyId: 'pain', exp: '15 Years' },
    { name: 'Dr. Aria Renault', role: 'Biological Periodontics & Regeneration', thumb: 'assets/images/doctor-aria-thumb.webp', specialtyId: 'gums', exp: '13 Years' },
    { name: 'Dr. Rohan Mehta', role: 'Pediatric Dentistry & Early Interception', thumb: 'assets/images/doctor-rohan-thumb.webp', specialtyId: 'pediatric', exp: '11 Years' },
    { name: 'Dr. Ananya Sharma', role: 'Oral & Maxillofacial Surgeon · TMJ', thumb: 'assets/images/doctor-ananya-thumb.webp', specialtyId: 'tmj', exp: '14 Years' },
    { name: 'Dr. David Lin', role: 'Sedation Dentistry & Patient Comfort', thumb: 'assets/images/doctor-david-thumb.webp', specialtyId: 'sedation', exp: '17 Years' },
    { name: 'First Available Senior Specialist', role: 'Expedited Appointment', thumb: 'assets/images/tech-scanner.webp', specialtyId: 'checkup', exp: 'Senior Clinic Team' }
  ];

  let bookingState = {
    step: 1,
    selectedConcernId: 'implants',
    treatment: 'Dental Implants & Guided Oral Surgery',
    treatmentDuration: '60 mins',
    specialist: 'Dr. Elena Voss — Head of Implantology & Oral Surgery',
    specialistImg: 'assets/images/doctor-elena-thumb.webp',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    time: '10:30 AM',
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    patientNotes: '',
    refId: ''
  };

  function initBookingSystem() {
    const container = document.getElementById('ctaBook');
    if (!container) return;
    renderBookingWizard();
  }

  function renderBookingWizard() {
    const container = document.getElementById('ctaBook');
    if (!container) return;

    const currentConcern = CONCERNS.find(c => c.id === bookingState.selectedConcernId) || CONCERNS[0];

    container.innerHTML = `
      <div class="bk-wizard" id="bkWizard">
        <!-- Progress Steps Bar -->
        <div class="bk-steps-header">
          <div class="bk-step-item ${bookingState.step >= 1 ? 'active' : ''} ${bookingState.step > 1 ? 'done' : ''}" data-step="1">
            <span class="bk-step-num">1</span>
            <span class="bk-step-name">Your Concern</span>
          </div>
          <div class="bk-step-line ${bookingState.step > 1 ? 'active' : ''}"></div>
          <div class="bk-step-item ${bookingState.step >= 2 ? 'active' : ''} ${bookingState.step > 2 ? 'done' : ''}" data-step="2">
            <span class="bk-step-num">2</span>
            <span class="bk-step-name">Doctor Match</span>
          </div>
          <div class="bk-step-line ${bookingState.step > 2 ? 'active' : ''}"></div>
          <div class="bk-step-item ${bookingState.step >= 3 ? 'active' : ''} ${bookingState.step > 3 ? 'done' : ''}" data-step="3">
            <span class="bk-step-num">3</span>
            <span class="bk-step-name">Date & Time</span>
          </div>
          <div class="bk-step-line ${bookingState.step > 3 ? 'active' : ''}"></div>
          <div class="bk-step-item ${bookingState.step >= 4 ? 'active' : ''} ${bookingState.step > 4 ? 'done' : ''}" data-step="4">
            <span class="bk-step-num">4</span>
            <span class="bk-step-name">Confirm</span>
          </div>
        </div>

        <!-- Step 1: Patient Problem / Dental Concern -->
        <div class="bk-step-body" id="bk-body-1" style="display: ${bookingState.step === 1 ? 'block' : 'none'}">
          <h3 class="bk-step-title">What is your primary dental concern?</h3>
          <p class="bk-step-subtitle">Select your clinical need. Our smart system instantly matches you with the specialist who treats your exact condition.</p>
          
          <div class="bk-cards-grid">
            ${CONCERNS.map(c => `
              <div class="bk-tx-card ${bookingState.selectedConcernId === c.id ? 'selected' : ''}" data-concern="${c.id}" data-treatment="${c.treatment}" data-duration="${c.duration}" data-doc="${c.recommendedDoctor}">
                <div class="bk-concern-icon">${c.icon}</div>
                <div class="bk-tx-header">
                  <span class="bk-tx-name">${c.title}</span>
                  <span class="bk-tx-duration">${c.duration}</span>
                </div>
                <p class="bk-tx-desc">${c.subtitle}</p>
                <div class="bk-match-hint">
                  <span class="bk-match-star">★</span> Recommended: <strong>${c.recommendedDoctor}</strong>
                </div>
                <div class="bk-tx-check">✓</div>
              </div>
            `).join('')}
          </div>
          <div class="bk-footer-actions">
            <div></div>
            <button class="bk-btn-next" id="bk-next-1">Next: View Doctor Match →</button>
          </div>
        </div>

        <!-- Step 2: Doctor Recommendation & Details -->
        <div class="bk-step-body" id="bk-body-2" style="display: ${bookingState.step === 2 ? 'block' : 'none'}">
          <div class="bk-match-banner">
            <span class="bk-match-badge">AI CLINICAL MATCH</span>
            <h4 class="bk-match-heading">Recommended Specialist: <strong>${currentConcern.recommendedDoctor}</strong></h4>
            <p class="bk-match-reason">${currentConcern.matchReason}</p>
          </div>

          <h3 class="bk-step-title" style="margin-top: 24px;">Confirm Your Attending Doctor</h3>
          <p class="bk-step-subtitle">Keep our recommended match or select another specialist below:</p>

          <div class="bk-cards-grid">
            ${ALL_DOCTORS.map(doc => {
              const isMatch = (doc.name === currentConcern.recommendedDoctor);
              const isSelected = bookingState.specialist.includes(doc.name);
              return `
                <div class="bk-doc-card ${isSelected ? 'selected' : ''} ${isMatch ? 'recommended-doc' : ''}" data-doc="${doc.name} — ${doc.role}" data-img="${doc.thumb}">
                  ${isMatch ? '<div class="bk-rec-badge">★ TOP MATCH</div>' : ''}
                  <img src="${doc.thumb}" alt="${doc.name}" class="bk-doc-thumb" />
                  <div class="bk-doc-info">
                    <div class="bk-doc-name">${doc.name}</div>
                    <div class="bk-doc-role">${doc.role}</div>
                    <div class="bk-doc-exp">Experience: ${doc.exp}</div>
                  </div>
                  <div class="bk-tx-check">✓</div>
                </div>
              `;
            }).join('')}
          </div>
          <div class="bk-footer-actions">
            <button class="bk-btn-prev" id="bk-prev-2">← Back to Concerns</button>
            <button class="bk-btn-next" id="bk-next-2">Next: Select Date & Time →</button>
          </div>
        </div>

        <!-- Step 3: Date & Time -->
        <div class="bk-step-body" id="bk-body-3" style="display: ${bookingState.step === 3 ? 'block' : 'none'}">
          <h3 class="bk-step-title">Choose Preferred Date & Time</h3>
          <p class="bk-step-subtitle">Boutique private sessions with zero waiting room delays.</p>
          <div class="bk-datetime-layout">
            <div class="bk-calendar-pane">
              <label class="bk-field-label">Select Date</label>
              <input type="date" class="bk-date-input" id="bk-date-picker" value="${bookingState.date}" min="${new Date().toISOString().split('T')[0]}" />
              <div class="bk-date-hint">Selected: <strong>${bookingState.treatment}</strong> with <strong>${bookingState.specialist.split('—')[0]}</strong></div>
            </div>
            <div class="bk-times-pane">
              <label class="bk-field-label">Available Time Slots</label>
              <div class="bk-slots-grid">
                ${['09:00 AM', '10:30 AM', '11:45 AM', '02:00 PM', '03:30 PM', '05:00 PM', '06:15 PM'].map(slot => `
                  <button type="button" class="bk-slot-btn ${bookingState.time === slot ? 'selected' : ''}" data-time="${slot}">
                    <span class="bk-slot-dot"></span>
                    ${slot}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
          <div class="bk-footer-actions">
            <button class="bk-btn-prev" id="bk-prev-3">← Back</button>
            <button class="bk-btn-next" id="bk-next-3">Next: Patient Details →</button>
          </div>
        </div>

        <!-- Step 4: Patient Details -->
        <div class="bk-step-body" id="bk-body-4" style="display: ${bookingState.step === 4 ? 'block' : 'none'}">
          <h3 class="bk-step-title">Patient Contact & Smile Goals</h3>
          <p class="bk-step-subtitle">All information is encrypted under medical confidentiality guidelines.</p>
          <div class="bk-form-grid">
            <div class="bk-input-group">
              <label class="bk-field-label">Full Name *</label>
              <input type="text" class="bk-text-input" id="bk-name" placeholder="e.g. Alexandra Sterling" value="${bookingState.patientName}" required />
            </div>
            <div class="bk-input-group">
              <label class="bk-field-label">Phone Number (WhatsApp) *</label>
              <input type="tel" class="bk-text-input" id="bk-phone" placeholder="+1 (555) 000-0000" value="${bookingState.patientPhone}" required />
            </div>
            <div class="bk-input-group full">
              <label class="bk-field-label">Email Address *</label>
              <input type="email" class="bk-text-input" id="bk-email" placeholder="alexandra@example.com" value="${bookingState.patientEmail}" required />
            </div>
            <div class="bk-input-group full">
              <label class="bk-field-label">Any specific symptoms, questions, or dental anxiety? (Optional)</label>
              <textarea class="bk-textarea" id="bk-notes" placeholder="e.g. Sensitivity to cold, chipped front tooth, prefer sedation options...">${bookingState.patientNotes}</textarea>
            </div>
          </div>
          <div class="bk-footer-actions">
            <button class="bk-btn-prev" id="bk-prev-4">← Back</button>
            <button class="bk-btn-submit" id="bk-submit-btn">Complete Reservation & Receive Pass →</button>
          </div>
        </div>

        <!-- Step 5: Confirmation Pass -->
        <div class="bk-step-body" id="bk-body-5" style="display: ${bookingState.step === 5 ? 'block' : 'none'}">
          <div class="bk-pass-card">
            <div class="bk-pass-badge">APPOINTMENT RESERVED</div>
            <h3 class="bk-pass-title">VIP Consultation Confirmed</h3>
            <div class="bk-pass-ref">Ref: <span id="bk-pass-ref-val">${bookingState.refId}</span></div>
            
            <div class="bk-pass-details">
              <div class="bk-pass-row">
                <span class="bk-pass-lbl">Clinical Procedure:</span>
                <span class="bk-pass-val">${bookingState.treatment}</span>
              </div>
              <div class="bk-pass-row">
                <span class="bk-pass-lbl">Matched Specialist:</span>
                <span class="bk-pass-val">${bookingState.specialist}</span>
              </div>
              <div class="bk-pass-row">
                <span class="bk-pass-lbl">Appointment:</span>
                <span class="bk-pass-val">${bookingState.date} · ${bookingState.time}</span>
              </div>
              <div class="bk-pass-row">
                <span class="bk-pass-lbl">Patient:</span>
                <span class="bk-pass-val">${bookingState.patientName || 'Private Patient'}</span>
              </div>
              <div class="bk-pass-row">
                <span class="bk-pass-lbl">Location:</span>
                <span class="bk-pass-val">IVORY Dental Studio · Suite 400</span>
              </div>
            </div>

            <div class="bk-pass-actions">
              <a href="https://wa.me/491234567890?text=${encodeURIComponent(`Hi IVORY Clinic, I have confirmed my appointment [${bookingState.refId}] for ${bookingState.treatment} with ${bookingState.specialist.split('—')[0]} on ${bookingState.date} at ${bookingState.time}. Patient: ${bookingState.patientName}`)}" target="_blank" rel="noopener" class="bk-btn-whatsapp">
                💬 Open in WhatsApp
              </a>
              <button class="bk-btn-calendar" id="bk-btn-cal">📅 Download Calendar (.ics)</button>
              <button class="bk-btn-restart" id="bk-btn-restart">Book Another Appointment</button>
            </div>
          </div>
        </div>
      </div>
    `;

    bindWizardEvents();
  }

  function bindWizardEvents() {
    // Step 1: Concern select
    document.querySelectorAll('.bk-tx-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.bk-tx-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        bookingState.selectedConcernId = card.dataset.concern;
        bookingState.treatment = card.dataset.treatment;
        bookingState.treatmentDuration = card.dataset.duration;

        // Auto-match doctor
        const matched = ALL_DOCTORS.find(d => d.name === card.dataset.doc);
        if (matched) {
          bookingState.specialist = `${matched.name} — ${matched.role}`;
          bookingState.specialistImg = matched.thumb;
        }
      });
    });

    const next1 = document.getElementById('bk-next-1');
    if (next1) next1.addEventListener('click', () => { bookingState.step = 2; renderBookingWizard(); });

    // Step 2: Doctor select
    document.querySelectorAll('.bk-doc-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.bk-doc-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        bookingState.specialist = card.dataset.doc;
        bookingState.specialistImg = card.dataset.img;
      });
    });

    const prev2 = document.getElementById('bk-prev-2');
    if (prev2) prev2.addEventListener('click', () => { bookingState.step = 1; renderBookingWizard(); });
    const next2 = document.getElementById('bk-next-2');
    if (next2) next2.addEventListener('click', () => { bookingState.step = 3; renderBookingWizard(); });

    // Step 3: Date & Time
    const dateInput = document.getElementById('bk-date-picker');
    if (dateInput) {
      dateInput.addEventListener('change', (e) => {
        bookingState.date = e.target.value;
      });
    }

    document.querySelectorAll('.bk-slot-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.bk-slot-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        bookingState.time = btn.dataset.time;
      });
    });

    const prev3 = document.getElementById('bk-prev-3');
    if (prev3) prev3.addEventListener('click', () => { bookingState.step = 2; renderBookingWizard(); });
    const next3 = document.getElementById('bk-next-3');
    if (next3) next3.addEventListener('click', () => { bookingState.step = 4; renderBookingWizard(); });

    // Step 4: Contact & Submit
    const nameInput = document.getElementById('bk-name');
    const phoneInput = document.getElementById('bk-phone');
    const emailInput = document.getElementById('bk-email');
    const notesInput = document.getElementById('bk-notes');

    const prev4 = document.getElementById('bk-prev-4');
    if (prev4) prev4.addEventListener('click', () => { bookingState.step = 3; renderBookingWizard(); });

    const submitBtn = document.getElementById('bk-submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        bookingState.patientName = (nameInput && nameInput.value.trim()) || 'Private Patient';
        bookingState.patientPhone = (phoneInput && phoneInput.value.trim()) || '';
        bookingState.patientEmail = (emailInput && emailInput.value.trim()) || '';
        bookingState.patientNotes = (notesInput && notesInput.value.trim()) || '';

        bookingState.refId = 'IVY-' + Math.floor(100000 + Math.random() * 900000);
        bookingState.step = 5;
        renderBookingWizard();
      });
    }

    // Step 5: Calendar download & restart
    const calBtn = document.getElementById('bk-btn-cal');
    if (calBtn) calBtn.addEventListener('click', downloadIcsCalendar);
    const restartBtn = document.getElementById('bk-btn-restart');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        bookingState.step = 1;
        renderBookingWizard();
      });
    }
  }

  function downloadIcsCalendar() {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//IVORY Dental//Appointment//EN',
      'BEGIN:VEVENT',
      `SUMMARY:IVORY Dental Consultation - ${bookingState.treatment}`,
      `DESCRIPTION:Appointment with ${bookingState.specialist}. Reference: ${bookingState.refId}`,
      'LOCATION:IVORY Dental Studio, Kurfürstendamm / Medical Suite 4',
      `DTSTART:${bookingState.date.replace(/-/g, '')}T100000Z`,
      `DTEND:${bookingState.date.replace(/-/g, '')}T110000Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `IVORY-Appointment-${bookingState.refId}.ics`;
    link.click();
  }

  // Public API for external components (like IVORYChat)
  window.BookingSystem = {
    selectConcern: function (concernId) {
      const match = CONCERNS.find(c => c.id === concernId);
      if (match) {
        bookingState.selectedConcernId = match.id;
        bookingState.treatment = match.treatment;
        bookingState.treatmentDuration = match.duration;
        bookingState.specialist = `${match.recommendedDoctor} — ${match.doctorRole}`;
        bookingState.specialistImg = match.doctorThumb;
        bookingState.step = 2; // Jump directly to doctor match confirmation
        renderBookingWizard();
      }
    },
    getState: function () {
      return Object.assign({}, bookingState);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBookingSystem);
  } else {
    initBookingSystem();
  }
})();
