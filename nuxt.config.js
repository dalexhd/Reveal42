import CopyPlugin from "copy-webpack-plugin";
import minifyTheme from "minify-css-string";
import redirectSSL from "redirect-ssl";

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
    script: [
      process.env.GOOGLE_ANALYTICS_ID
        ? {
            src: `https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`,
            type: "text/x-metomic",
            "data-micropolicy": "statistics",
            async: true,
          }
        : {},
      process.env.GOOGLE_ANALYTICS_ID
        ? {
            hid: "gtm-script",
            type: "text/x-metomic",
            "data-micropolicy": "statistics",
            innerHTML: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}', {'page_path': location.pathname + location.search + location.hash});`,
          }
        : {},
      process.env.HOTJAR_SITE_ID
        ? {
            hid: "hotjar-script",
            type: "text/x-metomic",
            "data-micropolicy": "statistics",
            innerHTML: `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:${process.env.HOTJAR_SITE_ID},hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
          }
        : {},
      process.env.AMPLITUDE_KEY
        ? {
            hid: "amplitude-script",
            type: "text/x-metomic",
            "data-micropolicy": "statistics",
            innerHTML: `(function(b,e){function f(a,b){a.prototype[b]=function(){return this._q.push([b].concat(Array.prototype.slice.call(arguments,0))),this}}function g(a){function b(b){a[b]=function(){a._q.push([b].concat(Array.prototype.slice.call(arguments,0)))}}for(var c=0;c<o.length;c++)b(o[c])}var h=b.amplitude||{_q:[],_iq:{}},j=e.createElement("script");j.type="text/javascript",j.integrity="sha384-girahbTbYZ9tT03PWWj0mEVgyxtZoyDF9KVZdL+R53PP5wCY0PiVUKq0jeRlMx9M",j.crossOrigin="anonymous",j.async=!0,j.src="https://cdn.amplitude.com/libs/amplitude-7.2.1-min.gz.js",j.onload=function(){b.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};var k=e.getElementsByTagName("script")[0];k.parentNode.insertBefore(j,k);for(var i=function(){return this._q=[],this},m=["add","append","clearAll","prepend","set","setOnce","unset"],a=0;a<m.length;a++)f(i,m[a]);h.Identify=i;for(var n=function(){return this._q=[],this},c=["setProductId","setQuantity","setPrice","setRevenueType","setEventProperties"],l=0;l<c.length;l++)f(n,c[l]);h.Revenue=n;var o=["init","logEvent","logRevenue","setUserId","setUserProperties","setOptOut","setVersionName","setDomain","setDeviceId","enableTracking","setGlobalUserProperties","identify","clearUserProperties","setGroup","logRevenueV2","regenerateDeviceId","groupIdentify","onInit","logEventWithTimestamp","logEventWithGroups","setSessionId","resetSessionId"];g(h),h.getInstance=function(a){return a=(a&&0!==a.length?a:"$default_instance").toLowerCase(),h._iq.hasOwnProperty(a)||(h._iq[a]={_q:[]},g(h._iq[a])),h._iq[a]},b.amplitude=h})(window,document),amplitude.getInstance().init("${process.env.AMPLITUDE_KEY}");`,
          }
        : {},
      process.env.METOMIC_ID
        ? {
            src: `https://config.metomic.io/config.js?id=${process.env.METOMIC_ID}`,
            crossorigin: true,
            charset: "utf-8",
          }
        : {},
      process.env.METOMIC_ID
        ? {
            src: "https://consent-manager.metomic.io/embed.js",
            crossorigin: true,
            charset: "utf-8",
          }
        : {},
    ],
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
  modern: true,

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "~/assets/css/fonts.scss",
    "~/assets/css/reveal.scss",
    "~/assets/css/layout.scss",
    "plyr/src/sass/plyr.scss",
    "@mdi/font/scss/materialdesignicons.scss",
    "@fortawesome/fontawesome-free/css/all.css",
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: "~/plugins/vuex-persist", mode: "server" },
    { src: "~/plugins/environment", mode: "client" },
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
    defaultAssets: false,
  },
  sentry: {
    dsn:
      "https://50eaad48f37c43d8bf8757013f4a7488@o255682.ingest.sentry.io/5511533", // Enter your project's DSN here
    config: {}, // Additional config
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
          userInfo: "/auth/me",
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
        state: process.env.APP_SECRET,
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_SECRET,
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
      const loaderIndex = rule.use.findIndex(
        (option) => option.loader === "url-loader"
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
