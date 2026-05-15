import express from "express"
import usersRouter from "@/modules/user/user.routes"
import authRouter from "@/modules/auth/auth.routes"
import db from "@/config/database"
import umzug from "./lib/umzugMigrations"
import envConfig from "./config/env"
import cors from "cors"
import ErrorHandler from "./middlewares/errorHandler"
import cookieParser from "cookie-parser"

// Ping the db to check if it can connect
await db.execute("SELECT 1")

// Run db migrations
await umzug.up()

const app = express()

app.use(
	cors({
		origin: envConfig.frontendServer.slice(0, -1),
		credentials: true,
	}),
)

app.use(cookieParser())
app.use(express.json())

app.listen(envConfig.port, () =>
	console.log(`Server running on: localhost:${envConfig.port}`),
)

app.use("/user", usersRouter)
app.use("/auth", authRouter)

app.use(ErrorHandler.handle)

export default app
