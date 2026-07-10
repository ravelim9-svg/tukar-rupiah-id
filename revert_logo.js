const fs = require('fs');
let html = fs.readFileSync('D:/Aplikasiku/TukarRupiah.id/index.html', 'utf8');

const introLogoSvg = `<svg class="intro-logo-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g1" x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stop-color="#0080FF" />
            <stop offset="100%" stop-color="#002040" />
          </linearGradient>
          <linearGradient id="g2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#FFB300" />
            <stop offset="100%" stop-color="#FFE066" />
          </linearGradient>
          <filter id="fGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>
        <ellipse cx="60" cy="60" rx="55" ry="45" fill="url(#g1)" filter="url(#fGlow)"/>
        <!-- Outer glowing tech ring -->
        <ellipse cx="60" cy="60" rx="50" ry="40" stroke="url(#g2)" stroke-width="1.5" stroke-dasharray="15 5" opacity="0.6" />
        <path class="logo-letter-b" d="M 38 40 H 52 C 60 40 64 43 64 48 C 64 52 61 55 57 56.5 C 63 58 66 61 66 67 C 66 73 60 76 52 76 H 38 Z M 46 48 V 53 H 50 C 53 53 55 52 55 50.5 C 55 49 53 48 50 48 Z M 46 60 V 68 H 51 C 55 68 57 66 57 64 C 57 62 55 60 51 60 Z" fill="white"/>
        <path class="logo-letter-i" d="M 58 40 H 76 V 47 H 70.5 V 69 H 76 V 76 H 58 V 69 H 63.5 V 47 H 58 Z" fill="url(#g2)" style="mix-blend-mode: plus-lighter;" />
      </svg>`;

const headerLogoSvg = `<svg class="bi-logo-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gh1" x1="10%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stop-color="#0080FF" />
              <stop offset="100%" stop-color="#002040" />
            </linearGradient>
            <linearGradient id="gh2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#FFB300" />
              <stop offset="100%" stop-color="#FFE066" />
            </linearGradient>
          </defs>
          <ellipse cx="60" cy="60" rx="55" ry="45" fill="url(#gh1)" />
          <ellipse cx="60" cy="60" rx="50" ry="40" stroke="url(#gh2)" stroke-width="1.5" stroke-dasharray="15 5" opacity="0.6" />
          <path d="M 38 40 H 52 C 60 40 64 43 64 48 C 64 52 61 55 57 56.5 C 63 58 66 61 66 67 C 66 73 60 76 52 76 H 38 Z M 46 48 V 53 H 50 C 53 53 55 52 55 50.5 C 55 49 53 48 50 48 Z M 46 60 V 68 H 51 C 55 68 57 66 57 64 C 57 62 55 60 51 60 Z" fill="white"/>
          <path d="M 58 40 H 76 V 47 H 70.5 V 69 H 76 V 76 H 58 V 69 H 63.5 V 47 H 58 Z" fill="url(#gh2)" style="mix-blend-mode: plus-lighter;" />
        </svg>`;

const footerLogoSvg = `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:40px;height:40px;">
      <defs>
        <linearGradient id="gf1" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stop-color="#0080FF" />
          <stop offset="100%" stop-color="#002040" />
        </linearGradient>
        <linearGradient id="gf2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FFB300" />
          <stop offset="100%" stop-color="#FFE066" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="60" rx="55" ry="45" fill="url(#gf1)" />
      <path d="M 38 40 H 52 C 60 40 64 43 64 48 C 64 52 61 55 57 56.5 C 63 58 66 61 66 67 C 66 73 60 76 52 76 H 38 Z M 46 48 V 53 H 50 C 53 53 55 52 55 50.5 C 55 49 53 48 50 48 Z M 46 60 V 68 H 51 C 55 68 57 66 57 64 C 57 62 55 60 51 60 Z" fill="white"/>
      <path d="M 58 40 H 76 V 47 H 70.5 V 69 H 76 V 76 H 58 V 69 H 63.5 V 47 H 58 Z" fill="url(#gf2)" style="mix-blend-mode: plus-lighter;" />
    </svg>`;

// Intro logo replacement
html = html.replace(/<img src="bi-logo\.png" class="intro-logo-svg"[^>]*>/g, introLogoSvg);

// Header logo replacement
html = html.replace(/<img src="bi-logo\.png" class="bi-logo-svg"[^>]*>/g, headerLogoSvg);

// Footer logo replacement
html = html.replace(/<img src="bi-logo\.png" alt="Logo Bank Indonesia" style="width:48px;height:48px;object-fit:contain;" \/>/g, footerLogoSvg);

fs.writeFileSync('D:/Aplikasiku/TukarRupiah.id/index.html', html, 'utf8');
console.log('Restored SVG logos');
