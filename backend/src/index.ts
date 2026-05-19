import express from "express"
import usersRouter from "@/modules/user/user.routes"
import authRouter from "@/modules/auth/auth.routes"
import db from "@/config/database"
import umzug from "./lib/umzugMigrations"
import envConfig from "./config/env"
import cors from "cors"
import ErrorHandler from "./middlewares/errorHandler"
import cookieParser from "cookie-parser"
import sectionUserRouter from "./modules/section-user/sectionUser.routes"
import sectionRouter from "./modules/section/section.routes"

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
app.use(
	express.json({
		reviver: (_key, value) => {
			if (typeof value !== "string") return value

			// YYYY-MM-DD format (2026-01-01)
			const isSimpleDate = /^\d{4}-\d{2}-\d{2}$/.test(value)

			// ISO format (2026-01-01T00:00:00.000Z)
			const isISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/.test(
				value,
			)

			if (isSimpleDate || isISO) {
				const date = new Date(value)
				if (!isNaN(date.getTime())) {
					return date
				}
			}

			return value
		},
	}),
)

app.listen(envConfig.port, () =>
	console.log(`Server running on: localhost:${envConfig.port}`),
)

app.get("/health", (_req, res) => {
	res.status(200).json({ status: "ok" })
})

app.use("/user", usersRouter)
app.use("/auth", authRouter)
app.use("/section", sectionRouter)
app.use("/section_user", sectionUserRouter)

app.use(ErrorHandler.handle)

export default app
