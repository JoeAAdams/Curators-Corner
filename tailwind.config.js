/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            keyframes: {
                buttonBounce: {
                    "0%,100%": {
                        transform: "scale(.90)",
                    },
                    "40%": {
                        transform: "scale(1.02)",
                    },
                },
            },
            animation: { buttonBounce: "buttonBounce 1s ease-in-out" },
        },
    },
    plugins: [],
};
