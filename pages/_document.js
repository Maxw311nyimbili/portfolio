import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                {/* Favicon goes here */}
                <link rel="icon" href="/images/favicon-96x96.png" />
            </Head>
            <body>
                {/* Apply saved theme before paint to avoid a flash.
                    Light is the default. */}
                <script
                    dangerouslySetInnerHTML={{
                        __html:
                            "try{var t=localStorage.getItem('portfolio-theme');document.documentElement.dataset.theme=(t==='dark'?'dark':'light');}catch(e){document.documentElement.dataset.theme='light';}",
                    }}
                />
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
