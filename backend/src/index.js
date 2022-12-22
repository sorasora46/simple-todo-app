import express from "express"
import { MongoClient } from "mongodb"

const app = express()
const PORT = 8000

const mongoClient = new MongoClient("mongodb://localhost:27017/todo_list")
mongoClient.connect((err, res) => {
  if (err) throw err
  console.log("connected to database")
  res.close()
})

app.get("/", (req, res) => {
  res.send("hi")
})

app.listen(PORT, console.log(`Server running at PORT:${PORT}`))