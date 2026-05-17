import express from "express"
import usersRouter from "@/modules/user/user.routes"
import sectionRouter from "@/modules/section/section.routes"
import db from "@/config/database"
import umzug from "./lib/umzugMigrations"
import envConfig from "./config/env"
import cors from "cors"
import ErrorHandler from "./middlewares/errorHandler"

// Ping the db to check if it can connect
await db.execute("SELECT 1")

// Run db migrations
await umzug.up()

const app = express()

app.use(cors())
app.use(express.json())

app.listen(envConfig.port, () =>
	console.log(`Server running on: localhost:${envConfig.port}`),
)

app.get("/health", (_req, res) => {
	res.status(200).json({ status: "ok" })
})

app.use("/user", usersRouter)
app.use("/section", sectionRouter)

app.use(ErrorHandler.handle)

export default app
