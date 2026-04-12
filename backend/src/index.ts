import express from "express"
import usersRouter from "@/modules/user/user.routes"
import db from "@/config/database"
import umzug from "./libs/umzugMigrations"

// Ping the db to check if it can connect
await db.execute("SELECT 1")

// Run db migrations
await umzug.up()

const app = express()

app.use(express.json())

app.get("/api", (_req, res) => {
	res.json({ message: "API working" })
})

app.listen(3000, () => console.log("Server running on: localhost:3000"))

app.use("/users", usersRouter)

export default app
