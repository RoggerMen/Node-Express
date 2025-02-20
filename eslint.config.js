import js from "@eslint/js";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  prettier,
  {
    languageOptions: {
      ecmaVersion: 2018
    },
    env: {
      es6: true,
      node: true,
      jest: true
    },
    rules: {
      "no-console": "warn"
    }
  }
];
