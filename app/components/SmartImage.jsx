'use client';

import React, { useState } from 'react';
import Image from 'next/image';

/**
 * Image with object-fit: contain and monogram fallback.
 * Always used inside a positioned parent (e.g. ImageFrame).
 */
export default function SmartImage({ src, alt, monogram, priority = false, sizes, className = '' }) {
    const [failed, setFailed] = useState(false);

    if (failed || !src) {
        return (
            <div className="project-image-placeholder" aria-label={alt} role="img">
                {(monogram || alt || '?').charAt(0).toUpperCase()}
            </div>
        );
    }

    return (
        <Image
            src={src}
            alt={alt}
            fill
            className={`image-frame__media ${className}`.trim()}
            style={{ objectFit: 'contain', objectPosition: 'center' }}
            sizes={sizes || '(max-width: 900px) 100vw, 50vw'}
            priority={priority}
            loading={priority ? undefined : 'lazy'}
            onError={() => setFailed(true)}
        />
    );
}
