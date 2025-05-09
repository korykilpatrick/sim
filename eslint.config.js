// eslint.config.js
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  // 1. Global Ignores
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      'public/',
      'vite-env.d.ts',
      '*.config.js', // e.g., postcss.config.js, tailwind.config.js
      '*.config.ts', // e.g., vite.config.ts
      '.claude/',
      'coverage/',
      'server/dist/', // Ignore server build output from server/tsconfig.json
    ],
  },

  // 2. ESLint JavaScript Recommended Rules (apply globally)
  js.configs.recommended,

  // NEW Configuration for SHARED/TYPES files (TypeScript, type-aware)
  {
    files: ['shared/types/**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json', // Or a more specific tsconfig if available
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...tseslint.configs.recommendedTypeChecked.rules,
      ...tseslint.configs.stylisticTypeChecked.rules,
      // Add any specific rules for shared type definitions here
      // For example, you might want to be stricter about explicit any
      // '@typescript-eslint/no-explicit-any': 'error',
    },
  },

  // 3. Configuration for SRC files (React, TypeScript, type-aware)
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json', // Points to the root tsconfig.json for src files
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Start with typescript-eslint recommended rules for type-checked projects
      ...tseslint.configs.recommendedTypeChecked.rules,
      ...tseslint.configs.stylisticTypeChecked.rules,
      // Add React specific recommended rules
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      // Customizations & Overrides
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      // Add other src specific rules or overrides here
      // e.g., "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  // 4. Configuration for SERVER files (Node.js, TypeScript, type-aware)
  {
    files: ['server/**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './server/tsconfig.json', // Points to the server-specific tsconfig.json
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      // Start with typescript-eslint recommended rules for type-checked projects
      ...tseslint.configs.recommendedTypeChecked.rules,
      ...tseslint.configs.stylisticTypeChecked.rules,
      // Add other server specific rules or overrides here
      // e.g., "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  // 5. Prettier Configuration (must be last to override formatting rules from other configs)
  eslintConfigPrettier,

  // 6. Global Custom Rules (apply if not overridden by more specific file blocks)
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      'no-unused-vars': 'off', // Disable base rule, prefer @typescript-eslint/no-unused-vars
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'all', // Keep checking caught errors...
          caughtErrorsIgnorePattern: '^_', // ...unless they start with _
        },
      ],
      // You might want to temporarily ease rules like no-explicit-any during refactoring:
      // "@typescript-eslint/no-explicit-any": ["warn", { "fixToUnknown": true }],
    },
  },
];
