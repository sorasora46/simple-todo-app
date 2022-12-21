import { useState } from "react";
import "./style.css";

function App() {
  const [task, setTask] = useState()

  function handleSubmit(event) {
    alert("Task submitted")
    event.preventDefault()
    event.stopPropagation()
  }

  function handleChange(event) {
    setTask(event.target.value)
  }

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div className="w-[50%] h-[50vh] border rounded-xl py-10 px-5 shadow-lg transition ease-in-out delay-150 hover:scale-105 hover:shadow-2xl">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-2xl text-center">To Do App</h1>
          <div>
            <form onSubmit={(event) => handleSubmit(event)}>
              <input required onChange={(event) => handleChange(event)} value={task} type="text" placeholder="Enter a task here" />
              <button type="submit">SAVE</button>
            </form>
            <button>GET TASKS</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
