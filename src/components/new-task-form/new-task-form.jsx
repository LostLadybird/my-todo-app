import { Component } from 'react';
import { PropTypes } from 'prop-types';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  state = {
    label: '',
  };

  typeText = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  submitTask = (event) => {
    event.preventDefault();
    if (this.state.label.trim()) {
      this.props.onItemAdded(this.state.label);
    }
    this.setState({
      label: '',
    });
  };

  render() {
    const { placeholder } = this.props;
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.submitTask}>
          <input
            className="new-todo"
            placeholder={placeholder}
            autoFocus
            onChange={this.typeText}
            value={this.state.label}
          ></input>
        </form>
      </header>
    );
  }
}

NewTaskForm.defaultProps = {
  placeholder: 'What needs to be done?',
};

NewTaskForm.propTypes = {
  placeholder: PropTypes.string,
  onItemAdded: PropTypes.func.isRequired,
};
