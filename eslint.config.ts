import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default [
  // 무시할 경로
  {
    ignores: ['dist', 'coverage', 'node_modules'],
  },

  // 자바스크립트 권장 규칙
  js.configs.recommended,

  // 타입스크립트 권장 규칙
  ...tseslint.configs.recommended,

  // 타입스크립트 파서 & 환경 옵션
  {
    files: ['**/*.ts', '**/*.mts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      // 원하면 규칙 커스터마이즈 추가
      // "@typescript-eslint/no-explicit-any": "off",
    },
  },

  // prettier 충돌 제거
  prettier,
];
