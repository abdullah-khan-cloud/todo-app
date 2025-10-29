import { useState } from 'react'
import './App.css'
import type {TodoType} from './types/todo';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [todoList, setTodoList] = useLocalStorage<TodoType[]>('todos', []);
  const [value, setValue] = useState<string>('');

  const onAddTodo = (e: React.FormEvent) => {
    e.preventDefault();

    if (!value.trim()) return;

    const newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    }

    setTodoList((prev) => [...prev, newTodo]);

    setValue('');
  }

  const onCompletedChange = (id: number) => {
    setTodoList(todoList.map((todo) => 
      todo.id === id ? {...todo, completed: !todo.completed}: todo)
    );
  }

  const onDeleteTodo = (id: number) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  }

  return (
      <div>
        <h2>Todo List App</h2>
        <form onSubmit={onAddTodo}>
          <input id="todo-input" type="text" placeholder='Add a new todo' value={value} onChange={(e) => setValue(e.target.value)}/>
          <button type="submit">Add</button>
        </form>
        {todoList.length > 0 && 
          <ul>{todoList.map((todo) => (
            <li key={todo.id}>
              <input 
                id={`todo-${todo.id}`}
                type="checkbox" 
                checked={todo.completed}
                onChange={() => onCompletedChange(todo.id)}
                />
              <label htmlFor={`todo-${todo.id}`}>{todo.title}</label>
              <button onClick={() => onDeleteTodo(todo.id)}>Remove</button>
            </li>
          ))}
          </ul>}
      </div>
  )
}

export default App
