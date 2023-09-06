import React from 'react';
import { PropTypes } from 'prop-types';

import TasksFilter from '../tasks-filter';
import './footer.css';

const Footer = ({ todoCount, filters, clearCompleted, onFilterChange }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TasksFilter filters={filters} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={() => clearCompleted()}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;

Footer.defaultProps = {
  filters: 'all',
  todoCount: 0,
  clearCompleted: () => {},
  onFilterChange: () => {},
};

Footer.propTypes = {
  todoCount: PropTypes.number,
  filters: PropTypes.string,
  clearCompleted: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
