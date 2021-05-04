import CopyPlugin from "copy-webpack-plugin";
import minifyTheme from "minify-css-string";
import redirectSSL from "redirect-ssl";
import icons from "./icons";

// Here we define the public url of our presentation.
process.env.URL = process.env.DYNO
  ? "https://intra.dalexhd.dev"
  : `${process.env.HOST || "http://localhost"}:${process.env.PORT || 3000}`;

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "Evento 42: aborboll",
    meta: [
      {
        "norton-safeweb-site-verification":
          "f8i9qptz313nywps4khtxepjznoqgy7-79yi0faw4jm9l0dt5gg2424tp4b3euk-40g8lodby08veflx9uyxvvo65581y0m2au492asr9onnerpbwb22imkayclc6l80",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    __dangerouslyDisableSanitizers: ["script"],
    bodyAttrs: {
      class: "reveal-viewport",
    },
    htmlAttrs: {
      class: "reveal-full-page",
    },
    noscript: [{ innerHTML: "This website requires JavaScript." }],
  },
  // Disable/Enable Server Side rendering
  ssr: true,

  // HTTP2 (https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-render#http2)
  http2: {
    push: true,
  },

  // Modern (https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-modern)
  modern: process.env.NODE_ENV === "production",

  publicRuntimeConfig: {
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
    hotjarSiteId: process.env.HOTJAR_SITE_ID,
    amplitudeKey: process.env.AMPLITUDE_KEY,
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "~/assets/css/fonts.scss",
    "~/assets/css/reveal.scss",
    "~/assets/css/layout.scss",
    "~/assets/css/cookies.scss",
    "~/assets/css/plyr.scss",
    "@fortawesome/fontawesome-free/css/all.css",
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: "~/plugins/vuex-persist" },
    { src: "~/plugins/environment", mode: "client" },
    { src: "~/plugins/spotify", mode: "client" },
    { src: "~/plugins/theme" },
    { src: "~/plugins/cookies", mode: "client" },
  ],

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
    // https://github.com/nuxt-community/sentry-module
    "@nuxtjs/sentry",
    // Guide from https://github.com/nuxt/nuxt.js/tree/dev/examples/with-sockets
    "~/io",
  ],
  vuetify: {
    theme: {
      options: {
        minifyTheme,
      },
    },
    icons: {
      iconfont: "mdiSvg",
      values: {
        ...icons,
      },
    },
    defaultAssets: false,
  },
  sentry: {
    dsn:
      "https://50eaad48f37c43d8bf8757013f4a7488@o255682.ingest.sentry.io/5511533", // Enter your project's DSN here
    config: {}, // Additional config
  },
  auth: {
    plugins: [{ src: "~/plugins/auth" }],
    redirect: {
      callback: "/callback",
    },
    cookie: {
      prefix: "auth.",
      options: {
        path: "/",
        maxAge: 30 * 24 * 60 * 60, // days * hours * minutes * second => 30 days
        secure: process.env.NODE_ENV === "production" && process.env.DYNO,
      },
    },
    strategies: {
      intra: {
        scheme: "oauth2",
        clientId: process.env.CLIENT_ID,
        endpoints: {
          authorization: "https://api.intra.42.fr/oauth/authorize",
          token: `${process.env.URL}/auth/intra`,
          userInfo: `${process.env.URL}/auth/me`,
          logout: undefined,
        },
        token: {
          property: "access_token",
          type: "Bearer",
          maxAge: 1800,
        },
        refreshToken: {
          property: "refresh_token",
          maxAge: 30 * 24 * 60 * 60, // days * hours * minutes * second => 30 days
        },
        responseType: "code",
        grantType: "authorization_code",
        scope: [
          "public"
          //"projects",
          //"profile",
          //"elearning"
        ],
        state: process.env.APP_SECRET,
      },
    },
  },

  serverMiddleware: [
    // Will register redirect-ssl npm package (Only for heroku)
    redirectSSL.create({
      enabled: process.env.NODE_ENV === "production" && process.env.DYNO,
    }),
    { path: "/auth", handler: "~/api/auth.js" },
  ],

  pwa: {
    manifest: {
      name: "Evento 42: aborboll",
      short_name: "Evento 42",
      description:
        "Herramientas para ser un estudiante más productivo sin que nuestra cartera sufra ‍🎓",
      lang: "es",
      fileName: "manifest.[ext]",
      related_applications: [
        {
          platform: "webapp",
          url: `${process.env.URL}/dist/manifest.json`,
        },
      ],
    },
    meta: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      author: "Alex Borbolla, https://github.com/dalexhd",
      description:
        "Herramientas para ser un estudiante más productivo sin que nuestra cartera sufra ‍🎓",
      theme_color: "#191919",
      lang: "es",
      ogHost: "https://aborboll.herokuapp.com",
      twitterCard: "summary_large_image",
      twitterCreator: "@dalexhd",
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: "https://spotify-widget.herokuapp.com/.*",
          strategyOptions: {
            cacheName: "spotify-widget-cache",
          },
        },
        {
          urlPattern: "https://canvaz.scdn.com/.*",
          strategyOptions: {
            cacheName: "spotify-widget-cache",
          },
        },
        {
          urlPattern: "https://i.scdn.co/.*",
          strategyOptions: {
            cacheName: "spotify-widget-cache",
          },
        },
        {
          urlPattern: "https://cdn.intra.42.fr/.*",
          strategyOptions: {
            cacheName: "intra-cache",
          },
        },
        {
          urlPattern: "https://cdn.jsdelivr.net/.*",
          strategyOptions: {
            cacheName: "intra-cdn-jsdelivr",
          },
        },
        {
          urlPattern: "/socket.io/",
          handler: "NetworkOnly",
        },
        {
          urlPattern: "/themes/",
          handler: "CacheFirst",
        },
      ],
    },
  },

  // Server Configuration (https://nuxtjs.org/faq/host-port)
  server: {
    port: process.env.PORT || 3000,
    host: process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost", // This is just a solution for heroku
  },

  // Router configuration (https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-router#extendroutes)
  router: {},
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    publicPath: "/dist/",
    extractCSS: {
      splitChunks: true,
    },
    cssSourceMap: process.env.NODE_ENV !== "production",
    filenames: {
      app: ({ isDev }) => (isDev ? "js/[name].js" : "js/[contenthash].js"),
      chunk: ({ isDev }) => (isDev ? "js/[name].js" : "js/[contenthash].js"),
      css: ({ isDev }) => (isDev ? "css/[name].css" : "css/[contenthash].css"),
    },
    extend(config, ctx) {
      const rule = config.module.rules.find(
        (r) => r.test.toString() === "/\\.(png|jpe?g|gif|svg|webp|avif)$/i"
      );
      const loaderIndex = rule.use.findIndex((option) =>
        option.loader.includes("url-loader")
      );
      rule.use[loaderIndex].options.limit = false;
      config.module.rules.push({
        test: /\.vtt$/i,
        loader: "file-loader",
        options: {
          name: "vtt/[folder]/[name].[hash:6].[ext]",
        },
      });
    },
    loaders: {
      vue: {
        transformAssetUrls: {
          video: "src",
          source: "src",
          object: "src",
          embed: "src",
          img: ["src", "data-src"],
          section: [
            "data-background-video",
            "data-background-video-thumbnails",
            "data-background-image",
          ],
        },
      },
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
