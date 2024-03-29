import express, { NextFunction } from "express"
import { HttpLocales, HttpLocalesContext, __ } from "../../dist/index.js"

await HttpLocales.load()
const app = express()

app.use((_, __, next: NextFunction) => {
	HttpLocalesContext.run("en", function() {
		next()
	})
})
app.get("/", (_, res) => {
	res.send(__("hello"))
})

app.listen(3000)
