'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, X, Shield, Eye, Brain, Activity, Clock, Heart, Zap, Play, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Portal from '../components/Portal';
import { projects } from '../data';

const iconMap = {
    shield: Shield,
    eye: Eye,
    brain: Brain,
    activity: Activity,
    clock: Clock,
    heart: Heart,
    zap: Zap,
    play: Play,
    'check-circle': CheckCircle2
};

const ProjectCard = ({ project, index, onOpen }) => {
    const cardRef = useRef(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateXVal = ((y - centerY) / centerY) * 12;
        const rotateYVal = ((centerX - x) / centerX) * 12;

        setRotateX(rotateXVal);
        setRotateY(rotateYVal);
        setMousePos({ x, y });
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    const springConfig = { damping: 25, stiffness: 150 };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => onOpen(project)}
            initial={{ opacity: 0, y: 50, rotateY: 20 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 1.2,
                ease: [0.215, 0.61, 0.355, 1],
                delay: index * 0.05
            }}
            style={{
                perspective: 1200,
                rotateX: useSpring(rotateX, springConfig),
                rotateY: useSpring(rotateY, springConfig),
                cursor: 'pointer'
            }}
            className="creative-project-card group"
        >
            {/* Background Index Number */}
            <div className="card-bg-number">{index + 1}</div>

            {/* Spotlight Glow Effect */}
            <div
                className="card-spotlight"
                style={{
                    background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${project.color}15, transparent 80%)`
                }}
            />

            <div className="project-image-container">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="project-image transition-transform duration-700 group-hover:scale-110"
                    style={{ objectFit: 'cover' }}
                    priority={index < 2}
                />
                <div className="project-overlay" style={{ background: `linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)` }} />

                <div className="image-tag">{project.category}</div>

                {project.details && (
                    <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10 }}>
                        <div className="featured-badge">
                            <span className="featured-dot" />
                            Featured
                        </div>
                    </div>
                )}
            </div>

            <div className="project-content">
                <div className="project-header">
                    <span className="project-year-pill">{project.year}</span>
                    <div className="project-links">
                        <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            whileHover={{ scale: 1.2, rotate: -10 }}
                            className="mag-icon"
                        >
                            <Github size={20} />
                        </motion.a>
                        <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            className="mag-icon"
                        >
                            <ArrowUpRight size={22} />
                        </motion.a>
                    </div>
                </div>

                <div className="project-info">
                    <h3 className="project-title-creative">
                        {project.title.split('').map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.5 + (i * 0.03) }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </h3>
                    {project.subtitle && <p style={{ fontSize: '10px', color: '#3b82f6', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '16px' }}>{project.subtitle}</p>}
                    <p className="project-description" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{project.description}</p>

                    <div className="project-tags-row">
                        {project.tags.map((tag, i) => (
                            <motion.span
                                key={i}
                                className="project-tag-pill"
                                whileHover={{ backgroundColor: project.color + '22', borderColor: project.color }}
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </div>

                    <motion.div
                        style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.5)' }}
                        whileHover={{ x: 5, color: 'white' }}
                    >
                        VIEW CASE STUDY <ArrowUpRight size={14} />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="project-modal-backdrop"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 50, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="project-modal-container"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="modal-close-btn"
                >
                    <X size={24} />
                </button>

                <div className="modal-visual-side">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #0a0a0a, transparent)', opacity: 0.6 }} className="hidden-mobile" />

                    <div style={{ position: 'absolute', bottom: '32px', left: '32px', right: '32px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        {project.details?.pillars?.map((pillar, i) => {
                            // Use a generic icon or map if possible
                            return (
                                <div key={i} className="pillar-pill">
                                    <Activity size={18} />
                                    {pillar.label}
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="modal-content-side modal-scrollbar">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                        <span style={{ color: '#3b82f6', fontWeight: 800, letterSpacing: '0.2em', fontSize: '12px', textTransform: 'uppercase' }}>{project.category}</span>
                        <div style={{ width: '48px', height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                        <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 500, fontSize: '12px' }}>{project.year}</span>
                    </div>

                    <h1 style={{ fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 900, color: 'white', marginBottom: '8px', letterSpacing: '-0.04em', lineHeight: 1 }}>
                        {project.title.toUpperCase()}
                    </h1>

                    {project.subtitle && (
                        <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.4)', marginBottom: '40px', fontWeight: 300, fontStyle: 'italic' }}>
                            {project.subtitle}
                        </p>
                    )}

                    <div style={{ marginBottom: '48px' }}>
                        <h3 style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>Overview</h3>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', lineHeight: 1.7, fontWeight: 300 }}>
                            {project.details?.mainDescription || project.description}
                        </p>
                        {project.details?.extendedDescription && (
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.7, marginTop: '16px', fontWeight: 300 }}>
                                {project.details.extendedDescription}
                            </p>
                        )}
                    </div>

                    {project.details?.features && (
                        <div style={{ marginBottom: '48px' }}>
                            <h3 style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '24px' }}>Key Engineering Features</h3>
                            <div className="feature-grid">
                                {project.details.features.map((feature, i) => {
                                    const Icon = iconMap[feature.type] || Activity;
                                    return (
                                        <div key={i} className="feature-card">
                                            <div className="feature-icon-wrapper"><Icon className="text-blue-400" /></div>
                                            <h4 className="feature-title">{feature.title}</h4>
                                            <p className="feature-description">{feature.desc}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {project.details?.techStack && (
                        <div style={{ marginBottom: '48px' }}>
                            <h3 style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '24px' }}>Architecture & Stack</h3>
                            <div className="feature-grid">
                                <div className="feature-card">
                                    <h4 className="feature-title" style={{ color: '#3b82f6' }}>Frontend</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '12px' }}>
                                        {project.details.techStack.frontend.map((tech, i) => (
                                            <span key={i} style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>• {tech}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="feature-card">
                                    <h4 className="feature-title" style={{ color: '#a855f7' }}>Backend & AI</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '12px' }}>
                                        {[...project.details.techStack.backend, ...project.details.techStack.ai].map((tech, i) => (
                                            <span key={i} style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>• {tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div style={{ marginBottom: '48px' }}>
                        <h3 style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>Built With</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {project.tags.map((tag, i) => (
                                <span key={i} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="modal-cta-row">
                        <a href={project.github} target="_blank" className="modal-cta-btn primary">
                            <Github size={20} /> VIEW SOURCE
                        </a>
                        <a href={project.link} target="_blank" className="modal-cta-btn secondary">
                            LIVE DEMO <ArrowUpRight size={20} />
                        </a>
                    </div>
                </div>
            </motion.div>

            <style jsx>{`
                .hidden-mobile {
                    display: block;
                }
                @media (max-width: 1024px) {
                    .hidden-mobile {
                        display: none;
                    }
                }
            `}</style>
        </motion.div>
    );
};

export default function Projects() {
    const containerRef = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const { scrollXProgress } = useScroll({
        container: containerRef
    });

    const scaleX = useSpring(scrollXProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.classList.add('scroll-lock');
        } else {
            document.body.classList.remove('scroll-lock');
        }
        return () => { document.body.classList.remove('scroll-lock'); };
    }, [selectedProject]);

    return (
        <div className="projects-container relative">
            <div className="projects-header-section">
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="section-label"
                >
                    Portfolio / 2022-2025
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hero-title"
                >
                    PROJECTS
                </motion.h2>

                {/* Scroll Indicator */}
                <div className="scroll-progress-container">
                    <motion.div className="scroll-progress-bar" style={{ scaleX }} />
                </div>
            </div>

            <div className="horizontal-scroll-wrapper" ref={containerRef}>
                <div className="projects-horizontal-list">
                    {projects.map((project, i) => (
                        <ProjectCard
                            key={i}
                            project={project}
                            index={i}
                            onOpen={setSelectedProject}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <Portal>
                        <ProjectModal
                            project={selectedProject}
                            onClose={() => setSelectedProject(null)}
                        />
                    </Portal>
                )}
            </AnimatePresence>

            {/* Custom Styles for Mobile and Layout */}
            <style jsx global>{`
                .scroll-lock {
                    overflow: hidden;
                }
                .modal-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .modal-scrollbar::-webkit-scrollbar-track {
                    background: rgba(0,0,0,0.2);
                }
                .modal-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.1);
                    border-radius: 10px;
                }
                @media (max-width: 768px) {
                    .projects-horizontal-list {
                        flex-direction: column;
                        padding: 20px;
                        gap: 40px;
                    }
                    .creative-project-card {
                        min-width: 100% !important;
                    }
                    .project-modal-container {
                        flex-direction: column;
                        height: 90vh;
                        width: 95vw;
                    }
                    .modal-visual-side {
                        height: 300px;
                    }
                }
            `}</style>
        </div>
    );
}
