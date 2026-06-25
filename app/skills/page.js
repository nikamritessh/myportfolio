import Reveal from '../components/Reveal';
import TechTabs from '../components/TechTabs';

export const metadata = {
    title: 'Skills',
    description: 'Technical skills and stack of Ritesh Nikam across frontend, backend, AI, databases, and cloud.',
};

const levels = [
    { level: 'Expert', color: 'var(--color-accent)', desc: 'Daily-driver tools I use to ship production systems.' },
    { level: 'Advanced', color: 'var(--color-success)', desc: 'Comfortable building and debugging complex features.' },
    { level: 'Intermediate', color: '#F59E0B', desc: 'Working knowledge applied across real projects.' },
];

export default function SkillsPage() {
    return (
        <section className="container page-top">
            <Reveal className="section-head">
                <span className="eyebrow">Capabilities</span>
                <h1 className="display">
                    Skills &amp; technologies
                </h1>
                <p>
                    A production-tested stack spanning the full lifecycle of an AI product —
                    from interface to inference to infrastructure.
                </p>
            </Reveal>

            <Reveal>
                <TechTabs />
            </Reveal>

            <Reveal>
                <div className="grid-3 section-after-head">
                    {levels.map((l) => (
                        <div key={l.level} className="card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span className="level-dot" style={{ background: l.color, width: 8, height: 8 }} />
                                <h3 style={{ margin: 0 }}>{l.level}</h3>
                            </div>
                            <p style={{ marginTop: 10 }}>{l.desc}</p>
                        </div>
                    ))}
                </div>
            </Reveal>
        </section>
    );
}
