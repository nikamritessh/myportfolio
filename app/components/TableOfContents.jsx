'use client';

import React, { useEffect, useState } from 'react';

export default function TableOfContents({ sections }) {
    const [active, setActive] = useState(sections[0]?.id);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
        );
        sections.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [sections]);

    return (
        <nav className="toc" aria-label="On this page">
            <span className="toc-label">On this page</span>
            {sections.map((s) => (
                <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={active === s.id ? 'active' : ''}
                >
                    {s.label}
                </a>
            ))}
        </nav>
    );
}
