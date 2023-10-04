import React from 'react'




const SearchItem=({search,setSearch}) =>{

  return (

   <form className='searchForm' onSubmit={(e)=>e.preventDefault()}>

     <label htmlFor='searchItem'>Search Tasks</label>

    <input type='text'

    id='search'

    role='searching task'

    placeholder='Search Tasks' 

    value={search}

    onChange={(e)=>setSearch(e.target.value)}/>

   </form>

  )

}




export default SearchItem