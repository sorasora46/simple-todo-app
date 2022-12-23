import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState();

  function Button({
    type,
    children,
    bg_color,
    shadow_color,
    className,
    onClick,
  }) {
    return (
      <button
        type={type}
        className={
          generateButtonStyle(bg_color, shadow_color) + " " + className
        }
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  function DeleteButton({ onClick }) {
    return (
      <Button
        type="button"
        bg_color="bg-red-600"
        shadow_color="shadow-red-600/50"
        onClick={onClick}
      >
        DELETE
      </Button>
    );
  }

  function generateButtonStyle(bg_color, shadow_color) {
    return `rounded text-white px-6 py-2 shadow-md ${bg_color} ${shadow_color}`;
  }

  function handleSubmit(event) {
    axios.post("http://localhost:8000/add", {
      todo: task,
    });
    setTask("");
    window.location.reload();
    event.preventDefault();
    event.stopPropagation();
  }

  function handleChange(event) {
    setTask(event.target.value);
  }

  function handleDelete(_id) {
    axios.delete("http://localhost:8000/delete", {
      data: {
        id_string: _id,
      },
    });
    window.location.reload();
  }

  function handleFinished(_id, todo) {
    axios.put("http://localhost:8000/edit", {
      id_string: _id,
      todo: todo,
      isDone: true,
    });
    window.location.reload();
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
      <div className="w-[60%] h-[50vh] border rounded-xl py-10 px-10 shadow-lg bg-white">
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
              <Button
                type="submit"
                bg_color="bg-blue-600"
                shadow_color="shadow-blue-600/50"
              >
                SAVE
              </Button>
            </form>
            <Button
              type="button"
              bg_color="bg-yellow-500"
              shadow_color="shadow-yellow-500/50"
            >
              GET TASKS
            </Button>
          </div>
          {/* https://stackoverflow.com/questions/4185814/fixed-table-cell-width about table-layout: fixed */}
          <div className="table-wrapper w-[100%] h-52 overflow-y-auto">
            <table className="w-[100%] text-left table-fixed">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Todo Item</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {taskList?.map((task, index) => {
                  return (
                    <tr key={index} className="hover:bg-green-400/75">
                      <td>{index + 1}</td>
                      {/* https://stackoverflow.com/questions/9789723/css-text-overflow-in-a-table-cell about setting text-overflow in table cell */}
                      <td className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
                        {task.todo}
                      </td>
                      <td>{task.isDone ? "Done" : "In Progress"}</td>
                      <td>
                        {task.isDone ? (
                          <>
                            <DeleteButton
                              onClick={() => handleDelete(task._id)}
                            />
                          </>
                        ) : (
                          <div className="flex gap-4">
                            <DeleteButton
                              onClick={() => handleDelete(task._id)}
                            />
                            <Button
                              type="button"
                              bg_color="bg-green-600"
                              shadow_color="shadow-green-600/50"
                              onClick={() =>
                                handleFinished(task._id, task.todo)
                              }
                            >
                              FINISHED
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
