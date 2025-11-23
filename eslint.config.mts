import { FlatCompat } from '@eslint/eslintrc'
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname
})
const eslintConfig = [
  ...compat.config({
    env: {
      browser: true,
      es2024: true,
      node: true
    },
    extends: ['next/core-web-vitals', 'prettier'],
    parserOptions: {
      ecmaVersion: 'latest',
      project: ['./tsconfig.json'],
      sourceType: 'module'
    },
    rules: {
      'block-scoped-var': 'error',
      'comma-dangle': ['error', 'never'],
      'dot-notation': 'error',
      'func-name-matching': 'error',
      'max-params': ['error', 6],
      'new-cap': [
        'error',
        { capIsNew: false, newIsCap: true, properties: true }
      ],
      'no-self-compare': 'error',
      'no-this-before-super': 'error',
      'no-useless-assignment': 'error',
      'quotes': ['error', 'single']
    }
  })
]

export default eslintConfig
