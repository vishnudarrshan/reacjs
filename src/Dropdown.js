import React from 'react';

const Dropdown = ({ filter, setFilter }) => {
  return (
    <div>
      <label htmlFor="filter">Filter by:</label>
      <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All Tasks</option>
        <option value="completed">Completed Tasks</option>
        <option value="not-completed">Not Completed Tasks</option>
      </select>
    </div>
  );
};

export default Dropdown;
