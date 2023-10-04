import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const LineItem = ({ item, handleCheck, handleDelete }) => {
  const isDueToday = item.dueDate === getCurrentDate();

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
            ? { textDecoration: 'line-through', fontSize: '1.2rem' }
            : { fontSize: '1.2rem' }
        }
        onDoubleClick={() => handleCheck(item.id)}
      >
        {item.item}
      </label>
      <button
        className={`due-date ${isDueToday ? 'due-today' : ''}`}
        disabled
      >
        {formatDueDate(item.dueDate)}
      </button>
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

function getCurrentDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();

  return yyyy + '-' + mm + '-' + dd;
}

function formatDueDate(dueDate) {
  // Format the due date as needed (e.g., 'yyyy-mm-dd')
  return dueDate;
}
