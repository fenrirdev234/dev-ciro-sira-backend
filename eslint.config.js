import pluginJs from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],

    plugins: {
      "simple-import-sort": simpleImportSort,
    },
  },
  {
    ignores: ["dist", "node_modules", "build", "package.json", "package-lock.json", "public", ".husky"],
  },
  {
    languageOptions: {
      globals: globals.browser,

      /* parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      }, */
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    files: ["**/*.test.ts", "**/*.spec.ts"],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      "@typescript-eslint/unbound-method": "off",
    },
  },
];

/* export default tseslint.config(
  {
    ignores: ["dist", "node_modules", "build", "package.json", "package-lock.json", "public", ".husky"],
  },
  pluginJs.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      "perfectionist/sort-imports": "error",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  perfectionist.configs["recommended-natural"],
  simpleImportSort,
);
 */
