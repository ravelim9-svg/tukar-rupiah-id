const fs = require('fs');
let html = fs.readFileSync('D:/Aplikasiku/TukarRupiah.id/index.html', 'utf8');

const slideIdx = html.indexOf('// Hero Slideshow');
console.log('Slideshow JS found at char index:', slideIdx);
if (slideIdx > -1) {
  console.log(html.substring(slideIdx, slideIdx + 200));
}

const headerLogoIdx = html.indexOf('bi-logo-svg');
console.log('Header logo found at char index:', headerLogoIdx);
if (headerLogoIdx > -1) {
  console.log(html.substring(headerLogoIdx - 50, headerLogoIdx + 200));
}

const splashIdx = html.indexOf('introLoadFill');
console.log('Splash screen logic found at char index:', splashIdx);
if (splashIdx > -1) {
  console.log(html.substring(splashIdx - 100, splashIdx + 300));
}
