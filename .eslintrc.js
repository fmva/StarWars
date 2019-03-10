module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  rules: {
    'class-methods-use-this': 'off',
    'prettier/prettier': 'error',
    'curly': ['error', 'all'],
    'no-console': 'off',
    'linebreak-style': ['error', 'windows'],
    'no-implicit-dependencies': [true, 'dev']
  },
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true
  },
  plugins: ['prettier']
};
