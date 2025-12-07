import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/base.css';
import '../styles/theme.css';
import '../styles/index.css';
import '../styles/projects.css';
import '../styles/contact.css';

import Script from 'next/script';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
                strategy="afterInteractive"
            />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
