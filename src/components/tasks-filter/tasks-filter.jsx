import React from 'react';
import { PropTypes } from 'prop-types';
import './tasks-filter.css';

const TasksFilter = ({ filters, onFilterChange }) => {
  let btns = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  const buttons = btns.map(({ name, label }) => {
    const isActive = filters === name;
    const clazz = isActive ? 'selected' : null;
    return (
      <li key={name}>
        <button className={clazz} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{buttons}</ul>;
};

export default TasksFilter;

TasksFilter.defaultProps = {
  filters: 'all',
  onFilterChange: () => {},
};

TasksFilter.propTypes = {
  filters: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
};

// export default class TasksFilter extends Component {
//   buttons = [
//     { name: 'all', label: 'All' },
//     { name: 'active', label: 'Active' },
//     { name: 'completed', label: 'Completed' },
//   ];
//   render() {
//     const { filter, onFilterChange } = this.props;

//     const buttons = this.buttons.map(({ name, label }) => {
//       const isActive = filter === name;
//       const clazz = isActive ? 'selected' : null;
//       return (
//         <li key={name}>
//           <button className={clazz} onClick={() => onFilterChange(name)}>
//             {label}
//           </button>
//         </li>
//       );
//     });

//     return <ul className="filters">{buttons}</ul>;
//   }
// }
