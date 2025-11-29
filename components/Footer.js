import Link from 'next/link';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="py-4">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6 text-center text-md-start">
                        <p className="mb-0">
                            &copy; {year} Maxwell Nyimbili. <span className="text-gradient">Creative Developer</span>
                        </p>
                    </div>
                    <div className="col-md-6">
                        <ul className="social-links">
                            <li>
                                <a href="https://github.com/maxw311nyimbili" target="_blank" aria-label="GitHub" rel="noopener noreferrer">
                                    <i className="fab fa-github"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/maxwellnyimbili/" target="_blank" aria-label="LinkedIn" rel="noopener noreferrer">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                            </li>
                            <li>
                                <a href="mailto:nyimbilimaxwell9@gmail.com" aria-label="Email">
                                    <i className="far fa-envelope"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
