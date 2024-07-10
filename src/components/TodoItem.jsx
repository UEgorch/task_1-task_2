import React from 'react';

const TodoItem = ({ todo, toggleComplete, deleteTodo, editTodo }) => {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={() => deleteTodo(todo.id)}>удалить</button>
      <button onClick={() => editTodo(todo.id)}>изменить</button>
    </div>
  );
};

export default TodoItem;
