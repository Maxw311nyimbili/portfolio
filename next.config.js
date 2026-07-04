/** @type {import('next').NextConfig} */

// Security headers for every route. CSP allows inline styles/scripts
// because Next.js (pages router) requires them; everything else is
// same-origin only — the site loads no third-party resources.
// unsafe-eval is dev-only: react-refresh (hot reload) evaluates strings,
// but production bundles never do.
const isDev = process.env.NODE_ENV === 'development';

const securityHeaders = [
    {
        key: 'Content-Security-Policy',
        value: [
            "default-src 'self'",
            `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
            "style-src 'self' 'unsafe-inline'",
            "font-src 'self'",
            "img-src 'self' data:",
            "connect-src 'self'",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'",
        ].join('; '),
    },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
    { key: 'Permissions-Policy', value: 'geolocation=(), camera=(), microphone=(), payment=(), usb=()' },
    { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const nextConfig = {
    reactStrictMode: true,
    async headers() {
        return [
            {
                source: '/:path*',
                headers: securityHeaders,
            },
        ];
    },
};

module.exports = nextConfig;
