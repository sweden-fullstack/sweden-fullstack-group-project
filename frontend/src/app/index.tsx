import { Theme } from "@chakra-ui/react"
import AppRouter from "./router"
import { chakraThemeColor } from "@/config/chakraConfig"

export default function App() {
	return (
		<Theme appearance={chakraThemeColor}>
			<AppRouter />
		</Theme>
	)
}
