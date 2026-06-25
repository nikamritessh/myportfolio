import Link from 'next/link';
import { ArrowRight, Github, ExternalLink, Check } from 'lucide-react';
import Reveal from '../components/Reveal';
import SmartImage from '../components/SmartImage';
import { getProjectsWithSlugs } from '../utils/projects';

export const metadata = {
    title: 'Projects',
    description:
        'AI products, automation platforms, and full stack applications built by Ritesh Nikam.',
};

export default function ProjectsPage() {
    const projects = getProjectsWithSlugs();

    return (
        <section className="container page-top">
            <Reveal className="section-head">
                <span className="eyebrow">Portfolio</span>
                <h1 className="display">
                    Selected projects
                </h1>
                <p>
                    A collection of AI products, automation platforms, and full stack
                    systems — each built end to end. Click any project for the full case study.
                </p>
            </Reveal>

            <div className="page-stack">
                {projects.map((project, i) => (
                    <Reveal key={project.slug}>
                        <article className={`showcase ${i % 2 === 1 ? 'reverse' : ''}`}>
                            <Link
                                href={`/projects/${project.slug}`}
                                className="showcase-media"
                                aria-label={`Open ${project.title} case study`}
                            >
                                <span className="showcase-image">
                                    <SmartImage
                                        src={project.image}
                                        alt={`${project.title} screenshot`}
                                        monogram={project.title}
                                        priority={i === 0}
                                    />
                                </span>
                            </Link>

                            <div>
                                <span className="showcase-cat">{project.category}</span>
                                <h2 className="showcase-title">{project.title}</h2>
                                <p className="showcase-sub">{project.subtitle}</p>
                                <p className="showcase-desc">
                                    {project.details?.mainDescription || project.description}
                                </p>

                                {project.details?.pillars && (
                                    <div className="showcase-points">
                                        {project.details.pillars.slice(0, 4).map((p) => (
                                            <div key={p.label} className="showcase-point">
                                                <Check size={18} /> <span>{p.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="showcase-tags">
                                    {project.tags.map((t) => (
                                        <span key={t} className="tag">{t}</span>
                                    ))}
                                </div>

                                <div className="showcase-cta">
                                    <Link href={`/projects/${project.slug}`} className="btn btn-primary">
                                        Case Study <ArrowRight className="arrow" size={16} />
                                    </Link>
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                                        <Github size={16} /> GitHub
                                    </a>
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                                        Live Demo <ExternalLink size={15} />
                                    </a>
                                </div>
                            </div>
                        </article>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
