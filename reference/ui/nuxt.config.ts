// nuxt.config.ts
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },

  // Global styles
  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
    css: {
      devSourcemap: false,
    },
    build: {
      sourcemap: false,
    },
    logLevel: "warn",
    ssr: {
      noExternal: ['#nitro-internal-virtual/storage'],
    },
  },

  modules: [
    "@nuxtjs/google-fonts",
    "@pinia/nuxt", 
    "@nuxtjs/color-mode",
  ],

  googleFonts: {
    families: {
      Roboto: [400, 500, 700],
      Righteous: true,
      "Kaushan+Script": true,
    },
    display: "swap",
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NODE_ENV === "production"
          ? "https://api.kathieskitchen.com/api/"
          : "http://127.0.0.1:8000/api/",
    },
  },

  app: {
    head: {
      title: "Kathie's Kitchen",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Kathie's Kitchen Admin Portal" },
      ],
      script: [
        {
          src: "https://accounts.google.com/gsi/client",
          async: true,
          defer: true,
        },
      ],
    },
  },

  nitro: {
    devProxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        // target: "http://api.kathieskitchen.com",
        changeOrigin: true,
      },
    },
    externals: {
      inline: ["#nitro-internal-virtual/storage"],
    },
  },
});

