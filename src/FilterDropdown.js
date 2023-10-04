import React from 'react';

const FilterDropdown = ({ filterValue, setFilterValue }) => {
  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  return (
    <div>
      <label htmlFor="filter">Filter: </label>
      <select id="filter" value={filterValue} onChange={handleFilterChange}>
        <option value="all">All Tasks</option>
        <option value="completed">Completed Tasks</option>
        <option value="not-completed">Not Completed Tasks</option>
      </select>
    </div>
  );
};

export default FilterDropdown;
