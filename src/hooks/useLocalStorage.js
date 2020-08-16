import { useState, useEffect } from 'react';

// custom hook to save token in a browser's localStorage
// first param, key of our response object
// second param, initial value - empty string by default & don't have to provide optionally
export default (key, initialValue = '') => {
  // state for ur hook
  // On useState's initial value, we can define a function as well
  // as a first arg which will be called Lazy initial state.
  // Normally, we will us function inside, when we have some expensive
  // calculations our initial state
  const [value, setValue] = useState(() => {
    // Lazy initial state
    // key will be from argument, if it's undefined then use default initial value
    return localStorage.getItem(key) || initialValue;
    // basically now, we create new value state,
    // by default, it will be our localStorage item or empty string if
    // we didn't put any values inside
  });

    // next step, is to give outside components our default values
    // now other components can use our useLocalStorage hook with the state
    // that we created

    // One problem is that when we call setValue from outside, 
    // we are changing state inside our hook but we don't change LOCALSTORAGE

    // Adding useEffect here to track when the value is changed
    useEffect(() => {
      // setting new token key
      localStorage.setItem(key, value)
      
    }, [value, key])
    
    return [value, setValue]
  
}

// our effect is call only when value is changed