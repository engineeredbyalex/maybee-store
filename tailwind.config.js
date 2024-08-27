/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontSize: {
                'h1': '3.5rem', // Adjust these values as needed
                'h2': '3rem',
                'h3': '2rem',
                'h4': '1.5rem',
                'h5': '1.25rem',
                'h6': '1.25rem',
            },
        },
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
    ],
}