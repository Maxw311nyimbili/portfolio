import Layout from '../components/Layout';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Home() {
    const [activeCodeTab, setActiveCodeTab] = useState('python');
    const [activeAboutTab, setActiveAboutTab] = useState('developer');
    const [activeSkillTab, setActiveSkillTab] = useState('backend');
    const typewriterRef = useRef(null);

    // Typewriter effect
    useEffect(() => {
        const words = ['intelligent systems', 'scalable applications', 'mobile experiences'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let timeoutId;

        const type = () => {
            const currentWord = words[wordIndex];
            const element = typewriterRef.current;

            if (!element) return;

            if (isDeleting) {
                element.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                element.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let delay = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === currentWord.length) {
                delay = 1200;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                delay = 400;
            }

            timeoutId = setTimeout(type, delay);
        };

        timeoutId = setTimeout(type, 400);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <Layout>
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="row align-items-center">
                        {/* LEFT: Code Block */}
                        <div className="col-lg-6" data-aos="fade-up">
                            <div className="hero-content">
                                <div className="code-intro">
                                    <div className="code-tabs">
                                        <button
                                            className={`code-tab ${activeCodeTab === 'python' ? 'active' : ''}`}
                                            onClick={() => setActiveCodeTab('python')}
                                        >
                                            Python
                                        </button>
                                        <button
                                            className={`code-tab ${activeCodeTab === 'javascript' ? 'active' : ''}`}
                                            onClick={() => setActiveCodeTab('javascript')}
                                        >
                                            JS
                                        </button>
                                        <button
                                            className={`code-tab ${activeCodeTab === 'html' ? 'active' : ''}`}
                                            onClick={() => setActiveCodeTab('html')}
                                        >
                                            HTML
                                        </button>
                                    </div>
                                    <div className="code-panel">
                                        {/* Python Code Block */}
                                        <div className={`code-block ${activeCodeTab === 'python' ? 'active' : ''}`} id="python-code">
                                            <pre><code className="language-python"><span className="code-comment"># Hello, World! I'm Maxwell Nyimbili</span>{"\n"}<span className="code-keyword">class</span> <span className="code-class">AIEngineer</span>:{"\n"}    <span className="code-keyword">def</span> <span className="code-function">__init__</span>(self):{"\n"}        self.name = <span className="code-string">"Maxwell Nyimbili"</span>{"\n"}        self.role = <span className="code-string">"AI Engineer & Full-Stack Developer"</span>{"\n"}        self.specialties = [{"\n"}            <span className="code-string">"AI Engineering"</span>,{"\n"}            <span className="code-string">"Full-Stack Development"</span>,{"\n"}            <span className="code-string">"Mobile Development"</span>{"\n"}        ]{"\n"}    <span className="code-keyword">def</span> <span className="code-function">build</span>(self, <span className="code-param">project</span>):{"\n"}        <span className="code-keyword">return</span> <span className="code-string">f"Building </span>{"{"}project{"}"}<span className="code-string">..."</span>{"\n\n"}me = <span className="code-class">AIEngineer</span>(){"\n"}<span className="code-function">print</span>(me.<span className="code-function">build</span>(<span className="typewriter" ref={activeCodeTab === 'python' ? typewriterRef : null}></span>))</code></pre>
                                        </div>

                                        {/* JavaScript Code Block */}
                                        <div className={`code-block ${activeCodeTab === 'javascript' ? 'active' : ''}`} id="javascript-code">
                                            <pre><code className="language-javascript"><span className="code-comment">// Hello, World! I'm Maxwell Nyimbili</span>{"\n"}<span className="code-keyword">class</span> <span className="code-class">AIEngineer</span> {"{\n"}  <span className="code-function">constructor</span>() {"{\n"}    <span className="code-keyword">this</span>.name = <span className="code-string">"Maxwell Nyimbili"</span>;{"\n"}    <span className="code-keyword">this</span>.role = <span className="code-string">"AI Engineer & Full-Stack Developer"</span>;{"\n"}    <span className="code-keyword">this</span>.specialties = [<span className="code-string">"AI Engineering"</span>, <span className="code-string">"Full-Stack"</span>, <span className="code-string">"Mobile Dev"</span>];{"\n"}  {"}\n\n"}  <span className="code-function">build</span>(<span className="code-param">project</span>) {"{\n"}    <span className="code-keyword">return</span> <span className="code-string">`Building ${"{"}project{"}"}...`</span>;{"\n"}  {"}\n}\n\n"}<span className="code-keyword">const</span> me = <span className="code-keyword">new</span> <span className="code-class">AIEngineer</span>();{"\n"}console.<span className="code-function">log</span>(me.<span className="code-function">build</span>(<span className="typewriter" ref={activeCodeTab === 'javascript' ? typewriterRef : null}></span>));</code></pre>
                                        </div>

                                        {/* HTML Code Block */}
                                        <div className={`code-block ${activeCodeTab === 'html' ? 'active' : ''}`} id="html-code">
                                            <pre><code className="language-html"><span className="code-comment">&lt;!-- Hello, World! I'm Maxwell Nyimbili --&gt;</span>{"\n"}&lt;<span className="code-tag">div</span> <span className="code-attr">class</span>=<span className="code-string">"engineer"</span>&gt;{"\n"}  &lt;<span className="code-tag">h1</span>&gt;Maxwell Nyimbili&lt;/<span className="code-tag">h1</span>&gt;{"\n"}  &lt;<span className="code-tag">h2</span>&gt;AI Engineer &amp; Full-Stack Developer&lt;/<span className="code-tag">h2</span>&gt;{"\n\n"}  &lt;<span className="code-tag">ul</span> <span className="code-attr">class</span>=<span className="code-string">"skills"</span>&gt;{"\n"}    &lt;<span className="code-tag">li</span>&gt;AI Engineering&lt;/<span className="code-tag">li</span>&gt;{"\n"}    &lt;<span className="code-tag">li</span>&gt;Full-Stack&lt;/<span className="code-tag">li</span>&gt;{"\n"}    &lt;<span className="code-tag">li</span>&gt;Mobile Dev&lt;/<span className="code-tag">li</span>&gt;{"\n"}  &lt;/<span className="code-tag">ul</span>&gt;{"\n\n"}  &lt;<span className="code-tag">div</span>&gt;{"\n"}    Building <span className="typewriter" ref={activeCodeTab === 'html' ? typewriterRef : null}></span>{"\n"}  &lt;/<span className="code-tag">div</span>&gt;{"\n"}&lt;/<span className="code-tag">div</span>&gt;</code></pre>
                                        </div>
                                    </div>
                                </div>

                                <p className="hero-text">
                                    Turning complex ideas into clean, usable interfaces. Specializing in AI engineering, full-stack development, and mobile applications that solve real-world problems.
                                </p>

                                <div className="hero-btns">
                                    <Link href="/projects" className="btn btn-primary me-3">Explore Projects</Link>
                                    <Link href="/contact" className="btn btn-outline-primary">Get in Touch</Link>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Title & Image */}
                        <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                            <h1 className="hero-title" style={{ fontFamily: "'Doto', sans-serif", fontWeight: 900 }}>Building Intelligence Into Interfaces</h1>
                            <br />
                            <div className="hero-visual">
                                <div className="profile-container">
                                    <img src="/images/banner-img.png" alt="Maxwell Nyimbili" width="500" height="500" className="profile-img" />
                                    <div className="design-element ui-element">
                                        <div className="element-icon"><i className="fas fa-brain"></i></div>
                                        <div className="element-label">AI Engineering</div>
                                    </div>
                                    <div className="design-element dev-element">
                                        <div className="element-icon"><i className="fas fa-layer-group"></i></div>
                                        <div className="element-label">Full-Stack</div>
                                    </div>
                                    <div className="design-element creative-element">
                                        <div className="element-icon"><i className="fas fa-mobile-alt"></i></div>
                                        <div className="element-label">Mobile Dev</div>
                                    </div>
                                    <div className="design-element stack-element">
                                        <div className="element-icon"><i className="fas fa-palette"></i></div>
                                        <div className="element-label">Product Design</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero-decoration">
                    <div className="decoration-line"></div>
                    <div className="decoration-dot"></div>
                </div>
            </section>

            {/* About Section */}
            <section className="about section compact-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center mb-4">
                            <h2 className="section-title" data-aos="fade-up">About Me</h2>
                            <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">A blend of creativity and technical skills</p>
                        </div>
                    </div>

                    <div className="row align-items-center">
                        <div className="col-lg-6" data-aos="fade-up">
                            <div className="about-content">
                                <div className="about-tabs">
                                    <div className="tab-buttons">
                                        <button
                                            className={`tab-btn ${activeAboutTab === 'developer' ? 'active' : ''}`}
                                            onClick={() => setActiveAboutTab('developer')}
                                        >
                                            Developer
                                        </button>
                                        <button
                                            className={`tab-btn ${activeAboutTab === 'designer' ? 'active' : ''}`}
                                            onClick={() => setActiveAboutTab('designer')}
                                        >
                                            System Designer
                                        </button>
                                        <button
                                            className={`tab-btn ${activeAboutTab === 'person' ? 'active' : ''}`}
                                            onClick={() => setActiveAboutTab('person')}
                                        >
                                            Person
                                        </button>
                                    </div>
                                    <div className="tab-content">
                                        <div className={`tab-pane ${activeAboutTab === 'developer' ? 'active' : ''}`} id="developer">
                                            <p>As a <strong>Full Stack Developer</strong>, I specialize in creating seamless web and mobile applications. My experience spans Python's <strong>FastAPI</strong> and <strong>Go</strong> for backend development, and <strong>Flutter</strong> for mobile apps, utilizing <strong>Very Good CLI</strong> and <strong>BLoC/Cubit</strong> for scalable architecture.</p>
                                            <div className="skill-progress">
                                                <div className="skill-area">
                                                    <span>Frontend</span>
                                                    <div className="progress">
                                                        <div className="progress-bar" style={{ width: '85%' }}></div>
                                                    </div>
                                                </div>
                                                <div className="skill-area">
                                                    <span>Backend (FastAPI/Go)</span>
                                                    <div className="progress">
                                                        <div className="progress-bar" style={{ width: '90%' }}></div>
                                                    </div>
                                                </div>
                                                <div className="skill-area">
                                                    <span>System Architecture</span>
                                                    <div className="progress">
                                                        <div className="progress-bar" style={{ width: '85%' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`tab-pane ${activeAboutTab === 'designer' ? 'active' : ''}`} id="designer">
                                            <p>I approach <strong>System Design</strong> with a strategic mindset, going beyond visuals to ensure architectural integrity. While capable of prototyping in Figma, my focus is on designing scalable, robust systems that solve the right problems effectively.</p>
                                            <div className="skill-progress">
                                                <div className="skill-area">
                                                    <span>System Architecture</span>
                                                    <div className="progress">
                                                        <div className="progress-bar" style={{ width: '90%' }}></div>
                                                    </div>
                                                </div>
                                                <div className="skill-area">
                                                    <span>Scalability</span>
                                                    <div className="progress">
                                                        <div className="progress-bar" style={{ width: '85%' }}></div>
                                                    </div>
                                                </div>
                                                <div className="skill-area">
                                                    <span>Data Modeling</span>
                                                    <div className="progress">
                                                        <div className="progress-bar" style={{ width: '80%' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`tab-pane ${activeAboutTab === 'person' ? 'active' : ''}`} id="person">
                                            <p>Beyond code and design, I'm a <strong>curious learner</strong> who enjoys exploring new technologies and creative approaches. I value innovation, collaboration, and the power of technology to make a positive impact.</p>
                                            <div className="skill-progress">
                                                <div className="skill-area">
                                                    <span>Leadership</span>
                                                    <div className="progress">
                                                        <div className="progress-bar" style={{ width: '85%' }}></div>
                                                    </div>
                                                </div>
                                                <div className="skill-area">
                                                    <span>Communication</span>
                                                    <div className="progress">
                                                        <div className="progress-bar" style={{ width: '80%' }}></div>
                                                    </div>
                                                </div>
                                                <div className="skill-area">
                                                    <span>Adaptability</span>
                                                    <div className="progress">
                                                        <div className="progress-bar" style={{ width: '90%' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                            <div className="about-card">
                                <div className="card-header">
                                    <i className="fas fa-graduation-cap me-2"></i> Education
                                </div>
                                <div className="card-body">
                                    <h4>BSc, Computer Science</h4>
                                    <h5>Ashesi University, Ghana</h5>
                                    <p className="education-date">Ashesi University, Ghana</p>
                                    <div className="coursework">
                                        <h6>Current Focus:</h6>
                                        <div className="course-tags">
                                            <span>Generative AI</span>
                                            <span>System Architecture</span>
                                            <span>Mobile Engineering</span>
                                            <span>User Experience</span>
                                        </div>
                                    </div>
                                    <div className="coursework mt-3">
                                        <h6>Relevant Coursework:</h6>
                                        <div className="course-tags">
                                            <span>Data Structures & Algorithms</span>
                                            <span>Database Systems</span>
                                            <span>Intro to AI</span>
                                            <span>Calculus</span>
                                            <span>Linear Algebra</span>
                                            <span>Statistics</span>
                                            <span>Discrete Structures</span>
                                            <span>Leadership</span>
                                            <span>Economics</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="experience section bg-light compact-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center mb-4">
                            <h2 className="section-title" data-aos="fade-up">Experience</h2>
                            <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">Professional journey and highlights</p>
                        </div>
                    </div>

                    <div className="timeline compact-timeline">
                        {/* Future Interns */}
                        <div className="timeline-item" data-aos="fade-up">
                            <div className="timeline-dot"></div>
                            <div className="timeline-content card">
                                <div className="timeline-header">
                                    <div className="timeline-icon">
                                        <i className="fas fa-laptop-code"></i>
                                    </div>
                                    <div className="timeline-meta">
                                        <h3>Full Stack Web Development Intern</h3>
                                        <h4>Future Interns</h4>
                                        <span className="timeline-date">Present</span>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <ul className="timeline-details">
                                        <li>Built a personal portfolio using Flask, MySQL, HTML/CSS/JavaScript featuring an interactive resume, SEO, and contact form with email notifications.</li>
                                        <li>Developing a mini e-commerce platform with product filtering, shopping cart, and checkout simulation using React, Tailwind CSS, and Firebase.</li>
                                        <li>Redesigning a real-world brand website using AI tools like Durable and Adobe Firefly, with a modern UI in Next.js and CMS integration via Strapi.</li>
                                    </ul>
                                    <div className="skill-tags">
                                        <span>Flask</span>
                                        <span>MySQL</span>
                                        <span>React.js</span>
                                        <span>Bootstrap</span>
                                        <span>Firebase</span>
                                        <span>Next.js</span>
                                        <span>Strapi</span>
                                        <span>AI Tools</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* BioLith */}
                        <div className="timeline-item" data-aos="fade-up">
                            <div className="timeline-dot"></div>
                            <div className="timeline-content card">
                                <div className="timeline-header">
                                    <div className="timeline-icon">
                                        <i className="fas fa-dna"></i>
                                    </div>
                                    <div className="timeline-meta">
                                        <h3>Front-End Engineer</h3>
                                        <h4>BioLith, AshesiGhana iGEM</h4>
                                        <span className="timeline-date">Jun - Sep 2023</span>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <ul className="timeline-details">
                                        <li>Designed and developed the team's website for project documentation, enhancing accessibility by 90%.</li>
                                        <li>Implemented a user-friendly front-end interface using HTML5, CSS3, and JavaScript.</li>
                                    </ul>
                                    <a href="https://2023.igem.wiki/ashesighana/" className="project-link" target="_blank" rel="noopener noreferrer">View Website <i className="fas fa-external-link-alt"></i></a>
                                    <div className="skill-tags">
                                        <span>Web Design</span>
                                        <span>Frontend</span>
                                        <span>Documentation</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PwC */}
                        <div className="timeline-item" data-aos="fade-up">
                            <div className="timeline-dot"></div>
                            <div className="timeline-content card">
                                <div className="timeline-header">
                                    <div className="timeline-icon">
                                        <i className="fas fa-chart-line"></i>
                                    </div>
                                    <div className="timeline-meta">
                                        <h3>Auditor Intern</h3>
                                        <h4>PricewaterhouseCoopers (PwC) Zambia</h4>
                                        <span className="timeline-date">Jan - May 2022</span>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <ul className="timeline-details">
                                        <li>Conducted internal control over financial reporting (ICOFR) audits, ensuring 100% compliance with international standards.</li>
                                        <li>Analyzed operating expenses (OPEX), identifying cost-saving opportunities that reduced expenses by 10%.</li>
                                    </ul>
                                    <div className="skill-tags">
                                        <span>Auditing</span>
                                        <span>Financial Analysis</span>
                                        <span>Reporting</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="skills section compact-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center mb-4">
                            <h2 className="section-title" data-aos="fade-up">Skills</h2>
                            <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">My technical toolkit and competencies</p>
                        </div>
                    </div>

                    {/* Enhanced Skills Grid */}
                    <div className="row justify-content-center" data-aos="fade-up">
                        <div className="col-lg-10">
                            <div className="skills-tabs">
                                <div className="skills-nav">
                                    <button
                                        className={`skill-nav-btn ${activeSkillTab === 'backend' ? 'active' : ''}`}
                                        onClick={() => setActiveSkillTab('backend')}
                                    >
                                        <i className="fas fa-server"></i>
                                        <span>Backend & Systems</span>
                                    </button>
                                    <button
                                        className={`skill-nav-btn ${activeSkillTab === 'frontend' ? 'active' : ''}`}
                                        onClick={() => setActiveSkillTab('frontend')}
                                    >
                                        <i className="fas fa-laptop-code"></i>
                                        <span>Frontend & Mobile</span>
                                    </button>
                                    <button
                                        className={`skill-nav-btn ${activeSkillTab === 'tools' ? 'active' : ''}`}
                                        onClick={() => setActiveSkillTab('tools')}
                                    >
                                        <i className="fas fa-tools"></i>
                                        <span>Tools & Concepts</span>
                                    </button>
                                </div>

                                <div className="skills-content">
                                    <div className={`skill-pane ${activeSkillTab === 'backend' ? 'active' : ''}`} id="backend">
                                        <div className="skills-grid">
                                            {/* Backend Skills */}
                                            {[
                                                { name: 'Go', level: '80%' },
                                                { name: 'Python', level: '90%' },
                                                { name: 'FastAPI', level: '85%' },
                                                { name: 'Flask', level: '85%' },
                                                { name: 'SQL', level: '80%' },
                                                { name: 'PostgreSQL', level: '75%' },
                                                { name: 'System Architecture', level: '85%' },
                                                { name: 'Docker', level: '70%' }
                                            ].map((skill, index) => (
                                                <div className="skill-bar-item" key={index}>
                                                    <div className="skill-info">
                                                        <span>{skill.name}</span>
                                                        <span>{skill.level}</span>
                                                    </div>
                                                    <div className="skill-bar">
                                                        <div className="skill-level" style={{ width: skill.level }}></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={`skill-pane ${activeSkillTab === 'frontend' ? 'active' : ''}`} id="frontend">
                                        <div className="skills-grid">
                                            {/* Frontend Skills */}
                                            {[
                                                { name: 'React', level: '85%' },
                                                { name: 'Next.js', level: '80%' },
                                                { name: 'Flutter', level: '75%' },
                                                { name: 'JavaScript', level: '85%' },
                                                { name: 'Tailwind CSS', level: '90%' },
                                                { name: 'Bootstrap', level: '85%' },
                                                { name: 'HTML/CSS', level: '95%' },
                                                { name: 'Responsive Design', level: '90%' }
                                            ].map((skill, index) => (
                                                <div className="skill-bar-item" key={index}>
                                                    <div className="skill-info">
                                                        <span>{skill.name}</span>
                                                        <span>{skill.level}</span>
                                                    </div>
                                                    <div className="skill-bar">
                                                        <div className="skill-level" style={{ width: skill.level }}></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={`skill-pane ${activeSkillTab === 'tools' ? 'active' : ''}`} id="tools">
                                        <div className="skills-grid">
                                            {/* Tools Skills */}
                                            {[
                                                { name: 'Git', level: '90%' },
                                                { name: 'GitHub', level: '90%' },
                                                { name: 'Figma', level: '75%' },
                                                { name: 'API Design', level: '85%' },
                                                { name: 'CI/CD (Very Good CLI)', level: '70%' },
                                                { name: 'BLoC/Cubit', level: '80%' }
                                            ].map((skill, index) => (
                                                <div className="skill-bar-item" key={index}>
                                                    <div className="skill-info">
                                                        <span>{skill.name}</span>
                                                        <span>{skill.level}</span>
                                                    </div>
                                                    <div className="skill-bar">
                                                        <div className="skill-level" style={{ width: skill.level }}></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </section>

            {/* Featured Projects Section */}
            <section className="section bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center mb-5">
                            <h2 className="section-title" data-aos="fade-up">Featured Projects</h2>
                            <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">Creative and functional solutions</p>
                        </div>
                    </div>

                    <div className="row g-4">
                        {/* Nkani */}
                        <div className="col-md-6 col-lg-4" data-aos="fade-up">
                            <div className="project-card">
                                <div className="project-image">
                                    <img src="/images/nkani.png" alt="Nkani News Aggregator" width="600" height="400" />
                                </div>
                                <div className="project-body">
                                    <h3 className="project-title">Nkani News Aggregator</h3>
                                    <p className="project-description">A Flask web application that scrapes Google News and provides sentiment analysis on articles using NLP.</p>
                                    <div className="tech-stack">
                                        <span className="tech-badge">Flask</span>
                                        <span className="tech-badge">NLP</span>
                                        <span className="tech-badge">Web Scraping</span>
                                        <span className="tech-badge">Python</span>
                                    </div>
                                    <div className="project-footer">
                                        <div className="project-links">
                                            <a href="https://github.com/Maxw311nyimbili/nkani_aggregator" target="_blank" rel="noopener noreferrer" className="project-link">
                                                <i className="fab fa-github"></i>
                                                <span>Code</span>
                                            </a>
                                            <a href="https://www.youtube.com/watch?v=53Kua8HQNzE" target="_blank" rel="noopener noreferrer" className="project-link">
                                                <i className="fab fa-youtube"></i>
                                                <span>Demo</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Events Manager */}
                        <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
                            <div className="project-card">
                                <div className="project-image">
                                    <img src="/images/events_manager.png" alt="Events Manager" width="600" height="400" />
                                </div>
                                <div className="project-body">
                                    <h3 className="project-title">Events Manager</h3>
                                    <p className="project-description">A Java application for scheduling and managing events with an intuitive JavaFX interface and robust backend.</p>
                                    <div className="tech-stack">
                                        <span className="tech-badge">Java</span>
                                        <span className="tech-badge">JavaFX</span>
                                        <span className="tech-badge">UI Design</span>
                                        <span className="tech-badge">Desktop App</span>
                                    </div>
                                    <div className="project-footer">
                                        <div className="project-links">
                                            <a href="https://github.com/Maxw311nyimbili/eventsManager" target="_blank" rel="noopener noreferrer" className="project-link">
                                                <i className="fab fa-github"></i>
                                                <span>Code</span>
                                            </a>
                                            <a href="https://www.youtube.com/watch?v=X5PeW4KRCQE" target="_blank" rel="noopener noreferrer" className="project-link">
                                                <i className="fab fa-youtube"></i>
                                                <span>Demo</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Portfolio */}
                        <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
                            <div className="project-card">
                                <div className="project-image">
                                    <img src="/images/portfolio.png" alt="Personal Portfolio" width="600" height="400" />
                                </div>
                                <div className="project-body">
                                    <h3 className="project-title">Personal Portfolio</h3>
                                    <p className="project-description">A modern, responsive portfolio website built with Next.js showcasing projects, skills, and professional experience.</p>
                                    <div className="tech-stack">
                                        <span className="tech-badge">Next.js</span>
                                        <span className="tech-badge">React</span>
                                        <span className="tech-badge">CSS3</span>
                                        <span className="tech-badge">Responsive</span>
                                    </div>
                                    <div className="project-footer">
                                        <div className="project-links">
                                            <Link href="/projects" className="project-link">
                                                <i className="fas fa-arrow-right"></i>
                                                <span>Explore</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-lg-12 text-center" data-aos="fade-up">
                            <Link href="/projects" className="btn btn-outline-primary">View All Projects</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* My Process Section */}
            <section className="process section compact-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center mb-4">
                            <h2 className="section-title" data-aos="fade-up">My Process</h2>
                            <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">How I approach design and development</p>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="process-timeline">
                                {/* Discovery */}
                                <div className="process-step" data-aos="fade-up">
                                    <div className="step-number">01</div>
                                    <div className="step-content">
                                        <div className="step-icon">
                                            <i className="fas fa-search"></i>
                                        </div>
                                        <h3>Discovery</h3>
                                        <p>I begin by understanding the problem space, conducting research, and defining clear objectives for the project. This phase focuses on gathering requirements and identifying user needs.</p>
                                        <div className="step-tools">
                                            <span>Research</span>
                                            <span>User Interviews</span>
                                            <span>Competitive Analysis</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Strategy */}
                                <div className="process-step" data-aos="fade-up">
                                    <div className="step-number">02</div>
                                    <div className="step-content">
                                        <div className="step-icon">
                                            <i className="fas fa-sitemap"></i>
                                        </div>
                                        <h3>Strategy</h3>
                                        <p>I develop the architectural framework and map out the user journey. This includes deciding on technology stack, creating wireframes, and planning the overall structure of the solution.</p>
                                        <div className="step-tools">
                                            <span>Wireframing</span>
                                            <span>Architecture Planning</span>
                                            <span>User Flows</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Design */}
                                <div className="process-step" data-aos="fade-up">
                                    <div className="step-number">03</div>
                                    <div className="step-content">
                                        <div className="step-icon">
                                            <i className="fas fa-pencil-ruler"></i>
                                        </div>
                                        <h3>Design</h3>
                                        <p>I create visual designs and interactive prototypes that bring the concept to life. This focuses on UI elements, color schemes, typography, and interactive components that create a cohesive user experience.</p>
                                        <div className="step-tools">
                                            <span>UI Design</span>
                                            <span>Prototyping</span>
                                            <span>Visual Systems</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Development */}
                                <div className="process-step" data-aos="fade-up">
                                    <div className="step-number">04</div>
                                    <div className="step-content">
                                        <div className="step-icon">
                                            <i className="fas fa-code"></i>
                                        </div>
                                        <h3>Development</h3>
                                        <p>I build the solution using clean, efficient code, implementing both frontend and backend components. This involves translating designs into functional applications with a focus on performance and reliability.</p>
                                        <div className="step-tools">
                                            <span>Frontend Development</span>
                                            <span>Backend Integration</span>
                                            <span>Testing</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Launch & Iterate */}
                                <div className="process-step" data-aos="fade-up">
                                    <div className="step-number">05</div>
                                    <div className="step-content">
                                        <div className="step-icon">
                                            <i className="fas fa-rocket"></i>
                                        </div>
                                        <h3>Launch & Iterate</h3>
                                        <p>I deploy the solution and gather user feedback to make continuous improvements. This ongoing process ensures the product evolves to better serve user needs and business goals over time.</p>
                                        <div className="step-tools">
                                            <span>Deployment</span>
                                            <span>Analytics</span>
                                            <span>Optimization</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="contact-cta section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center" data-aos="fade-up" data-aos-duration="600">
                            <h2>Let's Work Together</h2>
                            <p>Have a project in mind or interested in collaborating? I'd love to hear from you and explore how we can create something amazing together.</p>
                            <div className="cta-buttons mt-4">
                                <Link href="/contact" className="btn btn-primary me-3">Contact Me</Link>
                                <a href="/resume.pdf" className="btn btn-outline-primary" download>Download Resume</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout >
    );
}
