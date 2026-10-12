// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: [
    '~/assets/css/main.css',
  ],

  app: {
    head: {
      htmlAttrs: {
        lang: 'es',
      },
      title: 'Mi tienda de servicios',
      meta: [
        { 
          name: 'description', 
          content: 'Bienvenido a tu tienda de servicios generales.' 
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
    },
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
    'nuxt-auth-utils',
  ],

  // SPA - Single Page Application
  /*
  ssr: false,
  nitro: {
    preset: 'static',
    static: true,
  },
  */

  // Prerender - todo el sitio
  nitro: {
    prerender: {
      routes: ['/', '/about', '/pricing', '/products', '/contact'],
      ignore: ['/dashboard', '/dashboard/**'],

      // Habilitar el crawling para descubrir rutas dinámicas
      crawlLinks: true,
    },
  },
  
})