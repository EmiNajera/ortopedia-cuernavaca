const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({ baseDirectory: __dirname });

module.exports = [
  ...compat.extend('plugin:react/recommended'),
  ...compat.extend('plugin:jsx-a11y/recommended'),
  ...compat.extend('plugin:@next/next/recommended'),
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
    },
    plugins: { react: {}, 'jsx-a11y': {} },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
];
