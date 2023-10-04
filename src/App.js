import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import ItemLists from './ItemLists';

function App() {
  // State for items
  const [items, setItems] = useState([]);
  
  // State for the input value in AddItem
  const [newItem, setNewItem] = useState('');

  // State for the search input
  const [search, setSearch] = useState('');

  // State for error handling
  const [fetchError, setFetchError] = useState(null);

  // State for loading indicator
  const [isLoading, setIsLoading] = useState(true);

  // Effect to fetch initial items from API
  useEffect(() => {
    const API_URL = "http://localhost:3500/items";
    
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Data not received");
        const listItems = await response.json();
        setItems(listItems);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);
  }, []);

  // Function to handle item addition
  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, ...item };
    const listItems = [...items, myNewItem];
    setItems(listItems);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(myNewItem),
    };

    try {
      const response = await fetch("http://localhost:3500/items", postOptions);
      if (!response.ok) throw Error("Error posting item");
    } catch (err) {
      setFetchError(err.message);
    }
  };

  // Function to handle checking/unchecking items
  const handleCheck = async (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);

    const updatedItem = updatedItems.find((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ checked: updatedItem.checked }),
    };

    try {
      const response = await fetch(
        `http://localhost:3500/items/${id}`,
        updateOptions
      );
      if (!response.ok) throw Error("Error updating item");
    } catch (err) {
      setFetchError(err.message);
    }
  };

  // Function to handle item deletion
  const handleDelete = async (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);

    const deleteOptions = {
      method: 'DELETE',
    };

    try {
      const response = await fetch(
        `http://localhost:3500/items/${id}`,
        deleteOptions
      );
      if (!response.ok) throw Error("Error deleting item");
    } catch (err) {
      setFetchError(err.message);
    }
  };

  return (
    <div className="App">
      <Header title="To Do List" />
      <AddItem onAdd={addItem} />
      <Content
        items={items.filter((item) =>
          item.item.toLowerCase().includes(search.toLowerCase())
        )}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;
