/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        soil: "#5C4033",
        taupe: "#8B6A4A",
        clay: "#D6C4A8",
        olive: "#708238",
        sage: "#A8BBA2",
        moss: "#78866B",
        rust: "#B7410E",
        terracotta: "#E2725B",
        sandstone: "#CDB79E",
        cream: "#FDF6EC",
        charcoal: "#3C3C3C",
        dusty: "#FAF8F4",
      },
    },
  },
  plugins: [],
};

