module.exports = {
  extends: 'eslint:recommended',
  plugins: ['plugin:vue/vue3-recommended', 'eslint:recommended'],
  env: {
    es2021: true,
    browser: true
  },
  rules: {
    'arrow-parens': ['warn', 'as-needed'],
    'comma-dangle': ['warn', 'never'],
    quotes: ['warn', 'single'],
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_'
      }
    ]
  }
};
