// src/todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lists: [],
  tasks: {},
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addList: (state, action) => {
      state.lists.push({ id: Date.now(), title: action.payload });
    },
    deleteList: (state, action) => {
      state.lists = state.lists.filter(list => list.id !== action.payload);
      delete state.tasks[action.payload];
    },
    addTask: (state, action) => {
      const { listId, task } = action.payload;
      if (!state.tasks[listId]) {
        state.tasks[listId] = [];
      }
      state.tasks[listId].push({ id: Date.now(), ...task });
    },
    deleteTask: (state, action) => {
      const { listId, taskId } = action.payload;
      state.tasks[listId] = state.tasks[listId].filter(task => task.id !== taskId);
    },
    editTask: (state, action) => {
      const { listId, taskId, newTask } = action.payload;
      const taskIndex = state.tasks[listId].findIndex(task => task.id === taskId);
      state.tasks[listId][taskIndex] = { ...state.tasks[listId][taskIndex], ...newTask };
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setLists: (state, action) => {
      state.lists = action.payload;
    }
  },
});

export const { addList, deleteList, addTask, deleteTask, editTask, setTasks, setLists } = todoSlice.actions;

export default todoSlice.reducer;
