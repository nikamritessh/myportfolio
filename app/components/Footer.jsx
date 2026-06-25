import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { site, gmailComposeUrl } from '../data/site';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <Link href="/" className="nav-logo">
                            <span className="nav-logo-mark">RN</span>
                            <span className="nav-logo-text">Ritesh Nikam</span>
                        </Link>
                        <p>
                            Full Stack AI Engineer building production-ready AI products —
                            LLMs, voice AI, automation, and modern cloud infrastructure.
                        </p>
                    </div>

                    <div className="footer-col">
                        <h4>Navigate</h4>
                        <Link href="/projects">Projects</Link>
                        <Link href="/experience">Experience</Link>
                        <Link href="/skills">Skills</Link>
                        <Link href="/about">About</Link>
                    </div>

                    <div className="footer-col">
                        <h4>Connect</h4>
                        <Link href="/contact">Hire Me</Link>
                        <a href={site.resumePdf} target="_blank" rel="noopener noreferrer">Resume</a>
                        <a href={site.github.url} target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href={site.linkedin.url} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <a href={gmailComposeUrl()} target="_blank" rel="noopener noreferrer">Email</a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span>© {year} Ritesh Nikam. All rights reserved.</span>
                    <div className="footer-socials">
                        <a className="icon-btn" href={site.github.url} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <Github size={18} />
                        </a>
                        <a className="icon-btn" href={site.linkedin.url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <Linkedin size={18} />
                        </a>
                        <a className="icon-btn" href={gmailComposeUrl()} target="_blank" rel="noopener noreferrer" aria-label="Email">
                            <Mail size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
