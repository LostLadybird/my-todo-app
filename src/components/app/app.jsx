import { Component } from 'react';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.css';

export default class App extends Component {
  maxId = 1;
  constructor() {
    super();
    this.state = {
      todoData: [],
      filter: 'all', // 'all', 'active', 'completed'
    };
  }

  addItem = (value, min, sec) => {
    const data = {
      task: value,
      completed: false,
      id: this.maxId++,
      date: new Date(),
      minutes: min,
      seconds: sec,
    };
    this.setState(({ todoData }) => ({ todoData: [...todoData, data] }));
  };

  updatedTime = (timerId, min, sec) => {
    this.setState(({ todoData }) => {
      const taskIndex = todoData.findIndex((el) => el.id === timerId);
      let updatedData = {
        ...todoData[taskIndex],
        minutes: min,
        seconds: sec,
      };
      const newTask = [...todoData.slice(0, taskIndex), updatedData, ...todoData.slice(taskIndex + 1)];
      return {
        todoData: newTask,
      };
    });
  };

  deleteTask = (deletedId) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter(({ id }) => id !== deletedId),
    }));
  };

  toggleProperty(arr, id, propName) {
    const index = arr.findIndex((el) => el.id === id);
    // 1. update object
    const oldItem = arr[index];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    // 2. construct new array
    const before = arr.slice(0, index);
    const after = arr.slice(index + 1);

    return [...before, newItem, ...after];
  }

  ToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'completed'),
      };
    });
  };

  editTask = (editingId, text) => {
    this.setState(({ todoData }) => {
      todoData.map((item) => {
        if (editingId === item.id) {
          item.task = text;
        }
        return item;
      });
    });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((item) => !item.completed),
    }));
  };

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.completed);
      case 'completed':
        return items.filter((item) => item.completed);
      default:
        return items;
    }
  }

  onFilterChange = (value) => {
    this.setState({ filter: value });
  };

  render() {
    const { todoData, filter } = this.state;
    const visibleItems = this.filter(todoData, filter);
    const doneCount = todoData.filter((el) => el.completed).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} />
        <TaskList
          todos={visibleItems}
          onDeleted={this.deleteTask}
          ToggleCompleted={this.ToggleCompleted}
          editTask={this.editTask}
          OnUpdatedTime={this.updatedTime}
        />
        <Footer
          todoCount={todoCount}
          clearCompleted={this.clearCompleted}
          onFilterChange={this.onFilterChange}
          filter={filter}
        />
      </div>
    );
  }
}
