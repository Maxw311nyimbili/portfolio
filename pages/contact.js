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
            setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
            setFormData({ name: '', email: '', subject: '', text: '' });
        } catch (error) {
            setStatus({ type: 'error', message: 'Something went wrong. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

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
            {/* 1. Minimal Typographic Hero */}
            <section className="contact-hero">
                <div className="contact-hero-content">
                    <h1>Let's <span>Connect</span></h1>
                    <p>Have a project in mind or just want to say hi? I'm always open to discussing new ideas and opportunities.</p>
                </div>
            </section>

            {/* 2. Main Content (Split Layout) */}
            <section className="contact-section">
                <div className="contact-container">

                    {/* Left Column: Contact Info */}
                    <div className="contact-info">
                        <div className="info-header">
                            <h2>Get in Touch</h2>
                            <p>I'm currently available for freelance work and full-time positions. Feel free to reach out!</p>
                        </div>

                        <div className="contact-methods">
                            <div className="method-item">
                                <div className="method-icon">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <div className="method-content">
                                    <h3>Email</h3>
                                    <a href="#contactForm">Send me a message</a>
                                </div>
                            </div>

                            <div className="method-item">
                                <div className="method-icon">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <div className="method-content">
                                    <h3>Location</h3>
                                    <p>Lusaka, Zambia</p>
                                </div>
                            </div>

                            <div className="method-item">
                                <div className="method-icon">
                                    <i className="fas fa-clock"></i>
                                </div>
                                <div className="method-content">
                                    <h3>Availability</h3>
                                    <p>Open to opportunities</p>
                                </div>
                            </div>
                        </div>

                        <div className="action-buttons">
                            <a href="/resume.pdf" className="btn-primary" download>
                                <i className="fas fa-download"></i> Resume
                            </a>
                            <a href="/portfolio.pdf" className="btn-outline" download>
                                <i className="fas fa-file-pdf"></i> Portfolio
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="contact-form-wrapper">
                        <div className="contact-form-card">
                            {status.message && (
                                <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-danger'}`} style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '8px', backgroundColor: status.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: status.type === 'success' ? '#10b981' : '#ef4444', border: `1px solid ${status.type === 'success' ? '#10b981' : '#ef4444'}` }}>
                                    <i className={`fas ${status.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`} style={{ marginRight: '0.5rem' }}></i>
                                    {status.message}
                                </div>
                            )}

                            <form id="contactForm" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        placeholder="John Doe"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="john@example.com"
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
                                        placeholder="Project Inquiry"
                                        value={formData.subject}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea
                                        className="form-control"
                                        id="message"
                                        name="text"
                                        placeholder="Tell me about your project..."
                                        required
                                        value={formData.text}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>Sending... <i className="fas fa-spinner fa-spin"></i></>
                                    ) : (
                                        <>Send Message <i className="fas fa-paper-plane"></i></>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Map Section */}
            <section className="map-section">
                <div className="map-container">
                    <div className="map-card">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122517.27749518766!2d28.206577235677232!3d-15.416786590286017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19408bf89fee857d%3A0xbbdea97a0919b3d9!2sLusaka%2C%20Zambia!5e0!3m2!1sen!2sus!4v1650442381300!5m2!1sen!2sus"
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
