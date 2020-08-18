// Context Object is a js object which gets store in a component's memory

// Here, we will create our Context object to store User data & make
// it available to other files in order to consume it.
import React, { createContext, useState } from 'react';

// here within createContext, we can pass an object & function
// Inside createContext, two array elements like in hook - [state, setState]
// first element - empty object, value
// second element- setter function
export const CurrentUserContext = createContext([{}, () => {}]); // initial data

// createContext returns an object with 2 values: special components
// { Provider, Consumer }
// Provider component wraps around children components that can have an access to the Context Object

// using Provider component of Context object to make a value available to all
// children and grandchildren by using value={} property

// This provider component will wrap all our other components to get access to current user state,
// takes children component as a paramter 
export const CurrentUserProvider = ({children}) => {

  // Using useState hook to store & update current user data from backend
  const [state, setState] = useState({
    isLoading: false,
    isLoggedIn: null, 
    currentUser: null // response object - token data & user info
  });

  return ( // passing our initial context data, object & setter func - createContext([{}, () => {}]); 
    <CurrentUserContext.Provider value={[state, setState]}> 
      {children}
    </CurrentUserContext.Provider>
  )
}

// All other components get this value everywhere,
// we can read all our data from state & 
// change data with setState method 