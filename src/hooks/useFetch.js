import { useState, useEffect } from 'react';
import axios from 'axios';

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

  // base url
  const baseUrl = 'http://127.0.0.1:8000/rest-auth/';

  const doFetch = (initialValue = {}) => {
    setInitialValue(initialValue)
    // the best place to setLoading is inside doFetch func
    // on calling this func from other component, starts the fetch process
    // when True, trigger our effect & start fetching api data
    setLoading(true);
  }

  useEffect(() => {
    // if false don't return anything 
    // this if condition won't pass because it's value is false now
    if (!loading) {
      return;
    }
    
    // now, loading value is true, axios gets call
    // After above, our axios call gets executed
    console.log('effect is triggered');

    axios(baseUrl + url, initialValue)
    .then( res => {
      setResponse(res.data)
      // false is when finished fetching
      setLoading(false)
    })
    .catch(error => {
      setError(error.response.data)
      setLoading(false)
    })
    // eslint-disable-next-line
  }, [loading]); 
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
