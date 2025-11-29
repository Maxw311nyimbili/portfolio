import Layout from '../components/Layout';
import Link from 'next/link';
import { FiCpu, FiCode, FiLayers, FiSmartphone } from 'react-icons/fi';

export default function Projects() {
    // Four main disciplines
    const disciplines = [
        {
            id: 'ai',
            title: 'AI Engineering',
            icon: FiCpu,
            description: 'Machine learning, NLP, and intelligent systems',
            color: 'var(--primary)',
            count: 5
        },
        {
            id: 'fullstack',
            title: 'Full-Stack Development',
            icon: FiCode,
            description: 'End-to-end web applications and APIs',
            color: 'var(--primary)',
            count: 2
        },
        {
            id: 'design',
            title: 'Product Design',
            icon: FiLayers,
            description: 'UI/UX design and user-centered experiences',
            color: 'var(--primary)',
            count: 1
        },
        {
            id: 'mobile',
            title: 'Mobile Development',
            icon: FiSmartphone,
            description: 'Native and cross-platform mobile apps',
            color: 'var(--primary)',
            count: 3
        }
    ];

    return (
        <Layout>
            {/* Hero Section */}
            <section className="hero" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="container text-center">
                    <h1 className="hero-title" data-aos="fade-up" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
                        I design, build, and deploy
                        <br />
                        <span style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            intelligent experiences
                        </span>
                    </h1>
                    <p className="hero-text" data-aos="fade-up" data-aos-delay="100" style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto 2rem' }}>
                        Exploring the intersection of AI, full-stack development, product design, and mobile innovation
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }} data-aos="fade-up" data-aos-delay="200">
                        <a href="#disciplines" className="btn btn-primary">Explore Disciplines</a>
                        <Link href="/contact" className="btn btn-outline-primary">Get in Touch</Link>
                    </div>
                </div>
            </section>

            {/* Four Discipline Cards */}
            <section id="disciplines" className="section bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center mb-5">
                            <h2 className="section-title" data-aos="fade-up">Four Disciplines</h2>
                            <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                                Specialized expertise across multiple domains of technology
                            </p>
                        </div>
                    </div>

                    <div className="row g-4">
                        {disciplines.map((discipline, index) => {
                            const IconComponent = discipline.icon;
                            return (
                                <div key={discipline.id} className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay={index * 100}>
                                    <Link href={`/projects/${discipline.id}`} className="discipline-card">
                                        <div className="discipline-icon">
                                            <IconComponent style={{ color: discipline.color }} />
                                        </div>
                                        <h3 className="discipline-title">
                                            {discipline.title}
                                        </h3>
                                        <p className="discipline-description">
                                            {discipline.description}
                                        </p>
                                        <div className="discipline-footer">
                                            <div className="project-count">
                                                <i className="fas fa-folder" style={{ color: discipline.color }}></i>
                                                <span>{discipline.count} {discipline.count === 1 ? 'Project' : 'Projects'}</span>
                                            </div>
                                            <i className="fas fa-arrow-right arrow-icon" style={{ color: discipline.color }}></i>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
