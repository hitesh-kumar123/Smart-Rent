module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["react-app", "react-app/jest"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
  },
};
