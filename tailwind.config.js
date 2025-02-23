/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1707px",
        "4xl": "2560px",
      },
      fontFamily: {
        display: ["XITS", "serif"],
        Involve: ["Involve", "serif"],
        manrope: ["Manrope", "serif"],
      },
      maxWidth: {
        base: "100.5rem",
      },
      colors: {
        black: "#000000",
        "black-200": "#171717",
        "black-300": "#050505",
        "base-blue": "#335B82",
        "base-blue-200": "#7CAEEB",
        white: "#FFFFFF",
        "active-menu": "#FBE28A",
        brand: {
          black: "#2C85DE",
          "black-200": "#0078F0",
          "gray-700": "#424242",
        },
      },
      boxShadow: {
        custom: "0px 0px 6px 0px #fbe280",
        "custom-2": "0px 0px 60px 0px #2C90F3",
        "custom-3": "0px 0px 20px 0px #fbe280",
        product: "0px 0px 61.3px 0px #2C90F3;",
      },
      backgroundImage: {
        hero: "url('../assets/img/hero-bg.jpeg')",
        "hero-mobile": "url('../assets/img/hero-bg-mobile.png')",
        media: "url('../assets/img/media-bg.png')",
        "media-mobile": "url('../assets/img/media-bg-mobile.png')",
        video: "url('../assets/vid/wmzs-daosha.mp4')",
        product: "linear-gradient(180deg, #CEE2F3 0%, #30608F 100%);",
      },
    },
  },
  plugins: [],
};
