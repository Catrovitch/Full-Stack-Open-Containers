// Todo.js
import React from 'react';

const Todo = ({ todo, deleteTodo, completeTodo }) => {
  return (
    <div>
      <input type="checkbox" checked={todo.done} onChange={() => completeTodo(todo)} />
      <span>{todo.text}</span>
      <button onClick={() => deleteTodo(todo)}>Delete</button>
    </div>
  );
};

export default Todo;