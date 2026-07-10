const fs = require('fs');
let html = fs.readFileSync('D:/Aplikasiku/TukarRupiah.id/index.html', 'utf8');

const slideshowJS = `
  // Hero Slideshow
  const heroSlides = document.querySelectorAll('.hero-slideshow .slide');
  if (heroSlides.length > 0) {
    let currentSlide = 0;
    setInterval(() => {
      heroSlides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('active');
    }, 4000);
  }
`;

if (html.includes('// Hero Slideshow')) {
  console.log('Slideshow already exists.');
} else {
  html = html.replace('function renderHistory(){', slideshowJS + '\nfunction renderHistory(){');
  fs.writeFileSync('D:/Aplikasiku/TukarRupiah.id/index.html', html, 'utf8');
  console.log('Slideshow script injected successfully!');
}
