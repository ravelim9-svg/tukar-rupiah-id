const fs = require('fs');
let html = fs.readFileSync('D:/Aplikasiku/TukarRupiah.id/index.html', 'utf8');

const newEstimateFill = `function estimateFill(data,w,h){
  const rowCount=new Int32Array(h);
  const colCount=new Int32Array(w);
  let edgeCount=0;
  
  // Edge Detection Math
  for(let y=4;y<h-4;y+=2){
    for(let x=4;x<w-4;x+=2){
      const i=(y*w+x)*4;
      // Simple edge diff: current pixel vs pixel 4 steps away
      const edge = Math.abs(data[i]-data[i+16]) + Math.abs(data[i]-data[i+w*16]);
      if(edge > 25){
        edgeCount++;
        rowCount[y]++;
        colCount[x]++;
      }
    }
  }
  
  let minX=w,maxX=0,minY=h,maxY=0;
  const colThresh = 3; // minimal noise filtering
  const rowThresh = 3;
  
  for(let x=0;x<w;x++){
    if(colCount[x]>colThresh){if(x<minX)minX=x;if(x>maxX)maxX=x;}
  }
  for(let y=0;y<h;y++){
    if(rowCount[y]>rowThresh){if(y<minY)minY=y;if(y>maxY)maxY=y;}
  }
  
  if (minX > maxX || minY > maxY) return 0;
  
  const objW = maxX - minX;
  const objH = maxY - minY;
  const guideW = w * 0.8;
  const guideH = h * 0.45;
  
  const wRatio = objW / guideW;
  const hRatio = objH / guideH;
  
  const objCx = minX + objW/2;
  const objCy = minY + objH/2;
  const guideCx = w/2;
  const guideCy = h/2;
  
  const distCx = Math.abs(objCx - guideCx) / w;
  const distCy = Math.abs(objCy - guideCy) / h;
  
  // To trigger lock, the object must be quite large compared to guide box, and centered.
  if (wRatio > 0.6 && hRatio > 0.6 && distCx < 0.15 && distCy < 0.20) {
     return 1.0; 
  }
  return 0;
}`;

const newAnalyzeRupiah = `async function analyzeRupiah(canvas,w,h){
  const ctx=canvas.getContext('2d');
  const imgData=ctx.getImageData(0,0,w,h);
  const data=imgData.data;
  
  const rowCount=new Int32Array(h);
  const colCount=new Int32Array(w);
  let edgeCount=0, darkPx=0;
  
  // Edge detection for bounding box
  for(let y=4;y<h-4;y+=2){
    for(let x=4;x<w-4;x+=2){
      const i=(y*w+x)*4;
      const r=data[i],g=data[i+1],b=data[i+2];
      const edge = Math.abs(r-data[i+16]) + Math.abs(r-data[i+w*16]);
      
      if(edge > 25){
        edgeCount++;
        rowCount[y]++;
        colCount[x]++;
        
        const lum=0.299*r+0.587*g+0.114*b;
        if(lum<38)darkPx++;
      }
    }
  }
  
  let minX=w,maxX=0,minY=h,maxY=0;
  const colThresh = 4;
  const rowThresh = 4;
  
  for(let x=0;x<w;x++){
    if(colCount[x]>colThresh){if(x<minX)minX=x;if(x>maxX)maxX=x;}
  }
  for(let y=0;y<h;y++){
    if(rowCount[y]>rowThresh){if(y<minY)minY=y;if(y>maxY)maxY=y;}
  }
  
  updateLoadingStep(3);
  let nominal=null,nominalSource='unknown';
  try{const o=await detectNominalOCR(canvas);if(o.nominal){nominal=o.nominal;nominalSource='ocr';}}catch(e){}
  
  let boxW=Math.max(1,maxX-minX),boxH=Math.max(1,maxY-minY);
  if (edgeCount < (w*h*0.01) || minX>maxX || minY>maxY) { boxW = w; boxH = h; } 
  if (boxH > boxW) { const temp=boxW; boxW=boxH; boxH=temp; }
  
  const nomNum=nominal?parseInt(nominal.replace(/[^0-9]/g,'')):0;
  const stdAspect=moneyType==='logam'?1.0:(RUPIAH_ASPECT[nomNum]||DEFAULT_ASPECT);
  const currentAspect = boxW / boxH;
  
  let integrityPct = 100;
  if (currentAspect < stdAspect) {
     integrityPct = (currentAspect / stdAspect) * 100;
  } else {
     integrityPct = (stdAspect / currentAspect) * 100;
  }
  
  const darkRatio=edgeCount>0?darkPx/edgeCount:0;
  integrityPct = Math.max(0, Math.min(100, Math.round(integrityPct - (darkRatio*100))));
  
  const threshold=moneyType==='logam'?50:66.7;
  let verdict=integrityPct>threshold+5?'layak':integrityPct>=threshold-5?'marginal':'tidak';
  const conditionNotes=[];
  if(darkRatio>0.10)conditionNotes.push({type:'critical',text:'Terdapat bagian hangus/terbakar parah'});
  if(integrityPct<90)conditionNotes.push({type:'warning',text:'Proporsi geometri objek berkurang'});
  if(conditionNotes.length===0)conditionNotes.push({type:'ok',text:'Proporsi geometri presisi'});
  
  let verdictReason='';
  if(verdict==='layak')verdictReason='Geometri fisik > '+threshold+'%.';
  else if(verdict==='marginal')verdictReason='Geometri uang berada di batas kritis regulasi BI.';
  else verdictReason='Geometri fisik < '+threshold+'% dari standar.';
  
  return{
    integrityPercent:integrityPct,
    verdict,
    verdictReason,
    conditionNotes,
    threshold,
    moneyType,
    nominal:nominal||'Rp --',
    nominalSource
  };
}`;

html = html.replace(/function estimateFill\([\s\S]*?async function lockAndAnalyze/, newEstimateFill + '\n\nasync function lockAndAnalyze');
html = html.replace(/async function analyzeRupiah\([\s\S]*?function handleUpload/, newAnalyzeRupiah + '\n\nfunction handleUpload');

// Reset STABLE_NEEDED to be faster so user doesn't have to wait forever
html = html.replace('const STABLE_NEEDED   = 10;', 'const STABLE_NEEDED   = 5;');

fs.writeFileSync('D:/Aplikasiku/TukarRupiah.id/index.html', html, 'utf8');
console.log('100% mathematical edge-detection logic injected successfully.');
