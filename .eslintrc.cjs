module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'plugin:jsx-a11y/recommended', 'prettier', 'plugin:@next/next/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y', 'react-hooks'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    // Relax accessibility rules that would require large UI overhauls now.
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
  'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-tabindex': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    // Make some React rules warnings to reduce noise during setup.
    'react/no-unescaped-entities': 'warn',
    'react/no-unknown-property': 'warn',

    // Keep important hooks rules enabled
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
