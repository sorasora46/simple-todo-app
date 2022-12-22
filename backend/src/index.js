import express from "express";
import cors from "cors"
import { addTodo, getTodos } from "./mongoFunction.js";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000"
}))

app.get("/get", (_, res) => {
  getTodos()
    .then((result) => {
      res.status(200).json({ todo_list: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ err: err });
    });
});

app.post("/add", (req, res) => {
  addTodo(req.body.todo)
    .then((result) => {
      console.log("Added");
      res.status(200).json({ added: result.acknowledged });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ err: err });
    });
});

app.listen(PORT, console.log(`Server running at PORT:${PORT}`));
