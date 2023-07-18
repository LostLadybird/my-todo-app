import { Component } from 'react';
import { PropTypes } from 'prop-types';

import Task from '../task';
import './task-list.css';

export default class TaskList extends Component {
  render() {
    const { todos, onDeleted, ToggleCompleted, editTask, OnUpdatedTime } = this.props;
    const elements = todos.map((item) => {
      return (
        <Task
          key={item.id}
          todo={item}
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
  }
}

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
