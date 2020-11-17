module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    "at-rule-no-unknown": null,
    "no-descending-specificity": null,
    "no-duplicate-selectors": null,
  },
  ignoreFiles: ["static/themes/*.css"],
};
