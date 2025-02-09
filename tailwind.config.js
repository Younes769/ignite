/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        flame: "flame 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "gradient-x": "gradient-x 3s ease-in-out infinite",
        "spark-1": "spark-1 1s ease-out forwards",
        "spark-2": "spark-2 1s ease-out forwards",
        "spark-3": "spark-3 1s ease-out forwards",
        "spark-4": "spark-4 1s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
      keyframes: {
        flame: {
          "0%": {
            transform: "translateY(0) scale(1)",
            opacity: "0.3",
          },
          "25%": {
            transform: "translateY(-15%) scale(1.05)",
            opacity: "0.5",
          },
          "50%": {
            transform: "translateY(-25%) scale(1.1)",
            opacity: "0.7",
          },
          "75%": {
            transform: "translateY(-15%) scale(1.05)",
            opacity: "0.5",
          },
          "100%": {
            transform: "translateY(0) scale(1)",
            opacity: "0.3",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "spark-1": {
          "0%": {
            transform: "translate(0, 0) scale(0)",
            opacity: "0",
          },
          "50%": {
            transform: "translate(40px, -40px) rotate(180deg) scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(80px, -80px) rotate(360deg) scale(0)",
            opacity: "0",
          },
        },
        "spark-2": {
          "0%": {
            transform: "translate(0, 0) scale(0)",
            opacity: "0",
          },
          "50%": {
            transform: "translate(-35px, -45px) rotate(-180deg) scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(-70px, -90px) rotate(-360deg) scale(0)",
            opacity: "0",
          },
        },
        "spark-3": {
          "0%": {
            transform: "translate(0, 0) scale(0)",
            opacity: "0",
          },
          "50%": {
            transform: "translate(35px, -35px) rotate(180deg) scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(70px, -70px) rotate(360deg) scale(0)",
            opacity: "0",
          },
        },
        "spark-4": {
          "0%": {
            transform: "translate(0, 0) scale(0)",
            opacity: "0",
          },
          "50%": {
            transform: "translate(-40px, -35px) rotate(-180deg) scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(-80px, -70px) rotate(-360deg) scale(0)",
            opacity: "0",
          },
        },
        glow: {
          "0%": {
            opacity: "0.3",
            transform: "translateY(0) scale(1)",
          },
          "50%": {
            opacity: "0.5",
            transform: "translateY(-5%) scale(1.05)",
          },
          "100%": {
            opacity: "0.3",
            transform: "translateY(0) scale(1)",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
  },
  plugins: [],
};
