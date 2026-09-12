import { readFileSync } from 'fs';
import { join } from 'path';
import DownloadResumeButton from './DownloadResumeButton';

export const metadata = {
  title: 'Resume',
  description:
    'Resume of Ritesh Nikam — Software Engineer, Full Stack Developer, AI & 3D Web Development.',
};

function loadCvTex() {
  return readFileSync(join(process.cwd(), 'cv.tex'), 'utf8')
    .replace(/\\%/g, '\u0000PERCENT\u0000')
    .replace(/%[^\n]*/g, '')
    .replace(/\u0000PERCENT\u0000/g, '\\%');
}

function unescapeTex(text) {
  return String(text)
    .replace(/\\&/g, '&')
    .replace(/\\%/g, '%')
    .replace(/\\_/g, '_')
    .replace(/\\#/g, '#')
    .replace(/\\\{/g, '{')
    .replace(/\\\}/g, '}')
    .replace(/\\textbar\{\}/g, '|')
    .replace(/\\textbar/g, '|')
    .replace(/--/g, '–')
    .replace(/~/g, ' ');
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function takeArgs(src, start, count) {
  const args = [];
  let i = start;
  for (let n = 0; n < count; n += 1) {
    while (i < src.length && /\s/.test(src[i])) i += 1;
    if (src[i] !== '{') return null;
    let depth = 0;
    let j = i;
    for (; j < src.length; j += 1) {
      if (src[j] === '{') depth += 1;
      else if (src[j] === '}') {
        depth -= 1;
        if (depth === 0) {
          args.push(src.slice(i + 1, j));
          i = j + 1;
          break;
        }
      }
    }
    if (depth !== 0) return null;
  }
  return { args, end: i };
}

function inlineHtml(raw) {
  let text = unescapeTex(raw);
  text = text.replace(/\\href\{([^}]+)\}\{([^}]*)\}/g, (_, href, label) => {
    const url = href.replace(/\\&/g, '&');
    return `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(unescapeTex(label))}</a>`;
  });
  text = text.replace(/\\textbf\{([^}]*)\}/g, (_, inner) => `<strong>${escapeHtml(unescapeTex(inner))}</strong>`);
  text = text.replace(/\\textit\{([^}]*)\}/g, (_, inner) => `<em>${escapeHtml(unescapeTex(inner))}</em>`);
  text = text.replace(/\\emph\{([^}]*)\}/g, (_, inner) => `<em>${escapeHtml(unescapeTex(inner))}</em>`);
  text = text.replace(/\\mbox\{([^}]*)\}/g, (_, inner) => escapeHtml(unescapeTex(inner)));
  text = text.replace(/\\(?:small|footnotesize|normalsize|LARGE|bfseries)/g, '');
  text = text.replace(/\\color\{[^}]+\}/g, '');
  text = text.replace(/\\vspace\{[^}]+\}/g, '');
  text = text.replace(/\\\\(?:\[[^\]]*\])?/g, '<br />');
  text = text.replace(/\\[a-zA-Z]+\*?(\[[^\]]*\])?/g, '');
  text = text.replace(/[{}]/g, '');
  return text.trim();
}

function documentBody(tex) {
  const start = tex.indexOf('\\begin{document}');
  const end = tex.indexOf('\\end{document}');
  return tex.slice(start + '\\begin{document}'.length, end);
}

function headerHtml(body) {
  const center = body.match(/\\begin\{center\}([\s\S]*?)\\end\{center\}/);
  if (!center) return '';
  const lines = center[1]
    .split(/\\\\(?:\[[^\]]*\])?/)
    .map((line) => line.trim())
    .filter(Boolean);
  const name = inlineHtml(lines[0] || '').replace(/<[^>]+>/g, '');
  const tagline = inlineHtml(lines[1] || '');
  const meta = lines
    .slice(2)
    .map((line) => `<p class="cv-meta">${inlineHtml(line)}</p>`)
    .join('');
  return `
    <header class="cv-header">
      <h1 class="cv-name">${escapeHtml(name)}</h1>
      <p class="cv-tagline">${tagline}</p>
      ${meta}
    </header>
  `;
}

function eachCommand(raw, command, argCount, fn) {
  let i = 0;
  const needle = `\\${command}`;
  while (i < raw.length) {
    const idx = raw.indexOf(needle, i);
    if (idx === -1) break;
    const after = raw[idx + needle.length];
    if (after && /[A-Za-z]/.test(after)) {
      i = idx + needle.length;
      continue;
    }
    const taken = takeArgs(raw, idx + needle.length, argCount);
    if (!taken) break;
    fn(taken.args, taken.end);
    i = taken.end;
  }
}

function bulletsHtml(raw) {
  const items = [];
  eachCommand(raw, 'resumeItem', 1, ([item]) => {
    items.push(`<li>${inlineHtml(item)}</li>`);
  });
  return items.length ? `<ul class="cv-bullets">${items.join('')}</ul>` : '';
}

function skillsHtml(raw) {
  const items = [];
  eachCommand(raw, 'resumeSkillLine', 2, ([label, value]) => {
    items.push(
      `<li><strong>${escapeHtml(unescapeTex(label))}:</strong> ${escapeHtml(unescapeTex(value))}</li>`,
    );
  });
  return `<ul class="cv-skills">${items.join('')}</ul>`;
}

function experienceHtml(raw) {
  let html = '';
  eachCommand(raw, 'resumeSubheading', 4, ([role, dates, org, location], end) => {
    const next = raw.indexOf('\\resumeSubheading', end);
    const chunk = raw.slice(end, next === -1 ? raw.length : next);
    let tech = '';
    eachCommand(chunk, 'resumeTechStack', 1, ([value]) => {
      tech = value;
    });
    html += `
      <div class="cv-entry">
        <div class="cv-entry-top">
          <span class="cv-entry-title">${escapeHtml(unescapeTex(role))}</span>
          <span class="cv-entry-date">${escapeHtml(unescapeTex(dates))}</span>
        </div>
        <div class="cv-entry-sub">
          <span>${escapeHtml(unescapeTex(org))}</span>
          <span>${escapeHtml(unescapeTex(location))}</span>
        </div>
        ${tech ? `<p class="cv-tech"><em>Tech Stack:</em> ${escapeHtml(unescapeTex(tech))}</p>` : ''}
        ${bulletsHtml(chunk)}
      </div>
    `;
  });
  return html;
}

function projectsHtml(raw) {
  let html = '';
  let i = 0;
  while (i < raw.length) {
    const idx = raw.indexOf('\\begin{resumeProject}', i);
    if (idx === -1) break;
    const taken = takeArgs(raw, idx + '\\begin{resumeProject}'.length, 2);
    if (!taken) break;
    const endEnv = raw.indexOf('\\end{resumeProject}', taken.end);
    if (endEnv === -1) break;
    const [name, tech] = taken.args;
    html += `
      <div class="cv-entry">
        <div class="cv-entry-title">${escapeHtml(unescapeTex(name))}</div>
        <p class="cv-tech"><em>Tech Stack:</em> ${escapeHtml(unescapeTex(tech))}</p>
        ${bulletsHtml(raw.slice(taken.end, endEnv))}
      </div>
    `;
    i = endEnv + '\\end{resumeProject}'.length;
  }
  return html;
}

function educationHtml(raw) {
  let html = '';
  eachCommand(raw, 'resumeEducationLine', 4, ([degree, year, school, detail]) => {
    html += `
      <div class="cv-edu">
        <div class="cv-entry-top">
          <span class="cv-entry-title">${escapeHtml(unescapeTex(degree))}</span>
          <span class="cv-entry-date">${escapeHtml(unescapeTex(year))}</span>
        </div>
        <div class="cv-entry-sub">
          <span>${escapeHtml(unescapeTex(school))}</span>
          <span>${escapeHtml(unescapeTex(detail))}</span>
        </div>
      </div>
    `;
  });
  return html;
}

function paragraphHtml(raw) {
  const cleaned = raw
    .replace(/\\(?:resumeItemListStart|resumeItemListEnd|resumeSubHeadingListStart|resumeSubHeadingListEnd)/g, '')
    .replace(/\\begin\{itemize\}[\s\S]*?\\end\{itemize\}/g, '')
    .replace(/\\vspace\{[^}]+\}/g, '')
    .replace(/\\small/g, '')
    .trim();
  return cleaned ? `<p class="cv-summary">${inlineHtml(cleaned)}</p>` : '';
}

function sectionBody(title, raw) {
  const key = title.toLowerCase();
  if (key.includes('skill')) return skillsHtml(raw);
  if (key.includes('experience')) return experienceHtml(raw);
  if (key.includes('project')) return projectsHtml(raw);
  if (key.includes('education')) return educationHtml(raw);
  if (key.includes('certification') || key.includes('achievement')) {
    return bulletsHtml(raw) || paragraphHtml(raw);
  }
  return paragraphHtml(raw) || bulletsHtml(raw);
}

function cvTexToHtml(tex) {
  const body = documentBody(tex);
  const sections = body
    .replace(/\\begin\{center\}[\s\S]*?\\end\{center\}/, '')
    .split(/\\section\{([^}]+)\}/);

  let sectionsHtml = '';
  for (let i = 1; i < sections.length; i += 2) {
    const title = unescapeTex(sections[i]).trim();
    sectionsHtml += `
      <section class="cv-section">
        <h2>${escapeHtml(title)}</h2>
        ${sectionBody(title, sections[i + 1] || '')}
      </section>
    `;
  }

  return headerHtml(body) + sectionsHtml;
}

export default function ResumePage() {
  const html = cvTexToHtml(loadCvTex());
  return (
    <div className="cv-page">
      <div className="cv-toolbar">
        <DownloadResumeButton />
      </div>
      <article className="cv-sheet" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
