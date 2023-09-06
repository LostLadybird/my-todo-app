import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import './new-task-form.css';

const NewTaskForm = ({ onItemAdded }) => {
  const [label, setLabel] = useState('');
  const [timerMinutes, setTimerMinutes] = useState('');
  const [timerSeconds, setTimerSeconds] = useState('');

  const submitTask = (event) => {
    event.preventDefault();
    if (label.trim()) {
      onItemAdded(label, timerMinutes, timerSeconds);
    }
    setLabel('');
    setTimerMinutes('');
    setTimerSeconds('');
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form
        onSubmit={(e) => {
          submitTask(e);
          return false;
        }}
        className="new-todo-form"
      >
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={(e) => setLabel(e.target.value)}
          value={label}
        ></input>
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          type="number"
          min={0}
          autoFocus
          value={timerMinutes}
          onChange={(e) => setTimerMinutes(e.target.value)}
          required
        ></input>
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          type="number"
          min={0}
          max={59}
          autoFocus
          value={timerSeconds}
          onChange={(e) => setTimerSeconds(e.target.value)}
          required
        ></input>
        <button type="submit"></button>
      </form>
    </header>
  );
};

export default NewTaskForm;

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
};

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};
