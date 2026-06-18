/**
 * Team Rotator
 * Spins the pentagon slowly and advances to the next team member every
 * time it completes one fifth of a turn (a fresh vertex reaches 12 o'clock).
 * Place in assets/js/ and load after main.js on About.html.
 */
document.addEventListener('DOMContentLoaded', () => {
  const rotatorEl = document.getElementById('teamRotator');
  const pentagonSpin = document.getElementById('pentagonSpin');
  const marker = document.getElementById('pentagonMarker');
  const photoA = document.getElementById('teamPhotoA');
  const photoB = document.getElementById('teamPhotoB');
  const card = document.getElementById('teamCard');
  const countEl = document.getElementById('teamCount');
  const firstEl = document.getElementById('teamFirst');
  const lastEl = document.getElementById('teamLast');
  const roleEl = document.getElementById('teamRole');
  const bioEl = document.getElementById('teamBio');
  const linkedinEl = document.getElementById('teamLinkedIn');
  const emailEl = document.getElementById('teamEmail');
  const dotsContainer = document.getElementById('teamDots');
  const prevBtn = document.getElementById('teamPrev');
  const nextBtn = document.getElementById('teamNext');

  if (!rotatorEl || !pentagonSpin || !dotsContainer) return;

  // Same five people as the original team grid — reusing the existing
  // placeholder avatar, just as the rest of the site already does.
  const TEAM = [
    {
      first: 'Priya', last: 'Anand',
      role: 'Founder & Lead Strategist',
      bio: 'Fifteen years inside data platforms taught her that strategy without infrastructure is just a slide deck. Leads every engagement from kickoff to handover.',
      img: 'assets/images/profile1.png', linkedin: '#', email: '#'
    },
    {
      first: 'Marcus', last: 'Webb',
      role: 'Head of Predictive Analytics',
      bio: 'Builds the forecasting models that turn historical noise into decisions your team can actually act on.',
      img: 'assets/images/profile2.png', linkedin: '#', email: '#'
    },
    {
      first: 'Sofia', last: 'Lindqvist',
      role: 'Head of Data Systems',
      bio: 'Designs the pipelines and architecture that keep data moving — reliably, securely, at scale.',
      img: 'assets/images/profile3.png', linkedin: '#', email: '#'
    },
    {
      first: 'Daniel', last: 'Osei',
      role: 'Principal Software Engineer',
      bio: 'Ships the custom tools and internal platforms that make the strategy usable day to day.',
      img: 'assets/images/profile4.png', linkedin: '#', email: '#'
    },
    {
      first: 'Lena', last: 'Ferreira',
      role: 'Head of Insights & Research',
      bio: "Turns engagement findings into the published research and case studies that keep clients ahead of what's coming next.",
      img: 'assets/images/profile5.png', linkedin: '#', email: '#'
    }
  ];

  const ANGLE_STEP = 360 / TEAM.length;       // 72 deg for 5 members
  const REVOLUTION_SECONDS = 30;              // one full slow turn (faster for clearer motion)
  const DEG_PER_MS = 360 / (REVOLUTION_SECONDS * 1000);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let rotation = 0;          // cumulative degrees, grows unbounded
  let activeIndex = 0;
  let usingPhotoA = true;
  let lastTimestamp = null;

  // Rotation pauses while hovered/focused, or briefly after a manual jump.
  let hovering = false;
  let focused = false;
  let manualHold = false;
  let manualHoldTimeout = null;
  let isPaused = false;

  function recomputePaused() {
    isPaused = hovering || focused || manualHold;
  }

  function setSpinTransform(deg) {
    const display = ((deg % 360) + 360) % 360;
    // Rotate only the SVG group around the SVG center (100,100). The
    // photo frame and marker are absolutely positioned and will remain
    // visually stationary while the pentagon paths rotate.
    pentagonSpin.setAttribute('transform', `rotate(${display} 100 100)`);
  }

  function buildDots() {
    TEAM.forEach((member, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'team-rotator-dot';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `View ${member.first} ${member.last}`);
      dot.dataset.index = String(i);
      dot.addEventListener('click', () => goToIndex(i, true));
      dotsContainer.appendChild(dot);
    });
  }

  function updateDots(index) {
    const dots = dotsContainer.querySelectorAll('.team-rotator-dot');
    dots.forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }

  function pulseMarker() {
    marker.classList.remove('pulse');
    void marker.offsetWidth; // restart the animation even if already mid-pulse
    marker.classList.add('pulse');
  }

  function applyMember(index) {
    const member = TEAM[index];

    const incoming = usingPhotoA ? photoB : photoA;
    const outgoing = usingPhotoA ? photoA : photoB;
    incoming.src = member.img;
    incoming.classList.add('is-active');
    outgoing.classList.remove('is-active');
    usingPhotoA = !usingPhotoA;

    card.classList.add('is-swapping');
    window.setTimeout(() => {
      firstEl.textContent = member.first;
      lastEl.textContent = member.last;
      roleEl.textContent = member.role;
      bioEl.textContent = member.bio;
      linkedinEl.href = member.linkedin;
      linkedinEl.setAttribute('aria-label', `${member.first} ${member.last} on LinkedIn`);
      emailEl.href = member.email;
      emailEl.setAttribute('aria-label', `Email ${member.first} ${member.last}`);
      card.classList.remove('is-swapping');
    }, 180);

    countEl.textContent = `${String(index + 1).padStart(2, '0')} / ${String(TEAM.length).padStart(2, '0')}`;
    updateDots(index);
    pulseMarker();
  }

  function goToIndex(index, manual) {
    activeIndex = ((index % TEAM.length) + TEAM.length) % TEAM.length;
    rotation = activeIndex * ANGLE_STEP;
    setSpinTransform(rotation);
    applyMember(activeIndex);

    if (manual) {
      manualHold = true;
      recomputePaused();
      if (manualHoldTimeout) window.clearTimeout(manualHoldTimeout);
      manualHoldTimeout = window.setTimeout(() => {
        manualHold = false;
        manualHoldTimeout = null;
        recomputePaused();
      }, 4500);
    }
  }

  function step(timestamp) {
    if (lastTimestamp === null) lastTimestamp = timestamp;
    const dt = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    if (!isPaused && !document.hidden) {
      rotation += dt * DEG_PER_MS;
      setSpinTransform(rotation);

      const segment = Math.floor(rotation / ANGLE_STEP) % TEAM.length;
      if (segment !== activeIndex) {
        activeIndex = segment;
        applyMember(activeIndex);
      }
    }

    window.requestAnimationFrame(step);
  }

  buildDots();
  applyMember(0);

  prevBtn.addEventListener('click', () => goToIndex(activeIndex - 1, true));
  nextBtn.addEventListener('click', () => goToIndex(activeIndex + 1, true));

  rotatorEl.addEventListener('pointerenter', () => { hovering = true; recomputePaused(); });
  rotatorEl.addEventListener('pointerleave', () => { hovering = false; recomputePaused(); });
  rotatorEl.addEventListener('focusin', () => { focused = true; recomputePaused(); });
  rotatorEl.addEventListener('focusout', () => { focused = false; recomputePaused(); });

  document.addEventListener('visibilitychange', () => { lastTimestamp = null; });

  // Reduced motion: keep the pentagon static, rely on the prev/next/dot
  // controls instead of autoplay.
  if (!reduceMotion) {
    window.requestAnimationFrame(step);
  }
});
