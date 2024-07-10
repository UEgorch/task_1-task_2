import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addList, deleteList, addTask, deleteTask, editTask, setTasks, setLists } from './todoSlice';
import List from './List';
import Search from './Search';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const lists = useSelector(state => state.todos.lists);
  const tasks = useSelector(state => state.todos.tasks);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedLists = JSON.parse(localStorage.getItem('lists'));
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (savedLists) {
      dispatch(setLists(savedLists));
    }

    if (savedTasks) {
      dispatch(setTasks(savedTasks));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddList = (title) => {
    dispatch(addList(title));
  };

  const handleDeleteList = (listId) => {
    dispatch(deleteList(listId));
  };

  const handleAddTask = (listId, task) => {
    dispatch(addTask({ listId, task }));
  };

  const handleDeleteTask = (listId, taskId) => {
    dispatch(deleteTask({ listId, taskId }));
  };

  const handleEditTask = (listId, taskId, newTask) => {
    dispatch(editTask({ listId, taskId, newTask }));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredTasks = (tasks, term) => {
    if (!term) return tasks;
    return tasks.filter(task => task.title.toLowerCase().includes(term.toLowerCase()));
  };

  return (
    <div className="app">
      <h1>ToDo List</h1>
      <input
        type="text"
        className="add-list-input"
        placeholder="Создайте лист через enter"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddList(e.target.value);
            e.target.value = '';
          }
        }}
      />
      <Search onSearch={handleSearch} />
      <div className="lists">
        {lists.map((list) => (
          <div key={list.id} className="list-container">
            <List
              list={list}
              tasks={filteredTasks(tasks[list.id] || [], searchTerm)}
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
              onDeleteList={handleDeleteList}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
