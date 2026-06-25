import Link from 'next/link';
import Image from 'next/image';
import {
    ArrowRight,
    Cpu,
    Server,
    Layers,
    Database,
    Cloud,
    Boxes,
    Brain,
    LineChart,
    FileText,
} from 'lucide-react';
import Reveal from '../components/Reveal';
import { site } from '../data/site';

export const metadata = {
    title: 'About',
    description:
        'Ritesh Nikam — Full Stack AI Engineer focused on LLMs, automation, system design, and shipping AI products.',
};

const capabilities = [
    { icon: <Brain size={20} />, t: 'AI Engineering', d: 'Designing and shipping AI features that solve real business problems.' },
    { icon: <Cpu size={20} />, t: 'LLMs & RAG', d: 'GPT-4 integrations, retrieval pipelines, and agentic workflows.' },
    { icon: <Boxes size={20} />, t: 'Automation', d: 'Removing manual operational work with intelligent automation.' },
    { icon: <Layers size={20} />, t: 'System Design', d: 'Clean, scalable architectures with clear separation of concerns.' },
    { icon: <Server size={20} />, t: 'Backend', d: 'FastAPI services, REST APIs, auth, and data modeling.' },
    { icon: <LineChart size={20} />, t: 'Frontend', d: 'Polished, accessible interfaces with React and Next.js.' },
    { icon: <Database size={20} />, t: 'Databases', d: 'PostgreSQL, Supabase, and ORM-driven data layers.' },
    { icon: <Cloud size={20} />, t: 'Cloud & Product', d: 'Deployment, infra, and product thinking from idea to launch.' },
];

export default function AboutPage() {
    return (
        <>
            <section className="container page-top">
                <div className="about-hero">
                    <Reveal>
                        <div className="about-photo">
                            <Image
                                src={site.photo}
                                alt={`Portrait of ${site.name}`}
                                fill
                                sizes="(max-width: 900px) 100vw, 360px"
                                priority
                                className="about-photo__img"
                            />
                        </div>
                    </Reveal>

                    <Reveal delay={0.05}>
                        <span className="eyebrow">About me</span>
                        <h1 className="display">
                            I build AI products, not just websites.
                        </h1>
                        <div className="prose mt-section-sm">
                            <p>
                                I&apos;m Ritesh Nikam, a Full Stack AI Engineer based in Mumbai. I
                                design and build production-ready AI products — from LLM-powered
                                platforms and voice AI systems to automation tools that take real
                                operational work off people&apos;s plates.
                            </p>
                            <p>
                                My work sits at the intersection of AI engineering, backend
                                systems, and product design. I care about shipping software that
                                is reliable, scalable, and genuinely useful — whether that&apos;s a
                                healthcare companion, an email automation platform, or a resume
                                intelligence engine.
                            </p>
                            <p>
                                I currently work as a Software Engineer at Singularity
                                Technologies, contribute to an international product on contract,
                                and take on selected freelance engagements building AI-powered
                                products end to end.
                            </p>
                        </div>
                        <div className="hero-cta mt-section-sm">
                            <a
                                href={site.resumePdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                            >
                                <FileText size={16} /> View Resume
                            </a>
                            <Link href="/contact" className="btn btn-secondary">
                                Hire Me <ArrowRight className="arrow" size={16} />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <Reveal className="section-head">
                        <span className="eyebrow">How I work</span>
                        <h2 className="h-section">Capabilities across the stack</h2>
                        <p>I move comfortably between AI logic, backend services, and the interface — owning features from concept to deployment.</p>
                    </Reveal>

                    <div className="capability-grid">
                        {capabilities.map((c, i) => (
                            <Reveal key={c.t} delay={i * 0.04}>
                                <div className="capability">
                                    {c.icon}
                                    <div>
                                        <div className="cap-t">{c.t}</div>
                                        <div className="cap-d">{c.d}</div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
