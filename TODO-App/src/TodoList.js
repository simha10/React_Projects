import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function TodoList() {

  function getStoreTodos() {
    let data = localStorage.getItem("todos");
    try {
      let json = JSON.parse(data);
      if (Array.isArray(json)) {
        return json;
      }
    } catch (e) {
      console.error("Error parsing JSON from localStorage:", e);
    }
    return [];
  }

  const [todos, setTodos] = useState(getStoreTodos());

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleSubmit(event) {
    event.preventDefault();

    let task = event.target.task.value;

    if (!task) {
      alert("Please provide a valid text");
      return;
    }

    setTodos([...todos, { task: task, completed: false }]);

    event.target.reset();
  }

  function changeTaskStatus(index) {
    let newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  }

  function deleteTask(index) {
    let newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <div className="container my-5">
      <div
        className="mx-auto rounded border p-4"
        style={{ width: "600px", backgroundColor: "skyblue", borderColor: "blue", borderWidth: "2px" }}
      >
        <h1 className="text-white text-center mb-5">My Todo List</h1>

        <form className="d-flex" onSubmit={handleSubmit}>
          <input className="form-control me-2" placeholder="New Task" name="task" />
          <button className="btn btn-outline-success" type="submit">
            Add
          </button>
        </form>

        {todos.map((todo, index) => (
          <div
            key={index}
            className="rounded mt-4 p-2 d-flex todo-item"
            style={{
              backgroundColor: todo.completed ? "green" : "pink",
              border: "1px solid white",
              transition: "background-color 0.3s ease, transform 0.3s ease"
            }}
          >
            <div className="me-auto">{todo.task}</div>
            <div>
              <i
                className={`h5 me-2 ${todo.completed ? "bi bi-file-check" : "bi bi-square"}`}
                style={{ cursor: "pointer" }}
                onClick={() => changeTaskStatus(index)}
              ></i>
              <i
                className="bi bi-trash text-danger h5"
                style={{ cursor: "pointer" }}
                onClick={() => deleteTask(index)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
