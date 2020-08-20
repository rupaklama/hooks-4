import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
// How to manage React State with Arrays or
// How to manage arrays in React state

// This tutorial walks you through the most common scenarios for managing arrays 
// in React state. For each I want to show you a array example in React state, 
// such as how to push an item to an array or how to update an item in an array, 
// when React state is used to store it.

// Every time you want to modify something in React, for example a list where you want to add an item, 
// you have to use React's state management. We will be using React's useState Hook here, 

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

// it may not always be the case that your state is only the list. 
// Often you will have a more complex state object and the list is only one property of this object. 
// How would you add an item to this list in the object then? Let's go through this example first 
// with React's useState Hook again. Let's say next to the list there is a boolean flag to either 
// show or hide the list with a conditional rendering:
export default function Test2() {
  // So far, the list is just a JavaScript variable and not stateful yet, stateful meaning able to change/update
  // In order to modify it, in this case to add an item to it, 
  // we need to make the list stateful with React's state and its useState Hook:
  const [list, setList] = useState(initialList);
  console.log(list)
  // without the value from the input field, we don't have any text for the item which we want to add to our list
  const [name, setName] = useState('');

  // helper function
  const handleAdd = () => {
    // The concat() method is used to join two or more arrays.
    // This method does not change the existing arrays, but returns a new array, 
    // containing the values of the joined arrays.
    const newList = list.concat({ name, id: uuidv4() });
    setList(newList)

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

