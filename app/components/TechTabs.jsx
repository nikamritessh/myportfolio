'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { techCategories } from '../data';
import TechCard from './TechCard';

export default function TechTabs() {
    const [active, setActive] = useState(techCategories[0].id);
    const category = techCategories.find((c) => c.id === active);

    return (
        <div>
            <div className="tabs" role="tablist">
                {techCategories.map((cat) => (
                    <button
                        key={cat.id}
                        role="tab"
                        aria-selected={active === cat.id}
                        className={`tab ${active === cat.id ? 'active' : ''}`}
                        onClick={() => setActive(cat.id)}
                    >
                        {active === cat.id && (
                            <motion.span
                                layoutId="tab-pill"
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'var(--bg-elevated)',
                                    borderRadius: 'var(--radius-full)',
                                    boxShadow: 'var(--shadow-sm)',
                                    zIndex: -1,
                                }}
                                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                            />
                        )}
                        {cat.label}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={active}
                    className="tech-grid"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                    {category.items.map((tech) => (
                        <TechCard key={tech.name} tech={tech} />
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
