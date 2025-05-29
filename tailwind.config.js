module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,html}",
  ], // Adjust based on your project
    theme: {
      extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
      themes: ["light"],
    },
  }