// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
    "nuxt-toastify",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: "lax",
    },
    storage: "cookies",
  },
  toastify: {
    autoClose: 3000,
    position: "top-right",
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: import.meta.env.NUXT_PUBLIC_API_BASE_URL,
    },
  },
  colorMode: {
    classSuffix: "",
    preference: "dark", // default theme
    fallback: "light",
  },

  css: ["~/assets/css/main.css"],

  app: {
    head: {
      title: "IoT Shop - ร้านค้าอุปกรณ์ IoT",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "ร้านค้าสินค้าและอุปกรณ์ IoT คุณภาพสูง",
        },
      ],
    },
  },

  vite: {
    server: {
      allowedHosts: true,
    },
  },
});
