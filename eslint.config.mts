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
    extends: [
      'next/core-web-vitals',
      'plugin:import/recommended',
      'next/typescript',
      'plugin:prettier/recommended',
      'prettier'
    ],
    rules: {
      'import/order': [
        'error',
        {
          'alphabetize': {
            caseInsensitive: true,
            order: 'asc'
          },
          'groups': [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type'
          ],
          'newlines-between': 'always',
          'pathGroups': [
            {
              group: 'internal',
              pattern: '@/**',
              position: 'before'
            }
          ],
          'pathGroupsExcludedImportTypes': ['builtin']
        }
      ],
      'comma-dangle': ['error', 'never'],
      'no-this-before-super': 'error',
      'no-unused-vars': 'error',
      'no-use-before-define': [
        'error',
        { functions: false, classes: true, variables: true }
      ],
      'object-curly-spacing': ['error', 'always'],
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'sort-keys-fix/sort-keys-fix': 'warn',
      'camelCase': ['error', { properties: 'always' }],
      'dot-notation': 'error',
      'func-name-matching': 'error',
      'blocked-scoped-var': 'error',
      'max-lines-per-function': [
        'error',
        20,
        { skipBlankLines: true, skipComments: true }
      ],
      'prefer-const': ['error', { 'destructuring': 'any' }],
      'prefer-object-spread': 'error',
      'no-duplicate-imports': 'error',
      'no-self-compare': 'error',
      'no-useless-assignment': 'error',
      'capitalized-comments': ['error', 'always', { ignorePattern: 'pragma' }],
      'max-params': ['error', { max: 2, countVoidThis: false }],
      'max-statements': [
        'error',
        { max: 12 },
        { ignoreTopLevelFunctions: false }
      ],
      'complexity': ['error', 2],
      'new-cap:': [
        'error',
        { newIsCap: true, capIsNew: false, properties: true }
      ],
      "eslint.format.enable": "error",
      'prettier/prettier': [
        'error',
        {
          arrowParens: 'avoid',
          bracketSameLine: false,
          bracketSpacing: true,
          endOfLine: 'lf',
          experimentalOperatorPosition: 'start',
          experimentalTernaries: true,
          jsxSingleQuote: true,
          printWidth: 80,
          proseWrap: 'always',
          quoteProps: 'consistent',
          semi: false,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'none'
        }
      ]
    }
  })
]

export default eslintConfig
