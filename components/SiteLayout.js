import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Shared shell for the redesigned pages ("Portfolio Final" design):
// nav, footer, and the light/dark theme. Light is the default; the
// choice persists in localStorage and is applied pre-paint by the
// inline script in _document.js to avoid a flash.

const NAV = [
    { num: '01', label: 'HOME', href: '/' },
    { num: '02', label: 'PROJECTS', href: '/projects' },
    { num: '03', label: 'CONTACT', href: '/contact' },
];

export default function SiteLayout({ children, title, description }) {
    const router = useRouter();
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const saved = window.localStorage.getItem('portfolio-theme');
        if (saved === 'light' || saved === 'dark') setTheme(saved);
    }, []);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);

    const toggleTheme = () => {
        setTheme((t) => {
            const next = t === 'dark' ? 'light' : 'dark';
            window.localStorage.setItem('portfolio-theme', next);
            return next;
        });
    };

    return (
        <div className="site-root">
            <Head>
                <title>{title || 'Maxwell Nyimbili — AI Engineer & Full-Stack Developer'}</title>
                <meta
                    name="description"
                    content={
                        description ||
                        'Maxwell Nyimbili — AI Engineer and Full-Stack Developer. Turning complex ideas into clean, usable interfaces.'
                    }
                />
                <link rel="icon" href="/images/favicon-96x96.png" />
            </Head>

            <nav className="site-nav">
                <Link href="/" className="logo">M. NYIMBILI</Link>
                <div className="nav-links">
                    {NAV.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`nav-item${router.pathname === item.href ? ' active' : ''}`}
                        >
                            {item.num} / {item.label}
                        </Link>
                    ))}
                    <a
                        className="resume-btn"
                        href="/file/freelance-brochure.pdf"
                        download="Maxwell Nyimbili - Freelance Brochure.pdf"
                    >
                        BROCHURE ↓
                    </a>
                    <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
                        {theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}
                    </button>
                </div>
            </nav>

            <main className="site-main">{children}</main>

            <footer className="site-footer">
                <div>
                    <div className="footer-title">Let&apos;s build something.</div>
                    <div className="footer-cta">
                        <Link href="/contact">SEND A MESSAGE ↗</Link>
                        {' — LUSAKA, ZM'}
                    </div>
                </div>
                <div className="footer-links">
                    <a href="https://github.com/Maxw311nyimbili" target="_blank" rel="noopener noreferrer">GITHUB</a>
                    {' / '}
                    <a href="https://www.linkedin.com/in/maxwellnyimbili/" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
                    {' / '}
                    <span>© 2026</span>
                </div>
            </footer>
        </div>
    );
}
