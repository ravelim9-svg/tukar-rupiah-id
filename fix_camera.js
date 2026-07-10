const fs = require('fs');
let html = fs.readFileSync('D:/Aplikasiku/TukarRupiah.id/index.html', 'utf8');

const newEstimateFill = `function estimateFill(data,w,h){
  const BW=Math.max(6,Math.floor(w*0.05)),BH=Math.max(6,Math.floor(h*0.05));
  let bR=0,bG=0,bB=0,bN=0;
  const corners=[[0,0],[w-BW,0],[0,h-BH],[w-BW,h-BH]];
  for(let y=0;y<BH;y++)for(let x=0;x<BW;x++){
    corners.forEach(([ox,oy])=>{const i=((oy+y)*w+(ox+x))*4;bR+=data[i];bG+=data[i+1];bB+=data[i+2];bN++;});
  }
  const avgR=bN>0?bR/bN:180,avgG=bN>0?bG/bN:180,avgB=bN>0?bB/bN:180;
  
  const rowCount=new Int32Array(h);
  const colCount=new Int32Array(w);
  let objCount=0;
  
  for(let y=BH;y<h-BH;y+=2){
    for(let x=BW;x<w-BW;x+=2){
      const i=(y*w+x)*4;
      if(Math.abs(data[i]-avgR)+Math.abs(data[i+1]-avgG)+Math.abs(data[i+2]-avgB)>40){
        objCount++;
        rowCount[y]++;
        colCount[x]++;
      }
    }
  }
  
  let minX=w,maxX=0,minY=h,maxY=0;
  const colThresh = (h-2*BH)/2 * 0.1; // 10% of tested height
  const rowThresh = (w-2*BW)/2 * 0.1; // 10% of tested width
  
  for(let x=0;x<w;x++){
    if(colCount[x]>colThresh){if(x<minX)minX=x;if(x>maxX)maxX=x;}
  }
  for(let y=0;y<h;y++){
    if(rowCount[y]>rowThresh){if(y<minY)minY=y;if(y>maxY)maxY=y;}
  }
  
  if (minX > maxX || minY > maxY) return 0;
  
  // Guide box: X: 10% - 90%, Y: 27.5% - 72.5%
  const guideMinX = w * 0.1, guideMaxX = w * 0.9;
  const guideMinY = h * 0.275, guideMaxY = h * 0.725;
  
  // We want the object's bounding box to be relatively close to the guide box
  // It shouldn't be too small, and it shouldn't be totally off-center.
  const objW = maxX - minX;
  const objH = maxY - minY;
  const guideW = guideMaxX - guideMinX;
  const guideH = guideMaxY - guideMinY;
  
  const wRatio = objW / guideW;
  const hRatio = objH / guideH;
  
  // If the object fills at least 60% of the guide box width and height, and its center is near the guide box center.
  const objCx = minX + objW/2;
  const objCy = minY + objH/2;
  const guideCx = w/2;
  const guideCy = h/2;
  
  const distCx = Math.abs(objCx - guideCx) / w;
  const distCy = Math.abs(objCy - guideCy) / h;
  
  if (wRatio > 0.5 && hRatio > 0.5 && distCx < 0.15 && distCy < 0.15) {
     return 1.0; // Trigger lock immediately
  }
  return 0;
}`;

html = html.replace(/function estimateFill\([\s\S]*?async function lockAndAnalyze/, newEstimateFill + '\n\nasync function lockAndAnalyze');

html = html.replace('const OBJ_FILL_THR    = 0.30;', 'const OBJ_FILL_THR    = 0.80;');

fs.writeFileSync('D:/Aplikasiku/TukarRupiah.id/index.html', html, 'utf8');
console.log('Fixed estimateFill to match guide box mathematically.');
