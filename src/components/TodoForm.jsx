import React, { useState, useEffect } from 'react';

const TodoForm = ({ addTodo, editingTodo, updateTodo }) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    if (editingTodo) {
      setInput(editingTodo.text);
    } else {
      setInput('');
    }
  }, [editingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) return;

    if (editingTodo) {
      updateTodo(editingTodo.id, input);
    } else {
      addTodo(input);
    }
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Добавьте.."
      />
      <button type="submit">{editingTodo ? 'обновить' : 'добавить'}</button>
    </form>
  );
};

export default TodoForm;
