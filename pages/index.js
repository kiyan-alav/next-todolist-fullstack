import {useEffect, useState} from "react";
import {fetch} from "next/dist/compiled/@edge-runtime/primitives";

export default function Home() {
    const [todo, setTodo] = useState("");
    const [filter, setFilter] = useState("ALL");
    const [todos, setTodos] = useState([])

    const fetchTodos = async function (selectedFilter = filter) {
        const response = await fetch(`/api/todos?filter=${selectedFilter}`)
        if (response.status === 200) {
            const data = await response.json()
            setTodos(data)
        }
    }

    const handleFilterChange = async function (e) {
        setFilter(e.target.value)
        await fetchTodos(e.target.value)
    }

    const handleAddTodo = async function (e) {
        e.preventDefault();
        const newTodo = {
            title: todo,
            status: false
        }

        await fetch("/api/todos", {
            method: "POST",
            body: JSON.stringify(newTodo),
            headers: {
                "Content-Type": "application/json",
            }
        })

        setTodo("");
        fetchTodos()

    };

    const handleCompleteTodo = async function (todoId) {
        const response = await fetch(`/api/todos/status/${todoId}`)
        if (response.status === 200) {
            fetchTodos()
        }
    }

    useEffect(() => {
        fetchTodos()
    }, [])

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
                    {
                        todos.map(todo => <div className={`todo ${todo.status ? "completed" : ""}`} key={todo.id}>
                            <li className="todo-item">{todo.title}</li>
                            <button className="complete-btn" onClick={() => handleCompleteTodo(todo.id)}>
                                Done
                            </button>
                            <button className="trash-btn">
                                Delete
                            </button>
                            <button className="edit-btn">
                                Edit
                            </button>
                        </div>)
                    }
                </ul>
            </div>
        </>
    );
}
