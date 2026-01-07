'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { caseStudies } from '../data';

const CaseStudySection = ({ study, index }) => {
    const isEven = index % 2 === 0;

    return (
        <section className={`case-study-section ${isEven ? 'row' : 'row-reverse'}`}>
            <div className="study-visual">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    className="visual-container"
                >
                    <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        className="study-img"
                        style={{ objectFit: 'cover' }}
                    />
                    <div className="visual-overlay" style={{ background: `linear-gradient(${isEven ? 'to right' : 'to left'}, var(--bg-primary), transparent)` }} />
                </motion.div>
            </div>

            <div className="study-details">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    <span className="study-id">{study.id}</span>
                    <div className="study-header-meta">
                        <span className="study-year">{study.year}</span>
                        <span className="study-category" style={{ color: study.color }}>{study.category}</span>
                    </div>
                    <h3 className="study-title">{study.title}</h3>

                    <div className="study-content-grid">
                        <div className="content-block">
                            <h4 className="block-label">The Challenge</h4>
                            <p className="block-text">{study.problem}</p>
                        </div>
                        <div className="content-block">
                            <h4 className="block-label">The Solution</h4>
                            <p className="block-text">{study.solution}</p>
                        </div>
                    </div>

                    <div className="study-metrics-row">
                        {study.metrics.map((metric, i) => (
                            <div key={metric.label} className="metric-item">
                                <span className="metric-value" style={{ color: study.color }}>{metric.value}</span>
                                <span className="metric-label">{metric.label}</span>
                            </div>
                        ))}
                    </div>

                    {study.url && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="luxury-button"
                            style={{ marginTop: '40px', background: study.color, color: 'black' }}
                            onClick={() => window.open(study.url, '_blank')}
                        >
                            Read Research Paper
                        </motion.button>
                    )}
                    {!study.url && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="luxury-button acknowledgment-btn"
                            style={{ marginTop: '40px' }}
                        >
                            View Acknowledgment
                        </motion.button>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default function CaseStudies() {
    return (
        <div className="case-studies-page">
            <div className="case-studies-hero">
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="section-label"
                >
                    Impact & Research
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hero-title"
                >
                    CASE STUDIES
                </motion.h2>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, repeat: Infinity, duration: 2 }}
                    className="scroll-hint"
                >
                    SCROLL TO EXPLORE <ArrowDown size={14} />
                </motion.div>
            </div>

            <div className="studies-container">
                {caseStudies.map((study, i) => (
                    <CaseStudySection key={study.id} study={study} index={i} />
                ))}
            </div>
        </div>
    );
}
