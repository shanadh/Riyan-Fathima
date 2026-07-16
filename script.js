document.addEventListener('DOMContentLoaded', () => {
  
  // -------------------------------------------------------------
  // 1. Target Date Configuration (August 15, 2026, 12:30 PM IST)
  // -------------------------------------------------------------
  const weddingDate = new Date('2026-08-15T12:30:00+05:30').getTime();

  // Elements
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const miniCountdownEl = document.getElementById('miniCountdown');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      // If the date has passed
      if (daysEl) daysEl.innerText = '00';
      if (hoursEl) hoursEl.innerText = '00';
      if (minutesEl) minutesEl.innerText = '00';
      if (secondsEl) secondsEl.innerText = '00';
      
      if (miniCountdownEl) {
        miniCountdownEl.innerHTML = '<span>The celebration has begun!</span>';
      }
      return;
    }

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update DOM (Large Countdown)
    if (daysEl) daysEl.innerText = days < 10 ? '0' + days : days;
    if (hoursEl) hoursEl.innerText = hours < 10 ? '0' + hours : hours;
    if (minutesEl) minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
    if (secondsEl) secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;

    // Update DOM (Mini Hero Countdown)
    if (miniCountdownEl) {
      miniCountdownEl.innerHTML = `<span>${days} Days • ${hours} Hours • ${minutes} Mins left</span>`;
    }
  }

  // Initial call and run every second
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // -------------------------------------------------------------
  // 2. Scroll Reveal Animation using Intersection Observer
  // -------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Trigger animation once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // -------------------------------------------------------------
  // 4. Smooth Scrolling for Navigation
  // -------------------------------------------------------------
  const smoothScrollLinks = document.querySelectorAll('.smooth-scroll');

  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
