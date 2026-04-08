import express from "express"
const app = express()

app.use(express.json())

app.get("/api", (req, res) => {
	res.json({ message: "API working" })
})

app.listen(3000, () => console.log("Server running"))
