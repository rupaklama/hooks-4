// Context Object is a js object which gets store in a component's memory
// Here, we will create our Context object to store User data & make
// it available to other files in order to consume it.
import React, { createContext, useReducer } from 'react';

// our initial state - STORE 
const initialState = {
    isLoading: false,
    isLoggedIn: null, 
    currentUser: null // response object - token data & user info

}

// creating Reducer to process & update our state object
// two params - our initial state & action types
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING': 
      return {...state, isLoading: true}
    case 'SET_AUTHORIZED':
      return {
        ...state,
        isLoggedIn: true,
        isLoding: false,
        currentUser: action.payload
      }
    case 'SET_UNAUTHORIZED':
      return {
        ...state,
        isLoggedIn: false
      }
    default:
      return state;
  }
}

// here within createContext, we can pass an object & function
// Inside createContext, two array elements like in hook - [state, setState]
// first element - empty object, value
// second element- setter function
export const CurrentUserContext = createContext(); 

// createContext returns an object with 2 values: special components
// { Provider, Consumer }
// Provider component wraps around children components that can have an access to the Context Object

// using Provider component of Context object to make a value available to all
// children and grandchildren by using value={} property

// This provider component will wrap all our other components to get access to current user state,
// takes children component as a paramter 
export const CurrentUserProvider = ({children}) => {

  // two params in useReducer - reducer func & initial state
  // [updated state, dispatch func - to dispatch an action & update our state object]
  const value = useReducer(reducer, initialState);

  return ( // passing our initial context data, object & setter func - createContext([{}, () => {}]); 
    <CurrentUserContext.Provider value={value}> 
      {children}
    </CurrentUserContext.Provider>
  )
}

// All other components get this value everywhere,
// we can read all our data from state & 
// change data with setState method 