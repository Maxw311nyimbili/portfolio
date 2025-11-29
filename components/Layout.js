import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import Cursor from './Cursor';
import ThemeToggleButton from './ThemeToggleButton';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Layout = ({ children, title = "Nyimbili's Portfolio | Home" }) => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Maxwell Nyimbili's Portfolio" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Background Elements */}
            <div className="bg-gradient"></div>
            <div className="bg-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
            </div>

            <Cursor />
            <ThemeToggleButton />

            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
};

export default Layout;
