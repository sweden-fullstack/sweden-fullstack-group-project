import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import dotenv from "dotenv"

const envPath = path.resolve(__dirname, "../.env")
dotenv.config({ path: envPath, override: true, quiet: true })

const frontendPort = process.env.FRONTEND_PORT
	? parseInt(process.env.FRONTEND_PORT)
	: 5173
const backendServer = process.env.BACKEND_SERVER || "http://localhost:3000/"

export default defineConfig({
	define: {
		"import.meta.env.FRONTEND_PORT": JSON.stringify(frontendPort),
		"import.meta.env.BACKEND_SERVER": JSON.stringify(backendServer),
	},
	server: {
		port: frontendPort,
		proxy: {
			"/api": {
				target: `http://${backendServer}`,
				changeOrigin: true,
			},
		},
	},
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@/shared": path.resolve(__dirname, "../shared"),
		},
	},
})
