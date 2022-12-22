import express from "express";
import { addTodo } from "./mongoFunction.js";

const app = express();
const PORT = 8000;

app.use(express.json())

app.post("/add", async (req, res) => {
  addTodo(req.body.todo)
    .then((result) => {
      console.log("Added");
      res.status(200).json({added: result.acknowledged})
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ err: err });
    });
});

app.listen(PORT, console.log(`Server running at PORT:${PORT}`));
