module.exports = {
  extends: 'eslint:recommended',
  root: true,
  env: {
    browser: true,
    es6: true
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'arrow-parens': ['warn', 'as-needed'],
    'comma-dangle': ['warn', 'never'],
    quotes: ['warn', 'single']
  }
};
