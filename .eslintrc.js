module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  extends: [
    "@nuxtjs",
    "prettier",
    "plugin:vue/recommended",
    "prettier/vue",
    "plugin:prettier/recommended",
    "plugin:vue-a11y/recommended",
    "plugin:nuxt/recommended",
  ],
  plugins: ["prettier", "vue-a11y"],
  // add your custom rules here
  rules: {
    "no-unused-vars": 0,
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue-a11y/accessible-emoji": 0,
    "vue-a11y/click-events-have-key-events": 0,
    "prefer-template": "error",
  },
};
