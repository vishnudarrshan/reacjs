import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const LineItem = ({ item, handleCheck, handleDelete }) => {
  // Function to check if due date is today
  const isDueDateToday = () => {
    const today = new Date().toISOString().split('T')[0];
    return item.dueDate === today;
  };

  return (
    <li className="item" key={item.id}>
      <input
        type="checkbox"
        onChange={() => handleCheck(item.id)}
        checked={item.checked}
      />
      <label
        style={
          item.checked
            ? { textDecoration: 'line-through' }
            : isDueDateToday()
            ? { color: 'red' }
            : null
        }
        onDoubleClick={() => handleCheck(item.id)}
      >
        {item.item}
        {item.dueDate && (
          <span
            className="dueDate"
            style={isDueDateToday() ? { color: 'red' } : null}
          >
            {item.dueDate}
          </span>
        )}
      </label>
      <FaTrashAlt
        role="button"
        tabIndex="0"
        onClick={() => handleDelete(item.id)}
        aria-label={`Delete ${item.item}`}
      />
    </li>
  );
};

export default LineItem;
