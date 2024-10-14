/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#373F51",
                background: "#f8f8f8",
                text: "#1B1B1E",
            }
        },
    },
    plugins: [],
}