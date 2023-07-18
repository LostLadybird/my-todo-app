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
    timerOn: false,
    timerMin: this.props.todo.minutes,
    timerSec: this.props.todo.seconds,
    totalSeconds: 0,
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

  timerDone = () => {
    this.setState({
      timerOn: false,
      timerMin: 0,
      timerSec: 0,
    });
  };

  timerOn = () => {
    let totalTime = this.convertFn();
    if (this.state.timerOn === false) {
      return;
    }
    if (totalTime === 0) {
      this.timerDone();
    }
    let minutes = Math.floor(totalTime / 60);
    let seconds = totalTime % 60;
    this.props.OnUpdatedTime(this.props.todo.id, minutes, seconds);
    this.setState({
      totalSeconds: totalTime - 1,
      timerMin: minutes,
      timerSec: seconds,
    });
  };

  convertFn = () => {
    const { timerMin, timerSec } = this.state;
    let sum = timerMin * 60 + timerSec * 1;
    let res = sum - 1;
    return res;
  };

  timerPlay = () => {
    this.setState({
      timerOn: true,
    });
  };

  timerPaused = () => {
    this.setState({
      timerOn: false,
      totalSeconds: this.state.totalSeconds,
    });
  };

  componentDidMount() {
    this.timer = setInterval(() => this.timerOn(), 1000);
  }

  componentWillUnmount() {
    this.timerPaused();
    clearInterval(this.timer);
  }

  render() {
    const { todo, deleteTask, ToggleCompleted } = this.props;
    const { task, id, completed, date } = todo;
    const { timerMin, timerSec } = this.state;

    let btnClass = cx({
      '': true,
      completed: completed,
      editing: this.state.editing,
    });

    let timerTime = `${timerMin} : ${timerSec}`;
    let timer =
      timerMin !== '' || timerSec !== '' ? (
        <span className="timer">
          <button className="icon icon-play" onClick={this.timerPlay}></button>
          <button className="icon icon-pause" onClick={this.timerPaused}></button>
          <span className="timer-time">{timerTime}</span>
        </span>
      ) : (
        ''
      );

    return (
      <li className={btnClass}>
        <div className="view">
          <input className="toggle" type="checkbox" id={id} onClick={ToggleCompleted}></input>
          <label>
            <span className="description">
              {task}
              {timer}
            </span>
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
  OnUpdatedTime: () => {},
};

Task.propTypes = {
  todo: PropTypes.shape({
    task: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.number,
    date: PropTypes.instanceOf(Date),
    minutes: PropTypes.string,
    seconds: PropTypes.string,
  }),
  editTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  ToggleCompleted: PropTypes.func.isRequired,
  OnUpdatedTime: PropTypes.func.isRequired,
};
