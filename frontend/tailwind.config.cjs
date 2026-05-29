module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto'],
                display: ['Poppins', 'Inter', 'sans-serif']
            },
            colors: {
                primary: '#6c5ce7', // electric violet
                'primary-600': '#5a4bd6',
                accent: '#00e5a8', // cyber emerald
                glass: 'rgba(255,255,255,0.06)'
            },
            borderRadius: {
                lg: '14px',
                xl: '20px'
            },
            boxShadow: {
                soft: '0 10px 30px rgba(12,14,20,0.12), 0 2px 6px rgba(12,14,20,0.04)',
                deep: '0 30px 60px rgba(12,14,20,0.18), 0 8px 20px rgba(12,14,20,0.08)'
            },
            keyframes: {
                'fade-up': {
                    '0%': { opacity: '0', transform: 'translateY(8px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' }
                },
                floaty: {
                    '0%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-6px)' },
                    '100%': { transform: 'translateY(0)' }
                },
                pop: {
                    '0%': { transform: 'scale(0.98)' },
                    '60%': { transform: 'scale(1.04)' },
                    '100%': { transform: 'scale(1)' }
                }
            },
            animation: {
                'fade-up': 'fade-up 380ms cubic-bezier(.2,.9,.3,1) both',
                shimmer: 'shimmer 1.8s linear infinite',
                floaty: 'floaty 4s ease-in-out infinite',
                pop: 'pop 700ms cubic-bezier(.2,.9,.3,1)'
            }
        }
    },
    plugins: []
}
