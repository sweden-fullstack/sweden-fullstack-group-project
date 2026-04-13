import { defineConfig } from "@chakra-ui/react"

/**
 * @see https://chakra-ui.com/docs/theming/colors
 */
const config = defineConfig({
	theme: {
		semanticTokens: {
			colors: {
				bg: { value: "#16171D" },
			},
		},
		tokens: {
			colors: {},
		},
	},
})

export const chakraThemeColor: "light" | "dark" | undefined = "dark"

export default config
