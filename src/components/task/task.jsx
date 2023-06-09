import { Component } from 'react';
import { PropTypes } from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import classNames from 'classnames/bind';

import styles from '../task-list/task-list.css';

import './task.css';

let cx = classNames.bind(styles);

export default class Task extends Component {
  state = {
    editing: false,
    value: '',
  };

  submitTask = (event) => {
    event.preventDefault();

    const {
      editTask,
      todo: { id },
    } = this.props;

    editTask(id, this.state.value);

    this.setState({
      value: '',
    });
    this.setState({ editing: false });
  };

  typeText = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  render() {
    const { todo, deleteTask, ToggleCompleted } = this.props;
    const { task, id, completed, date } = todo;

    let btnClass = cx({
      '': true,
      completed: completed,
      editing: this.state.editing,
    });

    return (
      <li className={btnClass}>
        <div className="view">
          <input className="toggle" type="checkbox" id={id} onClick={ToggleCompleted}></input>
          <label>
            <span className="description">{task}</span>
            <span className="created">{`created ${formatDistanceToNow(date, {
              addSuffix: true,
              includeSeconds: true,
              locale: enUS,
            })}`}</span>
          </label>
          <button
            className="icon icon-edit"
            onClick={() =>
              this.setState(({ editing }) => ({
                editing: !editing,
                value: this.props.todo.task,
              }))
            }
          ></button>
          <button className="icon icon-destroy" onClick={() => deleteTask(id)}></button>
        </div>
        {this.state.editing && (
          <form onSubmit={this.submitTask}>
            <input className="edit" type="text" value={this.state.value} onChange={this.typeText}></input>
          </form>
        )}
      </li>
    );
  }
}

Task.defaultProps = {
  todo: {},
  editTask: () => {},
  deleteTask: () => {},
  ToggleCompleted: () => {},
};

Task.propTypes = {
  todo: PropTypes.shape({
    task: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.number,
    date: PropTypes.instanceOf(Date),
  }),
  editTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  ToggleCompleted: PropTypes.func.isRequired,
};
