import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';


const Navbar = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar navbar-expand-lg fixed-top">
            <div className="container">
                <Link href="/" className="navbar-brand">
                    <div className="logo">
                        <span className="logo-text">
                            <img src="/images/logo.png" width="80" height="80" alt="Logo" />
                        </span>
                        <div className="logo-bar"></div>
                    </div>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-controls="navbarNav"
                    aria-expanded={isOpen}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link href="/" legacyBehavior>
                                <a className={`nav-link ${router.pathname === '/' ? 'active' : ''}`}>Home</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/projects" legacyBehavior>
                                <a className={`nav-link ${router.pathname === '/projects' ? 'active' : ''}`}>Projects</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/contact" legacyBehavior>
                                <a className={`nav-link ${router.pathname === '/contact' ? 'active' : ''}`}>Contact</a>
                            </Link>
                        </li>
                        <li className="nav-item ms-lg-3">
                            <a className="btn btn-primary" href="/resume.pdf" download>
                                <span>Resume</span>
                                <i className="fas fa-arrow-down ms-2"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
