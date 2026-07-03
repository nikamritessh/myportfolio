import Link from 'next/link';
import {
    ArrowRight,
    Github,
    Linkedin,
    Mail,
    FileText,
    ExternalLink,
} from 'lucide-react';
import Reveal from './components/Reveal';
import HeroAside from './components/HeroAside';
import SmartImage from './components/SmartImage';
import TechTabs from './components/TechTabs';
import { getProjectsWithSlugs } from './utils/projects';
import { getPortfolioStats } from './utils/stats';
import { experiences } from './data';
import { site, gmailComposeUrl } from './data/site';

const featurePoints = {
    Healix: [
        'Real-time CBT-based AI therapy with crisis detection',
        'Voice-first companion for panic and anxiety moments',
        'Symptom checker with severity risk analysis',
    ],
    AUTONIQX: [
        'AI decision logic that runs entire email campaigns',
        'Personalized content generation at scale',
        'No-code visual workflow builder with RAG chatbot',
    ],
    FORESENSE: [
        'ATS resume analysis with explainable AI feedback',
        'Real job matching engine from live postings',
        'B2B dashboards for HR and academy teams',
    ],
};

export default function Home() {
    const projects = getProjectsWithSlugs();
    const featured = projects.slice(0, 3);
    const recentRoles = experiences.slice(0, 3);
    const stats = getPortfolioStats();

    return (
        <>
            <section className="container page-top home-hero">
                <div className="hero">
                    <div>
                        <h1 className="hero-name">{site.name}</h1>
                        <p className="hero-role">{site.title} · {site.location}</p>

                        <p className="hero-title">
                            LLM products, voice AI, and automation — shipped end to end
                            with FastAPI, Next.js, and production infrastructure.
                        </p>

                        <p className="hero-desc">
                            Currently at Singularity Technologies on OutCallerAI.
                            I own features from API design and model integration through
                            to the interface users actually touch.
                        </p>

                        <p className="hero-facts">
                            {stats.projectsCount} projects · {stats.experienceLabel} experience
                        </p>

                        <div className="hero-cta">
                            <Link href="/projects" className="btn btn-primary btn-lg">
                                View projects <ArrowRight className="arrow" size={16} />
                            </Link>
                            <a
                                href={site.resumePdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary btn-lg"
                            >
                                <FileText size={16} /> Resume
                            </a>
                        </div>

                        <div className="hero-meta">
                            <div className="hero-socials">
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

                    <Reveal className="hero-visual" delay={0.08}>
                        <HeroAside />
                    </Reveal>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="section-head">
                        <span className="eyebrow">Selected work</span>
                        <h2 className="h-section">Projects</h2>
                    </div>

                    <div className="page-stack page-stack--home">
                        {featured.map((project, i) => (
                            <article key={project.slug} className={`showcase ${i % 2 === 1 ? 'reverse' : ''}`}>
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
                                        />
                                    </span>
                                </Link>

                                <div>
                                    <span className="showcase-cat">{project.category} · {project.year}</span>
                                    <h3 className="showcase-title">{project.title}</h3>
                                    <p className="showcase-desc">
                                        {project.details?.mainDescription || project.description}
                                    </p>

                                    {featurePoints[project.title] && (
                                        <ul className="showcase-list">
                                            {featurePoints[project.title].map((p) => (
                                                <li key={p}>{p}</li>
                                            ))}
                                        </ul>
                                    )}

                                    <div className="showcase-tags">
                                        {project.tags.slice(0, 4).map((t) => (
                                            <span key={t} className="tag">{t}</span>
                                        ))}
                                    </div>

                                    <div className="showcase-cta">
                                        <Link href={`/projects/${project.slug}`} className="link-underline">
                                            Read case study <ArrowRight className="arrow" size={14} />
                                        </Link>
                                        {project.github && (
                                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                                                <Github size={15} /> Code
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="mt-section-sm">
                        <Link href="/projects" className="link-underline">
                            All projects <ArrowRight className="arrow" size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="section section-alt">
                <div className="container">
                    <div className="section-head">
                        <span className="eyebrow">Stack</span>
                        <h2 className="h-section">Technologies</h2>
                    </div>
                    <TechTabs />
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="section-head">
                        <span className="eyebrow">Background</span>
                        <h2 className="h-section">Experience</h2>
                    </div>

                    <div className="exp-preview">
                        {recentRoles.map((exp) => (
                            <div key={exp.company + exp.role} className="exp-preview-row">
                                <div>
                                    <div className="exp-preview-role">{exp.role}</div>
                                    <div className="exp-preview-co">{exp.company}</div>
                                </div>
                                <div className="exp-preview-period">{exp.period}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-section-sm">
                        <Link href="/experience" className="link-underline">
                            Full timeline <ArrowRight className="arrow" size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="section section-tight">
                <div className="container">
                    <div className="cta-band">
                        <div>
                            <h2>Open to full-time roles and contract work</h2>
                            <p>Reach out if you&apos;re building an AI product or hiring an engineer.</p>
                        </div>
                        <div className="hero-cta">
                            <Link href="/contact" className="btn btn-primary">
                                Get in touch <ArrowRight className="arrow" size={15} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
