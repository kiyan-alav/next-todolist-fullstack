import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [todos, setTodos] = useState([]);
  const [singleTodo, setSingleTodo] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const router = useRouter();

  const fetchTodos = async function (selectedFilter = filter) {
    console.log(selectedFilter);

    const response = await fetch(`/api/todos?filter=${selectedFilter}`);
    if (response.status === 200) {
      const data = await response.json();
      setTodos(data);
    }
  };

  const handleFilterChange = async function (e) {
    setFilter(e.target.value);
    await fetchTodos(e.target.value);
  };

  const handleAddTodo = async function (e) {
    e.preventDefault();
    const newTodo = {
      title: title,
      status: false,
    };

    await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTitle("");
    fetchTodos();
  };

  const handleCompleteTodo = async function (todoId) {
    const response = await fetch(`/api/todos/status/${todoId}`);
    if (response.status === 200) {
      fetchTodos();
    }
  };

  const getSingleTodo = async function (todoId) {
    const response = await fetch(`/api/todos/${todoId}`);
    if (response.status === 200) {
      const data = await response.json();
      setSingleTodo(data);
      setTitle(data.title);
    }
  };

  const handleEditTodo = async function (todoId, e) {
    e.preventDefault();
    const response = await fetch(`/api/todos/${todoId}`, {
      method: "PUT",
      body: JSON.stringify({
        title: title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      setTitle("");
      fetchTodos();
    }
  };

  const handleDeleteTodo = async function (todoId) {
    const response = await fetch(`/api/todos/${todoId}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      fetchTodos();
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <header>
        <h1>To do List</h1>
      </header>
      <form>
        <input
          type="text"
          className="todo-inputs"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="todo-button"
          onClick={(e) => {
            if (isEdit) {
              handleEditTodo(singleTodo._id, e);
            } else {
              handleAddTodo(e);
            }
          }}
        >
          Add
        </button>
        <div className="select">
          <select
            name="todos"
            className="filter-todos"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="ALL">All</option>
            <option value="COMPLETED">Completed</option>
            <option value="UNCOMPLETED">Uncompleted</option>
          </select>
        </div>
      </form>
      <div className="todo-container">
        <ul className="todo-list">
          {todos.map((todo) => (
            <div
              className={`todo ${todo.status ? "completed" : ""}`}
              key={todo._id}
            >
              <li className="todo-item">{todo.title}</li>
              <button
                className="complete-btn"
                onClick={() => handleCompleteTodo(todo._id)}
              >
                Done
              </button>
              <button
                className="trash-btn"
                onClick={() => handleDeleteTodo(todo._id)}
              >
                Delete
              </button>
              <button
                className="edit-btn"
                onClick={() => {
                  setIsEdit(true);
                  getSingleTodo(todo._id);
                }}
              >
                Edit
              </button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}
