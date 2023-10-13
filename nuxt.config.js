export default {
  server: {
    port: 3000,
  },
  target: 'static',
  ssr: false,
  env: {
    api: 'http://localhost:8000/',
  },
  head: {
    title: 'Muscle',
    meta: [
      { charset: 'utf8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: ['@/assets/styles/main.css'],
  plugins: [],
  components: true,
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/tailwindcss'],
  modules: ['@nuxtjs/pwa'],
  pwa: {
    manifest: {
      lang: 'en',
    },
  },
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }],
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
      ],
    },
    // analyze: true,
  },
}
