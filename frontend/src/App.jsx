import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

function App() {
  const [task, setTask] = useState();
  const [taskList, setTaskList] = useState();

  function handleSubmit(event) {
    alert("Task submitted");
    event.preventDefault();
    event.stopPropagation();
  }

  function handleChange(event) {
    setTask(event.target.value);
  }

  function fetchData() {
    axios
      .get("http://localhost:8000/get")
      .then((res) => {
        setTaskList(res.data.todo_list);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-[100vh] flex justify-center items-center bg-gray-200">
      <div className="w-[50%] h-[50vh] border rounded-xl py-10 px-10 shadow-lg transition ease-in-out delay-150 hover:scale-105 hover:shadow-2xl bg-white">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-2xl text-center">To Do App</h1>
          <div className="w-[100%] flex justify-center gap-8 my-10">
            <form onSubmit={(event) => handleSubmit(event)}>
              <input
                required
                onChange={(event) => handleChange(event)}
                value={task}
                type="text"
                placeholder="Enter a task here"
                className="mr-8 border rounded focus:outline-none focus:ring focus:border-blue-500 focus:rounded px-6 py-2"
              />
              <button
                type="submit"
                className="rounded text-white bg-blue-600 px-6 py-2 shadow-md shadow-blue-600/50"
              >
                SAVE
              </button>
            </form>
            <button className="rounded text-white bg-yellow-500 px-6 py-2 shadow-md shadow-yellow-500/50">
              GET TASKS
            </button>
          </div>
          <table className="w-[100%] text-left">
            <thead>
              <tr>
                <th>No.</th>
                <th>Todo Item</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
              </tr>
              <tr>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
