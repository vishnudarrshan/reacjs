import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Content from './Content';
import Footer from './Footer';
import apiRequest from './apiRequest';
import FilterDropdown from './FilterDropdown';

function App() {
  const API_URL = 'http://localhost:3500/items';
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [filterValue, setFilterValue] = useState('all');
  const [undoHistory, setUndoHistory] = useState([]); // Store the undo history
  const [redoHistory, setRedoHistory] = useState([]); // Store the redo history

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Data not received');
        const listItems = await response.json();
        setItems(listItems);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setisLoading(false);
      }
    };

    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);
  }, []);

  const addItem = async (item, dueDate) => {
    // Store the current state in undo history
    setUndoHistory([...undoHistory, items]);

    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item, dueDate };
    const listItems = [...items, myNewItem];
    setItems(listItems);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(myNewItem),
    };

    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  };

  const handleCheck = async (id) => {
    // Store the current state in undo history
    setUndoHistory([...undoHistory, items]);

    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);

    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };

    const result = await apiRequest(API_URL + `/${id}`, updateOptions);

    if (result) setFetchError(result);
  };

  const handleDelete = async (id) => {
    // Store the current state in undo history
    setUndoHistory([...undoHistory, items]);

    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOptions = {
      method: 'DELETE',
    };

    const result = await apiRequest(API_URL + `/${id}`, deleteOptions);
    if (result) setFetchError(result);
  };

  // Implement undo function
  const undo = () => {
    if (undoHistory.length === 0) return; // No history to undo
    const previousState = undoHistory.pop();
    setRedoHistory([...redoHistory, items]);
    setItems(previousState);
  };

  // Implement redo function
  const redo = () => {
    if (redoHistory.length === 0) return; // No history to redo
    const nextState = redoHistory.pop();
    setUndoHistory([...undoHistory, items]);
    setItems(nextState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  };

  const filteredItems = items.filter((item) => {
    if (filterValue === 'completed') {
      return item.checked;
    } else if (filterValue === 'not-completed') {
      return !item.checked;
    } else {
      return true; // Show all tasks when 'all' is selected
    }
  });

  return (
    <div className="App">
      <Header title="To Do List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        onAdd={addItem}
      />
      <FilterDropdown
        filterValue={filterValue}
        setFilterValue={setFilterValue}
      />
      <main>
          
          <Content
            items={filteredItems}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
      </main>
      <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
        {isLoading && <p>Loading items..</p>}
        {fetchError && <p>Error: {fetchError}</p>}
        {!isLoading && !fetchError}
        <br/>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
