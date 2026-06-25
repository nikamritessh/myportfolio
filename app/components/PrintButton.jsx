'use client';

import { Download } from 'lucide-react';

export default function PrintButton({ className = 'btn btn-accent', label = 'Download PDF' }) {
    return (
        <button className={className} onClick={() => window.print()}>
            <Download size={16} /> {label}
        </button>
    );
}
