    // postcss.config.js
    module.exports = {
      plugins: {
        // Use o pacote @tailwindcss/postcss para a integração correta
        '@tailwindcss/postcss': {}, // <-- DEVE ESTAR EXATAMENTE ASSIM AGORA!
        autoprefixer: {},
      },
    };
    