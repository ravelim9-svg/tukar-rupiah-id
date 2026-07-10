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
  
  let objCount=0;
  for(let y=BH;y<h-BH;y+=3){
    for(let x=BW;x<w-BW;x+=3){
      const i=(y*w+x)*4;
      if(Math.abs(data[i]-avgR)+Math.abs(data[i+1]-avgG)+Math.abs(data[i+2]-avgB)>40){
        objCount++;
      }
    }
  }
  
  const totalPixels = ((w - 2*BW) / 3) * ((h - 2*BH) / 3);
  return objCount / totalPixels;
}`;

const newAnalyzeRupiah = `async function analyzeRupiah(canvas,w,h){
  const ctx=canvas.getContext('2d');
  const imgData=ctx.getImageData(0,0,w,h);
  const data=imgData.data;
  
  const BW=Math.max(10,Math.floor(w*0.05)),BH=Math.max(10,Math.floor(h*0.05));
  let eR=0,eG=0,eB=0,eN=0;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    if(x<BW||x>=w-BW||y<BH||y>=h-BH){const i=(y*w+x)*4;eR+=data[i];eG+=data[i+1];eB+=data[i+2];eN++;}
  }
  const bgR=eN>0?eR/eN:180,bgG=eN>0?eG/eN:180,bgB=eN>0?eB/eN:180;
  
  const rowCount=new Int32Array(h);
  const colCount=new Int32Array(w);
  let objPx=0,darkPx=0,sumR=0,sumG=0,sumB=0;
  
  for(let y=0;y<h;y++){
    for(let x=0;x<w;x++){
      const i=(y*w+x)*4;
      const r=data[i],g=data[i+1],b=data[i+2];
      const lum=0.299*r+0.587*g+0.114*b;
      const diff=Math.abs(r-bgR)+Math.abs(g-bgG)+Math.abs(b-bgB);
      
      if(diff>40){
        objPx++;
        rowCount[y]++;
        colCount[x]++;
        sumR+=r;sumG+=g;sumB+=b;
        if(lum<38)darkPx++;
      }
    }
  }
  
  let minX=w,maxX=0,minY=h,maxY=0;
  const colThresh = h * 0.05; // at least 5% of height must be object pixels to count as bounding box edge
  const rowThresh = w * 0.05; 
  
  for(let x=0;x<w;x++){
    if(colCount[x]>colThresh){if(x<minX)minX=x;if(x>maxX)maxX=x;}
  }
  for(let y=0;y<h;y++){
    if(rowCount[y]>rowThresh){if(y<minY)minY=y;if(y>maxY)maxY=y;}
  }
  
  updateLoadingStep(3);
  let nominal=null,nominalSource='unknown';
  try{const o=await detectNominalOCR(canvas);if(o.nominal){nominal=o.nominal;nominalSource='ocr';}}catch(e){}
  if(!nominal&&objPx>500){
    const est=estimateNominalByColor(sumR/objPx,sumG/objPx,sumB/objPx);
    if(est){nominal=est;nominalSource='color_estimate';}
  }
  
  let boxW=Math.max(1,maxX-minX),boxH=Math.max(1,maxY-minY);
  if (objPx < (w*h*0.1) || minX>maxX || minY>maxY) { boxW = w; boxH = h; } 
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
  
  const darkRatio=objPx>0?darkPx/objPx:0;
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

// Wait! ensure I don't accidentally leave "async async" if I replace it and it was already fixed.
// The regex `async function analyzeRupiah\([\s\S]*?function handleUpload` will match the current function and replace it.

fs.writeFileSync('D:/Aplikasiku/TukarRupiah.id/index.html', html, 'utf8');
console.log('Robust mathematical bounding box logic injected successfully.');
