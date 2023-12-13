import js from '@eslint/js';
import * as typescriptEslintParser from '@typescript-eslint/parser';
import * as typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';

export default [
  js.configs.recommended,
  {
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      typescript: typescriptEslintPlugin,
    },
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 'latest',
      },
      sourceType: 'module',
    },
  },
];
