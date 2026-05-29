// Client-side fallback generator that produces a full CV draft from supplied fields.
window.generateFullCV = function () {
  const name = document.getElementById("name").value.trim();
  const title = document.getElementById("title")?.value.trim() || '';
  const email = document.getElementById("email")?.value.trim() || '';
  const location = document.getElementById("location")?.value.trim() || '';
  const phone = document.getElementById("phone")?.value.trim() || '';
  const linkedin = document.getElementById("linkedin")?.value.trim() || '';
  const summary = document.getElementById("summary")?.value.trim() || '';
  const education = document.getElementById("education").value.trim();
  const skills = document.getElementById("skills").value.trim();
  const experience = document.getElementById("experience").value.trim();

  if (!name) {
    alert("Please enter at least your full name before generating a CV.");
    return;
  }

  // Build a concise professional summary if user left it blank
  let finalSummary = summary;
  if (!finalSummary) {
    const topSkills = skills ? skills.split(/[,\n]+/).map(s => s.trim()).filter(Boolean).slice(0, 6).join(', ') : '';
    finalSummary = `${name} is a ${title || 'dedicated professional'}${topSkills ? ' skilled in ' + topSkills : ''}. ${education ? 'Educated at ' + education + '.' : ''}`;
  }

  // Assemble a professional HTML CV
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${name} — CV</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
  <style>body{font-family:Inter,system-ui,sans-serif;color:#0f172a;padding:28px;max-width:900px;margin:auto}header{display:flex;justify-content:space-between;align-items:center}h1{margin:0;font-size:1.6rem}h2{margin:0;font-size:1.1rem;color:#1f2937}p.small{margin:6px 0;color:#475569}section{margin-top:18px}ul{margin:8px 0 0 18px} .meta{color:#475569}</style>
  </head><body>
  <header><div><h1>${name}</h1><div class="meta">${title || ''}</div><div class="meta">${email ? email + ' • ' : ''}${location ? location + ' • ' : ''}${phone ? phone : ''}</div><div class="meta">${linkedin}</div></div></header>
  <section><h2>Professional Summary</h2><p>${finalSummary}</p></section>
  <section><h2>Experience</h2><p>${experience ? experience.replace(/\n/g, '<br>') : 'No detailed experience provided. Add roles, achievements and outcomes.'}</p></section>
  <section><h2>Education</h2><p>${education ? education.replace(/\n/g, '<br>') : 'Add your institution, degree and dates.'}</p></section>
  <section><h2>Skills</h2><p>${skills ? skills.replace(/\n/g, ', ') : 'Add your strongest technical and soft skills.'}</p></section>
  <section style="margin-top:28px"><button id="downloadPdf" style="padding:10px 14px;border-radius:8px;border:none;background:#2563eb;color:#fff;cursor:pointer">Download as PDF</button></section>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
  <script>document.getElementById('downloadPdf').addEventListener('click',()=>{html2pdf().set({margin:0.4, filename:'${name.replace(/\s+/g, '_')}_CV.pdf'}).from(document.body).save();});</script>
  </body></html>`;

  const w = window.open('', '_blank');
  w.document.open();
  w.document.write(html);
  w.document.close();
};
