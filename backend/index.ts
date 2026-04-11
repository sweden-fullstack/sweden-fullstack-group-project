import express from "express"
import usersRouter from "./src/modules/user/user.routes"

const app = express()

app.use(express.json())

app.get("/api", (_req, res) => {
	res.json({ message: "API working" })
})

app.listen(3000, () => console.log("Server running on: localhost:3000"))

app.use("/users", usersRouter)

export default app
