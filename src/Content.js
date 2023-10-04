import React from 'react'
import ItemLists from './ItemLists'

const Content = ({items,handleCheck,handleDelete}) => {
  return (
   
        <>
            {(items.length) ? (
            <ItemLists
            items={items}
            handleCheck={handleCheck}
            handleDelete={handleDelete} />
) : (<p style={{ marginTop: '2rem' }}>List is Empty</p>)
}
             
                
        </>
   
  )
}

export default Content