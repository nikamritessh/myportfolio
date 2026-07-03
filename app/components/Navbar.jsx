'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, FileText } from 'lucide-react';
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
    const [hidden, setHidden] = useState(false);
    const [open, setOpen] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            const isMobile = window.matchMedia('(max-width: 900px)').matches;

            setScrolled(y > 64);

            if (isMobile) {
                if (y <= 24) {
                    setHidden(false);
                } else if (y > lastScrollY.current + 6) {
                    setHidden(true);
                } else if (y < lastScrollY.current - 6) {
                    setHidden(false);
                }
            } else {
                setHidden(false);
            }

            lastScrollY.current = y;
        };

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

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (event) => {
            if (event.key === 'Escape') setOpen(false);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [open]);

    const closeMenu = () => setOpen(false);

    const isActive = (path) =>
        path === '/' ? pathname === '/' : pathname.startsWith(path);

    return (
        <>
        <header className={`nav-wrap ${scrolled ? 'scrolled' : ''} ${hidden && !open ? 'nav-hidden' : ''} ${open ? 'menu-open' : ''}`}>
            <nav className="nav" aria-label="Primary">
                <Link href="/" className="nav-logo" aria-label="Home">
                    <span className="nav-logo-mark">RN</span>
                    <span className="nav-logo-text">{site.name}</span>
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
                        type="button"
                        className={`nav-menu-btn ${open ? 'is-open' : ''}`}
                        onClick={() => setOpen((v) => !v)}
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-expanded={open}
                        aria-controls="mobile-nav"
                    >
                        {open ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </nav>
        </header>

        {open && (
            <div className="mobile-nav-overlay">
                <button
                    type="button"
                    className="mobile-nav-backdrop"
                    onClick={closeMenu}
                    aria-label="Close menu"
                />
                <div
                    id="mobile-nav"
                    className="mobile-nav-panel"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Mobile navigation"
                >
                    <div className="mobile-nav-header">
                        <span>Menu</span>
                    </div>
                    <nav className="mobile-nav-links" aria-label="Mobile">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={isActive(item.path) ? 'active' : ''}
                                onClick={closeMenu}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="mobile-nav-foot">
                        <a
                            href={site.resumePdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={closeMenu}
                        >
                            <FileText size={14} /> Resume PDF
                        </a>
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default Navbar;
