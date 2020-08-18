import React, { useState, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
// How to manage React State with Arrays or
// How to manage arrays in React state

// This tutorial walks you through the most common scenarios for managing arrays 
// in React state. For each I want to show you a array example in React state, 
// such as how to push an item to an array or how to update an item in an array, 
// when React state is used to store it.

// Every time you want to modify something in React, for example a list where you want to add an item, 
// you have to use React's state management. We will be using React's useReducer Hook here

// Add an Item to a List in React

// our array of objects
const initialList = [
  {
    id: '1',
    name: 'Indira'
  },
  {
    id: '2',
    name: 'Rupak'
  }
]

// creating Reducer to process & update our state object
// two params - our initial state & action types
function listReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return state.concat({ name: action.name, id: action.id });
      
    default:
      throw new Error();
  }
}

// The concat() method is used to join two or more arrays.
// This method does not change the existing arrays, but returns a new array, 
// containing the values of the joined arrays.
  
export default function Test() {
  
  // two params in useReducer - reducer func & initial state
  // [updated state, dispatch func - to dispatch an action to reducer & update our state object]
  const [list, dispatch] = useReducer(listReducer, initialList);
  console.log(list)

  // without the value from the input field, we don't have any text for the item which we want to add to our list
  const [name, setName] = useState('');

  // helper function
  const handleAdd = () => {
    
    // const newList = list.concat({ name, id: uuidv4() });
    
    // to dispatch an action to reducer & update our state object
    dispatch({ type: 'ADD_ITEM', name, id: uuidv4() })

    setName('')
  }

  // helper variable
  const renderLists = list.map(item => {

    const { id, name } = item;
  
    return (
      <li key={id}>{name}</li>
    )
  });

  // We have made the input field a controlled element, because it receives its internal value from React's state now. 
  // Next, whenever someone clicks the button, we can add the name from the input field as new item to the list:

  return (
    <div>
      <ul>
        { renderLists }
      </ul>

      <div>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>
    </div>
  )
}

