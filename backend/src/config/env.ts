import { configDotenv } from "dotenv"
import path from "path"

function init() {
	configDotenv({
		path: path.resolve(process.cwd(), "../.env"),
	})
}

init()

const envConfig = {
	port: process.env.BACKEND_PORT ? parseInt(process.env.BACKEND_PORT) : 3000,
	databaseHost: process.env.DB_HOST ? process.env.DB_HOST : "localhost",
	database: process.env.DB_DATABASE
		? process.env.DB_DATABASE
		: "sweden-backend",
	username: process.env.DB_USERNAME
		? process.env.DB_USERNAME
		: "sweden-backend",
	password: process.env.DB_PASSWORD
		? process.env.DB_PASSWORD
		: "sweden-backend",
}

export default envConfig
