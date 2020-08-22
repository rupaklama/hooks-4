import { useEffect, useContext } from 'react';
import useFetch from '../hooks/useFetch';

import {CurrentUserContext} from '../context/currentUser';

import useLocalStorage from '../hooks/useLocalStorage';

// User context object is store in memory of browser,
// after page reload, all current user's data gets disappeared that's why
// we need to fetch user data from backend only one time when our
// component gets mounted then this component will have user auth state
// Current user auth state will be pass on other components

// children param is to wrap all our components in this component
// This component only renders once to fetch our current user 
// on initialized of this component.

// once we have a user data, if we are signed in, 
// we get sign in automatically with our auth token
export default function AuthState({children}) {
  // response is user data & to fetch func to get current user state
  const [ {response}, doFetch ] = useFetch('/rest-auth/user/');

  const [ , dispatch] = useContext(CurrentUserContext);

  const [token] = useLocalStorage('token');
  
 // fetching user data when components get mounted
  useEffect(() => {
    // when no token, update user state & return nothing
    if (!token) {
      dispatch({ type: 'SET_UNAUTHORIZED'})
      return;
    }
    // calling doFetch to get user data & updating user context object
    doFetch()
    dispatch({ type: 'LOADING'})
  }, [doFetch, token, dispatch])

  // NOTE: our custom function gets call on every render if it's inside dependancy array &
  // react don't have any control over it
  // Solution: to apply useCallback hook into the calling func

  // side effect for response object
  useEffect(() => {
    // don't do anything until response is there
    if (!response)
    {
      return;
    }

    dispatch({ type: 'SET_AUTHORIZED', payload: response.key })
  }, [response, dispatch, token]);

  return children
}

