'use client';

import React, { useState } from 'react';
import {
    Mail,
    Github,
    Linkedin,
    Calendar,
    FileText,
    ArrowRight,
    Phone,
    Check,
} from 'lucide-react';
import Link from 'next/link';
import Reveal from '../components/Reveal';
import { Select } from '../components/ui';
import { site, gmailComposeUrl } from '../data/site';

const PROJECT_TYPES = [
    { value: 'AI Product', label: 'AI Product' },
    { value: 'Full Stack Web App', label: 'Full Stack Web App' },
    { value: 'Automation / Integration', label: 'Automation / Integration' },
    { value: 'Full-time Role', label: 'Full-time Role' },
    { value: 'Other', label: 'Other' },
];

const BUDGET_OPTIONS = [
    { value: '', label: 'Select range' },
    { value: 'Under $1k', label: 'Under $1k' },
    { value: '$1k – $5k', label: '$1k – $5k' },
    { value: '$5k – $15k', label: '$5k – $15k' },
    { value: '$15k+', label: '$15k+' },
    { value: 'Full-time / Salary', label: 'Full-time / Salary' },
];

const TIMELINE_OPTIONS = [
    { value: '', label: 'Select timeline' },
    { value: 'ASAP', label: 'ASAP' },
    { value: 'Within 1 month', label: 'Within 1 month' },
    { value: '1 – 3 months', label: '1 – 3 months' },
    { value: 'Flexible', label: 'Flexible' },
];

const contactCards = [
    { icon: <Mail size={16} />, k: 'Email', v: site.email, href: gmailComposeUrl(), external: true },
    { icon: <Phone size={16} />, k: 'Phone', v: site.phone, href: site.phoneHref, external: false },
    { icon: <Github size={16} />, k: 'GitHub', v: site.github.handle, href: site.github.url, external: true },
    { icon: <Linkedin size={16} />, k: 'LinkedIn', v: site.linkedin.label, href: site.linkedin.url, external: true },
    { icon: <Calendar size={16} />, k: 'Schedule', v: 'Book a call', href: '#', external: false },
    { icon: <FileText size={16} />, k: 'Resume', v: 'View online', href: site.resumePdf, external: true },
];

export default function HireMePage() {
    const [form, setForm] = useState({
        name: '', email: '', company: '', role: '',
        projectType: 'AI Product', budget: '', timeline: '', message: '',
    });

    const setField = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

    const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const onSubmit = (e) => {
        e.preventDefault();
        const subject = `Project inquiry from ${form.name || 'website'}`;
        const body =
            `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nRole: ${form.role}\n` +
            `Project type: ${form.projectType}\nBudget: ${form.budget}\nTimeline: ${form.timeline}\n\n${form.message}`;
        window.open(gmailComposeUrl({ subject, body }), '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            <section className="container-narrow page-top contact-hero">
                <Reveal>
                    <span className="status-badge">
                        <span className="status-dot" /> Available for full-time opportunities
                    </span>
                    <h1 className="display">
                        Let&apos;s build something great together
                    </h1>
                    <p className="body-lg">
                        Whether you&apos;re hiring a Full Stack Engineer, AI Engineer, or looking
                        to build AI-powered products, I&apos;d love to hear about your project.
                    </p>
                    <div className="hero-cta">
                        <a href="#" className="btn btn-accent btn-lg"><Calendar size={17} /> Schedule a Call</a>
                        <a href={site.resumePdf} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg"><FileText size={16} /> View Resume</a>
                        <a href={gmailComposeUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg"><Mail size={16} /> Email Me</a>
                    </div>
                </Reveal>
            </section>

            <section className="container contact-form-section">
                <div className="contact-grid">
                    <Reveal>
                        <form className="form card contact-form" onSubmit={onSubmit}>
                            <div className="form-row">
                                <div className="field">
                                    <label htmlFor="name">Name</label>
                                    <input id="name" className="input" placeholder="Your name" value={form.name} onChange={update('name')} required />
                                </div>
                                <div className="field">
                                    <label htmlFor="email">Email</label>
                                    <input id="email" type="email" className="input" placeholder="you@company.com" value={form.email} onChange={update('email')} required />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="field">
                                    <label htmlFor="company">Company</label>
                                    <input id="company" className="input" placeholder="Company / Org" value={form.company} onChange={update('company')} />
                                </div>
                                <div className="field">
                                    <label htmlFor="role">Your Role</label>
                                    <input id="role" className="input" placeholder="e.g. Founder, Recruiter" value={form.role} onChange={update('role')} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="field">
                                    <label htmlFor="projectType">Project Type</label>
                                    <Select
                                        id="projectType"
                                        value={form.projectType}
                                        onChange={setField('projectType')}
                                        options={PROJECT_TYPES}
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="budget">Budget</label>
                                    <Select
                                        id="budget"
                                        value={form.budget}
                                        onChange={setField('budget')}
                                        options={BUDGET_OPTIONS}
                                        placeholder="Select range"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="timeline">Timeline</label>
                                <Select
                                    id="timeline"
                                    value={form.timeline}
                                    onChange={setField('timeline')}
                                    options={TIMELINE_OPTIONS}
                                    placeholder="Select timeline"
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" className="textarea" placeholder="Tell me about your project, role, or what you're trying to build..." value={form.message} onChange={update('message')} required />
                            </div>
                            <button type="submit" className="btn btn-accent btn-lg" style={{ width: '100%' }}>
                                Send message <ArrowRight className="arrow" size={17} />
                            </button>
                        </form>
                    </Reveal>

                    <div className="contact-aside">
                        <Reveal>
                            <div className="contact-panel">
                                <h3 className="contact-panel__title">Availability</h3>
                                <div className="avail-row"><span className="k">Status</span><span className="chip-yes"><Check size={13} /> Available</span></div>
                                <div className="avail-row"><span className="k">Remote</span><span className="v">Yes</span></div>
                                <div className="avail-row"><span className="k">Hybrid</span><span className="v">Yes</span></div>
                                <div className="avail-row"><span className="k">Relocation</span><span className="v">Open</span></div>
                                <div className="avail-row"><span className="k">Timezone</span><span className="v">IST</span></div>
                                <div className="avail-row"><span className="k">Response</span><span className="v">24h</span></div>
                            </div>
                        </Reveal>

                        <Reveal delay={0.06}>
                            <div className="contact-panel">
                                <h3 className="contact-panel__title">Contact</h3>
                                <div className="contact-links">
                                    {contactCards.map((c) => {
                                        const inner = (
                                            <>
                                                <span className="cc-icon">{c.icon}</span>
                                                <span className="cc-text">
                                                    <span className="cc-k">{c.k}</span>
                                                    <span className="cc-v">{c.v}</span>
                                                </span>
                                            </>
                                        );
                                        if (c.external) {
                                            return (
                                                <a key={c.k} href={c.href} target="_blank" rel="noopener noreferrer" className="contact-link">{inner}</a>
                                            );
                                        }
                                        if (c.href.startsWith('/')) {
                                            return <Link key={c.k} href={c.href} className="contact-link">{inner}</Link>;
                                        }
                                        return <a key={c.k} href={c.href} className="contact-link">{inner}</a>;
                                    })}
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </>
    );
}
