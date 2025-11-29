/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0A3D62',
                    light: '#0E5A8A',
                    dark: '#062840',
                },
                secondary: {
                    DEFAULT: '#74F0ED',
                    light: '#9FF5F3',
                },
                accent: '#BFC9CA',
                dark: '#0F1419',
                light: '#F5F7FA',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Space Grotesk', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
