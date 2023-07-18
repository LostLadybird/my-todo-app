import { Component } from 'react';
import { PropTypes } from 'prop-types';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  state = {
    label: '',
    timerMinutes: '',
    timerSeconds: '',
  };

  typeText = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  submitTask = (event) => {
    event.preventDefault();
    if (this.state.label.trim()) {
      this.props.onItemAdded(this.state.label, this.state.timerMinutes, this.state.timerSeconds);
    }
    this.setState({
      label: '',
      timerMinutes: '',
      timerSeconds: '',
    });
  };

  typeMinutes = (event) => {
    this.setState({
      timerMinutes: event.target.value,
    });
  };

  typeSeconds = (event) => {
    this.setState({
      timerSeconds: event.target.value,
    });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form
          onSubmit={(e) => {
            this.submitTask(e);
            return false;
          }}
          className="new-todo-form"
        >
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={this.typeText}
            value={this.state.label}
          ></input>
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            type="number"
            autoFocus
            value={this.state.timerMinutes}
            onChange={this.typeMinutes}
          ></input>
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            type="number"
            autoFocus
            value={this.state.timerSeconds}
            onChange={this.typeSeconds}
          ></input>
          <button type="submit"></button>
        </form>
      </header>
    );
  }
}

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
};

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};
