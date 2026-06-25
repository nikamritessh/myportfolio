'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, FileText, ArrowRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { site } from '../data/site';

const navItems = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/experience', label: 'Experience' },
    { path: '/skills', label: 'Skills' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Hire Me' },
];

const Navbar = () => {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    useEffect(() => {
        document.body.classList.toggle('scroll-lock', open);
        return () => document.body.classList.remove('scroll-lock');
    }, [open]);

    const isActive = (path) =>
        path === '/' ? pathname === '/' : pathname.startsWith(path);

    return (
        <header className={`nav-wrap ${scrolled ? 'scrolled' : ''}`}>
            <nav className="nav" aria-label="Primary">
                <Link href="/" className="nav-logo" aria-label="Home">
                    <span className="nav-logo-mark">RN</span>
                    <span className="nav-logo-text">Ritesh Nikam</span>
                </Link>

                <div className="nav-links" role="navigation">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="nav-actions">
                    <a
                        href={site.resumePdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm nav-resume"
                    >
                        <FileText size={15} /> Resume
                    </a>
                    <ThemeToggle />
                    <button
                        className="nav-menu-btn"
                        onClick={() => setOpen((v) => !v)}
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-expanded={open}
                    >
                        {open ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </nav>

            {open && (
                <div className="nav-drawer">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="nav-drawer-cta">
                        <a
                            href={site.resumePdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-lg"
                        >
                            <FileText size={16} /> View Resume
                        </a>
                        <Link href="/contact" className="btn btn-accent btn-lg">
                            Hire Me <ArrowRight className="arrow" size={16} />
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
