/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['monospace'], // or a specific mono font if you have one
            },
            colors: {
                black: '#000000',
                charcoal: '#1a1a1a',
                'off-white': '#f0f0f0',
                accent: '#4a90e2', // Will likely update this after checking reference
            },
            backgroundImage: {
                'grid-pattern': "linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)",
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-100%)' },
                }
            },
            animation: {
                marquee: 'marquee 25s linear infinite',
            }
        },
    },
    plugins: [],
}
