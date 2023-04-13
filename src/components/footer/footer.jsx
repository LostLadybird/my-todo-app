import { Component } from 'react';
import { PropTypes } from 'prop-types';

import TasksFilter from '../tasks-filter';
import './footer.css';

export default class Footer extends Component {
  render() {
    const { todoCount, filter, clearCompleted, onFilterChange } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{todoCount} items left</span>
        <TasksFilter filter={filter} onFilterChange={onFilterChange} />
        <button className="clear-completed" onClick={() => clearCompleted()}>
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.defaultProps = {
  filter: 'All',
  todoCount: 0,
};

Footer.propTypes = {
  todoCount: PropTypes.number,
  filter: PropTypes.string,
  clearCompleted: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
