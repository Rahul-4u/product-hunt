/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js", // Flowbite এর জন্য এটি যোগ করুন
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin"), // Flowbite প্লাগইন যোগ করুন
  ],
};
