/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui"],
        serif: ["ui-serif", "Georgia", "Cambria", "Times New Roman", "serif"], // defaulting to serif
        mono: ["ui-monospace", "SFMono-Regular"],
      },
      colors: {
        "galvin-green": "#4CB050",
        "galvin-grey": "#1f1f1f",
        "galvin-bg": "#121212",
        "galvin-text-grey": "#837d7d",
        err: "#ff0000",
        // bg-neutral-950 is login model background class
      },
      scrollSnapType: {
        x: "x mandatory",
      },
      scrollSnapAlign: {
        start: "start",
      },
    },
  },
  plugins: [],
};
