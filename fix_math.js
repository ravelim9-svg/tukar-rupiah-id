const fs = require('fs');
let html = fs.readFileSync('D:/Aplikasiku/TukarRupiah.id/index.html', 'utf8');

const newEstimateFill = `function estimateFill(data,w,h){
  const BW=Math.max(6,Math.floor(w*0.05)),BH=Math.max(6,Math.floor(h*0.05));
  let bR=0,bG=0,bB=0,bN=0;
  // Calculate average background color from the very corners
  const corners=[[0,0],[w-BW,0],[0,h-BH],[w-BW,h-BH]];
  for(let y=0;y<BH;y++)for(let x=0;x<BW;x++){
    corners.forEach(([ox,oy])=>{const i=((oy+y)*w+(ox+x))*4;bR+=data[i];bG+=data[i+1];bB+=data[i+2];bN++;});
  }
  const avgR=bN>0?bR/bN:180,avgG=bN>0?bG/bN:180,avgB=bN>0?bB/bN:180;
  
  // Find bounding box of the object
  let minX=w,maxX=0,minY=h,maxY=0,objCount=0;
  for(let y=BH;y<h-BH;y+=3){
    for(let x=BW;x<w-BW;x+=3){
      const i=(y*w+x)*4;
      if(Math.abs(data[i]-avgR)+Math.abs(data[i+1]-avgG)+Math.abs(data[i+2]-avgB)>35){
        if(x<minX)minX=x;if(x>maxX)maxX=x;
        if(y<minY)minY=y;if(y>maxY)maxY=y;
        objCount++;
      }
    }
  }
  
  // Guide box is roughly 10% to 90% width, 27.5% to 72.5% height
  const guideMinX = w * 0.1, guideMaxX = w * 0.9;
  const guideMinY = h * 0.275, guideMaxY = h * 0.725;
  const guideArea = (guideMaxX - guideMinX) * (guideMaxY - guideMinY);
  
  if (minX > maxX || minY > maxY) return 0; // No object found
  
  // Check if the object bounding box covers a significant portion of the guide box
  const objBoxW = maxX - minX;
  const objBoxH = maxY - minY;
  const objArea = objBoxW * objBoxH;
  
  // If the object roughly matches the guide box dimensions, return a high fill ratio to trigger lock
  const fillRatio = objArea / guideArea;
  
  // Mathematically check if it's placed inside the box
  if (minX > guideMinX - 20 && maxX < guideMaxX + 20 && fillRatio > 0.6) {
    return fillRatio; // Good match
  }
  return 0; // Not inside the box or too small
}

async function lockAndAnalyze`;

const newAnalyzeRupiah = `function analyzeRupiah(canvas,w,h){
  const ctx=canvas.getContext('2d');
  const imgData=ctx.getImageData(0,0,w,h);
  const data=imgData.data;
  
  // Simple edge background detection
  const BW=Math.max(10,Math.floor(w*0.05)),BH=Math.max(10,Math.floor(h*0.05));
  let eR=0,eG=0,eB=0,eN=0;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    if(x<BW||x>=w-BW||y<BH||y>=h-BH){const i=(y*w+x)*4;eR+=data[i];eG+=data[i+1];eB+=data[i+2];eN++;}
  }
  const bgR=eN>0?eR/eN:180,bgG=eN>0?eG/eN:180,bgB=eN>0?eB/eN:180;
  
  // Find bounding box and total pixels
  let objPx=0,darkPx=0;
  let minX=w,maxX=0,minY=h,maxY=0,sumR=0,sumG=0,sumB=0;
  
  for(let y=0;y<h;y++){
    for(let x=0;x<w;x++){
      const i=(y*w+x)*4;
      const r=data[i],g=data[i+1],b=data[i+2];
      const lum=0.299*r+0.587*g+0.114*b;
      const diff=Math.abs(r-bgR)+Math.abs(g-bgG)+Math.abs(b-bgB);
      
      // If pixel is significantly different from background
      if(diff>40){
        objPx++;
        if(x<minX)minX=x;if(x>maxX)maxX=x;if(y<minY)minY=y;if(y>maxY)maxY=y;
        sumR+=r;sumG+=g;sumB+=b;
        if(lum<38)darkPx++;
      }
    }
  }
  updateLoadingStep(3);
  let nominal=null,nominalSource='unknown';
  try{const o=await detectNominalOCR(canvas);if(o.nominal){nominal=o.nominal;nominalSource='ocr';}}catch(e){}
  if(!nominal&&objPx>500){
    const est=estimateNominalByColor(sumR/objPx,sumG/objPx,sumB/objPx);
    if(est){nominal=est;nominalSource='color_estimate';}
  }
  
  // RUMUS MATEMATIKA: Mengukur ukuran berdasarkan rasio geometris
  // Bukan sekedar melihat jumlah pixel.
  let boxW=Math.max(1,maxX-minX),boxH=Math.max(1,maxY-minY);
  
  // Jika gambar dari upload sangat ketat (cropped), boxW dan boxH akan mendekati dimensi gambar.
  if (objPx < 100) { boxW = w; boxH = h; } // fallback jika background detection gagal pada gambar upload
  
  // Pastikan orientasi memanjang selalu boxW (asumsi uang selalu lebih panjang/lebar dari tingginya)
  if (boxH > boxW) { const temp=boxW; boxW=boxH; boxH=temp; }
  
  const nomNum=nominal?parseInt(nominal.replace(/[^0-9]/g,'')):0;
  // Rasio uang standar (Lebar / Tinggi). Kertas rata-rata 2.15 - 2.25. Logam 1.0.
  const stdAspect=moneyType==='logam'?1.0:(RUPIAH_ASPECT[nomNum]||DEFAULT_ASPECT);
  
  // Rasio matematika gambar saat ini
  const currentAspect = boxW / boxH;
  
  // Perhitungan Keutuhan (Persen) secara Matematis Geometris:
  let integrityPct = 100;
  if (currentAspect < stdAspect) {
     // Jika rasio lebih kecil, berarti lebarnya berkurang (Terpotong vertikal)
     integrityPct = (currentAspect / stdAspect) * 100;
  } else {
     // Jika rasio lebih besar, berarti tingginya berkurang (Terpotong horizontal)
     integrityPct = (stdAspect / currentAspect) * 100;
  }
  
  // Penalty untuk bagian yang terbakar (pixel sangat gelap)
  const darkRatio=objPx>0?darkPx/objPx:0;
  const damagePenalty=darkRatio*100;
  integrityPct = Math.max(0, Math.min(100, Math.round(integrityPct - damagePenalty)));
  
  const threshold=moneyType==='logam'?50:66.7;
  let verdict=integrityPct>threshold+5?'layak':integrityPct>=threshold-5?'marginal':'tidak';
  const conditionNotes=[];
  if(darkRatio>0.10)conditionNotes.push({type:'critical',text:'Terdapat bagian hangus/terbakar parah'});
  if(integrityPct<90)conditionNotes.push({type:'warning',text:'Proporsi ukuran uang tidak utuh secara matematis'});
  if(conditionNotes.length===0)conditionNotes.push({type:'ok',text:'Proporsi ukuran fisik masih sangat presisi'});
  
  let verdictReason='';
  if(verdict==='layak')verdictReason='Fisik uang > '+threshold+'% secara matematis.';
  else if(verdict==='marginal')verdictReason='Geometri uang berada di batas kritis regulasi BI.';
  else verdictReason='Fisik uang < '+threshold+'% dari ukuran standar BI.';
  
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

html = html.replace(/function estimateFill\([\s\S]*?async function lockAndAnalyze/, newEstimateFill);

// The analyzeRupiah function ends right before function handleUpload.
html = html.replace(/function analyzeRupiah\([\s\S]*?function handleUpload/, newAnalyzeRupiah + '\n\nfunction handleUpload');

fs.writeFileSync('D:/Aplikasiku/TukarRupiah.id/index.html', html, 'utf8');
console.log('Mathematical geometric logic injected successfully.');
