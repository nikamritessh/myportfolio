import { ExternalLink } from 'lucide-react';
import Reveal from '../components/Reveal';
import SmartImage from '../components/SmartImage';
import { caseStudies } from '../data';

export const metadata = {
    title: 'Case Studies',
    description: 'In-depth case studies — research, security disclosures, and production systems by Ritesh Nikam.',
};

export default function CaseStudiesPage() {
    return (
        <section className="container page-top">
            <Reveal className="section-head">
                <span className="eyebrow">Deep dives</span>
                <h1 className="display">
                    Case studies
                </h1>
                <p>
                    Detailed looks at complex problems I&apos;ve solved — from published
                    research to verified security disclosures with measurable impact.
                </p>
            </Reveal>

            <div className="page-stack">
                {caseStudies.map((study, i) => (
                    <Reveal key={study.id}>
                        <article className={`showcase ${i % 2 === 1 ? 'reverse' : ''}`}>
                            <span className="showcase-media">
                                <span className="showcase-image">
                                    <SmartImage
                                        src={study.image}
                                        alt={`${study.title} visual`}
                                        monogram={study.title}
                                        priority={i === 0}
                                    />
                                </span>
                            </span>

                            <div>
                                <span className="showcase-cat">{study.category} · {study.year}</span>
                                <h2 className="showcase-title">{study.title}</h2>

                                <div className="split-grid split-after-title">
                                    <div className="note-card">
                                        <div className="note-k">The Challenge</div>
                                        <p>{study.problem}</p>
                                    </div>
                                    <div className="note-card">
                                        <div className="note-k">The Solution</div>
                                        <p>{study.solution}</p>
                                    </div>
                                </div>

                                <div className="stats-bar stats-bar--metrics">
                                    {study.metrics.map((m) => (
                                        <div key={m.label} className="stat-cell">
                                            <div className="stat-num">{m.value}</div>
                                            <div className="stat-text">{m.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {study.url && (
                                    <div className="showcase-cta">
                                        <a href={study.url} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
                                            Read research paper <ExternalLink size={16} />
                                        </a>
                                    </div>
                                )}
                            </div>
                        </article>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
