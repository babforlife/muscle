// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  plugins: ['~/plugins/directives.js'],
  modules: ['@nuxtjs/tailwindcss'],
  ssr: false,
  css: ['normalize.css/normalize.css', '@/assets/styles/main.css'],
})
