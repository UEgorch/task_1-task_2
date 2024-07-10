import React from 'react';
import Task from './Task';
import './List.css';

const List = ({ list, tasks, onAddTask, onDeleteTask, onEditTask, onDeleteList }) => {
  const handleAddTask = () => {
    const title = prompt('Enter task title:');
    if (title) {
      onAddTask(list.id, { id: Date.now(), title, createdAt: new Date(), dueDate: null, status: 'Pending' });
    }
  };

  return (
    <div className="list">
      <div className="list-header">
        <h2>{list.title}</h2>
        <button onClick={() => onDeleteList(list.id)}>Удалить лист</button>
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className={`task ${new Date(task.dueDate) < new Date() ? 'task-overdue' : ''}`}>
            <Task
              task={task}
              onDeleteTask={() => onDeleteTask(list.id, task.id)}
              onEditTask={(newTask) => onEditTask(list.id, task.id, newTask)}
            />
          </div>
        ))}
      </div>
      <button onClick={handleAddTask}>Добавить задание</button>
    </div>
  );
};

export default List;
