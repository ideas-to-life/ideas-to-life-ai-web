/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                midnight: '#050505',
                'glass-white': 'rgba(255, 255, 255, 0.03)',
                'glass-border': 'rgba(255, 255, 255, 0.1)',
                'accent-blue': '#00d2ff',
                'accent-violet': '#8b5cf6',
                'accent-sunset': '#ff8c00',
            },
            fontFamily: {
                main: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            backgroundImage: {
                'hero-gradient': 'radial-gradient(circle at 50% 50%, rgba(255, 140, 0, 0.03) 0%, transparent 60%)',
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
