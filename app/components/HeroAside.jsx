import {
    Mic,
    Brain,
    Workflow,
    Layers,
    MapPin,
    Sparkles,
} from 'lucide-react';
import { site } from '../data/site';

const focusAreas = [
    { icon: Mic, label: 'Voice AI', desc: 'Real-time pipelines' },
    { icon: Brain, label: 'LLM Products', desc: 'GPT-4 & RAG' },
    { icon: Workflow, label: 'Automation', desc: 'End-to-end flows' },
    { icon: Layers, label: 'Full Stack', desc: 'FastAPI + Next.js' },
];

const stack = ['FastAPI', 'Next.js', 'PostgreSQL', 'OpenAI', 'Docker', 'WebSockets'];

export default function HeroAside() {
    return (
        <aside className="hero-aside" aria-label="Focus areas and tech stack">
            <div className="hero-aside__glow" aria-hidden="true" />
            <div className="hero-aside__inner">
                <div className="hero-aside__badge">
                    <Sparkles size={14} />
                    <span>{site.availability.status} · {site.availability.remote ? 'Remote' : 'On-site'}</span>
                </div>

                <div className="hero-aside__grid">
                    {focusAreas.map(({ icon: Icon, label, desc }) => (
                        <div key={label} className="hero-aside__card">
                            <span className="hero-aside__card-icon" aria-hidden="true">
                                <Icon size={18} />
                            </span>
                            <div>
                                <div className="hero-aside__card-label">{label}</div>
                                <div className="hero-aside__card-desc">{desc}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="hero-aside__stack">
                    <span className="hero-aside__stack-label">Core stack</span>
                    <div className="hero-aside__tags">
                        {stack.map((tech) => (
                            <span key={tech} className="hero-aside__tag">{tech}</span>
                        ))}
                    </div>
                </div>

                <div className="hero-aside__location">
                    <MapPin size={14} />
                    <span>{site.location}</span>
                </div>
            </div>
        </aside>
    );
}
