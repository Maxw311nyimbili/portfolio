import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        text: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await axios.post('/api/contact', formData);
            setStatus({ type: 'success', message: 'Submission was successful!' });
            setFormData({ name: '', email: '', subject: '', text: '' });
        } catch (error) {
            setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Parallax effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            const decorations = document.querySelectorAll('.contact-decoration');
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            decorations.forEach((decoration, index) => {
                const speed = index === 0 ? 0.04 : 0.03;
                const x = (centerX - mouseX) * speed;
                const y = (centerY - mouseY) * speed;
                decoration.style.transform = `translateX(${x}px) translateY(${y}px)`;
            });

            const cards = document.querySelectorAll('.contact-info-inner, .contact-form-inner');
            cards.forEach((card) => {
                const speed = 0.005;
                const x = (mouseX - centerX) * speed;
                const y = (mouseY - centerY) * speed;
                card.style.transform = `perspective(1000px) rotateX(${y * -1}deg) rotateY(${x}deg)`;
            });
        };

        const handleMouseLeave = () => {
            const cards = document.querySelectorAll('.contact-info-inner, .contact-form-inner');
            cards.forEach((card) => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            });
        };

        if (window.innerWidth > 992) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // Auto-dismiss flash messages
    useEffect(() => {
        if (status.message) {
            const timer = setTimeout(() => {
                setStatus({ type: '', message: '' });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    return (
        <Layout title="Contact | Nyimbili's Portfolio">
            {/* Enhanced Contact Hero Section */}
            <section className="contact-hero">
                <div className="contact-hero-content">
                    <h1>Get in Touch</h1>
                    <p>I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.</p>
                </div>
                <div className="hero-decoration">
                    <div className="decoration-line"></div>
                    <div className="decoration-dot"></div>
                </div>
            </section>

            {/* Flash Messages */}
            {status.message && (
                <div className="flash-messages">
                    <div className={`flash-message ${status.type}`} style={{ opacity: 1, display: 'block' }}>
                        <div className="container">
                            <i className={`fas ${status.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                            <span>{status.message}</span>
                            <button className="close-btn" onClick={() => setStatus({ type: '', message: '' })}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Enhanced Contact Section */}
            <section className="contact-section">
                <div className="contact-container">
                    {/* Decorative elements */}
                    <div className="contact-decoration decoration-1"></div>
                    <div className="contact-decoration decoration-2"></div>

                    {/* Contact Info */}
                    <div className="contact-info fade-in-delay-1" style={{ opacity: 1 }}>
                        <div className="contact-info-inner">
                            <div>
                                <div className="contact-heading">
                                    <h2>Contact Information</h2>
                                </div>
                                <p className="contact-desc">Feel free to reach out through any of these channels. I'll get back to you as soon as possible.</p>

                                <div className="contact-method">
                                    <div className="contact-method-title">
                                        <i className="fas fa-envelope"></i> Email
                                    </div>
                                    <div className="contact-method-content">
                                        <a href="mailto:nyimbilimaxwell9@gmail.com">nyimbilimaxwell9@gmail.com</a>
                                    </div>
                                </div>

                                <div className="contact-method">
                                    <div className="contact-method-title">
                                        <i className="fas fa-map-marker-alt"></i> Location
                                    </div>
                                    <div className="contact-method-content">
                                        Lusaka, Zambia
                                    </div>
                                </div>

                                <div className="contact-method">
                                    <div className="contact-method-title">
                                        <i className="fas fa-clock"></i> Availability
                                    </div>
                                    <div className="contact-method-content">
                                        Monday - Friday, 9AM - 6PM CAT
                                    </div>
                                </div>

                                <div className="contact-method">
                                    <div className="contact-method-title">
                                        <i className="fas fa-phone-alt"></i> Response Time
                                    </div>
                                    <div className="contact-method-content">
                                        Usually within 24 hours
                                    </div>
                                </div>
                            </div>

                            <div>
                                <a href="/resume.pdf" className="resume-btn" download>
                                    <span>Download Resume</span>
                                    <i className="fas fa-download"></i>
                                </a>

                                <div className="social-links">
                                    <a href="https://github.com/maxw311nyimbili" target="_blank" className="social-link" aria-label="GitHub Profile" rel="noopener noreferrer">
                                        <i className="fab fa-github"></i>
                                    </a>
                                    <a href="https://linkedin.com/in/maxwellnyimbili" target="_blank" className="social-link" aria-label="LinkedIn Profile" rel="noopener noreferrer">
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                    <a href="mailto:nyimbilimaxwell9@gmail.com" className="social-link" aria-label="Email Me">
                                        <i className="fas fa-envelope"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form fade-in-delay-2" style={{ opacity: 1 }}>
                        <div className="contact-form-inner">
                            <div className="form-header">
                                <h2>Send Me a Message</h2>
                            </div>
                            <p className="form-subtext">Have a question or want to work together? Drop me a message using the form below.</p>

                            <form id="contactForm" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">Your Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        placeholder="Enter your name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email address"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject" className="form-label">Subject</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="subject"
                                        name="subject"
                                        placeholder="What is this about?"
                                        value={formData.subject}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message" className="form-label">Your Message</label>
                                    <textarea
                                        className="form-control"
                                        id="message"
                                        name="text"
                                        placeholder="What would you like to discuss?"
                                        required
                                        value={formData.text}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                <button type="submit" className={`submit-btn ${isSubmitting ? 'sending' : ''}`} disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <><span>Sending...</span> <i className="fas fa-spinner fa-spin"></i></>
                                    ) : (
                                        <><span>Send Message</span> <i className="fas fa-paper-plane"></i></>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="map-section fade-in-delay-3" style={{ opacity: 1 }}>
                <div className="map-container">
                    <div className="map-header">
                        <h2 className="map-title">Where to Find Me</h2>
                        <p className="map-subtitle">Based in the heart of Lusaka, Zambia, I'm always ready to connect with clients and collaborators worldwide.</p>
                    </div>

                    <div className="map-card">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122517.27749518766!2d28.206577235677232!3d-15.416786590286017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19408bf89fee857d%3A0xbbdea97a0919b3d9!2sLusaka%2C%20Zambia!5e0!3m2!1sen!2sus!4v1650442381300!5m2!1sen!2sus"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Map of Lusaka, Zambia"
                        ></iframe>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
