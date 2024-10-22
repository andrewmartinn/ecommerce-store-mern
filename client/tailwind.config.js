/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: "'Outfit', serif",
        prata: "'Prata', serif",
      },
      colors: {
        primary: {
          100: "#414141",
        },
      },
    },
  },
  plugins: [],
};
