import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "@/app"
import { ChakraProvider, defaultConfig, createSystem } from "@chakra-ui/react"
import config from "@/config/chakraConfig"

const system = createSystem(defaultConfig, config)

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ChakraProvider value={system}>
			<App />
		</ChakraProvider>
	</StrictMode>,
)
