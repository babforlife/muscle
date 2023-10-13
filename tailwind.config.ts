import { Config } from 'tailwindcss'

export default <Config>{
  content: [
    'app.vue',
    'pages/**/*.{vue,js,ts}',
    // e.g. './modules/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
