import { Download } from 'lucide-react';

export default function DownloadResumeButton() {
  return (
    <a
      href="/api/resume"
      download="Ritesh_Nikam_Resume.pdf"
      className="btn btn-primary cv-download-btn"
    >
      <Download size={16} />
      Download PDF
    </a>
  );
}
