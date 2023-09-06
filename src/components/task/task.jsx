import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import classNames from 'classnames/bind';

import styles from '../task-list/task-list.css';

import './task.css';

let cx = classNames.bind(styles);

const Task = ({ todo, totalSec, deleteTask, ToggleCompleted, editTask, OnUpdatedTime }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('');
  const [timerOnState, setTimerOnState] = useState(false);
  const [timer, setTimer] = useState(totalSec);

  const editButton = () => {
    console.log('edit');
    setEditing(true);
    setValue(todo.task);
  };

  const submitTask = (event) => {
    event.preventDefault();

    editTask(todo.id, value);
    setValue('');
    setEditing(false);
    return;
  };

  const typeText = (event) => {
    setValue(event.target.value);
    return;
  };

  const timerOn = () => {
    setTimer((timer) => timer - 1);
  };

  const timerPaused = () => {
    setTimerOnState(false);
  };

  const timerPlay = () => {
    setTimerOnState(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerOnState) timerOn();
      if (timer === 0) setTimerOnState(false);
    }, 1000);
    return () => {
      OnUpdatedTime(todo.id, timer);
      clearInterval(interval);
    };
  }, [timerOnState, timer]);

  let btnClass = cx({
    '': true,
    completed: todo.completed,
    editing: editing,
  });

  const timerSet = () => {
    return `${Math.floor(timer / 60)
      .toString()
      .padStart(2, '0')}:${Math.floor(timer % 60)
      .toString()
      .padStart(2, '0')}`;
  };

  const timerDiv = () => {
    if (timer < 0) return '00:00';
    return <span className="timer-time">{timerSet()}</span>;
  };

  return (
    <li className={btnClass}>
      <div className="view">
        <input className="toggle" type="checkbox" id={todo.id} onClick={ToggleCompleted}></input>
        <label>
          <span className="description">
            {todo.task}
            <span className="timer">
              <button className="icon icon-play" onClick={timerPlay}></button>
              <button className="icon icon-pause" onClick={timerPaused}></button>
              <span className="timer-time">{timerDiv()}</span>
            </span>
          </span>
          <span className="created">{`created ${formatDistanceToNow(todo.date, {
            addSuffix: true,
            includeSeconds: true,
            locale: enUS,
          })}`}</span>
        </label>
        <button className="icon icon-edit" onClick={editButton}></button>
        <button className="icon icon-destroy" onClick={() => deleteTask(todo.id)}></button>
      </div>
      {editing && (
        <form onSubmit={submitTask}>
          <input className="edit" type="text" value={value} onChange={typeText}></input>
        </form>
      )}
    </li>
  );
};

export default Task;

Task.defaultProps = {
  todo: {},
  totalSec: 0,
  editTask: () => {},
  deleteTask: () => {},
  ToggleCompleted: () => {},
  OnUpdatedTime: () => {},
};

Task.propTypes = {
  todo: PropTypes.objectOf(PropTypes.any),
  totalSec: PropTypes.number,
  editTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  ToggleCompleted: PropTypes.func.isRequired,
  OnUpdatedTime: PropTypes.func.isRequired,
};
