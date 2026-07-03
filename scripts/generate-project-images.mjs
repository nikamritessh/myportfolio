#!/usr/bin/env node
/**
 * Generates distinct, project-specific UI mockups for portfolio cards.
 * Each project uses a unique layout — not a shared dashboard template.
 * Run: node scripts/generate-project-images.mjs
 */
import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const W = 1600;
const H = 1100;

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function svg(content) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
${content}
</svg>`;
}

function panel(x, y, w, h, fill, stroke, r = 12) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"${stroke ? ` stroke="${stroke}"` : ''}/>`;
}

function text(x, y, str, opts = {}) {
  const { size = 14, fill = '#fff', weight = 400, anchor, family = 'system-ui,sans-serif' } = opts;
  const anchorAttr = anchor ? ` text-anchor="${anchor}"` : '';
  return `<text x="${x}" y="${y}" fill="${fill}" font-family="${family}" font-size="${size}" font-weight="${weight}"${anchorAttr}>${esc(str)}</text>`;
}

/* ─── HERO: voice AI + LLM engineering workspace (homepage) ─── */
function hero() {
  return svg(`
  <defs>
    <linearGradient id="hero-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#111827"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#hero-bg)"/>
  ${text(60, 56, 'Engineering Workspace', { size: 13, fill: '#64748b' })}
  ${text(60, 88, 'Voice AI · LLM Products · Automation', { size: 22, weight: 700, fill: '#f8fafc' })}
  <!-- Voice AI calls panel -->
  ${panel(60, 120, 520, 420, '#1e293b', '#334155')}
  ${text(90, 160, 'Voice AI — Live Calls', { size: 16, weight: 600, fill: '#e2e8f0' })}
  <circle cx="480" cy="150" r="6" fill="#22c55e"/>
  ${text(460, 150, 'Live', { size: 11, fill: '#22c55e', anchor: 'end' })}
  ${[{name:'Sarah M.',status:'AI handling',dur:'2:34',c:'#3b82f6'},{name:'James K.',status:'Transferring',dur:'0:48',c:'#f59e0b'},{name:'Priya S.',status:'Completed',dur:'4:12',c:'#22c55e'},{name:'Alex R.',status:'AI handling',dur:'1:05',c:'#3b82f6'}].map((c,i)=>{
    const y=190+i*72;
    return `${panel(90,y,460,60,'#0f172a','#334155',8)}<circle cx="118" cy="${y+30}" r="16" fill="${c.c}22" stroke="${c.c}"/>${text(148,y+26,c.name,{size:14,weight:600,fill:'#f1f5f9'})}${text(148,y+46,c.status,{size:12,fill:c.c})}${text(500,y+34,c.dur,{size:13,fill:'#94a3b8',anchor:'end'})}`;
  }).join('')}
  ${panel(90, 490, 220, 36, '#1d4ed8', null, 8)}
  ${text(200, 513, '🎤 Voice Pipeline Active', { size: 12, weight: 600, fill: '#fff', anchor: 'middle' })}
  <!-- LLM pipeline -->
  ${panel(620, 120, 920, 200, '#1e293b', '#334155')}
  ${text(650, 160, 'LLM Pipeline', { size: 16, weight: 600, fill: '#e2e8f0' })}
  ${[{l:'Input',s:'Speech-to-text'},{l:'GPT-4',s:'Reasoning'},{l:'RAG',s:'Context'},{l:'TTS',s:'Voice output'}].map((n,i)=>{
    const x=650+i*220;
    return `${panel(x,180,180,100,n.l==='GPT-4'?'#312e81':'#0f172a',n.l==='GPT-4'?'#6366f1':'#475569',8)}${text(x+90,220,n.l,{size:14,weight:600,fill:n.l==='GPT-4'?'#e0e7ff':'#e2e8f0',anchor:'middle'})}${text(x+90,245,n.s,{size:11,fill:'#94a3b8',anchor:'middle'})}${i<3?`<line x1="${x+180}" y1="230" x2="${x+210}" y2="230" stroke="#6366f1" stroke-width="2"/><polygon points="${x+210},230 ${x+198},224 ${x+198},236" fill="#6366f1"/>`:''}`;
  }).join('')}
  <!-- Stack + metrics -->
  ${panel(620, 350, 440, 360, '#1e293b', '#334155')}
  ${text(650, 390, 'Production Stack', { size: 16, weight: 600, fill: '#e2e8f0' })}
  ${['FastAPI','Next.js','PostgreSQL','WebSockets','Docker','OpenAI'].map((t,i)=>{
    const x=650+(i%2)*200; const y=420+Math.floor(i/2)*52;
    return `${panel(x,y,180,40,'#0f172a','#475569',8)}${text(x+90,y+26,t,{size:13,fill:'#cbd5e1',anchor:'middle'})}`;
  }).join('')}
  <!-- Analytics -->
  ${panel(1100, 350, 440, 360, '#1e293b', '#334155')}
  ${text(1130, 390, 'Call Analytics', { size: 16, weight: 600, fill: '#e2e8f0' })}
  ${[{l:'Calls Today',v:'847'},{l:'AI Resolved',v:'72%'},{l:'Avg Latency',v:'180ms'}].map((m,i)=>{
    const y=430+i*80;
    return `${text(1130,y,m.l,{size:12,fill:'#94a3b8'})}${text(1130,y+32,m.v,{size:28,weight:700,fill:'#38bdf8'})}`;
  }).join('')}
  <polyline points="1130,620 1200,590 1270,600 1340,560 1410,540 1480,520" fill="none" stroke="#38bdf8" stroke-width="2.5"/>
  <!-- Code editor strip -->
  ${panel(60, 560, 520, 480, '#0d1117', '#30363d')}
  ${text(90, 600, 'api/voice/route.py', { size: 12, fill: '#8b949e', family: 'monospace' })}
  ${text(90, 640, '@router.post("/call/handle")', { size: 13, fill: '#ff7b72', family: 'monospace' })}
  ${text(90, 670, 'async def handle_call(audio: UploadFile):', { size: 13, fill: '#d2a8ff', family: 'monospace' })}
  ${text(90, 700, '    transcript = await stt.transcribe(audio)', { size: 13, fill: '#e6edf3', family: 'monospace' })}
  ${text(90, 730, '    response = await llm.generate(transcript)', { size: 13, fill: '#e6edf3', family: 'monospace' })}
  ${text(90, 760, '    return await tts.synthesize(response)', { size: 13, fill: '#e6edf3', family: 'monospace' })}
  ${text(90, 820, '# FastAPI + WebSockets + OpenAI', { size: 12, fill: '#3fb950', family: 'monospace' })}
  <!-- Next.js UI preview -->
  ${panel(620, 740, 920, 300, '#0f172a', '#334155')}
  ${text(650, 780, 'Next.js Dashboard — OutCallerAI', { size: 16, weight: 600, fill: '#e2e8f0' })}
  ${panel(650, 810, 260, 180, '#1e293b', '#475569', 8)}
  ${text(780, 860, 'Campaigns', { size: 13, fill: '#94a3b8', anchor: 'middle' })}
  ${text(780, 900, '14 active', { size: 22, weight: 700, fill: '#f8fafc', anchor: 'middle' })}
  ${panel(940, 810, 260, 180, '#1e293b', '#475569', 8)}
  ${text(1070, 860, 'Automations', { size: 13, fill: '#94a3b8', anchor: 'middle' })}
  ${text(1070, 900, '8 flows', { size: 22, weight: 700, fill: '#f8fafc', anchor: 'middle' })}
  ${panel(1230, 810, 280, 180, '#1e293b', '#475569', 8)}
  ${text(1370, 860, 'API Uptime', { size: 13, fill: '#94a3b8', anchor: 'middle' })}
  ${text(1370, 900, '99.9%', { size: 22, weight: 700, fill: '#22c55e', anchor: 'middle' })}
`);
}

/* ─── HEALIX: therapy chat + mood tracker (mobile health app) ─── */
function healix() {
  return svg(`
  <defs>
    <linearGradient id="healix-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c4a6e"/><stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#healix-bg)"/>
  ${text(80, 70, 'Healix', { size: 28, weight: 700 })}
  ${text(80, 100, 'AI Health Companion', { size: 15, fill: '#7dd3fc' })}
  <!-- Phone mockup -->
  ${panel(80, 140, 420, 860, '#0f172a', '#1e40af', 32)}
  <rect x="230" y="160" width="120" height="6" rx="3" fill="#334155"/>
  ${text(110, 210, 'AI Therapy Session', { size: 13, fill: '#94a3b8' })}
  ${panel(110, 230, 280, 72, '#1e3a5f', null, 16)}
  ${text(126, 258, 'How are you feeling right now?', { size: 13, fill: '#e2e8f0' })}
  ${text(126, 280, 'I noticed your heart rate is elevated.', { size: 12, fill: '#94a3b8' })}
  ${panel(210, 320, 250, 56, '#1d4ed8', null, 16)}
  ${text(226, 352, "I'm feeling anxious about work", { size: 12, fill: '#fff' })}
  ${panel(110, 396, 300, 100, '#1e3a5f', null, 16)}
  ${text(126, 424, 'Let\'s try a grounding exercise.', { size: 13, fill: '#e2e8f0' })}
  ${text(126, 446, 'Name 5 things you can see around you.', { size: 12, fill: '#7dd3fc' })}
  ${text(126, 468, 'Take a slow breath in... 4 counts.', { size: 12, fill: '#94a3b8' })}
  ${panel(110, 520, 120, 36, '#164e63', '#0891b2', 18)}
  ${text(148, 543, '🎤 Voice', { size: 12, fill: '#67e8f9', anchor: 'middle' })}
  ${panel(250, 520, 120, 36, '#1e3a5f', '#334155', 18)}
  ${text(288, 543, 'Symptoms', { size: 12, fill: '#94a3b8', anchor: 'middle' })}
  <!-- Mood calendar -->
  ${panel(560, 140, 960, 400, '#0f172a', '#1e293b')}
  ${text(590, 180, 'Mood Tracker — This Week', { size: 18, weight: 600 })}
  ${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d, i) => {
    const moods = ['😔','😐','🙂','😟','🙂','😊','😊'];
    const colors = ['#475569','#64748b','#3b82f6','#64748b','#3b82f6','#22c55e','#22c55e'];
    const x = 590 + i * 120;
    return `
      ${text(x + 30, 230, d, { size: 12, fill: '#64748b', anchor: 'middle' })}
      ${panel(x, 250, 60, 60, colors[i] + '33', colors[i], 12)}
      ${text(x + 30, 290, moods[i], { size: 28, anchor: 'middle' })}
    `;
  }).join('')}
  ${panel(590, 340, 880, 8, '#1e293b', null, 4)}
  ${text(590, 380, 'Risk Level', { size: 12, fill: '#64748b' })}
  ${text(590, 410, 'Low — Stable', { size: 22, weight: 700, fill: '#22c55e' })}
  ${panel(900, 360, 200, 12, '#1e293b', null, 6)}
  <rect x="900" y="360" width="160" height="12" rx="6" fill="#22c55e"/>
  <!-- Symptom checker -->
  ${panel(560, 580, 460, 420, '#0f172a', '#1e293b')}
  ${text(590, 620, 'Symptom Checker', { size: 18, weight: 600 })}
  ${panel(590, 650, 400, 48, '#1e293b', '#334155', 8)}
  ${text(606, 680, 'Describe your symptoms in plain language...', { size: 13, fill: '#64748b' })}
  ${['Headache','Fatigue','Nausea','Dizziness'].map((s, i) =>
    `${panel(590 + (i%2)*210, 720 + Math.floor(i/2)*50, 190, 36, '#1e3a5f', '#1d4ed8', 8)}
     ${text(606 + (i%2)*210, 743 + Math.floor(i/2)*50, s, { size: 12, fill: '#93c5fd' })}`
  ).join('')}
  ${panel(590, 830, 400, 48, '#166534', null, 8)}
  ${text(790, 860, 'Analyze Symptoms', { size: 14, weight: 600, fill: '#fff', anchor: 'middle' })}
  <!-- Emergency -->
  ${panel(1060, 580, 460, 420, '#450a0a', '#991b1b')}
  ${text(1090, 620, 'Emergency Navigator', { size: 18, weight: 600, fill: '#fecaca' })}
  ${text(1090, 660, 'Step 1', { size: 12, fill: '#f87171' })}
  ${text(1090, 690, 'Stay calm. Call emergency services if needed.', { size: 14, fill: '#fecaca' })}
  ${text(1090, 740, 'Step 2', { size: 12, fill: '#f87171' })}
  ${text(1090, 770, 'Check breathing — slow, deep breaths.', { size: 14, fill: '#fecaca' })}
  ${text(1090, 820, 'Step 3', { size: 12, fill: '#f87171' })}
  ${text(1090, 850, 'Nearest hospital: 2.3 km away', { size: 14, fill: '#fecaca' })}
  ${panel(1090, 900, 380, 56, '#dc2626', null, 12)}
  ${text(1280, 935, '📞 Call Emergency', { size: 16, weight: 600, anchor: 'middle' })}
`);
}

/* ─── AUTONIQX: workflow builder + email preview ─── */
function autoniqx() {
  return svg(`
  <rect width="${W}" height="${H}" fill="#0f0a1a"/>
  ${text(60, 56, 'AUTONIQX', { size: 24, weight: 700, fill: '#e9d5ff' })}
  ${text(60, 82, 'Workflow Builder', { size: 14, fill: '#a78bfa' })}
  <!-- Canvas -->
  ${panel(60, 110, 900, 700, '#1a1025', '#2d1f45')}
  ${text(90, 150, 'Campaign: Product Launch Q1', { size: 16, weight: 600, fill: '#e9d5ff' })}
  <!-- Workflow nodes -->
  ${panel(120, 220, 160, 80, '#4c1d95', '#7c3aed', 12)}
  ${text(200, 255, 'Trigger', { size: 14, weight: 600, fill: '#e9d5ff', anchor: 'middle' })}
  ${text(200, 278, 'New signup', { size: 11, fill: '#c4b5fd', anchor: 'middle' })}
  <line x1="280" y1="260" x2="340" y2="260" stroke="#7c3aed" stroke-width="2" marker-end="url(#arrow)"/>
  ${panel(340, 220, 160, 80, '#5b21b6', '#8b5cf6', 12)}
  ${text(420, 255, 'AI Draft', { size: 14, weight: 600, fill: '#fff', anchor: 'middle' })}
  ${text(420, 278, 'GPT-4 personalize', { size: 11, fill: '#ddd6fe', anchor: 'middle' })}
  <line x1="500" y1="260" x2="560" y2="260" stroke="#7c3aed" stroke-width="2"/>
  ${panel(560, 220, 160, 80, '#4c1d95', '#7c3aed', 12)}
  ${text(640, 255, 'Review', { size: 14, weight: 600, fill: '#e9d5ff', anchor: 'middle' })}
  ${text(640, 278, 'Optional approval', { size: 11, fill: '#c4b5fd', anchor: 'middle' })}
  <line x1="720" y1="260" x2="780" y2="260" stroke="#7c3aed" stroke-width="2"/>
  ${panel(780, 220, 140, 80, '#6d28d9', '#a78bfa', 12)}
  ${text(850, 255, 'Send', { size: 14, weight: 600, fill: '#fff', anchor: 'middle' })}
  ${text(850, 278, 'SendGrid API', { size: 11, fill: '#ddd6fe', anchor: 'middle' })}
  <!-- Branch -->
  <line x1="420" y1="300" x2="420" y2="360" stroke="#7c3aed" stroke-width="2"/>
  ${panel(340, 360, 160, 80, '#4c1d95', '#7c3aed', 12)}
  ${text(420, 395, 'Wait 3 days', { size: 14, weight: 600, fill: '#e9d5ff', anchor: 'middle' })}
  ${text(420, 418, 'No reply?', { size: 11, fill: '#c4b5fd', anchor: 'middle' })}
  <line x1="500" y1="400" x2="560" y2="400" stroke="#7c3aed" stroke-width="2"/>
  ${panel(560, 360, 160, 80, '#5b21b6', '#8b5cf6', 12)}
  ${text(640, 395, 'Follow-up', { size: 14, weight: 600, fill: '#fff', anchor: 'middle' })}
  ${text(640, 418, 'AI re-engage', { size: 11, fill: '#ddd6fe', anchor: 'middle' })}
  <!-- Stats row -->
  ${[{l:'Open Rate',v:'34.2%',c:'#22c55e'},{l:'Click Rate',v:'8.7%',c:'#22c55e'},{l:'Sent',v:'12.4K',c:'#a78bfa'},{l:'Active',v:'14',c:'#f59e0b'}].map((m,i)=>{
    const x=120+i*200;
    return `${panel(x,520,180,100,'#1a1025','#2d1f45')}${text(x+20,550,m.l,{size:12,fill:'#a78bfa'})}${text(x+20,590,m.v,{size:28,weight:700,fill:m.c})}`;
  }).join('')}
  <!-- Email preview -->
  ${panel(1000, 110, 540, 700, '#faf5ff', '#e9d5ff')}
  ${text(1030, 150, 'Email Preview', { size: 16, weight: 600, fill: '#4c1d95' })}
  ${panel(1030, 170, 480, 36, '#f3e8ff', '#ddd6fe', 6)}
  ${text(1046, 193, 'To: sarah@company.com', { size: 12, fill: '#6b21a8' })}
  ${panel(1030, 220, 480, 36, '#f3e8ff', '#ddd6fe', 6)}
  ${text(1046, 243, 'Subject: Your personalized product demo', { size: 12, fill: '#6b21a8' })}
  ${panel(1030, 280, 480, 480, '#fff', '#e9d5ff', 8)}
  ${text(1060, 320, 'Hi Sarah,', { size: 14, fill: '#1e1b4b' })}
  ${text(1060, 360, 'Based on your interest in automation,', { size: 13, fill: '#4c1d95' })}
  ${text(1060, 385, 'I put together a quick walkthrough', { size: 13, fill: '#4c1d95' })}
  ${text(1060, 410, 'tailored to your team\'s workflow...', { size: 13, fill: '#4c1d95' })}
  ${panel(1060, 450, 200, 40, '#7c3aed', null, 8)}
  ${text(1160, 476, 'Book a Demo', { size: 13, weight: 600, fill: '#fff', anchor: 'middle' })}
  <!-- Bottom campaign list -->
  ${panel(60, 840, 1480, 220, '#1a1025', '#2d1f45')}
  ${text(90, 880, 'Active Campaigns', { size: 16, weight: 600, fill: '#e9d5ff' })}
  ${['Product Launch Q1|Enterprise|Running|38%','Re-engagement|Inactive 30d|Running|29%','Onboarding|New users|Scheduled|—'].map((row,i)=>{
    const [name,seg,status,pct]=row.split('|');
    const y=910+i*44;
    const sc=status==='Running'?'#22c55e':status==='Scheduled'?'#f59e0b':'#94a3b8';
    return `${text(90,y,name,{size:13,fill:'#e9d5ff'})}${text(400,y,seg,{size:12,fill:'#a78bfa'})}${text(700,y,status,{size:12,fill:sc})}${text(900,y,pct,{size:13,fill:'#c4b5fd'})}`;
  }).join('')}
`);
}

/* ─── FORESENSE: resume editor + ATS panel ─── */
function foresense() {
  return svg(`
  <rect width="${W}" height="${H}" fill="#f0fdf4"/>
  ${text(60, 56, 'FORESENSE', { size: 24, weight: 700, fill: '#14532d' })}
  ${text(60, 82, 'Resume Intelligence Platform', { size: 14, fill: '#16a34a' })}
  <!-- Resume doc -->
  ${panel(60, 110, 680, 920, '#fff', '#d1fae5')}
  ${text(100, 150, 'Resume Editor', { size: 16, weight: 600, fill: '#14532d' })}
  ${text(100, 200, 'RITESH NIKAM', { size: 22, weight: 700, fill: '#0f172a' })}
  ${text(100, 228, 'Full Stack AI Engineer · Mumbai', { size: 13, fill: '#64748b' })}
  <line x1="100" y1="250" x2="700" y2="250" stroke="#d1fae5" stroke-width="2"/>
  ${text(100, 280, 'EXPERIENCE', { size: 12, weight: 600, fill: '#16a34a' })}
  ${text(100, 310, 'Software Engineer — Singularity Technologies', { size: 14, weight: 600, fill: '#0f172a' })}
  ${text(100, 332, 'Built OutCallerAI features with FastAPI + Next.js', { size: 13, fill: '#475569' })}
  <rect x="100" y="345" width="280" height="18" rx="2" fill="#fef08a" opacity="0.6"/>
  ${text(100, 370, '• Integrated OpenAI GPT-4 for voice AI pipelines', { size: 13, fill: '#475569' })}
  ${text(100, 420, 'SKILLS', { size: 12, weight: 600, fill: '#16a34a' })}
  ${['Python','FastAPI','Next.js','PostgreSQL','OpenAI','Docker'].map((s,i)=>{
    const x=100+(i%3)*180; const y=450+Math.floor(i/3)*36;
    return `${panel(x,y,160,28,'#ecfdf5','#86efac',6)}${text(x+12,y+19,s,{size:11,fill:'#166534'})}`;
  }).join('')}
  <!-- ATS Panel -->
  ${panel(780, 110, 760, 440, '#fff', '#d1fae5')}
  ${text(820, 150, 'ATS Analysis', { size: 18, weight: 600, fill: '#14532d' })}
  <circle cx="1100" cy="300" r="100" fill="none" stroke="#d1fae5" stroke-width="16"/>
  <circle cx="1100" cy="300" r="100" fill="none" stroke="#16a34a" stroke-width="16" stroke-dasharray="502" stroke-dashoffset="65" transform="rotate(-90 1100 300)"/>
  ${text(1100, 295, '87', { size: 48, weight: 700, fill: '#16a34a', anchor: 'middle' })}
  ${text(1100, 330, 'ATS Score', { size: 14, fill: '#64748b', anchor: 'middle' })}
  ${[{l:'Keywords',v:92},{l:'Format',v:85},{l:'Impact',v:78},{l:'Skills',v:88}].map((m,i)=>{
    const x=820; const y=200+i*50;
    return `${text(x,y,m.l,{size:13,fill:'#475569'})}${panel(x+120,y-16,200,8,'#e2e8f0',null,4)}<rect x="${x+120}" y="${y-16}" width="${m.v*2}" height="8" rx="4" fill="#16a34a"/>${text(x+340,y,`${m.v}%`,{size:12,fill:'#16a34a'})}`;
  }).join('')}
  ${panel(820, 400, 680, 120, '#fefce8', '#fde047', 8)}
  ${text(840, 430, '⚠ Missing keywords: "LangChain", "RAG"', { size: 13, fill: '#a16207' })}
  ${text(840, 460, '💡 Add quantified impact to experience bullets', { size: 13, fill: '#a16207' })}
  ${panel(820, 490, 200, 40, '#16a34a', null, 8)}
  ${text(920, 516, 'AI Improve Resume', { size: 13, weight: 600, fill: '#fff', anchor: 'middle' })}
  <!-- Job matches -->
  ${panel(780, 580, 760, 450, '#fff', '#d1fae5')}
  ${text(820, 620, 'Matched Jobs', { size: 18, weight: 600, fill: '#14532d' })}
  ${[{role:'Full Stack Engineer',co:'TechCorp',fit:'94%',st:'Applied'},{role:'AI Product Engineer',co:'DataFlow',fit:'91%',st:'Interview'},{role:'Backend Developer',co:'CloudBase',fit:'86%',st:'Applied'}].map((j,i)=>{
    const y=660+i*90;
    return `${panel(820,y,700,72,'#f8fafc','#e2e8f0',8)}${text(840,y+28,j.role,{size:14,weight:600,fill:'#0f172a'})}${text(840,y+50,j.co,{size:12,fill:'#64748b'})}${text(1300,y+28,j.fit,{size:16,weight:700,fill:'#16a34a'})}${panel(1380,y+16,100,28,j.st==='Interview'?'#fef3c7':'#dbeafe',j.st==='Interview'?'#f59e0b':'#3b82f6',6)}${text(1430,y+35,j.st,{size:11,fill:j.st==='Interview'?'#b45309':'#1d4ed8',anchor:'middle'})}`;
  }).join('')}
`);
}

/* ─── IoT: sensor map + gauges + live feed ─── */
function iot() {
  return svg(`
  <rect width="${W}" height="${H}" fill="#020617"/>
  ${text(60, 50, 'IoT Cloud Monitor', { size: 22, weight: 700, fill: '#38bdf8' })}
  ${text(60, 76, 'Real-time Sensor Data Logging', { size: 13, fill: '#64748b' })}
  <circle cx="1480" cy="50" r="8" fill="#22c55e"/>
  ${text(1460, 50, 'LIVE', { size: 11, fill: '#22c55e', anchor: 'end' })}
  <!-- Gauges -->
  ${[{l:'Temperature',v:'24.3°C',pct:65,c:'#38bdf8'},{l:'Humidity',v:'62%',pct:62,c:'#22d3ee'},{l:'Pressure',v:'1013 hPa',pct:78,c:'#818cf8'},{l:'Devices',v:'48/48',pct:100,c:'#22c55e'}].map((g,i)=>{
    const x=60+i*380;
    return `${panel(x,100,360,160,'#0f172a','#1e293b')}${text(x+20,135,g.l,{size:13,fill:'#94a3b8'})}${text(x+20,180,g.v,{size:32,weight:700,fill:g.c})}${panel(x+20,200,320,8,'#1e293b',null,4)}<rect x="${x+20}" y="200" width="${g.pct*3.2}" height="8" rx="4" fill="${g.c}"/>`;
  }).join('')}
  <!-- Floor plan -->
  ${panel(60, 290, 700, 560, '#0f172a', '#1e293b')}
  ${text(90, 330, 'Warehouse Floor Plan', { size: 16, weight: 600, fill: '#e2e8f0' })}
  ${panel(90, 360, 640, 460, '#1e293b', '#334155', 4)}
  ${[{x:150,y:420,l:'SNS-001',t:'24.1°C'},{x:350,y:400,l:'SNS-002',t:'24.5°C'},{x:550,y:450,l:'SNS-003',t:'4.2°C'},{x:200,y:600,l:'SNS-004',t:'26.8°C',w:1},{x:450,y:650,l:'SNS-005',t:'21.0°C'}].map(s=>{
    const col=s.w?'#f59e0b':'#22c55e';
    return `<circle cx="${s.x}" cy="${s.y}" r="24" fill="${col}22" stroke="${col}" stroke-width="2"/>${text(s.x,s.y-2,s.l,{size:9,fill:'#e2e8f0',anchor:'middle'})}${text(s.x,s.y+12,s.t,{size:10,fill:col,anchor:'middle'})}`;
  }).join('')}
  <!-- Live chart -->
  ${panel(800, 290, 740, 300, '#0f172a', '#1e293b')}
  ${text(830, 330, 'Temperature — Last 24h', { size: 16, weight: 600, fill: '#e2e8f0' })}
  <polyline points="830,520 900,480 970,490 1040,460 1110,470 1180,450 1250,455 1320,440 1390,445 1460,430" fill="none" stroke="#38bdf8" stroke-width="2.5"/>
  <polygon points="830,520 900,480 970,490 1040,460 1110,470 1180,450 1250,455 1320,440 1390,445 1460,430 1460,520" fill="#38bdf8" opacity="0.1"/>
  <!-- MQTT status -->
  ${panel(800, 620, 740, 230, '#0f172a', '#1e293b')}
  ${text(830, 660, 'MQTT Broker Status', { size: 16, weight: 600, fill: '#e2e8f0' })}
  ${text(830, 700, 'Broker: mqtt.supabase.io:8883', { size: 13, fill: '#94a3b8' })}
  ${text(830, 730, 'Messages/sec: 142', { size: 13, fill: '#22c55e' })}
  ${text(830, 760, 'Latency: 8ms avg', { size: 13, fill: '#38bdf8' })}
  ${text(830, 790, 'Cloud: Supabase PostgreSQL', { size: 13, fill: '#94a3b8' })}
  <!-- Device table -->
  ${panel(60, 880, 1480, 180, '#0f172a', '#1e293b')}
  ${['SNS-001|Warehouse A|24.1°C / 61%|Online','SNS-002|Warehouse B|24.5°C / 63%|Online','SNS-003|Cold Storage|4.2°C / 45%|Online','SNS-004|Loading Dock|26.8°C / 58%|Warning','SNS-005|Server Room|21.0°C / 40%|Online'].map((row,i)=>{
    const [id,loc,read,st]=row.split('|');
    const y=920+i*0; const x=90+i*290;
    const sc=st==='Warning'?'#f59e0b':'#22c55e';
    return `${text(x,920,id,{size:12,weight:600,fill:'#e2e8f0'})}${text(x,940,loc,{size:11,fill:'#64748b'})}${text(x,960,read,{size:11,fill:'#38bdf8'})}${text(x,980,st,{size:11,fill:sc})}`;
  }).join('')}
`);
}

/* ─── DRONE: simulation grid + training panel ─── */
function drone() {
  return svg(`
  <rect width="${W}" height="${H}" fill="#09090b"/>
  ${text(60, 50, 'DQN Drone Simulator', { size: 22, weight: 700, fill: '#a78bfa' })}
  ${text(60, 76, 'Deep Q-Learning Navigation', { size: 13, fill: '#71717a' })}
  <!-- Simulation grid -->
  ${panel(60, 100, 800, 800, '#18181b', '#3f3f46')}
  ${text(90, 140, 'Episode 2,401 — Urban Maze', { size: 14, weight: 600, fill: '#e4e4e7' })}
  <!-- Grid cells -->
  ${Array.from({length:8},(_,row)=>Array.from({length:10},(_,col)=>{
    const x=90+col*74; const y=170+row*74;
    const isObs=(row+col)%3===0&&(row+col)%5!==0;
    const isGoal=row===7&&col===9;
    const isStart=row===0&&col===0;
    const fill=isObs?'#3f3f46':isGoal?'#166534':isStart?'#1e3a8a':'#27272a';
    const stroke=isObs?'#52525b':'#3f3f46';
    return `<rect x="${x}" y="${y}" width="68" height="68" rx="4" fill="${fill}" stroke="${stroke}"/>`;
  }).join('')).join('')}
  <!-- Drone path -->
  <polyline points="124,204 198,278 272,352 346,426 420,500 494,574 568,648 642,722 716,796" fill="none" stroke="#a78bfa" stroke-width="3" stroke-dasharray="8,4"/>
  <circle cx="124" cy="204" r="12" fill="#3b82f6" stroke="#60a5fa" stroke-width="2"/>
  <polygon points="716,786 726,806 706,806" fill="#a78bfa"/>
  ${text(124,204,'🚁',{size:16,anchor:'middle'})}
  <!-- Control panel -->
  ${panel(900, 100, 640, 380, '#18181b', '#3f3f46')}
  ${text(930, 140, 'Training Controls', { size: 16, weight: 600, fill: '#e4e4e7' })}
  ${[{l:'Episodes',v:'2,400'},{l:'Success Rate',v:'94.2%'},{l:'Avg Reward',v:'186'},{l:'Epsilon',v:'0.05'}].map((m,i)=>{
    const x=930+(i%2)*300; const y=170+Math.floor(i/2)*80;
    return `${text(x,y,m.l,{size:12,fill:'#a1a1aa'})}${text(x,y+28,m.v,{size:24,weight:700,fill:'#a78bfa'})}`;
  }).join('')}
  ${panel(930, 330, 280, 44, '#6d28d9', null, 8)}
  ${text(1070, 358, '▶ Start Training', { size: 14, weight: 600, fill: '#fff', anchor: 'middle' })}
  ${panel(1230, 330, 280, 44, '#27272a', '#52525b', 8)}
  ${text(1370, 358, '⏸ Pause', { size: 14, fill: '#e4e4e7', anchor: 'middle' })}
  <!-- Reward chart -->
  ${panel(900, 510, 640, 390, '#18181b', '#3f3f46')}
  ${text(930, 550, 'Reward per Episode', { size: 16, weight: 600, fill: '#e4e4e7' })}
  <polyline points="950,850 1020,800 1090,750 1160,700 1230,650 1300,600 1370,550 1440,520 1510,500" fill="none" stroke="#a78bfa" stroke-width="2.5"/>
  <!-- Flutter mobile preview -->
  ${panel(900, 920, 300, 0, 'transparent', null)}
  ${text(60, 930, 'FastAPI backend on Render · Flutter APK for real-time control', { size: 12, fill: '#71717a' })}
`);
}

/* ─── SPAM: inbox UI + mobile app ─── */
function spam() {
  return svg(`
  <rect width="${W}" height="${H}" fill="#fdf2f8"/>
  ${text(60, 50, 'SpamGuard', { size: 22, weight: 700, fill: '#9d174d' })}
  ${text(60, 76, 'NLP Email Classifier · Naive Bayes + TF-IDF', { size: 13, fill: '#be185d' })}
  <!-- Inbox -->
  ${panel(60, 100, 900, 920, '#fff', '#fbcfe8')}
  ${text(90, 140, 'Inbox Scanner', { size: 16, weight: 600, fill: '#831843' })}
  ${panel(90, 160, 840, 40, '#fce7f3', '#f9a8d4', 8)}
  ${text(110, 186, '🔍 Scan incoming emails...', { size: 13, fill: '#9d174d' })}
  ${[{sub:'Win a free iPhone now!!!',label:'SPAM',conf:'99.2%',c:'#be185d'},{sub:'Q1 project update — team sync',label:'HAM',conf:'98.1%',c:'#16a34a'},{sub:'URGENT: Verify your account',label:'SPAM',conf:'97.4%',c:'#be185d'},{sub:'Meeting notes from yesterday',label:'HAM',conf:'99.0%',c:'#16a34a'},{sub:'Claim your prize — act now',label:'SPAM',conf:'98.8%',c:'#be185d'},{sub:'Invoice #4521 from vendor',label:'HAM',conf:'97.8%',c:'#16a34a'}].map((e,i)=>{
    const y=230+i*100;
    const bg=e.label==='SPAM'?'#fdf2f8':'#f0fdf4';
    const bc=e.label==='SPAM'?'#fbcfe8':'#bbf7d0';
    return `${panel(90,y,840,80,bg,bc,8)}${text(110,y+30,e.sub,{size:14,fill:'#1e293b'})}${panel(750,y+20,80,28,e.c,e.c,14)}${text(790,y+39,e.label,{size:11,weight:600,fill:'#fff',anchor:'middle'})}${text(110,y+58,`Confidence: ${e.conf}`,{size:11,fill:'#64748b'})}`;
  }).join('')}
  <!-- Model stats -->
  ${panel(1000, 100, 540, 440, '#fff', '#fbcfe8')}
  ${text(1030, 140, 'Model Performance', { size: 16, weight: 600, fill: '#831843' })}
  ${text(1030, 190, '96.8%', { size: 48, weight: 700, fill: '#be185d' })}
  ${text(1030, 220, 'Accuracy', { size: 14, fill: '#64748b' })}
  ${panel(1030, 260, 220, 120, '#fdf2f8', '#fbcfe8', 8)}
  ${text(1140, 300, '972', { size: 28, weight: 700, fill: '#16a34a', anchor: 'middle' })}
  ${text(1140, 330, 'Ham', { size: 12, fill: '#64748b', anchor: 'middle' })}
  ${panel(1280, 260, 220, 120, '#fdf2f8', '#fbcfe8', 8)}
  ${text(1390, 300, '312', { size: 28, weight: 700, fill: '#be185d', anchor: 'middle' })}
  ${text(1390, 330, 'Spam', { size: 12, fill: '#64748b', anchor: 'middle' })}
  ${text(1030, 420, 'Algorithm: TF-IDF + Naive Bayes', { size: 13, fill: '#9d174d' })}
  ${text(1030, 450, 'API Latency: 12ms (p95)', { size: 13, fill: '#64748b' })}
  ${text(1030, 480, 'Backend: FastAPI', { size: 13, fill: '#64748b' })}
  <!-- Phone -->
  ${panel(1100, 580, 340, 440, '#1e293b', '#475569', 32)}
  ${text(1270, 630, 'SpamGuard Mobile', { size: 14, weight: 600, fill: '#f9a8d4', anchor: 'middle' })}
  ${text(1270, 660, 'Flutter App', { size: 11, fill: '#94a3b8', anchor: 'middle' })}
  ${panel(1130, 700, 280, 56, '#fdf2f8', '#fbcfe8', 8)}
  ${text(1150, 735, 'Paste email text here...', { size: 12, fill: '#9d174d' })}
  ${panel(1130, 780, 280, 48, '#be185d', null, 8)}
  ${text(1270, 810, 'Classify', { size: 14, weight: 600, fill: '#fff', anchor: 'middle' })}
  ${panel(1130, 850, 280, 60, '#fdf2f8', '#be185d', 8)}
  ${text(1270, 875, '⚠ SPAM DETECTED', { size: 14, weight: 600, fill: '#be185d', anchor: 'middle' })}
  ${text(1270, 898, '99.2% confidence', { size: 11, fill: '#9d174d', anchor: 'middle' })}
`);
}

/* ─── SECURITY: terminal / pentest report ─── */
function security() {
  return svg(`
  <rect width="${W}" height="${H}" fill="#0a0a0a"/>
  <!-- Terminal window -->
  ${panel(60, 60, 900, 500, '#0d1117', '#30363d')}
  <circle cx="90" cy="90" r="7" fill="#ff5f57"/><circle cx="115" cy="90" r="7" fill="#febc2e"/><circle cx="140" cy="90" r="7" fill="#28c840"/>
  ${text(170, 95, 'security-audit — bash', { size: 12, fill: '#8b949e' })}
  ${text(80, 140, '$ nmap -sV --script vuln target.gov.in', { size: 13, fill: '#58a6ff', family: 'monospace' })}
  ${text(80, 170, 'PORT    STATE  SERVICE', { size: 12, fill: '#8b949e', family: 'monospace' })}
  ${text(80, 195, '443/tcp open   https', { size: 12, fill: '#3fb950', family: 'monospace' })}
  ${text(80, 220, '80/tcp  open   http', { size: 12, fill: '#3fb950', family: 'monospace' })}
  ${text(80, 260, '$ curl -X POST /api/login -d "user=admin&pass=test"', { size: 13, fill: '#58a6ff', family: 'monospace' })}
  ${text(80, 290, 'HTTP/1.1 200 OK — Authentication bypass detected', { size: 12, fill: '#f85149', family: 'monospace' })}
  ${text(80, 320, '[!] CWE-287: Improper Authentication', { size: 13, fill: '#f85149', weight: 600, family: 'monospace' })}
  ${text(80, 350, '[!] CVSS Score: 9.1 (Critical)', { size: 13, fill: '#f85149', family: 'monospace' })}
  ${text(80, 380, '[!] Session fixation vulnerability confirmed', { size: 12, fill: '#d29922', family: 'monospace' })}
  ${text(80, 420, '$ report-generator --format pdf --cwe CWE-287', { size: 13, fill: '#58a6ff', family: 'monospace' })}
  ${text(80, 450, 'Report saved: vulnerability_report_2024.pdf', { size: 12, fill: '#3fb950', family: 'monospace' })}
  <!-- Findings panel -->
  ${panel(1000, 60, 540, 500, '#0d1117', '#30363d')}
  ${text(1030, 100, 'Vulnerability Report', { size: 16, weight: 600, fill: '#f0f6fc' })}
  ${[{cwe:'CWE-287',desc:'Improper Authentication',cvss:'9.1',sev:'Critical'},{cwe:'CWE-287',desc:'Session Fixation',cvss:'8.4',sev:'Critical'},{cwe:'CWE-306',desc:'Missing Authentication',cvss:'8.8',sev:'Critical'},{cwe:'CWE-200',desc:'Information Exposure',cvss:'6.2',sev:'Medium'},{cwe:'CWE-352',desc:'CSRF',cvss:'5.8',sev:'Medium'}].map((f,i)=>{
    const y=130+i*72;
    const sc=f.sev==='Critical'?'#f85149':'#d29922';
    return `${panel(1030,y,480,60,'#161b22','#30363d',6)}${text(1046,y+22,f.cwe,{size:11,fill:'#58a6ff'})}${text(1046,y+42,f.desc,{size:12,fill:'#c9d1d9'})}${text(1400,y+22,f.cvss,{size:14,weight:700,fill:sc})}${text(1400,y+42,f.sev,{size:11,fill:sc})}`;
  }).join('')}
  <!-- Summary -->
  ${panel(60, 590, 1480, 430, '#0d1117', '#30363d')}
  ${text(90, 630, 'Assessment Summary — Government Website VAPT', { size: 18, weight: 600, fill: '#f0f6fc' })}
  ${[{l:'Sites Scanned',v:'8'},{l:'Critical',v:'3'},{l:'High',v:'7'},{l:'Medium',v:'12'},{l:'Low',v:'5'}].map((m,i)=>{
    const x=90+i*280;
    const c=m.l==='Critical'?'#f85149':m.l==='High'?'#d29922':'#3fb950';
    return `${text(x,690,m.l,{size:12,fill:'#8b949e'})}${text(x,730,m.v,{size:36,weight:700,fill:c})}`;
  }).join('')}
  ${text(90, 800, 'Methodology: OWASP Testing Guide · Manual pentesting · CWE mapping', { size: 13, fill: '#8b949e' })}
  ${text(90, 840, 'Deliverables: Detailed vulnerability reports with mitigation strategies', { size: 13, fill: '#8b949e' })}
  ${text(90, 880, 'Standards: Secure coding recommendations aligned with CERT-In guidelines', { size: 13, fill: '#8b949e' })}
`);
}

/* ─── RESTAURANT: warm food website ─── */
function restaurant() {
  return svg(`
  <defs>
    <linearGradient id="food-hero" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#92400e"/><stop offset="100%" stop-color="#78350f"/>
    </linearGradient>
    <linearGradient id="food-img1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f97316"/><stop offset="100%" stop-color="#c2410c"/>
    </linearGradient>
    <linearGradient id="food-img2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ef4444"/><stop offset="100%" stop-color="#b91c1c"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#fffbeb"/>
  <!-- Browser -->
  ${panel(40, 40, 1520, 1020, '#fff', '#e7e5e4', 16)}
  <rect x="40" y="40" width="1520" height="48" rx="16" fill="#fafaf9"/>
  <circle cx="72" cy="64" r="6" fill="#ef4444"/><circle cx="92" cy="64" r="6" fill="#f59e0b"/><circle cx="112" cy="64" r="6" fill="#22c55e"/>
  <rect x="600" y="54" width="400" height="24" rx="6" fill="#fff" stroke="#e7e5e4"/>
  ${text(620, 70, 'saffronbistro.com', { size: 11, fill: '#78716c' })}
  <!-- Nav -->
  <rect x="40" y="88" width="1520" height="64" fill="#fff"/>
  ${text(80, 128, 'Saffron Bistro', { size: 24, weight: 700, fill: '#b45309', family: 'Georgia,serif' })}
  ${text(1200, 128, 'Menu', { size: 14, fill: '#44403c' })}
  ${text(1280, 128, 'About', { size: 14, fill: '#44403c' })}
  ${text(1360, 128, 'Gallery', { size: 14, fill: '#44403c' })}
  ${panel(1440, 108, 100, 36, '#d97706', null, 8)}
  ${text(1490, 132, 'Reserve', { size: 12, weight: 600, fill: '#fff', anchor: 'middle' })}
  <!-- Hero -->
  ${panel(80, 168, 700, 360, 'url(#food-hero)', null, 12)}
  ${text(120, 260, 'Authentic', { size: 40, weight: 700, fill: '#fff', family: 'Georgia,serif' })}
  ${text(120, 310, 'Indian Cuisine', { size: 40, weight: 700, fill: '#fff', family: 'Georgia,serif' })}
  ${text(120, 360, 'Fresh ingredients · Traditional recipes', { size: 15, fill: '#fde68a' })}
  ${panel(120, 400, 160, 44, '#fff', null, 8)}
  ${text(200, 428, 'View Menu', { size: 14, weight: 600, fill: '#b45309', anchor: 'middle' })}
  ${panel(820, 168, 700, 360, 'url(#food-img1)', null, 12)}
  <ellipse cx="1170" cy="320" rx="120" ry="80" fill="#fed7aa" opacity="0.4"/>
  <ellipse cx="1100" cy="300" rx="80" ry="60" fill="#fdba74" opacity="0.5"/>
  ${text(1170, 340, '🍛', { size: 64, anchor: 'middle' })}
  <!-- Menu cards -->
  ${panel(80, 560, 460, 460, '#fff', '#e7e5e4', 12)}
  <rect x="80" y="560" width="460" height="200" rx="12" fill="url(#food-img1)"/>
  ${text(120, 800, 'Butter Chicken', { size: 20, weight: 600, fill: '#1c1917', family: 'Georgia,serif' })}
  ${text(120, 830, 'Creamy tomato curry with tender chicken', { size: 13, fill: '#78716c' })}
  ${text(120, 870, '₹420', { size: 18, weight: 700, fill: '#b45309' })}
  ${panel(570, 560, 460, 460, '#fff', '#e7e5e4', 12)}
  <rect x="570" y="560" width="460" height="200" rx="12" fill="url(#food-img2)"/>
  ${text(610, 800, 'Paneer Tikka', { size: 20, weight: 600, fill: '#1c1917', family: 'Georgia,serif' })}
  ${text(610, 830, 'Grilled cottage cheese with spices', { size: 13, fill: '#78716c' })}
  ${text(610, 870, '₹320', { size: 18, weight: 700, fill: '#b45309' })}
  ${panel(1060, 560, 460, 460, '#fff', '#e7e5e4', 12)}
  ${text(1100, 600, 'Opening Hours', { size: 18, weight: 600, fill: '#1c1917' })}
  ${text(1100, 640, 'Mon – Fri  11am – 10pm', { size: 14, fill: '#57534e' })}
  ${text(1100, 680, 'Sat – Sun  10am – 11pm', { size: 14, fill: '#57534e' })}
  ${text(1100, 740, '📍 Bandra West, Mumbai', { size: 14, fill: '#57534e' })}
  ${text(1100, 780, '📞 +91 98765 43210', { size: 14, fill: '#57534e' })}
  ${panel(1100, 820, 380, 48, '#d97706', null, 8)}
  ${text(1290, 850, 'Book a Table', { size: 14, weight: 600, fill: '#fff', anchor: 'middle' })}
`);
}

/* ─── BANKING: JavaFX desktop app ─── */
function banking() {
  return svg(`
  <rect width="${W}" height="${H}" fill="#1e293b"/>
  <!-- Desktop window -->
  ${panel(120, 80, 1360, 940, '#f1f5f9', '#94a3b8', 8)}
  <rect x="120" y="80" width="1360" height="36" rx="8" fill="#334155"/>
  <circle cx="148" cy="98" r="6" fill="#ef4444"/><circle cx="168" cy="98" r="6" fill="#f59e0b"/><circle cx="188" cy="98" r="6" fill="#22c55e"/>
  ${text(760, 104, 'CoreBanking System — JavaFX', { size: 13, fill: '#e2e8f0', anchor: 'middle' })}
  <!-- Menu bar -->
  <rect x="120" y="116" width="1360" height="32" fill="#e2e8f0"/>
  ${['File','Accounts','Transfer','Reports','Help'].map((m,i)=>text(140+i*100,136,m,{size:12,fill:'#334155'})).join('')}
  <!-- Sidebar -->
  ${panel(140, 160, 240, 840, '#fff', '#cbd5e1')}
  ${text(160, 200, 'Accounts', { size: 14, weight: 600, fill: '#0f172a' })}
  ${[{n:'Savings',b:'₹1,85,400',a:1},{n:'Current',b:'₹42,300',a:0},{n:'Fixed Deposit',b:'₹18,100',a:0}].map((a,i)=>{
    const y=230+i*80;
    return `${panel(155,y,210,64,a.a?'#dbeafe':'#f8fafc',a.a?'#3b82f6':'#e2e8f0',6)}${text(170,y+24,a.n,{size:13,weight:a.a?600:400,fill:'#0f172a'})}${text(170,y+46,a.b,{size:14,weight:600,fill:'#16a34a'})}`;
  }).join('')}
  <!-- Main -->
  ${panel(400, 160, 1060, 400, '#fff', '#cbd5e1')}
  ${text(430, 200, 'Account Overview', { size: 18, weight: 600, fill: '#0f172a' })}
  ${text(430, 240, 'Total Balance', { size: 13, fill: '#64748b' })}
  ${text(430, 290, '₹2,45,800', { size: 42, weight: 700, fill: '#0f172a' })}
  ${panel(430, 330, 200, 44, '#16a34a', null, 6)}
  ${text(530, 358, 'Deposit', { size: 14, weight: 600, fill: '#fff', anchor: 'middle' })}
  ${panel(650, 330, 200, 44, '#dc2626', null, 6)}
  ${text(750, 358, 'Withdraw', { size: 14, weight: 600, fill: '#fff', anchor: 'middle' })}
  ${panel(870, 330, 200, 44, '#2563eb', null, 6)}
  ${text(970, 358, 'Transfer', { size: 14, weight: 600, fill: '#fff', anchor: 'middle' })}
  <!-- Transactions -->
  ${panel(400, 580, 1060, 420, '#fff', '#cbd5e1')}
  ${text(430, 620, 'Recent Transactions', { size: 16, weight: 600, fill: '#0f172a' })}
  <line x1="430" y1="640" x2="1440" y2="640" stroke="#e2e8f0"/>
  ${['03 Jul|Salary credit|+₹45,000|₹2,45,800','02 Jul|UPI — Amazon|-₹2,499|₹2,00,800','01 Jul|NEFT transfer|-₹10,000|₹2,03,299','30 Jun|Interest credit|+₹420|₹2,13,299'].map((row,i)=>{
    const [d,desc,amt,bal]=row.split('|');
    const y=670+i*60;
    const ac=amt.startsWith('+')?'#16a34a':'#dc2626';
    return `${text(430,y,d,{size:12,fill:'#64748b'})}${text(530,y,desc,{size:13,fill:'#0f172a'})}${text(1100,y,amt,{size:13,weight:600,fill:ac})}${text(1300,y,bal,{size:12,fill:'#64748b'})}`;
  }).join('')}
  ${text(140, 1020, 'Built with Java + JavaFX · OOP architecture · Input validation', { size: 11, fill: '#94a3b8' })}
`);
}

/* ─── IoT case study: architecture diagram ─── */
function iotLogging() {
  return svg(`
  <rect width="${W}" height="${H}" fill="#f8fafc"/>
  ${text(60, 56, 'IoT Data Logging System', { size: 24, weight: 700, fill: '#0c4a6e' })}
  ${text(60, 84, 'Published Research · IJARIIT 2024', { size: 14, fill: '#0369a1' })}
  <!-- Architecture flow -->
  ${[{x:80,l:'IoT Sensors',s:'Temp · Humidity',c:'#0ea5e9',ic:'📡'},{x:400,l:'Wi-Fi / MQTT',s:'Real-time comms',c:'#8b5cf6',ic:'📶'},{x:720,l:'Cloud (Supabase)',s:'Storage + Auth',c:'#10b981',ic:'☁️'},{x:1040,l:'Next.js Dashboard',s:'Live monitoring',c:'#f59e0b',ic:'📊'}].map((n,i)=>{
    return `${panel(n.x,200,280,200,n.c+'15',n.c,12)}${text(n.x+140,260,n.ic,{size:40,anchor:'middle'})}${text(n.x+140,310,n.l,{size:16,weight:600,fill:'#0f172a',anchor:'middle'})}${text(n.x+140,340,n.s,{size:12,fill:'#64748b',anchor:'middle'})}${i<3?`<line x1="${n.x+280}" y1="300" x2="${n.x+320}" y2="300" stroke="${n.c}" stroke-width="3"/><polygon points="${n.x+320},300 ${n.x+305},293 ${n.x+305},307" fill="${n.c}"/>`:''}`;
  }).join('')}
  <!-- Research highlights -->
  ${panel(60, 460, 680, 560, '#fff', '#bae6fd')}
  ${text(90, 500, 'Research Highlights', { size: 18, weight: 600, fill: '#0c4a6e' })}
  ${['24/7 automated monitoring replacing manual logging','Real-time MQTT data transmission from sensors','Cloud-based centralized database for multi-user access','Next.js + Tailwind dashboard for visualization','Scalable architecture for industrial deployment'].map((t,i)=>{
    return `${text(90,550+i*50,'✓',{size:16,fill:'#0ea5e9'})}${text(120,550+i*50,t,{size:14,fill:'#334155'})}`;
  }).join('')}
  <!-- Metrics -->
  ${panel(780, 460, 760, 260, '#fff', '#bae6fd')}
  ${text(810, 500, 'Key Results', { size: 18, weight: 600, fill: '#0c4a6e' })}
  ${[{l:'Monitoring',v:'24/7'},{l:'Reliability',v:'100%'},{l:'OpEx Reduction',v:'-40%'}].map((m,i)=>{
    const x=810+i*240;
    return `${text(x,560,m.l,{size:13,fill:'#64748b'})}${text(x,610,m.v,{size:36,weight:700,fill:'#0ea5e9'})}`;
  }).join('')}
  <!-- Authors -->
  ${panel(780, 750, 760, 270, '#fff', '#bae6fd')}
  ${text(810, 790, 'Published in IJARIIT', { size: 16, weight: 600, fill: '#0c4a6e' })}
  ${text(810, 830, 'Volume 10, Issue 5 · October 2024', { size: 13, fill: '#64748b' })}
  ${text(810, 870, 'Authors: Alok More, Atharva Khopade, Yash Kakade,', { size: 13, fill: '#334155' })}
  ${text(810, 895, 'Vivek Hande, Ritesh Nikam', { size: 13, fill: '#334155' })}
  ${text(810, 930, 'Vishwakarma University, Pune', { size: 12, fill: '#64748b' })}
  ${panel(810, 960, 280, 40, '#0369a1', null, 8)}
  ${text(950, 986, 'Read Research Paper', { size: 13, weight: 600, fill: '#fff', anchor: 'middle' })}
`);
}

/* ─── Security ack: official disclosure document ─── */
function securityAck() {
  return svg(`
  <rect width="${W}" height="${H}" fill="#1a1a2e"/>
  ${panel(200, 60, 1200, 980, '#fff', '#d4af37', 4)}
  <!-- Header seal -->
  <circle cx="800" cy="180" r="60" fill="none" stroke="#d4af37" stroke-width="3"/>
  ${text(800, 175, '🇮🇳', { size: 36, anchor: 'middle' })}
  ${text(800, 210, 'CERT-In', { size: 11, weight: 600, fill: '#92400e', anchor: 'middle' })}
  ${text(800, 280, 'VULNERABILITY DISCLOSURE ACKNOWLEDGMENT', { size: 20, weight: 700, fill: '#1a1a2e', anchor: 'middle' })}
  <line x1="300" y1="310" x2="1300" y2="310" stroke="#d4af37" stroke-width="2"/>
  ${text(300, 360, 'Report ID:', { size: 13, fill: '#64748b' })}
  ${text(500, 360, 'VD-2024-CWE287-001', { size: 13, weight: 600, fill: '#0f172a' })}
  ${text(300, 400, 'Date:', { size: 13, fill: '#64748b' })}
  ${text(500, 400, '05 December 2024', { size: 13, fill: '#0f172a' })}
  ${text(300, 440, 'Severity:', { size: 13, fill: '#64748b' })}
  ${text(500, 440, 'CRITICAL — CWE-287 Improper Authentication', { size: 13, weight: 600, fill: '#dc2626' })}
  ${text(300, 500, 'This is to acknowledge receipt of the vulnerability disclosure', { size: 14, fill: '#334155' })}
  ${text(300, 530, 'report submitted through official channels (NCIIPC/CERT-In)', { size: 14, fill: '#334155' })}
  ${text(300, 560, 'regarding critical authentication flaws in government infrastructure.', { size: 14, fill: '#334155' })}
  <!-- Timeline -->
  ${panel(300, 600, 1000, 280, '#fefce8', '#fde047', 8)}
  ${text(330, 640, 'Disclosure Timeline', { size: 16, weight: 600, fill: '#713f12' })}
  ${['15 Nov 2024 — Initial report submitted','22 Nov 2024 — Technical evidence provided','05 Dec 2024 — Acknowledgment received ✓','20 Dec 2024 — Re-test verification completed ✓'].map((t,i)=>{
    return `${text(330,680+i*50,t,{size:13,fill:i>=2?'#16a34a':'#57534e'})}`;
  }).join('')}
  ${text(300, 920, 'Status: ACKNOWLEDGED & VERIFIED', { size: 16, weight: 700, fill: '#16a34a' })}
  ${text(300, 960, 'Impact: Critical · Auth: Official · Security: Verified', { size: 13, fill: '#64748b' })}
  ${text(300, 1000, 'Reported via NCIIPC / CERT-In official channels', { size: 12, fill: '#94a3b8' })}
`);
}

const dashboards = {
  hero,
  healix,
  autoniqx,
  foresense,
  iot,
  drone,
  spam,
  security,
  restaurant,
  banking,
  'iot-logging': iotLogging,
  'security-ack': securityAck,
};

const outputs = [
  { key: 'hero', path: 'public/hero/workspace.png' },
  { key: 'healix', path: 'public/projects/healix.png' },
  { key: 'autoniqx', path: 'public/projects/autoniqx.png' },
  { key: 'foresense', path: 'public/projects/foresense.png' },
  { key: 'iot', path: 'public/projects/iot.png' },
  { key: 'drone', path: 'public/projects/drone.png' },
  { key: 'spam', path: 'public/projects/spam.png' },
  { key: 'security', path: 'public/projects/security.png' },
  { key: 'restaurant', path: 'public/projects/restaurant.png' },
  { key: 'banking', path: 'public/projects/banking.png' },
  { key: 'iot-logging', path: 'public/case-studies/iot-logging.png' },
  { key: 'security-ack', path: 'public/case-studies/security-ack.png' },
];

async function main() {
  await mkdir(join(ROOT, 'public/hero'), { recursive: true });
  await mkdir(join(ROOT, 'public/projects'), { recursive: true });
  await mkdir(join(ROOT, 'public/case-studies'), { recursive: true });

  for (const { key, path: relPath } of outputs) {
    const svgContent = dashboards[key]();
    await sharp(Buffer.from(svgContent)).png().toFile(join(ROOT, relPath));
    console.log(`✓ ${relPath}`);
  }

  console.log(`\nGenerated ${outputs.length} unique project images at ${W}x${H}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
