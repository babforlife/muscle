// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
    }
  },
  typescript: {
    shim: false
  },
  plugins: ['~/plugins/directives.js', '~/plugins/msw.js', '~/plugins/highcharts.js'],
  modules: ['@nuxtjs/tailwindcss'],
  ssr: true,
  css: ['normalize.css/normalize.css', '@/assets/styles/main.css'],
  runtimeConfig: {
    public: {
      mock: false
    }
  }
})
