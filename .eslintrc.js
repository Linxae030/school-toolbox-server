module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb-base",
    "plugin:prettier/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "prettier/prettier": [
      "warn",
      {
        endOfLine: "crlf",
        singleQuote: false,
      },
    ],
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars":"off",
    "import/no-extraneous-dependencies": "off",
    "import/prefer-default-export": "off",
    "import/no-unresolved": "off",
    "import/extensions":"off",
    "class-methods-use-this": "off",
    "no-useless-constructor": "warn",
    "no-unused-vars": "off",
    "no-useless-constructor": "off",
    "no-empty-function": "off",
    "no-console":"off"
  },
};
