module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'plugin:prettier/recommended', // prettier와 충돌 방지
  ],
  plugins: ['prettier'],
  ignorePatterns: ['dist', '.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': ['error'],
  },
};