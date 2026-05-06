import express from "express"
import usersRouter from "@/modules/user/user.routes"
import authRouter from "@/modules/auth/auth.routes"
import db from "@/config/database"
import umzug from "./lib/umzugMigrations"
import envConfig from "./config/env"
import cors from "cors"
import ErrorHandler from "./middlewares/errorHandler"
import { JWT } from "./utils/jtw"

// Ping the db to check if it can connect
await db.execute("SELECT 1")

const jwt = JWT.generate("", "student")
JWT.verify(jwt, "")

// Run db migrations
await umzug.up()

const app = express()

app.use(cors())
app.use(express.json())

app.listen(envConfig.port, () =>
	console.log(`Server running on: localhost:${envConfig.port}`),
)

app.use("/user", usersRouter)
app.use("/auth", authRouter)

app.use(ErrorHandler.handle)

export default app
