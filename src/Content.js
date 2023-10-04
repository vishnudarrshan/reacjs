import React from 'react';
import ItemLists from './ItemLists'; // Update the import path

const Content = ({ items, handleCheck, handleDelete }) => {
  return (
    <main>
      {items.length ? (
        <ItemLists
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p style={{ marginTop: '2rem' }}>List is Empty</p>
      )}
    </main>
  );
};

export default Content;
