/**
 * DentalJourneyWave — Continuous Luminous Golden Wave for IVORY Dental Journey
 * Connects all four steps: Consultation -> Diagnosis -> Treatment -> Aftercare
 */

(function () {
  'use strict';

  let currentStep = 0;
  let isPaused = false;
  let animProgress = 0;
  let animStartTime = null;
  const CYCLE_DURATION = 8000; // 8 seconds per full cycle (including 1.5s pause)
  let requestAnimId = null;

  function initJourneyWave() {
    const section = document.getElementById('journey');
    if (!section) return;

    const path = document.getElementById('jw-main-path');
    const photon = document.getElementById('jw-photon');
    const nodes = document.querySelectorAll('.jw-node');
    const cards = document.querySelectorAll('.jw-card');

    if (!path || !photon) return;

    const totalLen = path.getTotalLength();

    // Node milestones along the path (approximate fraction of total path length)
    // Node 1: ~10%, Node 2: ~37%, Node 3: ~64%, Node 4: ~91%
    const milestones = [0.10, 0.37, 0.64, 0.91];

    function activateStep(idx, manual = false) {
      currentStep = idx;

      nodes.forEach((n, i) => {
        n.classList.toggle('active', i === idx);
        n.classList.toggle('completed', i < idx);
      });

      cards.forEach((c, i) => {
        c.classList.toggle('active', i === idx);
      });

      if (manual) {
        isPaused = true;
        // Position photon directly at that node
        const pt = path.getPointAtLength(milestones[idx] * totalLen);
        photon.setAttribute('cx', pt.x);
        photon.setAttribute('cy', pt.y);
        photon.style.opacity = '1';
        // Resume after 4 seconds of idle
        clearTimeout(window._jwResumeTimer);
        window._jwResumeTimer = setTimeout(() => { isPaused = false; }, 4000);
      }
    }

    // Interactive clicking and keyboard
    nodes.forEach((n, i) => {
      n.addEventListener('click', () => activateStep(i, true));
      n.addEventListener('mouseenter', () => { isPaused = true; });
      n.addEventListener('mouseleave', () => { isPaused = false; });
      n.setAttribute('tabindex', '0');
      n.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activateStep(i, true);
        }
      });
    });

    cards.forEach((c, i) => {
      c.addEventListener('click', () => activateStep(i, true));
      c.addEventListener('mouseenter', () => { isPaused = true; activateStep(i, false); });
      c.addEventListener('mouseleave', () => { isPaused = false; });
    });

    // Coordinated Animation Loop
    function loop(now) {
      if (!animStartTime) animStartTime = now;

      if (!isPaused) {
        const elapsed = (now - animStartTime) % CYCLE_DURATION;
        const normTime = elapsed / CYCLE_DURATION; // 0 to 1

        // Light travels along path from 0 to 0.81 (6.5s), then pauses at step 4 for 0.19 (1.5s)
        let waveProgress = 0;
        if (normTime < 0.81) {
          waveProgress = normTime / 0.81; // 0 to 1
        } else {
          waveProgress = 1.0; // pause at end
        }

        // Get exact coordinate on continuous path
        const currentLen = waveProgress * totalLen;
        const pt = path.getPointAtLength(currentLen);
        photon.setAttribute('cx', pt.x);
        photon.setAttribute('cy', pt.y);

        // Update stroke dash on glowing path
        const glowPath = document.getElementById('jw-glow-path');
        if (glowPath) {
          glowPath.style.strokeDasharray = `${currentLen} ${totalLen}`;
        }

        // Check milestones
        if (waveProgress < milestones[0]) {
          activateStep(0);
        } else if (waveProgress >= milestones[0] && waveProgress < milestones[1]) {
          activateStep(0);
        } else if (waveProgress >= milestones[1] && waveProgress < milestones[2]) {
          activateStep(1);
        } else if (waveProgress >= milestones[2] && waveProgress < milestones[3]) {
          activateStep(2);
        } else {
          activateStep(3);
        }
      }

      requestAnimId = requestAnimationFrame(loop);
    }

    requestAnimId = requestAnimationFrame(loop);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initJourneyWave);
  } else {
    initJourneyWave();
  }
})();
