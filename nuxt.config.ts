// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      title: "Color Picker",
      viewport: "width=device-width, initial-scale=1",
      meta: [{ name: "description", content: "Color Picker" }],
    },
  },
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss"],
});
