import React from 'react';
import Todo from './Todo'; // Assuming Todo.js is in the same directory

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {todos.map(todo => (
        <div key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
          <Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
        </div>
      ))}
    </>
  );
};

export default TodoList;

