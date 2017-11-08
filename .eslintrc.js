module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    strict: [ 0 ],
    semi: [ 2 ],
    eqeqeq: [ 2 ],
    'no-undef': [ 2 ],
    'no-implicit-globals': [ 0 ],
    'no-unreachable': [ 2 ]
  }
};
