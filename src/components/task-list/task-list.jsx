import React from 'react';
import { PropTypes } from 'prop-types';

import Task from '../task';
import './task-list.css';

const TaskList = ({ todos, onDeleted, ToggleCompleted, editTask, OnUpdatedTime }) => {
  const elements = todos.map((item) => {
    return (
      <Task
        key={item.id}
        todo={item}
        totalSec={item.timer}
        deleteTask={onDeleted}
        editTask={editTask}
        ToggleCompleted={() => ToggleCompleted(item.id)}
        OnUpdatedTime={OnUpdatedTime}
      />
    );
  });

  return (
    <section className="main">
      <ul className="todo-list">{elements}</ul>
    </section>
  );
};

export default TaskList;

TaskList.defaultProps = {
  todos: {},
  onDeleted: () => {},
  ToggleCompleted: () => {},
  editTask: () => {},
  OnUpdatedTime: () => {},
};

TaskList.propTypes = {
  todos: PropTypes.any,
  onDeleted: PropTypes.func.isRequired,
  ToggleCompleted: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  OnUpdatedTime: PropTypes.func.isRequired,
};
