// Navigation/menu logic
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize nav element
  const nav = document.querySelector('.nav');
  const menuButton = document.querySelector('.nav__menu-button');
  const mobileLinks = document.querySelectorAll('.nav__mobile-link');
  let lastScroll = 0;
  
  // Mobile menu toggle
  if (menuButton) {
    menuButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      nav.classList.toggle('menu-open');
      document.body.classList.toggle('menu-open');
      // Debug log
      console.log('Menu button clicked, menu-open class:', nav.classList.contains('menu-open'));
    });
  }

  // Close menu when clicking a link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('menu-open');
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
      // Debug log
      console.log('Mobile link clicked, menu closed');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('menu-open') && 
        !e.target.closest('.nav__mobile-menu') && 
        !e.target.closest('.nav__menu-button')) {
      nav.classList.remove('menu-open');
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
      // Debug log
      console.log('Clicked outside, menu closed');
    }
  });
  
  // Hide header on scroll down, show on scroll up
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      nav.classList.remove('nav--hidden');
      return;
    }
    
    if (currentScroll > lastScroll && !nav.classList.contains('nav--hidden')) {
      // Scroll Down
      nav.classList.add('nav--hidden');
    } else if (currentScroll < lastScroll && nav.classList.contains('nav--hidden')) {
      // Scroll Up
      nav.classList.remove('nav--hidden');
    }
    
    lastScroll = currentScroll;
  });
  
  // Debug log
  console.log('Navigation initialized');
});

// Photo strip marquee
(function() {
  const strip = document.getElementById('photoStrip');
  if (!strip) return;

  // Wrap existing items into a rail element for duplication
  const rail = document.createElement('div');
  rail.className = 'photo-strip__rail';

  // move children into rail
  while (strip.firstChild) {
    rail.appendChild(strip.firstChild);
  }

  // clone rail content to create seamless loop
  const railClone = rail.cloneNode(true);
  strip.appendChild(rail);
  strip.appendChild(railClone);

  let paused = false;
  let speed = 40; // pixels per second
  let pos = 0;
  let lastTime = null;

  function step(timestamp) {
    if (paused) { lastTime = timestamp; requestAnimationFrame(step); return; }
    if (lastTime == null) lastTime = timestamp;
    const delta = (timestamp - lastTime) / 1000; // seconds
    lastTime = timestamp;
    pos += speed * delta;

    // When pos exceeds width of first rail, wrap
   /*  const railWidth = rail.scrollWidth;
    if (pos >= railWidth) {
      pos -= railWidth;
    } */

    strip.scrollLeft = Math.floor(pos);
    requestAnimationFrame(step);
  }

  strip.addEventListener('mouseenter', () => { paused = true; });
  strip.addEventListener('mouseleave', () => { paused = false; });

  // start animation
  requestAnimationFrame(step);
})();

// Testimonial carousel
(function() {
  const carousel = document.getElementById('testimonialCarousel');
  if (!carousel) return;
  const items = Array.from(carousel.querySelectorAll('.testimonial-item'));
  let current = 0;
  let timer = null;
  const interval = 1500;

  function show(index) {
    items.forEach((it, i) => it.classList.toggle('active', i === index));
    // update aria-live by moving focusable element if needed
  }

  function start() {
    if (timer) return;
    timer = setInterval(() => {
      current = (current + 1) % items.length;
      show(current);
    }, interval);
  }

  function stop() { if (timer) { clearInterval(timer); timer = null; } }

  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);

  // initialize
  show(0);
  start();
})();
