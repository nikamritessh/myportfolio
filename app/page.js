'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Twitter, Linkedin, Terminal, Zap, Globe } from 'lucide-react';
import Link from 'next/link';
import Clock from './components/Clock';
import { getPortfolioStats } from './utils/stats';


export default function Home() {
  const stats = getPortfolioStats();

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.645, 0.045, 0.355, 1]
      }
    }
  };

  return (
    <div className="content-center" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '64px', alignItems: 'center' }}>

      {/* Left Column: Hero Content */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{ width: '40px', height: '1px', background: 'var(--text-muted)' }} />
          <span className="section-label" style={{ marginBottom: 0 }}>RITESH NIKAM / ARCHITECT</span>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 15px var(--accent)' }} />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="hero-title"
          style={{ marginBottom: '40px' }}
        >
          DEFINING <br />
          THE EDGE OF <br />
          POSSIBILITY.
        </motion.h1>

        <motion.p
          variants={itemVariants}
          style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            maxWidth: '540px',
            lineHeight: 1.6,
            marginBottom: '56px'
          }}
        >
          Software Engineer specializing in high-performance distributed systems,
          cinematic user interfaces, and the pursuit of engineering excellence.
        </motion.p>

        <motion.div variants={itemVariants} style={{ display: 'flex', gap: '20px' }}>
          <Link href="/projects" style={{ textDecoration: 'none' }}>
            <motion.button
              className="luxury-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              EXPLORE WORKS <ArrowUpRight size={18} />
            </motion.button>
          </Link>
          <Link href="/contact" style={{ textDecoration: 'none' }}>
            <motion.button
              className="luxury-button"
              style={{ background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-medium)' }}
              whileHover={{ scale: 1.05, backgroundColor: 'var(--border-subtle)' }}
              whileTap={{ scale: 0.95 }}
            >
              GET IN TOUCH
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Right Column: Creative Feature Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}
      >
        {/* Digital Clock */}
        <div style={{ gridColumn: 'span 2' }}>
          <Clock />
        </div>

        {/* Experience Card */}
        <Link href="/experience" style={{ textDecoration: 'none', gridColumn: 'span 2' }}>
          <div className="luxury-card" style={{ padding: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span className="section-label">Experience</span>
              <h2 style={{ fontSize: '48px', fontWeight: 800 }}>{Math.floor(stats.experienceYears).toString().padStart(2, '0')}+</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Years of engineering expertise</p>
            </div>
            <Zap size={32} color="var(--text-muted)" />
          </div>
        </Link>

        {/* Projects Preview */}
        <Link href="/projects" style={{ textDecoration: 'none' }}>
          <div className="luxury-card" style={{ padding: '32px' }}>
            <Terminal size={24} style={{ marginBottom: '24px', opacity: 0.5 }} />
            <span className="section-label" style={{ fontSize: '10px' }}>Projects</span>
            <h3 style={{ fontSize: '20px' }}>{stats.projectsCount} Units</h3>
          </div>
        </Link>

        {/* Global Reach */}
        <Link href="/case-studies" style={{ textDecoration: 'none' }}>
          <div className="luxury-card" style={{ padding: '32px' }}>
            <Globe size={24} style={{ marginBottom: '24px', opacity: 0.5 }} />
            <span className="section-label" style={{ fontSize: '10px' }}>Case Studies</span>
            <h3 style={{ fontSize: '20px' }}>{stats.caseStudiesCount} Detailed</h3>
          </div>
        </Link>

        {/* Theme Lab Creative Card - Compact Rectangle */}
        <Link href="/theme-lab" style={{ textDecoration: 'none', gridColumn: 'span 2' }}>
          <motion.div
            className="luxury-card theme-lab-card"
            whileHover={{ y: -5, scale: 1.01 }}
            style={{
              padding: '24px 32px',
              background: 'var(--luxury-card-bg, rgba(255, 255, 255, 0.02))',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--border-subtle)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '20px',
              minHeight: '140px'
            }}
          >
            {/* Visual background splash */}
            <div style={{
              position: 'absolute',
              right: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '180px',
              height: '180px',
              background: 'radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%)',
              filter: 'blur(30px)',
              pointerEvents: 'none'
            }} />

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '32px', width: '100%', alignItems: 'center' }}>
              {/* Scaled down Vertical Emojis */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', opacity: 0.8 }}>
                <span>🎨</span>
                <span>⚡</span>
                <span>✨</span>
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{ width: '24px', height: '24px', background: 'var(--text-primary)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Zap size={14} color="var(--bg-primary)" fill="var(--bg-primary)" />
                  </div>
                  <span className="section-label" style={{ marginBottom: 0, fontSize: '9px', color: 'var(--text-secondary)', fontWeight: 800 }}>THEME LAB</span>
                </div>

                <h3 style={{
                  fontSize: '28px',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(to right, #a855f7, #e879f9)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1,
                  textTransform: 'uppercase'
                }}>
                  Creative Customization
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.5, maxWidth: '400px', marginTop: '6px', opacity: 0.8 }}>
                  Real-time design system playground. Adjust architecture density and visual identity.
                </p>
              </div>

              {/* Minimalist Action Indicator */}
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.03)'
              }}>
                <ArrowUpRight size={18} color="var(--text-primary)" opacity={0.5} />
              </div>
            </div>
          </motion.div>
        </Link>

        <div style={{
          gridColumn: 'span 2',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          background: 'rgba(255,255,255,0.01)',
          marginTop: '0px'
        }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="https://github.com/nikamritessh" target="_blank" rel="noopener noreferrer" className="mag-icon" style={{ width: '32px', height: '32px', border: 'none', background: 'transparent' }}>
              <Github size={18} color="var(--text-secondary)" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="mag-icon" style={{ width: '32px', height: '32px', border: 'none', background: 'transparent' }}>
              <Twitter size={18} color="var(--text-secondary)" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="mag-icon" style={{ width: '32px', height: '32px', border: 'none', background: 'transparent' }}>
              <Linkedin size={18} color="var(--text-secondary)" />
            </a>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>AVAILABLE FOR GLOBAL PROJECTS</span>
        </div>
      </motion.div>

      <style jsx>{`
        .theme-lab-card:hover .blob {
          transform: scale(1.4) translate(-10%, -10%);
          filter: blur(50px);
          opacity: 0.4;
        }

        .theme-lab-card:hover .f-item {
            transform: translateY(-20px) rotate(15deg);
            opacity: 1;
        }
        
        .card-blobs {
          position: absolute;
          top: 0;
          right: 0;
          width: 60%;
          height: 100%;
          pointer-events: none;
        }
        
        .blob {
          position: absolute;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.15;
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .b1 { top: -20px; right: 20px; background: #3b82f6; }
        .b2 { bottom: -20px; right: 100px; background: #ec4899; }
        .b3 { top: 60px; right: -20px; background: #10b981; }

        .floating-elements {
            position: absolute;
            inset: 0;
            pointer-events: none;
        }

        .f-item {
            position: absolute;
            font-size: 24px;
            opacity: 0.3;
            transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
      `}</style>

      {/* Background Year Highlight */}
      <motion.div
        style={{
          position: 'fixed',
          right: '-10%',
          bottom: '-10%',
          fontSize: '35vw',
          fontWeight: 900,
          color: 'var(--text-primary)',
          opacity: 0.02,
          pointerEvents: 'none',
          zIndex: -1,
          lineHeight: 1
        }}
      >
        2026
      </motion.div>
    </div >
  );
}
