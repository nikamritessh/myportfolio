'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock as ClockIcon, Globe } from 'lucide-react';

const Clock = () => {
    const [time, setTime] = useState(null);

    useEffect(() => {
        setTime(new Date());
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!time) {
        return <div className="luxury-card" style={{ padding: '32px', minHeight: '234px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="pulse-dot" />
        </div>;
    }

    const formatUnit = (unit) => unit.toString().padStart(2, '0');

    const hours = formatUnit(time.getHours());
    const minutes = formatUnit(time.getMinutes());
    const seconds = formatUnit(time.getSeconds());

    // Calculate timezone offset
    const offset = -time.getTimezoneOffset() / 60;
    const offsetString = offset >= 0 ? `+${offset}` : offset.toString();

    return (
        <div className="luxury-card" style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.03)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--border-subtle)'
                    }}>
                        <ClockIcon size={14} color="var(--text-primary)" />
                    </div>
                    <div>
                        <span className="section-label" style={{ marginBottom: 2, fontSize: '9px', color: 'var(--text-primary)' }}>SYSTEM TIME</span>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>GMT {offsetString} / ASIA_KOLKATA</div>
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <Globe size={14} color="var(--text-muted)" style={{ marginBottom: '4px' }} />
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'baseline' }}>
                    <TimeUnit value={hours} />
                    <span style={{ fontSize: '40px', fontWeight: 200, color: 'var(--text-muted)', paddingBottom: '8px' }}>:</span>
                    <TimeUnit value={minutes} />
                </div>

                <div style={{ paddingBottom: '12px' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={seconds}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                fontSize: '24px',
                                fontWeight: 600,
                                color: 'var(--text-secondary)',
                                fontFamily: 'var(--font-display)',
                                minWidth: '32px'
                            }}
                        >
                            {seconds}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <div style={{
                marginTop: '32px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '20px',
                borderTop: '1px solid var(--border-subtle)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="pulse-dot" />
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em', fontWeight: 500 }}>REAL-TIME ENGINE ACTIVE</span>
                </div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontStyle: 'italic' }}>Precision: 1000ms</span>
            </div>

            {/* Decorative Gradient Glow */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            <style jsx>{`
        .pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 10px var(--accent);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
        </div>
    );
};

const TimeUnit = ({ value }) => {
    return (
        <div style={{ display: 'flex', gap: '2px' }}>
            {value.split('').map((char, index) => (
                <div key={index} style={{ width: '36px', textAlign: 'center', position: 'relative' }}>
                    <AnimatePresence mode="popLayout">
                        <motion.span
                            key={char}
                            initial={{ y: 20, opacity: 0, filter: 'blur(10px)' }}
                            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                            exit={{ y: -20, opacity: 0, filter: 'blur(10px)' }}
                            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                            style={{
                                fontSize: '64px',
                                fontWeight: 800,
                                display: 'inline-block',
                                fontFamily: 'var(--font-display)',
                                color: 'var(--text-primary)',
                                lineHeight: 1
                            }}
                        >
                            {char}
                        </motion.span>
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
};

export default Clock;
