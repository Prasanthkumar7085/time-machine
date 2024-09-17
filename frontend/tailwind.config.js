/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "3xl": "3rem",
      },
    },
  },
  plugins: [
    require("daisyui"),
    function ({ addUtilities }) {
      addUtilities(
        {
          ".word-spacing-0": { "word-spacing": "0" },
          ".word-spacing-1": { "word-spacing": "0.1em" },
          ".word-spacing-2": { "word-spacing": "0.2em" },
          ".word-spacing-3": { "word-spacing": "0.3em" },
          ".word-spacing-4": { "word-spacing": "0.4em" },
          ".word-spacing-5": { "word-spacing": "0.5em" },
        },
        ["responsive", "hover"],
      );
    },
  ],
  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: ["dark", "light", "cyberpunk"],
    themes: ["dark", "light", "cyberpunk"],
  },
};
