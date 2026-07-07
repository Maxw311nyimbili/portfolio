import Link from 'next/link';
import SiteLayout from '../components/SiteLayout';

const EXPERIENCE = [
    {
        date: 'JUN 2026 — PRESENT',
        role: 'Full Stack Intern — Veste Money',
        detail: 'Built features across React frontend and Go backend services.',
    },
    {
        date: '2025',
        role: 'Backend Dev Intern — ProBase Group',
        detail: 'Cut API response times ~20% across 5+ Go services.',
    },
    {
        date: '2025',
        role: 'Full Stack Intern — Future Interns',
        detail: 'Rebrand: 40% faster load. React/Node commerce app.',
    },
    {
        date: '2023',
        role: 'Front-End Engineer — BioLith',
        detail: 'Documentation site, +90% accessibility.',
    },
];

const SKILLS = [
    { label: 'BACKEND', items: ['Go, Python, FastAPI,', 'PostgreSQL, Docker'] },
    { label: 'FRONTEND / MOBILE', items: ['React, Next.js, Flutter,', 'Tailwind CSS'] },
    { label: 'TOOLS', items: ['Git, Figma, API Design,', 'CI/CD'] },
];

export default function Home() {
    return (
        <SiteLayout>
            {/* hero */}
            <header className="hero">
                <div className="hero-copy">
                    <div className="kicker">// AI ENGINEER &amp; FULL-STACK DEVELOPER</div>
                    <h1>Building intelligence into interfaces.</h1>
                    <p>
                        Turning complex ideas into clean, usable interfaces — AI engineering,
                        full-stack development, mobile apps.
                    </p>
                    <div className="cta-group">
                        <Link className="cta cta-primary" href="/projects">EXPLORE PROJECTS</Link>
                        <Link className="cta" href="/contact">GET IN TOUCH</Link>
                    </div>
                </div>
                <div className="hero-img">
                    <img src="/images/banner-img.png" alt="Maxwell Nyimbili" />
                </div>
            </header>

            {/* about + experience */}
            <section className="about-exp">
                <div className="about" data-reveal>
                    <div className="section-label">ABOUT</div>
                    <p className="about-lead">
                        FastAPI &amp; Go backends. Flutter mobile apps. Systems-first:
                        architecture before pixels.
                    </p>
                    <p className="about-detail">
                        BSc Computer Science, Ashesi University, Ghana — graduated May 2026.
                        Focused on generative AI &amp; system architecture.
                    </p>
                </div>
                <div className="experience">
                    <div className="section-label" data-reveal>EXPERIENCE</div>
                    <div className="exp-list">
                        {EXPERIENCE.map((e, i) => (
                            <div
                                className="exp-row"
                                key={e.role}
                                data-reveal
                                style={{ '--reveal-delay': `${i * 90}ms` }}
                            >
                                <div className="exp-date">{e.date}</div>
                                <div>
                                    <div className="exp-role">{e.role}</div>
                                    <div className="exp-detail">{e.detail}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* skills */}
            <section className="skills">
                {SKILLS.map((s, i) => (
                    <div
                        className="skill-col"
                        key={s.label}
                        data-reveal
                        style={{ '--reveal-delay': `${i * 90}ms` }}
                    >
                        <div className="section-label">{s.label}</div>
                        <div className="skill-items">
                            {s.items.map((line) => (
                                <span key={line}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </SiteLayout>
    );
}
