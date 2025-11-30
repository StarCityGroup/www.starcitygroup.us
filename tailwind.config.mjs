/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
    container: {
			center: true,
      padding: '1rem',
			screens: {
				xl: '1024px'
			}
		},
		extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            lineHeight: '1.7',
            fontSize: '1.125rem',
            p: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
            },
            h1: {
              fontWeight: '800',
              letterSpacing: '-0.02em',
            },
            h2: {
              fontWeight: '700',
              letterSpacing: '-0.01em',
              marginTop: '2em',
              marginBottom: '1em',
            },
            h3: {
              fontWeight: '600',
              marginTop: '1.6em',
              marginBottom: '0.6em',
            },
            a: {
              fontWeight: '500',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
          }
        }
      }
    },
	},
	plugins: [require('@tailwindcss/typography')],
}
