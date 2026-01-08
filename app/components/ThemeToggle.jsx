'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div style={{ width: '64px', height: '32px', marginLeft: '12px' }} />;
    }

    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            className="cinematic-toggle"
            aria-label="Toggle Theme"
        >
            <div className={`track ${isDark ? 'is-dark' : 'is-light'}`}>
                {/* Background Atmosphere */}
                <div className="track-glow" />

                {/* Labels hidden behind the thumb */}
                <div className="icons">
                    <Sun size={12} className="icon sun" />
                    <Moon size={12} className="icon moon" />
                </div>

                {/* The Power Thumb */}
                <motion.div
                    className="thumb"
                    initial={false}
                    animate={{
                        x: isDark ? 36 : 4,
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                        mass: 1
                    }}
                >
                    <div className="thumb-core" />
                </motion.div>
            </div>

            <style jsx>{`
                .cinematic-toggle {
                    background: none;
                    border: none;
                    padding: 0;
                    margin-left: 12px;
                    cursor: pointer;
                    outline: none;
                    -webkit-tap-highlight-color: transparent;
                }

                .track {
                    width: 64px;
                    height: 32px;
                    border-radius: 20px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
                    border: 1px solid var(--border-subtle);
                    overflow: hidden;
                    background: #f1f5f9; /* Light default */
                    box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
                }

                .track.is-dark {
                    background: #0f172a;
                    border-color: rgba(96, 165, 250, 0.3);
                    box-shadow: inset 0 2px 8px rgba(0,0,0,0.4);
                }

                .track-glow {
                    position: absolute;
                    inset: 0;
                    opacity: 0;
                    transition: opacity 0.6s ease;
                    background: radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
                }
                .is-dark .track-glow { opacity: 1; }

                .icons {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 10px;
                    pointer-events: none;
                }

                .icon {
                    transition: all 0.4s ease;
                    z-index: 1;
                }

                .sun { color: #f59e0b; opacity: ${isDark ? 0.2 : 1}; transform: scale(${isDark ? 0.8 : 1}); }
                .moon { color: #94a3b8; opacity: ${isDark ? 1 : 0.2}; transform: scale(${isDark ? 1 : 0.8}); }
                .is-dark .moon { color: #60a5fa; }

                .thumb {
                    width: 24px;
                    height: 24px;
                    z-index: 5;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .thumb-core {
                    width: 100%;
                    height: 100%;
                    background: white;
                    border-radius: 50%;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.1);
                    position: relative;
                    transition: all 0.4s ease;
                }

                .is-dark .thumb-core {
                    background: #f8fafc;
                    box-shadow: 0 0 15px rgba(59, 130, 246, 0.4), 0 0 5px rgba(59, 130, 246, 0.2);
                }

                .cinematic-toggle:hover .track {
                    border-color: var(--text-muted);
                    box-shadow: inset 0 2px 4px rgba(0,0,0,0.1), 0 0 10px rgba(255,255,255,0.05);
                }

                .cinematic-toggle:active .thumb-core {
                    transform: scale(0.9);
                }
            `}</style>
        </button>
    );
};

export default ThemeToggle;
