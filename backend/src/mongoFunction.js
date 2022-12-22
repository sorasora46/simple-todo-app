import { MongoClient } from "mongodb";
// https://stackoverflow.com/questions/65384754/error-err-module-not-found-cannot-find-module
// problem with exporting module

const mongoClient = new MongoClient("mongodb://localhost:27017/");

export const getTodos = async () => {
  try {
    await mongoClient.connect();
    const result = await mongoClient.db("local").collection("todo_list").find();
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
      .db("local")
      .collection("todo_list")
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
