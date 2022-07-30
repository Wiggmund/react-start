module.exports = {
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "env": {
    "browser": true,
    "es2021": true,
  },
  "extends": [
    "plugin:react/recommended",
    "google",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
    },
    "ecmaVersion": "latest",
    "sourceType": "module",
  },
  "plugins": [
    "react",
    "@typescript-eslint",
  ],
  "rules": {
    "linebreak-style": ["error", "windows"],
    "react/react-in-jsx-scope": "off",
    "indent": ["error", "tab"],
    "no-tabs": "off"
  },
};
