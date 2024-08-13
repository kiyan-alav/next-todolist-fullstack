import { useState } from "react";

export default function Home() {
  const [todo, setTodo] = useState("");
  const [filter, setFilter] = useState("all");

  const handleAddTodo = function (e) {
    e.preventDefault();
  };

  return (
    <>
      <header>
        <h1>To do List</h1>
      </header>
      <form>
        <input
          type="text"
          className="todo-inputs"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button className="todo-button" onClick={handleAddTodo}>
          add
        </button>
        <div className="select">
          <select
            name="todos"
            className="filter-todos"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
      </form>
      <div className="todo-container">
        <ul className="todo-list"></ul>
      </div>
    </>
  );
}
