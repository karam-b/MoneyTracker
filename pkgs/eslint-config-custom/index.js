module.exports = {
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  extends: [
    'turbo',
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/no-namespace': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    semi: ['warn', 'never'],
    quotes: ['warn', 'single'],
    '@typescript-eslint/ban-ts-comment': 'off'
  }
}
