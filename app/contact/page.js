'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, Github, Twitter, Linkedin, ArrowRight, MapPin } from 'lucide-react';

export default function Contact() {
    const [focusedField, setFocusedField] = useState(null);

    const contactInfo = [
        { icon: <Mail size={18} />, label: 'Email', value: 'nikamritesh778@gmail.com', href: 'mailto:nikamritesh778@gmail.com' },
        { icon: <Phone size={18} />, label: 'Mobile', value: '+91 9136788710', href: 'tel:+919136788710' },
        { icon: <MapPin size={18} />, label: 'Location', value: 'Mumbai, India', href: '#' },
    ];

    return (
        <div className="content-center">
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '80px', alignItems: 'flex-start' }}>

                {/* Left Side: Creative Intro & Form */}
                <div>
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="section-label"
                    >
                        Communication Terminal
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="hero-title"
                        style={{ fontSize: 'clamp(40px, 8vw, 100px)', marginBottom: '32px' }}
                    >
                        LET'S START <br /> A CONVERSATION
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="luxury-card"
                        style={{ padding: '48px', marginTop: '48px' }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            {[
                                { id: 'name', label: 'Who are you?', placeholder: 'Enter your name' },
                                { id: 'email', label: 'Where can I reach you?', placeholder: 'Enter your email address' },
                                { id: 'message', label: 'What is on your mind?', placeholder: 'Tell me about your project or just say hi', area: true }
                            ].map((field) => (
                                <div key={field.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
                                    <label style={{
                                        fontSize: '11px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.15em',
                                        color: focusedField === field.id ? 'var(--text-primary)' : 'var(--text-muted)',
                                        transition: 'color 0.3s'
                                    }}>
                                        {field.label}
                                    </label>
                                    {field.area ? (
                                        <textarea
                                            onFocus={() => setFocusedField(field.id)}
                                            onBlur={() => setFocusedField(null)}
                                            rows="4"
                                            placeholder={field.placeholder}
                                            style={{
                                                background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-subtle)',
                                                padding: '12px 0', color: 'var(--text-primary)', outline: 'none', fontSize: '18px', resize: 'none',
                                                fontFamily: 'inherit', transition: 'border-color 0.3s'
                                            }}
                                        />
                                    ) : (
                                        <input
                                            onFocus={() => setFocusedField(field.id)}
                                            onBlur={() => setFocusedField(null)}
                                            type="text"
                                            placeholder={field.placeholder}
                                            style={{
                                                background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-subtle)',
                                                padding: '12px 0', color: 'var(--text-primary)', outline: 'none', fontSize: '18px',
                                                transition: 'border-color 0.3s'
                                            }}
                                        />
                                    )}
                                    <motion.div
                                        animate={{ width: focusedField === field.id ? '100%' : '0%' }}
                                        style={{ position: 'absolute', bottom: 0, height: '1px', background: 'var(--text-primary)', zIndex: 1 }}
                                    />
                                </div>
                            ))}

                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)' }}
                                whileTap={{ scale: 0.98 }}
                                className="luxury-button"
                                style={{
                                    marginTop: '16px',
                                    width: '100%',
                                    justifyContent: 'center',
                                    background: 'transparent',
                                    border: '1px solid var(--text-primary)',
                                    color: 'var(--text-primary)',
                                    height: '64px'
                                }}
                            >
                                TRANSMIT MESSAGE <ArrowRight size={18} style={{ marginLeft: '12px' }} />
                            </motion.button>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: Contact Details & Socials */}
                <div style={{ marginTop: '140px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>

                        {/* Direct Contact */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            <span className="section-label">Direct Lines</span>
                            {contactInfo.map((info, i) => (
                                <motion.a
                                    key={i}
                                    href={info.href}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + (i * 0.1) }}
                                    style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '20px', group: 'true' }}
                                >
                                    <div style={{
                                        width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--border-subtle)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)',
                                        transition: 'all 0.3s'
                                    }}>
                                        {info.icon}
                                    </div>
                                    <div>
                                        <span style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>{info.label}</span>
                                        <span style={{ fontSize: '16px', color: 'var(--text-primary)', fontWeight: 500 }}>{info.value}</span>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Social Matrix */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            <span className="section-label">Digital Presence</span>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                {[
                                    { icon: <Github size={20} />, name: 'GitHub' },
                                    { icon: <Twitter size={20} />, name: 'Twitter' },
                                    { icon: <Linkedin size={20} />, name: 'LinkedIn' },
                                    { icon: <Send size={20} />, name: 'Telegram' }
                                ].map((social, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ backgroundColor: 'var(--border-subtle)', borderColor: 'var(--border-medium)' }}
                                        style={{
                                            padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)',
                                            display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: 'all 0.3s'
                                        }}
                                    >
                                        <span style={{ color: 'var(--text-secondary)' }}>{social.icon}</span>
                                        <span style={{ fontSize: '13px', fontWeight: 500 }}>{social.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Availability Badge */}
                        <div style={{
                            padding: '24px', borderRadius: '12px', background: 'var(--text-primary)', color: 'var(--bg-primary)',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, opacity: 0.6 }}>Local Time</span>
                                <span style={{ fontSize: '18px', fontWeight: 800 }}>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} IST</span>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, opacity: 0.6 }}>Status</span>
                                <span style={{ fontSize: '14px', fontWeight: 800, display: 'block' }}>AVAILABLE</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
