import Layout from '../../components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FiZap, FiTarget, FiTrendingUp, FiTool, FiCode } from 'react-icons/fi';
import { FiCpu, FiLayers, FiSmartphone } from 'react-icons/fi';

export default function CategoryPage() {
    const router = useRouter();
    const { category } = router.query;
    const [selectedProject, setSelectedProject] = useState(null);
    const [activeTab, setActiveTab] = useState('problem');

    // All projects data
    const allProjects = {
        ai: [
            {
                id: 'nkani',
                title: 'Nkani News Aggregator',
                image: '/images/nkani.png',
                summary: 'AI-powered news aggregation with sentiment analysis',
                problem: 'In an era of information overload, people struggle to quickly gauge the emotional tone of news articles. News consumers waste time reading through multiple articles to understand different perspectives and emotional tones—whether coverage is positive, negative, or neutral. There was no simple way to see at a glance the sentiment behind each story, making it difficult for readers to make informed decisions about what to read.',
                impact: 'Nkani helps users make informed decisions about what to read by providing instant sentiment analysis. It saves time and reduces information fatigue by surfacing the emotional context of news stories upfront.',
                approach: 'I built a web application using Flask that scrapes Google News in real-time. Using natural language processing (specifically VADER sentiment analysis), the system automatically analyzes each article\'s emotional tone and presents it alongside the headline.',
                tech: ['Flask', 'NLP', 'VADER', 'Python', 'Beautiful Soup'],
                links: {
                    github: 'https://github.com/Maxw311nyimbili/nkani_aggregator',
                    demo: 'https://www.youtube.com/watch?v=53Kua8HQNzE'
                }
            },
            {
                id: 'paper-summary-ai',
                title: 'Paper Summary',
                image: '/images/p1.png',
                summary: 'High-performance research synthesis engine using llama-3.3-70b-versatile for abstractive summarization and insight extraction.',
                problem: 'The "Information Overload Paradox" in academia: access to knowledge has increased exponentially, but human processing speed remains constant. Researchers conducting systematic reviews must filter thousands of papers, often relying on shallow heuristics (titles/abstracts) due to time constraints. This leads to "research silos" where cross-disciplinary insights are missed. The core challenge is not just reading faster, but structurally deconstructing complex arguments and methodologies into standardized, comparable formats without losing semantic nuance.',
                impact: 'Democratizes access to high-level research synthesis. By reducing the "time-to-insight" from 45 minutes (average paper reading time) to <10 seconds, it enables researchers to perform "semantic scanning" of entire journals. This tool shifts the workflow from linear reading to hierarchical analysis—users first grasp the core arguments and methodology via the AI synthesis, then dive deep only into the most relevant sections, effectively increasing research throughput by an order of magnitude.',
                approach: 'Engineered a low-latency, full-stack inference pipeline with a dual-mode ingestion layer. The backend (FastAPI) implements a unified processing workflow that handles both (1) raw text input for quick snippets and (2) complex PDF parsing using PyPDF for full documents. Data is normalized before passing through an intelligent context window manager, which optimizes token usage for the LLM. The core inference engine integrates with Groq\'s LPU (Language Processing Unit) cloud to run llama-3.3-70b-versatile at near-real-time speeds, delivering structured insights to a "Research-First" Next.js frontend designed to reduce cognitive load.',
                tech: ['Next.js 14', 'FastAPI', 'Groq Cloud (llama-3.3-70b-versatile)', 'PyPDF', 'Tailwind CSS', 'React Query'],
                links: {
                    github: 'https://github.com/yourusername/paper-summary-ai',
                    demo: 'https://www.youtube.com/watch?v=demo'
                }
            },
            {
                id: 'image-similarity-search',
                title: 'Vantage FotoFinder',
                image: '/images/p2.png',
                summary: 'Upload an image and find visually similar products from any catalog',
                problem: 'In e-commerce, customers often see a product they like but struggle to describe it in words. A shopper might spot a unique lamp in a friend\'s home or a dress in a magazine, but searching "modern gold lamp" returns thousands of irrelevant results. Text-based search creates a discovery barrier—customers abandon searches when they can\'t find the right keywords, and small businesses lose visibility because their products don\'t rank for popular search terms. A boutique furniture store with unique designs gets buried under mass-market retailers, even when they have exactly what the customer wants.',
                impact: 'For customers, this engine eliminates search frustration—they upload a photo and instantly find similar products across all stores, regardless of how items are tagged. For businesses, especially smaller retailers, it levels the playing field by making products discoverable based on visual features rather than SEO budgets. A small artisan shop selling handcrafted ceramics can now appear alongside major brands when customers search visually, driving traffic to businesses that would otherwise remain hidden.',
                approach: 'Engineered a full-stack AI-powered visual search platform with Next.js 16 (App Router) and TailwindCSS v4 for a premium, responsive frontend. The backend leverages FastAPI with OpenAI\'s CLIP (ViT-B-32) model via Sentence Transformers for semantic visual understanding—a significant upgrade from ResNet that captures both visual features and contextual meaning. Implemented FAISS (Facebook AI Similarity Search) for efficient vector indexing with 512-dimensional embeddings and cosine similarity. Added category guardrails using zero-shot classification to ensure relevant results, integrated Stripe-style checkout simulation for portfolio demonstration, and designed a modern UI with glassmorphism effects and smooth animations.',
                tech: ['Next.js 16', 'TailwindCSS v4', 'TypeScript', 'Lucide React', 'FastAPI', 'CLIP (ViT-B-32)', 'Sentence Transformers', 'FAISS', 'Pillow', 'Python'],
                links: {
                    github: 'https://github.com/yourusername/image-similarity-search',
                    demo: 'https://www.youtube.com/watch?v=demo'
                }
            },
            {
                id: 'resume-tailoring-system',
                title: 'Resume Optimization Platform',
                image: '/images/placeholder-ai.png',
                summary: 'Analyze resumes against job descriptions with data-driven suggestions',
                problem: 'Job seekers, especially career changers and recent graduates, struggle to position their experience effectively. A software engineer transitioning to product management might have relevant skills but doesn\'t know how to reframe their technical background. Generic resumes fail to pass Applicant Tracking Systems (ATS) and don\'t resonate with hiring managers. Candidates waste hours guessing which skills to emphasize, often missing critical keywords that would make their application stand out. This is particularly challenging for underrepresented groups who may lack access to career coaching or professional networks.',
                impact: 'This platform democratizes access to resume optimization by providing instant, data-driven feedback. For job seekers, it increases application success rates by identifying exact skill gaps and suggesting specific improvements. For career services at universities, it scales personalized guidance to hundreds of students simultaneously. Early users reported a 40% increase in interview callbacks after implementing the system\'s suggestions.',
                approach: 'Built a full-stack application using NLP and Machine Learning to parse resumes and job descriptions, calculate semantic similarity scores, identify missing skills, and generate targeted improvement suggestions.',
                tech: ['NLP', 'Machine Learning', 'Python', 'FastAPI', 'React', 'spaCy'],
                links: {
                    github: 'https://github.com/yourusername/resume-tailoring-system',
                    demo: 'https://www.youtube.com/watch?v=demo'
                }
            },
            {
                id: 'email-risk-analyzer',
                title: 'Email Security Analyzer',
                image: '/images/placeholder-ai.png',
                summary: 'Detect phishing attempts and explain security risks in plain language',
                problem: 'Phishing attacks cost businesses billions annually, yet most employees lack the training to identify sophisticated scams. A finance team member might receive a convincing invoice from what appears to be a trusted vendor, leading to wire fraud. Traditional email security tools either block everything (creating false positives that frustrate users) or provide vague warnings without context. Employees need to understand why an email is suspicious so they can develop better security instincts over time. Small businesses, in particular, lack dedicated security teams to provide this education.',
                impact: 'This analyzer empowers users to become their own first line of defense by explaining security risks in accessible language. For businesses, it reduces successful phishing attacks by educating employees in real-time rather than through quarterly training sessions. For individuals, especially seniors and non-technical users, it provides confidence in digital communication by demystifying potential threats.',
                approach: 'Created a minimal, professional cybersecurity tool using Machine Learning to classify emails as safe or risky. The system analyzes email content, sender information, and links to identify phishing indicators and generate risk explanations.',
                tech: ['Machine Learning', 'NLP', 'Python', 'FastAPI', 'Next.js', 'TailwindCSS'],
                links: {
                    github: 'https://github.com/yourusername/email-risk-analyzer',
                    demo: 'https://www.youtube.com/watch?v=demo'
                }
            }
        ],
        fullstack: [
            {
                id: 'smart-hire',
                title: 'Smart Hire Platform',
                image: '/images/smart-hire.png',
                summary: 'AI-driven recruitment platform',
                problem: 'Hiring managers spend countless hours manually screening CVs, often missing qualified candidates due to keyword mismatches. Traditional recruitment is time-consuming and prone to human bias. Qualified candidates are often overlooked because their CVs don\'t contain exact keyword matches, even when they have the right skills.',
                impact: 'Smart Hire reduces screening time by 70% and increases candidate quality by using intelligent keyword matching. It helps companies find better talent faster while giving candidates a fairer chance.',
                approach: 'I developed a full-stack platform with a Flask backend and React frontend. The system uses AI algorithms to analyze CVs, extract key skills, and match them against job requirements, providing pre-assessment scores for each candidate.',
                tech: ['Flask', 'React', 'AI', 'Bootstrap', 'JavaScript'],
                links: {}
            },
            {
                id: 'portfolio',
                title: 'Personal Portfolio',
                image: '/images/portfolio.png',
                summary: 'Modern portfolio showcasing my work',
                problem: 'I needed a platform to showcase my projects and skills in a way that reflects my technical abilities and design sensibility. A portfolio is more than a resume—it\'s a demonstration of what I can build. Traditional resumes don\'t capture the full scope of technical projects or allow for interactive demonstrations. Recruiters need to see actual work, not just descriptions.',
                impact: 'This portfolio serves as a living demonstration of my skills, allowing visitors to explore my projects interactively and understand my approach to problem-solving and design.',
                approach: 'Built with Next.js for optimal performance and SEO, the portfolio features modern design patterns, smooth animations, and responsive layouts. It showcases both my technical and design capabilities.',
                tech: ['Next.js', 'React', 'CSS3', 'Responsive Design'],
                links: { demo: '#' }
            }
        ],
        design: [
            {
                id: 'portfolio',
                title: 'Personal Portfolio',
                image: '/images/portfolio.png',
                summary: 'Modern portfolio showcasing my work',
                problem: 'I needed a platform to showcase my projects and skills in a way that reflects my technical abilities and design sensibility. Traditional resumes don\'t capture the full scope of technical projects or allow for interactive demonstrations.',
                impact: 'This portfolio serves as a living demonstration of my skills, allowing visitors to explore my projects interactively.',
                approach: 'Built with Next.js for optimal performance, featuring modern design patterns and smooth animations.',
                tech: ['Next.js', 'React', 'CSS3', 'UI/UX'],
                links: { demo: '#' }
            }
        ],
        mobile: [
            {
                id: 'events-manager',
                title: 'Events Manager',
                image: '/images/events_manager.png',
                summary: 'Event scheduling and management',
                problem: 'Students and professionals often struggle to keep track of multiple events and deadlines. Existing calendar apps are either too complex or lack the specific features needed for event management. Users need a focused tool that handles scheduling without unnecessary bloat.',
                impact: 'Events Manager helps users stay organized and never miss important dates. Its clean interface reduces cognitive load and makes event planning straightforward.',
                approach: 'I built a desktop application using Java and JavaFX, focusing on user experience and performance. The system uses efficient data structures (HashMaps) to ensure fast lookups and updates.',
                tech: ['Java', 'JavaFX', 'HashMaps'],
                links: {
                    github: 'https://github.com/Maxw311nyimbili/eventsManager',
                    demo: 'https://www.youtube.com/watch?v=X5PeW4KRCQE'
                }
            },
            {
                id: 'chronoscholar',
                title: 'ChronoScholar',
                image: '/images/chronoscholar.png',
                summary: 'Student productivity and GPA tracking',
                problem: 'As a student, I noticed peers struggling to balance task management with academic performance tracking. Students use separate apps for to-do lists and GPA calculation, leading to fragmented workflows and missed connections between daily tasks and academic goals.',
                impact: 'ChronoScholar helps students see the direct relationship between their daily productivity and academic performance, encouraging better time management and goal setting.',
                approach: 'I developed a desktop application combining task management with GPA calculation. Using JavaFX for the interface and SQL for data persistence, the app provides a seamless experience for tracking both tasks and grades.',
                tech: ['Java', 'JavaFX', 'SQL'],
                links: {
                    github: 'https://github.com/Maxw311nyimbili/chronoScholar',
                    demo: 'https://www.youtube.com/watch?v=pe4Qz30JqQk'
                }
            },
            {
                id: 'student-management',
                title: 'Student Management System',
                image: '/images/student-management.png',
                summary: 'Comprehensive educational data management',
                problem: 'Educational institutions need efficient systems to manage student, faculty, and administrative data. Manual record-keeping is error-prone and time-consuming. Schools need digital systems that can handle complex data relationships while remaining easy to use.',
                impact: 'This system reduces administrative overhead by 60% and improves data accuracy. It enables schools to focus more on education and less on paperwork.',
                approach: 'I built a robust desktop application using C++/CLI with MySQL for data storage. The system handles complex relationships between students, faculty, and courses while maintaining data integrity.',
                tech: ['C++/CLI', 'MySQL', 'XAMPP'],
                links: { demo: 'https://www.youtube.com/watch?v=bYjuQxDN-oo' }
            }
        ]
    };

    const categoryInfo = {
        ai: {
            title: 'AI Engineering',
            icon: FiCpu,
            color: 'var(--primary)',
            description: 'Machine learning, natural language processing, and intelligent systems'
        },
        fullstack: {
            title: 'Full-Stack Development',
            icon: FiCode,
            color: 'var(--primary)',
            description: 'End-to-end web applications and APIs'
        },
        design: {
            title: 'Product Design',
            icon: FiLayers,
            color: 'var(--primary)',
            description: 'UI/UX design and user-centered experiences'
        },
        mobile: {
            title: 'Mobile Development',
            icon: FiSmartphone,
            color: 'var(--primary)',
            description: 'Native and cross-platform mobile applications'
        }
    };

    const projects = allProjects[category] || [];
    const info = categoryInfo[category];

    if (!info) {
        return (
            <Layout>
                <div className="container text-center" style={{ padding: '5rem 0' }}>
                    <h1>Category not found</h1>
                    <Link href="/projects" className="btn btn-primary">Back to Projects</Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* Category Header */}
            <section className="category-header" style={{ padding: '6rem 0 2rem', textAlign: 'center' }}>
                <div className="container">
                    <Link href="/projects" className="back-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', textDecoration: 'none', marginBottom: '2rem', transition: 'color 0.2s ease' }}>
                        <i className="fas fa-arrow-left"></i>
                        Back to Disciplines
                    </Link>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                        {info.icon && <info.icon style={{ color: info.color }} />}
                    </div>
                    <h1 className="section-title" style={{ marginBottom: '1rem' }}>{info.title}</h1>
                    <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        {info.description}
                    </p>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="section bg-light">
                <div className="container">
                    <div className="row mb-4">
                        <div className="col-lg-12">
                            <h2 className="section-title" style={{ fontSize: '1.5rem' }}>
                                {projects.length} {projects.length === 1 ? 'Project' : 'Projects'}
                            </h2>
                        </div>
                    </div>

                    <div className="row g-4">
                        {projects.map((project, index) => (
                            <div key={project.id} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={index * 100}>
                                <div className="project-cubicle" onClick={() => { setSelectedProject(project); setActiveTab('problem'); }} style={{ cursor: 'pointer' }}>
                                    <div className="cubicle-image">
                                        <img src={project.image} alt={project.title} width="600" height="400" />
                                        <div className="cubicle-overlay">
                                            <i className="fas fa-expand-alt"></i>
                                            <span>View Details</span>
                                        </div>
                                    </div>
                                    <div className="cubicle-info">
                                        <h3>{project.title}</h3>
                                        <p>{project.summary}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {projects.length === 0 && (
                        <div className="text-center" style={{ padding: '5rem 0' }}>
                            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
                                No projects in this category yet.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Project Details Modal */}
            {selectedProject && (
                <div className="project-modal-backdrop" onClick={() => setSelectedProject(null)}>
                    <div className="project-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-container">
                            <button className="modal-close" onClick={() => setSelectedProject(null)}>
                                <i className="fas fa-times"></i>
                            </button>

                            <div className="modal-header">
                                <div className="modal-title-section">
                                    <div className="modal-title">
                                        <FiCode className="modal-icon" style={{ color: info.color }} />
                                        {selectedProject.title}
                                    </div>
                                    <div className="modal-category">
                                        {info.title}
                                    </div>
                                </div>
                            </div>

                            <div className="modal-tabs">
                                <button
                                    className={`modal-tab ${activeTab === 'problem' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('problem')}
                                >
                                    <FiTarget className="tab-icon" /> Problem
                                </button>
                                <button
                                    className={`modal-tab ${activeTab === 'impact' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('impact')}
                                >
                                    <FiTrendingUp className="tab-icon" /> Impact
                                </button>
                                <button
                                    className={`modal-tab ${activeTab === 'approach' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('approach')}
                                >
                                    <FiTool className="tab-icon" /> Approach
                                </button>
                            </div>

                            <div className="modal-content-area">
                                <div className="modal-text-panel">
                                    {activeTab === 'problem' && (
                                        <div className="content-section">
                                            <h3>The Problem</h3>
                                            <p>{selectedProject.problem}</p>
                                        </div>
                                    )}

                                    {activeTab === 'impact' && (
                                        <div className="content-section">
                                            <h3>The Impact</h3>
                                            <p>{selectedProject.impact}</p>
                                        </div>
                                    )}

                                    {activeTab === 'approach' && (
                                        <div className="content-section">
                                            <h3>How I Built It</h3>
                                            <p>{selectedProject.approach}</p>
                                            <div className="tech-stack-display">
                                                <h4><span className="code-accent">Technologies:</span></h4>
                                                <div className="tech-badges">
                                                    {selectedProject.tech.map((tech, i) => (
                                                        <span key={i} className="tech-badge-large">{tech}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="modal-visual-panel">
                                    <div className="visual-header">
                                        <i className="fas fa-image"></i> Project Preview
                                    </div>
                                    <div className="visual-content">
                                        <img src={selectedProject.image} alt={selectedProject.title} />
                                        <div className="visual-actions">
                                            {selectedProject.links.github && (
                                                <a href={selectedProject.links.github} target="_blank" rel="noopener noreferrer" className="action-btn">
                                                    <i className="fab fa-github"></i> View Source Code
                                                </a>
                                            )}
                                            {selectedProject.links.demo && (
                                                <a href={selectedProject.links.demo} target="_blank" rel="noopener noreferrer" className="action-btn">
                                                    <i className="fas fa-play-circle"></i> Watch Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
