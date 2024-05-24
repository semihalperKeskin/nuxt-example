// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig:{
    public:{
      API_KEY: process.env.API_KEY
    }
  },

  modules: ["@nuxtjs/tailwindcss"]
})