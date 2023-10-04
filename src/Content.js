import React from 'react';
import LineItem from './LineItem';

const Content = ({ items, handleCheck, handleDelete }) => {
  return (
    <>
      {(items.length) ? (
        <ul>
          {items.map(item => (
            <LineItem
              item={item}
              key={item.id}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
      ) : (
        <p style={{ marginTop: '2rem' }}>List is Empty</p>
      )}
    </>
  );
};

export default Content;
