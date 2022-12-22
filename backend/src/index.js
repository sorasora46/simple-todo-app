import express from "express"

const app = express()
const PORT = 8000

app.get("/", (req, res) => {
  res.send("hi")
})

app.listen(PORT, console.log(`Server running at PORT:${PORT}`))