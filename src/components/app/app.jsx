import React, { useState } from 'react';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.css';

let maxId = 1;

const App = () => {
  const [todoData, setTodoData] = useState([]);
  const [filters, setFilters] = useState('all'); // 'all', 'active', 'completed'

  const addItem = (value, min, sec) => {
    let totalSec = parseInt(min || 0) * 60 + parseInt(sec || 0) * 1;
    let data = {
      task: value,
      completed: false,
      id: maxId++,
      date: new Date(),
      timer: totalSec,
    };
    setTodoData([...todoData, data]);
    return;
  };

  const updatedTime = (timerId, sec) => {
    setTodoData((todoData) => {
      const taskIndex = todoData.findIndex((el) => el.id === timerId);
      let updatedData = {
        ...todoData[taskIndex],
        timer: sec,
      };
      const newTask = [...todoData.slice(0, taskIndex), updatedData, ...todoData.slice(taskIndex + 1)];
      return newTask;
    });
  };

  const deleteTask = (deletedId) => {
    setTodoData(todoData.filter(({ id }) => id !== deletedId));
    return;
  };

  const toggleProperty = (arr, id, propName) => {
    const index = arr.findIndex((el) => el.id === id);
    // 1. update object
    const oldItem = arr[index];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    // 2. construct new array
    const before = arr.slice(0, index);
    const after = arr.slice(index + 1);

    return [...before, newItem, ...after];
  };

  const ToggleCompleted = (id) => {
    setTodoData(() => {
      return toggleProperty(todoData, id, 'completed');
    });
    return;
  };

  const editTask = (editingId, text) => {
    setTodoData((todoData) => {
      const editedItems = todoData.map((item) => {
        if (editingId === item.id) {
          item.task = text;
        }
        return item;
      });
      return editedItems;
    });
    return;
  };

  const clearCompleted = () => {
    setTodoData(todoData.filter((item) => !item.completed));
    return;
  };

  const filterFn = (items, filters) => {
    switch (filters) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.completed);
      case 'completed':
        return items.filter((item) => item.completed);
      default:
        return items;
    }
  };

  const onFilterChange = (value) => {
    setFilters(value);
    return;
  };

  const visibleItems = filterFn(todoData, filters);
  const todoCount = todoData.filter((el) => !el.completed).length;
  return (
    <div className="todoapp">
      <NewTaskForm onItemAdded={addItem} />
      <TaskList
        todos={visibleItems}
        onDeleted={deleteTask}
        ToggleCompleted={ToggleCompleted}
        editTask={editTask}
        OnUpdatedTime={updatedTime}
      />
      <Footer todoCount={todoCount} clearCompleted={clearCompleted} onFilterChange={onFilterChange} filters={filters} />
    </div>
  );
};

export default App;
