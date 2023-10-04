import React, { useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const AddItem = ({ newItem, setNewItem, onAdd }) => {
  const inputRef = useRef();
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newItem, dueDate);
    setNewItem('');
    setDueDate('');
    inputRef.current.focus();
  };

  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor="addItem">Add Task</label>
      <input
        autoFocus
        ref={inputRef}
        id="addItem"
        type="text"
        placeholder="Add Task"
        required
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <input
        id="dueDate"
        type="date"
        placeholder="Due Date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit" aria-label="Add Item">
        <FaPlus />
      </button>
    </form>
  );
};

export default AddItem;
