  import { useState } from "react";
  import "./App.css";

  function App() {
    const [todos, setTodos] = useState([
    ]);

    const [inputValue, setInputValue] = useState("");

    const [showCompleted, setShowCompleted] = useState(false);

    const handleAddTask = (e) => {
      e.preventDefault();
      if (inputValue.trim() === "") return;

      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setInputValue("");
    };

    const handleDeleteTask = (idToDelete) => {
      const updateTodos = todos.filter((todo) => todo.id !== idToDelete);
      setTodos(updateTodos);
    };

    const handleToggleComplete = (idToToggle) => {
      setTodos(
        todos.map((todo) =>
          todo.id === idToToggle ? { ...todo, completed: !todo.completed } : todo
        )
      );
    };

    const incompleteTasks = todos.filter((todo) => !todo.completed);
    const completedTasks = todos.filter((todo) => todo.completed);

    return (
      <div className="App">
        <h1>Daftar Tugas</h1>
        {/* Form menambah tugas */}
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Tambah tugas baru..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Tambah</button>
        </form>

        {/* Daftar Tugas */}
        <ul>
          {incompleteTasks.map((todo) => (
            <li key={todo.id}>
              <input type="checkbox" checked={todo.completed} onChange={() => handleToggleComplete(todo.id)}/>
              <span>{todo.text}</span>
            </li>
          ))}
        </ul>
        {incompleteTasks.length === 0 && <p className="task-placeholder" />}

        <div className="completed-area">
          <h2
            className="toggle-header"
            onClick={() => setShowCompleted(!showCompleted)}
          >
            <span>Tugas Selesai ({completedTasks.length})</span>
            <span>{showCompleted ? 'Sembunyikan' : "Tampilkan"}</span>
          </h2>

          {showCompleted && (
            <ul>
              {completedTasks.map((todo) => (
                <li key={todo.id}>
                  <span className="completed-text">{todo.text}</span>
                  <button onClick={() => handleDeleteTask(todo.id)}>Hapus</button>
                </li>
              ))}
              {completedTasks.length === 0 && 
                <p className="task-placeholder">
                  Belum ada tugas yang diselesaikan.
                </p>
              }
            </ul>
          )}
        </div>
      </div>
    );
  }

  export default App;
