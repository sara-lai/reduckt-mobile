module.exports = [
  ...require("eslint-config-expo/flat"),
  require("eslint-plugin-prettier/recommended"),
  {
    rules: {
      "no-console": "off",
      "react-native/no-inline-styles": "warn",
    },
  },
];
