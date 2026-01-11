module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// tailwind.config.cjs
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'portfolio-dark': '#0a0a0a', // El negro de la barra lateral
        'portfolio-accent': '#ff5e1a', // El naranja/rosa del diseño
      },
    },
  },
  plugins: [],
}