import { MongoClient, ObjectId } from "mongodb";
// https://stackoverflow.com/questions/65384754/error-err-module-not-found-cannot-find-module
// problem with exporting module

const mongoClient = new MongoClient("mongodb://localhost:27017/");

export const getTodos = async () => {
  try {
    await mongoClient.connect();
    const result = await mongoClient
      .db("simple-todo-app-db")
      .collection("tasks")
      .find({})
      .toArray();
    await mongoClient.close();
    return result;
  } catch (err) {
    return err;
  }
};

export const addTodo = async (todo) => {
  try {
    await mongoClient.connect();
    const result = await mongoClient
      .db("simple-todo-app-db")
      .collection("tasks")
      .insertOne({
        todo: todo,
        isDone: false,
        date: new Date(),
      });
    await mongoClient.close();
    return result;
  } catch (err) {
    return err;
  }
};

export const editTodo = async (id_string, todo, isDone) => {
  try {
    await mongoClient.connect();
    const result = await mongoClient
      .db("simple-todo-app-db")
      .collection("tasks")
      .updateOne(
        {
          _id: new ObjectId(id_string),
        },
        {
          $set: {
            todo: todo,
            isDone: isDone,
          },
        }
      );
    await mongoClient.close();
    return result;
  } catch (err) {
    return err;
  }
};

export const deleteTodo = async (id_string) => {
  try {
    await mongoClient.connect();
    const result = await mongoClient
      .db("simple-todo-app-db")
      .collection("tasks")
      .deleteOne({
        _id: new ObjectId(id_string),
      });
    await mongoClient.close();
    return result;
  } catch (err) {
    return err;
  }
};
