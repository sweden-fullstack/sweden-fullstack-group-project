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
	oauthClientId: process.env.OAUTH_CLIENT_ID!,
	oauthClientSecret: process.env.OAUTH_CLIENT_SECRET!,
	oauthSuccessRedirect: process.env.OAUTH_SUCCESS_REDIRECT!,
	oauthFailureRedirect: process.env.OAUTH_FAILURE_REDIRECT!,
	jwtSecret: process.env.JWT_SECRET!,
	frontendServer: process.env.FRONTEND_SERVER
		? process.env.FRONTEND_SERVER
		: "http://localhost:5173/",
}

export default envConfig
