import { Briefcase, Globe, Award, Terminal, Check } from 'lucide-react';
import Reveal from '../components/Reveal';
import { experiences } from '../data';
import { calculateDuration, formatDuration, getTotalExperience } from '../utils/stats';

export const metadata = {
    title: 'Experience',
    description: 'Professional experience of Ritesh Nikam across AI products and full stack engineering roles.',
};

const iconMap = {
    zap: <Briefcase size={22} />,
    globe: <Globe size={22} />,
    award: <Award size={22} />,
    terminal: <Terminal size={22} />,
};

export default function ExperiencePage() {
    const total = formatDuration(getTotalExperience());
    const current = experiences.filter((e) => !e.endDate).length;

    return (
        <section className="container-narrow page-top">
            <Reveal className="section-head">
                <span className="eyebrow">Career</span>
                <h1 className="display" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}>
                    Experience
                </h1>
                <p>
                    Building AI products and full stack systems across startups, an
                    international contract, and independent client work.
                </p>
            </Reveal>

            <Reveal>
                <div className="stats-bar" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 56 }}>
                    <div className="stat-cell">
                        <div className="stat-num">{total}</div>
                        <div className="stat-text">Total experience</div>
                    </div>
                    <div className="stat-cell">
                        <div className="stat-num"><span className="accent">{current}</span></div>
                        <div className="stat-text">Active roles</div>
                    </div>
                    <div className="stat-cell">
                        <div className="stat-num">{experiences.length}</div>
                        <div className="stat-text">Total positions</div>
                    </div>
                </div>
            </Reveal>

            <div className="timeline">
                {experiences.map((exp, i) => {
                    const duration = formatDuration(calculateDuration(exp.startDate, exp.endDate));
                    const isCurrent = !exp.endDate;
                    return (
                        <Reveal key={exp.company + i} delay={i * 0.05}>
                            <div className={`tl-item ${isCurrent ? 'current' : ''}`}>
                                <span className="tl-node" />
                                <div className={`tl-card ${exp.highlight ? 'highlight' : ''}`}>
                                    <div className="tl-head">
                                        <div style={{ display: 'flex', gap: 16 }}>
                                            <span className="tl-logo">{iconMap[exp.type] || <Briefcase size={22} />}</span>
                                            <div>
                                                <div className="tl-role">{exp.role}</div>
                                                <div className="tl-company">{exp.company} · {exp.location}</div>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <span className="tl-period">{exp.period}</span>
                                            <div style={{ fontSize: 13, color: 'var(--color-accent)', marginTop: 6, fontWeight: 500 }}>
                                                {duration}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="tl-desc">{exp.description}</p>

                                    <ul className="tl-achievements">
                                        {exp.details.map((d, idx) => (
                                            <li key={idx}><Check size={16} /> <span>{d}</span></li>
                                        ))}
                                    </ul>

                                    <div className="tl-tags">
                                        {exp.tags.map((t) => (
                                            <span key={t} className="tag">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    );
                })}
            </div>
        </section>
    );
}
