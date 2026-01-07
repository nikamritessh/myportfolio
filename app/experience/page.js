'use client';

import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, Globe, Star, Terminal, Briefcase, Award, Clock, Activity } from 'lucide-react';
import { experiences } from '../data';
import { calculateDuration, formatDuration, getTotalExperience } from '../utils/stats';

const iconMap = {
    zap: Zap,
    globe: Globe,
    terminal: Terminal,
    award: Award,
    briefcase: Briefcase
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
        }
    }
};

export default function Experience() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const stats = useMemo(() => {
        const totalExperience = getTotalExperience();

        const currentJobs = experiences.filter(exp => !exp.endDate);
        const pastJobs = experiences.filter(exp => exp.endDate);

        // For current job duration, if multiple current, take the longest one or just first
        const currentJob = currentJobs[0];
        const currentDuration = currentJob ? calculateDuration(currentJob.startDate, null) : { years: 0, months: 0 };

        return {
            total: formatDuration(totalExperience),
            current: formatDuration(currentDuration),
            pastCount: pastJobs.length,
            activeCount: currentJobs.length
        };
    }, [experiences]);

    return (
        <div className="content-center" style={{ paddingBottom: '150px' }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
                <span className="section-label">Professional Journey</span>
                <h2 className="hero-title" style={{ fontSize: 'clamp(40px, 10vw, 140px)', marginBottom: '40px' }}>
                    EXPERIENCE
                </h2>

                {/* Live Stats Header */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '24px',
                    marginBottom: '80px'
                }}>
                    <div className="luxury-card" style={{ padding: '24px' }}>
                        <Clock size={20} style={{ color: 'var(--accent)', marginBottom: '12px' }} />
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total Experience</span>
                        <h3 style={{ fontSize: '24px', fontWeight: 800, marginTop: '4px' }}>{stats.total}</h3>
                    </div>
                    <div className="luxury-card" style={{ padding: '24px' }}>
                        <Activity size={20} style={{ color: '#10b981', marginBottom: '12px' }} />
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Current Tenure</span>
                        <h3 style={{ fontSize: '24px', fontWeight: 800, marginTop: '4px' }}>{stats.current}</h3>
                    </div>
                    <div className="luxury-card" style={{ padding: '24px' }}>
                        <Briefcase size={20} style={{ color: '#3b82f6', marginBottom: '12px' }} />
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Companies Moved</span>
                        <h3 style={{ fontSize: '24px', fontWeight: 800, marginTop: '4px' }}>{stats.pastCount} Left</h3>
                    </div>
                </div>
            </motion.div>

            <motion.div
                ref={containerRef}
                className="timeline-container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Horizontal progress bar for the timeline */}
                <motion.div
                    className="timeline-line"
                    style={{
                        scaleY,
                        transformOrigin: 'top',
                        background: 'linear-gradient(to bottom, var(--accent), transparent)'
                    }}
                />

                {/* Static line behind the animated one */}
                <div className="timeline-line" style={{ opacity: 0.1, background: 'var(--text-primary)' }} />

                {experiences.map((exp, i) => {
                    const Icon = iconMap[exp.type] || Briefcase;
                    const duration = calculateDuration(exp.startDate, exp.endDate);
                    const durationStr = formatDuration(duration);

                    return (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className="experience-item"
                        >
                            <div className="timeline-dot" />

                            <div className={`experience-card ${exp.highlight ? 'highlighted' : ''}`} style={{
                                position: 'relative',
                                ...(exp.highlight ? {
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    borderColor: 'rgba(255, 255, 255, 0.2)',
                                    borderWidth: '2px',
                                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.02)'
                                } : {})
                            }}>
                                <span className="experience-number">
                                    0{experiences.length - i}
                                </span>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px', marginBottom: '32px' }}>
                                    <div style={{ display: 'flex', gap: '20px' }}>
                                        <div style={{
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: '16px',
                                            background: exp.highlight ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                                            border: '1px solid var(--border-subtle)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: exp.highlight ? 'var(--accent)' : 'var(--text-secondary)',
                                            flexShrink: 0
                                        }}>
                                            <Icon size={28} />
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                {exp.role}
                                            </h3>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                                <span style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>{exp.company}</span>
                                                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-muted)' }} />
                                                <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500 }}>{exp.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                                        {exp.highlight && (
                                            <span className="premium-badge">
                                                Featured Role
                                            </span>
                                        )}
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                                            <span style={{
                                                padding: '8px 24px',
                                                borderRadius: '99px',
                                                border: '1px solid var(--border-medium)',
                                                fontSize: '12px',
                                                fontWeight: 600,
                                                color: 'var(--text-primary)',
                                                background: 'var(--bg-secondary)',
                                                whiteSpace: 'nowrap',
                                                display: 'inline-block'
                                            }}>
                                                {exp.period}
                                            </span>
                                            <span style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.05em' }}>
                                                {durationStr}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <p style={{
                                    fontSize: '18px',
                                    lineHeight: 1.6,
                                    color: 'var(--text-secondary)',
                                    marginBottom: '28px',
                                    maxWidth: '90%',
                                    fontWeight: 400
                                }}>
                                    {exp.description}
                                </p>

                                <ul style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '16px',
                                    marginBottom: '40px'
                                }}>
                                    {exp.details.map((detail, idx) => (
                                        <motion.li
                                            key={idx}
                                            initial={{ opacity: 0, x: 10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.5 + (idx * 0.1) }}
                                            style={{
                                                display: 'flex',
                                                gap: '16px',
                                                fontSize: '15px',
                                                color: 'var(--text-secondary)',
                                                lineHeight: 1.6
                                            }}
                                        >
                                            <span style={{ color: 'var(--accent)', opacity: 0.8, fontSize: '14px', marginTop: '4px' }}>▹</span>
                                            {detail}
                                        </motion.li>
                                    ))}
                                </ul>

                                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                    {exp.tags.map((tag, idx) => (
                                        <span key={idx} className="skill-tag" style={{
                                            background: exp.highlight ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                                            borderColor: exp.highlight ? 'rgba(255, 255, 255, 0.1)' : 'var(--border-subtle)'
                                        }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}
