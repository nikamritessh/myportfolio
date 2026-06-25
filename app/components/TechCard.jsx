'use client';

import React, { useState } from 'react';
import { getTechIcon } from '../utils/techIcon';

export default function TechCard({ tech }) {
    const [failed, setFailed] = useState(false);
    const icon = getTechIcon(tech.icon);

    return (
        <div className="tech-card" title={`${tech.name} · ${tech.level} · ${tech.years} yrs`}>
            <span className="tech-logo">
                {icon && !failed ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={icon}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        width={24}
                        height={24}
                        className="tech-logo__img"
                        onError={() => setFailed(true)}
                    />
                ) : (
                    <span style={{ fontWeight: 700, color: 'var(--color-accent)', fontSize: 15 }}>
                        {tech.name.charAt(0)}
                    </span>
                )}
            </span>
            <span className="tech-info">
                <span className="tech-name">{tech.name}</span>
                <span className="tech-meta">
                    <span className={`level-dot level-${tech.level}`} />
                    {tech.level} · {tech.years} yrs
                </span>
            </span>
        </div>
    );
}
