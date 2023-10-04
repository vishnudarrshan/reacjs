import React, { useState } from 'react';

const AddItem = ({ onAdd }) => {
  const [newItem, setNewItem] = useState('');
  const [dueDate, setDueDate] = useState(''); // State for due date

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newItem.trim()) {
      return;
    }

    // Include due date in the item
    onAdd({ item: newItem, dueDate: dueDate, checked: false });

    // Clear input fields
    setNewItem('');
    setDueDate('');
  };

  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor="addItem">Add Item</label>
      <input
        autoFocus
        id="addItem"
        type="text"
        placeholder="Add Item"
        required
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <input
        id="dueDate"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit" aria-label="Add Item">
        Add
      </button>
    </form>
  );
};

export default AddItem;
