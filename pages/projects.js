import { useState } from 'react';
import SiteLayout from '../components/SiteLayout';
import { PROJECTS_DETAIL } from '../data/projectsData';
import ProjectDrawer from '../components/ProjectDrawer';

// Standalone projects page - all work, grouped by discipline,
// in the "Portfolio Final" design language.

const GROUPS = [
    {
        label: 'AI ENGINEERING',
        projects: [
            {
                img: '/images/p2.png',
                title: 'Vantage FotoFinder',
                desc: 'CLIP + FAISS semantic image search. Upload an image, find visually similar products from any catalog.',
                tech: 'Next.js · FastAPI · CLIP · FAISS · TypeScript',
                github: 'https://github.com/Maxw311nyimbili/FotoFinder_frontend',
                demo: 'https://www.youtube.com/watch?v=t6d57bdfEdI',
            },
            {
                img: '/images/p1.png',
                title: 'Paper Summary',
                desc: '45 min of reading to 10 second synthesis. Research papers deconstructed by llama-3.3-70b on Groq.',
                tech: 'Next.js · FastAPI · Groq · PyPDF',
                github: 'https://github.com/Maxw311nyimbili/paper_summary_frontend',
                demo: 'https://www.youtube.com/watch?v=zyi6xoJZgD0',
            },
            {
                img: '/images/p3.png',
                title: 'Propel',
                desc: 'Resume optimization against job descriptions - ATS keywords, skill gaps, data-driven suggestions.',
                tech: 'Next.js · FastAPI · Groq · Framer Motion',
                github: 'https://github.com/Maxw311nyimbili/propel_app_frontend',
                demo: 'https://www.youtube.com/watch?v=udZ7bsnvw1M',
            },
            {
                img: '/images/p4.png',
                title: 'Voyage',
                desc: 'AI travel itineraries with interactive maps and offline PDF export.',
                tech: 'Next.js · FastAPI · Groq · Leaflet',
                github: 'https://github.com/Maxw311nyimbili/voyage_frontend',
                demo: 'https://www.youtube.com/watch?v=ssqeRswHezE',
            },
            {
                img: '/images/nkani.png',
                title: 'Nkani News Aggregator',
                desc: 'Real-time news scraping with VADER sentiment analysis - the emotional tone of every story, upfront.',
                tech: 'Flask · NLP · VADER · Beautiful Soup',
                github: 'https://github.com/Maxw311nyimbili/nkani_aggregator',
                demo: 'https://www.youtube.com/watch?v=53Kua8HQNzE',
            },
        ],
    },
    {
        label: 'FULL-STACK',
        projects: [
            {
                img: '/images/fullstack-1.png',
                title: 'Mini E-Commerce',
                desc: 'Catalog, cart, checkout. Product filtering, Context API state, MongoDB storage.',
                tech: 'React (Vite) · Node.js · MongoDB · Tailwind',
                github: 'https://github.com/Maxw311nyimbili/FUTURE_FS_02',
                demo: 'https://future-fs-02-tau.vercel.app/',
            },
            {
                img: '/images/fullstack-2.png',
                title: 'Berkshire Hathaway Redesign',
                desc: 'The famously plain corporate site, rebuilt - minimal, responsive, still all substance.',
                tech: 'React (Vite) · Node.js · MongoDB · Tailwind',
                github: 'https://github.com/Maxw311nyimbili/FUTURE_FS_03',
                demo: 'https://future-fs-03-drab.vercel.app/',
            },
            {
                img: '/images/portfolio.png',
                title: 'Personal Portfolio',
                desc: 'This site. Next.js, editorial layout, light/dark theming.',
                tech: 'Next.js · React · CSS',
                github: 'https://github.com/Maxw311nyimbili/portfolio',
            },
        ],
    },
    {
        label: 'DESKTOP / SYSTEMS',
        projects: [
            {
                img: '/images/events_manager.png',
                title: 'Events Manager',
                desc: 'Event scheduling desktop app - fast lookups via HashMap-backed storage.',
                tech: 'Java · JavaFX',
                github: 'https://github.com/Maxw311nyimbili/eventsManager',
                demo: 'https://www.youtube.com/watch?v=X5PeW4KRCQE',
            },
            {
                img: '/images/chronoscholar.png',
                title: 'ChronoScholar',
                desc: 'Task management meets GPA tracking - daily productivity tied to academic goals.',
                tech: 'Java · JavaFX · SQL',
                github: 'https://github.com/Maxw311nyimbili/chronoScholar',
                demo: 'https://www.youtube.com/watch?v=pe4Qz30JqQk',
            },
            {
                img: '/images/student-management.png',
                title: 'Student Management System',
                desc: 'Student, faculty, and course records with relational integrity.',
                tech: 'C++/CLI · MySQL',
                demo: 'https://www.youtube.com/watch?v=bYjuQxDN-oo',
            },
        ],
    },
];

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);

    const handleCardClick = (project) => {
        setSelectedProject(project);
    };

    return (
        <SiteLayout
            title="Projects / Maxwell Nyimbili"
            description="AI engineering, full-stack, and systems projects by Maxwell Nyimbili."
        >
            <div className="page-head">
                <h1>Selected work.</h1>
                <p>
                    AI engineering, full-stack builds, and systems projects - each one a
                    problem worth solving, not a tutorial retread.
                </p>
            </div>

            {GROUPS.map((group) => (
                <section className="projects-section" key={group.label}>
                    <div className="section-label" data-reveal>{group.label}</div>
                    <div className="project-grid">
                        {group.projects.map((p, i) => (
                            <div
                                className="project-card"
                                key={p.title}
                                data-reveal
                                style={{ '--reveal-delay': `${(i % 3) * 90}ms`, cursor: 'pointer' }}
                                onClick={() => handleCardClick(p)}
                            >
                                <img src={p.img} alt={p.title} />
                                <div className="project-title">{p.title}</div>
                                <div className="project-desc">{p.desc}</div>
                                <div className="project-tech">{p.tech}</div>
                                <div className="project-links">
                                    {p.github && (
                                        <a 
                                            href={p.github} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            GITHUB ↗
                                        </a>
                                    )}
                                    {p.demo && (
                                        <a 
                                            href={p.demo} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            DEMO ↗
                                        </a>
                                    )}
                                    <button
                                        className="project-drawer-trigger-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCardClick(p);
                                        }}
                                    >
                                        TECHNICAL SPECS ↗
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}

            {selectedProject && (
                <ProjectDrawer 
                    project={selectedProject}
                    detail={PROJECTS_DETAIL[selectedProject.title]}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </SiteLayout>
    );
}
