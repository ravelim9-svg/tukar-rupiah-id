const fs = require('fs');
let html = fs.readFileSync('D:/Aplikasiku/TukarRupiah.id/index.html', 'utf8');

// 1. Fix Slideshow: Wrap in DOMContentLoaded to ensure elements exist
const badSlideshow = `  // Hero Slideshow
  const heroSlides = document.querySelectorAll('.hero-slideshow .slide');
  if (heroSlides.length > 0) {
    let currentSlide = 0;
    setInterval(() => {
      heroSlides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('active');
    }, 4000);
  }`;

const goodSlideshow = `  // Hero Slideshow
  document.addEventListener('DOMContentLoaded', () => {
    const heroSlides = document.querySelectorAll('.hero-slideshow .slide');
    if (heroSlides.length > 0) {
      let currentSlide = 0;
      setInterval(() => {
        heroSlides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % heroSlides.length;
        heroSlides[currentSlide].classList.add('active');
      }, 4000);
    }
  });`;

if (html.includes(badSlideshow)) {
  html = html.replace(badSlideshow, goodSlideshow);
}

// 2. Fix Header Logo & Footer Logo ID collisions
// The issue is that the IDs in <defs> (like bgGrad, cyanGlow, superGlow) are identical
// in the header and footer SVG, causing the browser to fail rendering the gradients and filters.
// We will replace the SVGs completely with unique IDs.

const introLogoSvg = `<svg class="intro-logo-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#004A8B" />
      <stop offset="100%" stop-color="#001835" />
    </linearGradient>
    <linearGradient id="cyanGlow1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00D4FF" />
      <stop offset="100%" stop-color="#00508B" />
    </linearGradient>
    <linearGradient id="goldGrad1" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D4AF37" />
      <stop offset="50%" stop-color="#FFF2A8" />
      <stop offset="100%" stop-color="#AA7C11" />
    </linearGradient>
    <filter id="superGlow1" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <ellipse cx="60" cy="60" rx="60" ry="48" fill="url(#cyanGlow1)" opacity="0.3" filter="url(#superGlow1)" />
  <ellipse cx="60" cy="60" rx="56" ry="44" fill="url(#bgGrad1)" stroke="url(#cyanGlow1)" stroke-width="1.5" />
  <ellipse cx="60" cy="60" rx="50" ry="38" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />

  <path d="M 38 40 H 52 C 60 40 64 43 64 48 C 64 52 61 55 57 56.5 C 63 58 66 61 66 67 C 66 73 60 76 52 76 H 38 Z M 46 48 V 53 H 50 C 53 53 55 52 55 50.5 C 55 49 53 48 50 48 Z M 46 60 V 68 H 51 C 55 68 57 66 57 64 C 57 62 55 60 51 60 Z" fill="#FFFFFF" filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.5))" />
  <path d="M 58 40 H 76 V 47 H 70.5 V 69 H 76 V 76 H 58 V 69 H 63.5 V 47 H 58 Z" fill="url(#goldGrad1)" filter="drop-shadow(0px 4px 8px rgba(212,175,55,0.6))" />
  <circle cx="85" cy="30" r="2" fill="#FFFFFF" filter="url(#superGlow1)" />
</svg>`;

const headerLogoSvg = `<svg class="bi-logo-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#004A8B" />
      <stop offset="100%" stop-color="#001835" />
    </linearGradient>
    <linearGradient id="cyanGlow2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00D4FF" />
      <stop offset="100%" stop-color="#00508B" />
    </linearGradient>
    <linearGradient id="goldGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D4AF37" />
      <stop offset="50%" stop-color="#FFF2A8" />
      <stop offset="100%" stop-color="#AA7C11" />
    </linearGradient>
    <filter id="superGlow2" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <ellipse cx="60" cy="60" rx="60" ry="48" fill="url(#cyanGlow2)" opacity="0.3" filter="url(#superGlow2)" />
  <ellipse cx="60" cy="60" rx="56" ry="44" fill="url(#bgGrad2)" stroke="url(#cyanGlow2)" stroke-width="1.5" />
  <ellipse cx="60" cy="60" rx="50" ry="38" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />

  <path d="M 38 40 H 52 C 60 40 64 43 64 48 C 64 52 61 55 57 56.5 C 63 58 66 61 66 67 C 66 73 60 76 52 76 H 38 Z M 46 48 V 53 H 50 C 53 53 55 52 55 50.5 C 55 49 53 48 50 48 Z M 46 60 V 68 H 51 C 55 68 57 66 57 64 C 57 62 55 60 51 60 Z" fill="#FFFFFF" filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.5))" />
  <path d="M 58 40 H 76 V 47 H 70.5 V 69 H 76 V 76 H 58 V 69 H 63.5 V 47 H 58 Z" fill="url(#goldGrad2)" filter="drop-shadow(0px 4px 8px rgba(212,175,55,0.6))" />
  <circle cx="85" cy="30" r="2" fill="#FFFFFF" filter="url(#superGlow2)" />
</svg>`;

const footerLogoSvg = `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:40px;height:40px;">
  <defs>
    <linearGradient id="fBgGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#004A8B" />
      <stop offset="100%" stop-color="#001835" />
    </linearGradient>
    <linearGradient id="fCyanGlow3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00D4FF" />
      <stop offset="100%" stop-color="#00508B" />
    </linearGradient>
    <linearGradient id="fGoldGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D4AF37" />
      <stop offset="50%" stop-color="#FFF2A8" />
      <stop offset="100%" stop-color="#AA7C11" />
    </linearGradient>
  </defs>
  <ellipse cx="60" cy="60" rx="56" ry="44" fill="url(#fBgGrad3)" stroke="url(#fCyanGlow3)" stroke-width="1.5" />
  <path d="M 38 40 H 52 C 60 40 64 43 64 48 C 64 52 61 55 57 56.5 C 63 58 66 61 66 67 C 66 73 60 76 52 76 H 38 Z M 46 48 V 53 H 50 C 53 53 55 52 55 50.5 C 55 49 53 48 50 48 Z M 46 60 V 68 H 51 C 55 68 57 66 57 64 C 57 62 55 60 51 60 Z" fill="#FFFFFF" />
  <path d="M 58 40 H 76 V 47 H 70.5 V 69 H 76 V 76 H 58 V 69 H 63.5 V 47 H 58 Z" fill="url(#fGoldGrad3)" />
</svg>`;

html = html.replace(/<svg class="intro-logo-svg"[\s\S]*?<\/svg>/, introLogoSvg);
html = html.replace(/<svg class="bi-logo-svg"[\s\S]*?<\/svg>/, headerLogoSvg);
html = html.replace(/<svg viewBox="0 0 120 120" fill="none" xmlns="http:\/\/www\.w3\.org\/2000\/svg" style="width:40px;height:40px;">[\s\S]*?<\/svg>/, footerLogoSvg);


// 3. Make the Splash screen ultra fast but still animated smoothly.
// It used to be: p+=Math.random()*7+3;
html = html.replace('p+=Math.random()*7+3;', 'p+=25;');
html = html.replace('setTimeout(function(){sp.style.display=\'none\';},750)', 'setTimeout(function(){sp.style.display=\'none\';},350)');


fs.writeFileSync('D:/Aplikasiku/TukarRupiah.id/index.html', html, 'utf8');
console.log('Update complete.');
