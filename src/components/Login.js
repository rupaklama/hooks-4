import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage'; 
function Login(props) {
  // default props by react Router - history, location & match objects
  // console.log(props);

  // Match object contains information about how a <Route path> matched the URL.
  // Using same Login component to build Register page.
  // When this component gets render in Register route path, then
  // the path will be register & we get is 'login false'
  const isLogin = props.match.path === '/login';

  // required variables for Register Route to apply in our jsx mark ups
  // if we are on /login page, text should be 'Sign in' if not text should be 'Sing up'
  const pageTitle = isLogin ? 'Sign in' : 'Sign up';

  // redirect user to /register to create an account, /login to sign in 
  const descriptionLink = isLogin ? '/register' : '/login';

  // if we are on login page, text will be 'Need an account', if not
  const descriptionText = isLogin ? 'Need an account' : 'Have an account?';

  // login or register api url
  const authApiUrl = isLogin ? 'login/' : 'registration/';

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  // re-directing user to home page after successfully set localStorage
  const [local_storage, setLocalStorage] = useState(false);

  // implementing our custom useFetch hook
  // data is object with three props -
  // response: null or object from backend, error: null or error object, loading:true/false
  // doFetch - func from custom hook, call it whenever we need
  const [{ loading, response, error }, doFetch] = useFetch(authApiUrl);

  // console.log('useFetch', loading, error, response);

  // implementing our custom useLocalStorage hook
  const [ setToken ] = useLocalStorage('token');
  // console.log('token', token)

  // not submitting post request in the begining/initial render
  // basically not submitting anything in the beginning
  // const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();

    // if we are logging in, we need only need email & password1, otherwise
    // const user = isLogin ? { username, password1 } : { email, username, password1, password2 };
    
    // doFetch func gets call with our initial value
    // doFetch func from custom hook to make api call, takes object params
    // this is our post data object that overrides initialValue in useFetch &
    // gets saved in that useState
    doFetch({
      method: 'post',
      data: isLogin ? { 
        username: username,
        password: password1
      } :
      { 
        username: username, 
        email: email,
        password1: password1, 
        password2: password2 
      }
    });

    setUsername('')
    setPassword1('')
    setPassword2('')
  };

  // using useEffect since saving token is a side effect
  // saving token in browser localStorage
  useEffect(() => {
    // execute this useEffect only when response is not null,
    // meaning when we have response object
    if (!response) {
      return; // don't do anything until response is there
    }
    // if we have response object, save it
    const token = response.key;
    setToken(token)
    // localStorage.setItem('token', token);

    // re-directing user to home page after successfully set localStorage
    setLocalStorage(true)

     // executing userEffect only when our response object changes, not on every render
  }, [response, setToken]);
    // FUNCTION also needs to pass into dependency array, not only variables

  // history.push('/') - not best approach
  // using react router - redirect prop, more declarative approach
  // re-directing user to home page after successfully set localStorage
  if (local_storage) {
    // using react router's Redirect component
    return <Redirect to="/" />
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{pageTitle}</h1>
            <p className="text-xs-center">
              <Link to={descriptionLink}>{descriptionText}</Link>
            </p>

            <form onSubmit={handleSubmit}>
              <fieldset>
                {/* Displaying this fieldsets only when we are on /register page */}
                {!isLogin && (
                  <fieldset className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />

                    <br />
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      value={password2}
                      onChange={e => setPassword2(e.target.value)}
                    />
                  </fieldset>
                )}

                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    value={password1}
                    onChange={e => setPassword1(e.target.value)}
                  />
                </fieldset>

                <button
                  disabled={loading}
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                >
                  {pageTitle}
                </button>
              </fieldset>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>Something went wrong...</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

// All the components wrapped by Router has three default objects - history, location & match
// <Router/> does its job as an Higher Order Component and wraps your components or views
// and injects these three objects as props inside them.

// https://www.freecodecamp.org/news/hitchhikers-guide-to-react-router-v4-4b12e369d10/
