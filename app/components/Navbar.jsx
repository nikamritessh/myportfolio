'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { Home, Briefcase, FileText, History, Cpu, Mail } from 'lucide-react';

const navItems = [
    { path: '/', label: 'Home', icon: <Home size={18} /> },
    { path: '/projects', label: 'Projects', icon: <Briefcase size={18} /> },
    { path: '/case-studies', label: 'Case Studies', icon: <FileText size={18} /> },
    { path: '/experience', label: 'Experience', icon: <History size={18} /> },
    { path: '/skills', label: 'Skills', icon: <Cpu size={18} /> },
    { path: '/contact', label: 'Contact', icon: <Mail size={18} /> },
];

const Navbar = () => {
    const pathname = usePathname();
    const isHome = pathname === '/';

    return (
        <>
            {/* Show only on homepage for mobile via CSS conditional display */}
            <div className={`mobile-toggle-wrapper ${isHome ? 'is-visible' : 'is-hidden'}`}>
                <ThemeToggle />
            </div>

            <nav className="nav-container">
                <div className="nav-inner">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`nav-item ${isActive ? 'active' : ''}`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="nav-item-bg"
                                        transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                                    />
                                )}
                                <div className="nav-icon">{item.icon}</div>
                                <span className="nav-label">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
                <div className="nav-toggle-wrapper">
                    <ThemeToggle />
                </div>
            </nav>
        </>
    );
};

export default Navbar;
