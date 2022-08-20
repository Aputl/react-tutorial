import { useState, useRef } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";


function App() {
  const [todos, setTodos] = useState([ ]);
  const todoNameRef = useRef();

  // タスク追加
  const handleAddTodo = () => {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, {id: uuidv4(), name: name, completed: false}];
    });
    todoNameRef.current.value = null;
};

// チェックボックス オン・オフ
const toggleTodo = (id) => {
  const newTodo = [...todos];
  const todo = newTodo.find((todo) => todo.id === id );
  todo.completed = !todo.completed;
  setTodos(newTodo);
};

// チェックボックスオンのタスクを削除
const handleClear = () => {
  const newTodo = todos.filter((todo) => !todo.completed);
  setTodos(newTodo);
};

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type="text" ref={todoNameRef} />
      <button onClick={handleAddTodo}>Add task</button>
      <button onClick={handleClear}>Del task</button>
      <div>task:{todos.filter((todo) => !todo.completed).length}</div>
    </>
  );
}

export default App;
