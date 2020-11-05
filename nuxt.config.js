import path from "path";
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
  css: ["@/assets/css/main.scss"],

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
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
  ],

  pwa: {
    manifest: {
      name: "Evento 42: aborboll",
      short_name: "Evento 42",
      description:
        "Herramientas para ser un estudiante más productivo sin que nuestra cartera sufra ‍🎓",
      lang: "es",
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
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
