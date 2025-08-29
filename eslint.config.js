import tseslint from "typescript-eslint";
import globals from 'globals';
import reactPlugin from "eslint-plugin-react";
import reactHookPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import prettierPlugin from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import importPlugin from "eslint-plugin-import";
import * as js from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      "dist",
      "node_modules",
    ]
  },
  {
    extends: [js.configs.recommended, tseslint.configs.recommended],
    files: ['src/**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      }
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHookPlugin,
      "react-refresh": reactRefreshPlugin,
      prettier: prettierPlugin,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImportsPlugin,
      import: importPlugin,
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHookPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-vars": "error",
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
      "@typescript-eslint/no-use-before-define": ["error"],
      "@typescript-eslint/ban-ts-comment": "off",
      "no-case-declarations": "off",
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "no-restricted-imports": ["error", { patterns: ["./../*"] }],
      "@typescript-eslint/naming-convention": [
        "error",
        { selector: ["class"], format: ["PascalCase"] },
        { selector: ["interface"], prefix: ["I"], format: ["PascalCase"] },
      ],
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_"
        }
      ],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react", "^[a-z]"],
            ["^@?\\w"],
            ["^@na?\\w"],
            ["^\\u0000", "^\\.\\.(?!/?$)", "^\\.\\./?$", "^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["^.+\\.s?css$"]
          ]
        }
      ],
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error"
    },
  },
)
