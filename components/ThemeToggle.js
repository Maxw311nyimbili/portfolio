import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-300 hover:scale-110"
            aria-label="Toggle Theme"
        >
            {theme === 'dark' ? (
                <i className="fas fa-sun text-yellow-400"></i>
            ) : (
                <i className="fas fa-moon text-primary"></i>
            )}
        </button>
    );
};

export default ThemeToggle;
