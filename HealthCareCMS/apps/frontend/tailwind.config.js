/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}", // Adjust to match your files
    ],
    theme: {
      extend: {
        screens: {
          'custom-sm': '480px',   // Custom small breakpoint
          'custom-md': '1362px', // Custom medium breakpoint
          'custom-lg': '1600px', // Custom large breakpoint
        },
      },
    },
    plugins: [],
  };
  