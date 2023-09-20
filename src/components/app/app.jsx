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
    const data = {
      task: value,
      completed: false,
      id: maxId++,
      timer: totalSec,
    };
    setTodoData((todoData) => [...todoData, data]);
  };

  const updatedTime = (timerId, sec) => {
    const index = todoData.findIndex((el) => el.id === timerId);
    if (index >= 0) {
      todoData[index].timer = sec;
    }
  };

  const deleteTask = (deletedId) => {
    setTodoData((todoData) => todoData.filter((el) => el.id !== deletedId));
  };

  const ToggleCompleted = (id) => {
    setTodoData((todoData) => {
      const index = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[index];
      const newItem = { ...oldItem, completed: !oldItem.completed };
      return [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];
    });
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
  };

  const clearCompleted = () => {
    setTodoData((todoData) => todoData.filter((item) => !item.completed));
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
