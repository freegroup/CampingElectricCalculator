module.exports = {
  root: true,
  env: {
    node: true,
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': 0,
    'space-before-function-paren':0,
    'no-useless-constructor': 0,
    'quotes': 0,
    'no-trailing-spaces':0,
    'space-in-parens': 0,
    'dot-notation': 0,
    'no-lone-blocks': 0,
    'new-cap' :0,
    'comma-dangle': 0,
    'comma-style': 0,
    'indent': 0
  },
};
