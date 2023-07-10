// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      title: "Colors",
      viewport: "width=device-width, initial-scale=1",
      meta: [{ name: "description", content: "Colors" }],
    },
  },
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss"],
});
