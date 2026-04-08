import pluginJs from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import { defineConfig, globalIgnores } from "eslint/config"
import pluginReact from "eslint-plugin-react"
import eslintConfigPrettier from "eslint-config-prettier"

export default defineConfig([
	globalIgnores(["dist", "frontend/dist", "backend/dist"]),
	eslintConfigPrettier,
	{
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
		ignores: ["frontend/components/ui"],
		extends: [
			pluginJs.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs.flat.recommended,
			pluginReact.configs.flat.recommended,
			reactRefresh.configs.vite,
		],
		languageOptions: {
			globals: globals.browser,
		},
		rules: {
			"react/jsx-uses-react": "off",
			"react/react-in-jsx-scope": "off",
		},
		settings: {
			react: {
				version: "detect",
			},
		},
	},
])
