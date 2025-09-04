// Path prettier.config.mts

import { type Config } from 'prettier'

const config: Config = {
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
  trailingComma: 'none',
  objectWrapping: 'always'
}

export default config
