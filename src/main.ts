import express from "express"
import routes from "./routes"
import "./db/client"

const app = express()

app.use(express.json())

app.use(routes)
const port = process.env.PORT
console.log("DATABASE_URL:", process.env.DATABASE_URL)
app.listen(port, () => {
	console.log("Server is running on port " + port)
})
