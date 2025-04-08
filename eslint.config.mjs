import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
    {files: ["**/*.{js,mjs,cjs,jsx}"]},
    {languageOptions: { globals: globals.browser }},
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    {rules: {"indent": ["error", 4]}},
    // disable react props validation
    {rules: {"react/prop-types": "off"}},
    // disable react import
    {rules: {"react/react-in-jsx-scope": "off"}},
];
