import { execFile } from 'child_process';
import { promisify } from 'util';
import { existsSync } from 'fs';
import { mkdir, readFile } from 'fs/promises';
import { tmpdir } from 'os';
import path from 'path';

const execFileAsync = promisify(execFile);

function tectonicPath() {
  const candidates = [
    '/tmp/tectonic',
    path.join(process.cwd(), 'bin/tectonic'),
    'tectonic',
  ];
  return candidates.find((bin) => bin === 'tectonic' || existsSync(bin)) || null;
}

export async function GET() {
  const texPath = path.join(process.cwd(), 'cv.tex');
  if (!existsSync(texPath)) {
    return new Response('cv.tex not found', { status: 404 });
  }

  const tectonic = tectonicPath();
  if (!tectonic) {
    return new Response('PDF compiler is not available', { status: 503 });
  }

  const outDir = path.join(tmpdir(), 'portfolio-cv');
  await mkdir(outDir, { recursive: true });

  try {
    await execFileAsync(tectonic, ['-X', 'compile', '--outdir', outDir, texPath], {
      timeout: 120000,
    });
  } catch {
    await execFileAsync(tectonic, ['-o', outDir, texPath], { timeout: 120000 });
  }

  const pdfPath = path.join(outDir, 'cv.pdf');
  const pdf = await readFile(pdfPath);

  return new Response(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Ritesh_Nikam_Resume.pdf"',
      'Cache-Control': 'no-store',
    },
  });
}
