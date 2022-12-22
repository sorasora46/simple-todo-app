import express from "express";
import cors from "cors";
import { addTodo, getTodos, editTodo, deleteTodo } from "./mongoFunction.js";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

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
      res.status(200).json({ added: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ err: err });
    });
});

app.put("/edit", (req, res) => {
  const { id_string, todo, isDone } = req.body;
  editTodo(id_string, todo, isDone)
    .then((result) => {
      console.log("Updated");
      res.status(200).json({ updated: result.acknowledged });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ err: err });
    });
});

app.delete("/delete", (req, res) => {
  const { id_string } = req.body;
  deleteTodo(id_string)
    .then((result) => {
      console.log("Deleted");
      res.status(200).json({ deleted: result.acknowledged });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ err: err });
    });
});

app.listen(PORT, console.log(`Server running at PORT:${PORT}`));
