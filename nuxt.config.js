import CopyPlugin from "copy-webpack-plugin";

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "Evento 42: aborboll",
    meta: [
      { charset: "utf-8" },
      { lang: "es" },
      { author: "Alex Borbolla, https://github.com/dalexhd" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Herramientas para ser un estudiante más productivo sin que nuestra cartera sufra ‍🎓",
      },
      { ogHost: "https://aborboll.herokuapp.com/" },
      { twitterCreator: "@dalexhd" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: false,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    // https://go.nuxtjs.dev/stylelint
    "@nuxtjs/stylelint-module",
    // https://tailwindcss.nuxtjs.org/setup
    "@nuxtjs/tailwindcss",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://dev.auth.nuxtjs.org/guide/setup
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    // https://github.com/nuxt-community/vuetify-module
    "@nuxtjs/vuetify",
    // Guide from https://github.com/nuxt/nuxt.js/tree/dev/examples/with-sockets
    "~/io",
  ],
  vuetify: {
    theme: { disable: true },
  },
  auth: {
    redirect: {
      callback: "/callback",
    },
    strategies: {
      intra: {
        scheme: "oauth2",
        clientId: process.env.CLIENT_ID,
        endpoints: {
          authorization: "https://api.intra.42.fr/oauth/authorize",
          token: "/auth/intra",
          userInfo: "https://api.intra.42.fr/v2/me",
          logout: undefined,
        },
        token: {
          property: "access_token",
          type: "Bearer",
          maxAge: 1800,
        },
        refreshToken: {
          property: "refresh_token",
          maxAge: 60 * 60 * 24 * 30,
        },
        responseType: "code",
        grantType: "authorization_code",
        scope: ["public"],
        state: "UNIQUE_AND_NON_GUESSABLE",
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_SECRET,
      },
    },
  },

  serverMiddleware: [{ path: "/auth", handler: "~/api/auth.js" }],

  pwa: {
    manifest: {
      name: "Evento 42: aborboll",
      short_name: "Evento 42",
      description:
        "Herramientas para ser un estudiante más productivo sin que nuestra cartera sufra ‍🎓",
      lang: "es",
    },
  },

  // Server Configuration (https://nuxtjs.org/faq/host-port)
  server: {
    port: process.env.PORT || 3000,
    host: process.env.PORT ? "0.0.0.0" : "localhost", // This is just a solution for heroku
  },

  // Router configuration (https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-router#extendroutes)
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: "/admin",
        component: resolve(__dirname, "pages/index.vue"),
      });
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    publicPath: "/dist/",
    extractCSS: true,
    cssSourceMap: process.env.NODE_ENV !== "production",
    filenames: {
      app: ({ isDev }) => (isDev ? "js/[name].js" : "js/[contenthash].js"),
      chunk: ({ isDev }) => (isDev ? "js/[name].js" : "js/[contenthash].js"),
      css: ({ isDev }) => (isDev ? "css/[name].css" : "css/[contenthash].css"),
    },
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.vtt$/i,
        loader: "file-loader",
        options: {
          name: "vtt/[folder]/[name].[hash:6].[ext]",
        },
      });
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            context: "./assets/video",
            from: "**/thumbnails/*",
            to: "vtt/[path]/[name].[ext]",
          },
        ],
      }),
    ],
  },
};
