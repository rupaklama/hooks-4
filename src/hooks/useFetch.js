import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// to use token for authentication
import useLocalStorage from '../hooks/useLocalStorage';

// declare custom hook - useFetch
// two params which are two unique things between components
// url is unique & useState's initialValue
export default url => {
  // Loading is Load data from the server and place the returned data to our components
  // We want to display a loader in the main component when fetching is occurring.
  // As we did with error handling, let’s add a loading state.
  // True when start fetching api data, false when finished fetching
  const [loading, setLoading] = useState(false);

  // null - by default, we don't have no response & error
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  
  // initial state value
  const [initialValue, setInitialValue] = useState({});
  
  // getting token from browser's local storage
  // to use token for authentication 
  const [token] = useLocalStorage('token');

  // base url
  const baseUrl = 'http://127.0.0.1:8000/rest-auth/';

  // options object / initialValue is basically always not there,
  // will set default value to empty object, pass it on to axios
  // when making post request with this func, the empty object gets override with post data

  // using useCallback hook to prevent function calling on every render & 
  // provide emtpy array for second arg to call it once or useCallback won't work
  const doFetch = useCallback((initialValue = {}) => {
    setInitialValue(initialValue)
    // the best place to setLoading is inside doFetch func
    // on calling this func from other component, starts the fetch process
    // when True, trigger our effect & start fetching api data
    setLoading(true);
  }, [])

  useEffect(() => {
    // if false don't return anything 
    if (!loading) {
      return;
    }

    // updating our new initialValue with new object  - token with headers object
    const tokenAuth = {
      ...initialValue,
      ...{
        headers: {
          authorization: token ? `token ${token}` : ''
        }
      }
    }
    
    // now, loading value is true, axios gets call
    // After above, our axios call gets executed
    // console.log('effect is triggered');

    // making fetch request with or without token
    axios(baseUrl + url, tokenAuth)
    .then( response => {
      // token data
      setResponse(response.data)
      // false is when finished fetching
      setLoading(false)
    })
    .catch(error => {
      setError(error.response.data)
      setLoading(false)
    })
    // eslint-disable-next-line
    // creating local variables inside useEffect can solve this exhaustive-deps errors,
    // but if we are using some variables from components or hooks from outside to inside useEffect 
    // then, we will get this hook errors/exhaustive-deps errors
    // Basically to fix this error, just add - url & initival value object 
  }, [loading, url, initialValue, token]); 
  // here loading value changes to True after executing doFetch func above,
  // our useEffect gets executed/rendered since we updated our loading value

  // returning two args - object & doFetch func
  return [{ loading, response, error }, doFetch];
};

// Hooks are great for avoiding code duplication across your app.
// Something we do a lot is to fetch data.

// It can fetch data
// It returns a loading state
// It returns an error state
