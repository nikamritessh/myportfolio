import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
    ArrowRight,
    ArrowLeft,
    Github,
    ExternalLink,
    Check,
    Layers,
    Server,
    Cpu,
} from 'lucide-react';
import Reveal from '../../components/Reveal';
import SmartImage from '../../components/SmartImage';
import TableOfContents from '../../components/TableOfContents';
import {
    getProjectsWithSlugs,
    getProjectBySlug,
    getRelatedProjects,
    slugify,
} from '../../utils/projects';

export function generateStaticParams() {
    return getProjectsWithSlugs().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const data = getProjectBySlug(slug);
    if (!data) return { title: 'Project not found' };
    const { project } = data;
    return {
        title: project.title,
        description: project.description,
        openGraph: { title: project.title, description: project.description },
    };
}

export default async function ProjectDetail({ params }) {
    const { slug } = await params;
    const data = getProjectBySlug(slug);
    if (!data) notFound();

    const { project, prev, next } = data;
    const related = getRelatedProjects(slug);
    const stack = project.details?.techStack;

    const sections = [
        { id: 'overview', label: 'Overview' },
        ...(project.details?.pillars ? [{ id: 'focus', label: 'Focus Areas' }] : []),
        ...(project.details?.features ? [{ id: 'features', label: 'Features' }] : []),
        ...(stack ? [{ id: 'architecture', label: 'Architecture & Stack' }] : []),
        { id: 'role', label: 'My Role' },
        { id: 'related', label: 'Related Projects' },
    ];

    return (
        <article className="container page-top">
            {/* Back + header */}
            <Link href="/projects" className="btn btn-ghost btn-sm" style={{ marginBottom: 24 }}>
                <ArrowLeft size={16} /> All projects
            </Link>

            <Reveal>
                <span className="showcase-cat">{project.category}</span>
                <h1 className="display" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginTop: 12 }}>
                    {project.title}
                </h1>
                {project.subtitle && (
                    <p className="body-lg" style={{ marginTop: 12, maxWidth: 680 }}>
                        {project.subtitle}
                    </p>
                )}

                <div className="hero-cta" style={{ marginTop: 28 }}>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
                        Live Demo <ExternalLink size={16} />
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                        <Github size={16} /> GitHub
                    </a>
                </div>
            </Reveal>

            {/* Hero image (no crop) */}
            <Reveal delay={0.05}>
                <div className="detail-hero-image" style={{ marginTop: 40 }}>
                    <SmartImage
                        src={project.image}
                        alt={`${project.title} interface`}
                        monogram={project.title}
                        priority
                        sizes="(max-width: 900px) 100vw, 1100px"
                    />
                </div>
            </Reveal>

            {/* Meta */}
            <div className="meta-grid" style={{ marginTop: 32 }}>
                <div className="meta-item">
                    <div className="meta-k">Category</div>
                    <div className="meta-v">{project.category}</div>
                </div>
                <div className="meta-item">
                    <div className="meta-k">Year</div>
                    <div className="meta-v">{project.year}</div>
                </div>
                <div className="meta-item">
                    <div className="meta-k">Role</div>
                    <div className="meta-v">Full Stack Developer</div>
                </div>
                <div className="meta-item">
                    <div className="meta-k">Core Stack</div>
                    <div className="meta-v">{project.tags.slice(0, 2).join(', ')}</div>
                </div>
            </div>

            {/* Body with sticky TOC */}
            <div className="detail-layout" style={{ marginTop: 56 }}>
                <TableOfContents sections={sections} />

                <div>
                    <section id="overview" className="detail-block">
                        <h2>Overview</h2>
                        <p>{project.details?.mainDescription || project.description}</p>
                        {project.details?.extendedDescription && (
                            <p>{project.details.extendedDescription}</p>
                        )}
                    </section>

                    {project.details?.pillars && (
                        <section id="focus" className="detail-block">
                            <h2>Focus Areas</h2>
                            <div className="grid-2">
                                {project.details.pillars.map((p) => (
                                    <div key={p.label} className="note-card" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <Check size={18} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                                        <span style={{ fontWeight: 600 }}>{p.label}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {project.details?.features && (
                        <section id="features" className="detail-block">
                            <h2>Key Features</h2>
                            <div className="grid-2">
                                {project.details.features.map((f) => (
                                    <div key={f.title} className="note-card">
                                        <div className="note-k">{f.title}</div>
                                        <p>{f.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {stack && (
                        <section id="architecture" className="detail-block">
                            <h2>Architecture &amp; Stack</h2>
                            <p style={{ marginBottom: 24 }}>
                                Built with a clean separation between interface, services, and
                                AI logic — designed to scale and stay maintainable.
                            </p>
                            <div className="grid-3">
                                <div className="note-card">
                                    <div className="note-k"><Layers size={15} style={{ verticalAlign: '-2px' }} /> Frontend</div>
                                    {stack.frontend.map((t) => (
                                        <p key={t} style={{ marginTop: 4 }}>• {t}</p>
                                    ))}
                                </div>
                                <div className="note-card">
                                    <div className="note-k"><Server size={15} style={{ verticalAlign: '-2px' }} /> Backend</div>
                                    {stack.backend.map((t) => (
                                        <p key={t} style={{ marginTop: 4 }}>• {t}</p>
                                    ))}
                                </div>
                                <div className="note-card">
                                    <div className="note-k"><Cpu size={15} style={{ verticalAlign: '-2px' }} /> AI &amp; Infra</div>
                                    {stack.ai.map((t) => (
                                        <p key={t} style={{ marginTop: 4 }}>• {t}</p>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    <section id="role" className="detail-block">
                        <h2>My Role</h2>
                        <p>
                            I owned this project end to end as the full stack developer — from
                            problem framing and system architecture to building the backend
                            services, integrating the AI logic, and crafting the production
                            interface. Every layer of {project.title} was designed and
                            implemented to be reliable, scalable, and genuinely usable.
                        </p>
                        <div className="showcase-tags" style={{ marginTop: 20 }}>
                            {project.tags.map((t) => (
                                <span key={t} className="tag">{t}</span>
                            ))}
                        </div>
                    </section>

                    <section id="related" className="detail-block" style={{ paddingBottom: 0 }}>
                        <h2>Related Projects</h2>
                        <div className="grid-2">
                            {related.map((r) => (
                                <Link key={r.slug} href={`/projects/${r.slug}`} className="card card-hover" style={{ display: 'block' }}>
                                    <span className="showcase-cat" style={{ fontSize: 12 }}>{r.category}</span>
                                    <h3 style={{ marginTop: 8 }}>{r.title}</h3>
                                    <p style={{ marginTop: 6 }}>{r.description}</p>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Prev / Next */}
                    <div className="prevnext">
                        {prev ? (
                            <Link href={`/projects/${slugify(prev.title)}`}>
                                <div className="pn-label">← Previous</div>
                                <div className="pn-title">{prev.title}</div>
                            </Link>
                        ) : <span />}
                        {next ? (
                            <Link href={`/projects/${slugify(next.title)}`} className="next">
                                <div className="pn-label">Next →</div>
                                <div className="pn-title">{next.title}</div>
                            </Link>
                        ) : <span />}
                    </div>
                </div>
            </div>
        </article>
    );
}
