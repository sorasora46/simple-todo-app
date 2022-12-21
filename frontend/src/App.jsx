import "./style.css";

function App() {
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div className="w-[50%] h-[50vh] border rounded-xl py-10 px-5 shadow-lg transition ease-in-out delay-150 hover:scale-105 hover:shadow-2xl">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-2xl text-center">To Do App</h1>
          <div>
            <form>
              <input type="text" placeholder="Enter a task here" />
              <button>SAVE</button>
            </form>
            <button>GET TASKS</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
