import React, { useState } from 'react';

const Task = ({ task, onDeleteTask, onEditTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleSave = () => {
    onEditTask({ ...task, title: newTitle });
    setIsEditing(false);
  };

  return (
    <div className="task">
      {isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={handleSave}>Сохранить</button>
        </>
      ) : (
        <>
          <span>{task.title}</span>
          <button onClick={() => setIsEditing(true)}>Изменить</button>
          <button onClick={onDeleteTask}>Удалить</button>
        </>
      )}
    </div>
  );
};

export default Task;
