import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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

  // if we are on login page, redirect url to create account is register or vice versa
  const descriptionLink = isLogin ? '/register' : '/login';

  // if we are on login page, text will be 'Need an account', if not
  const descriptionText = isLogin ? 'Need an account' : 'Have an account?';

  // login or register api url
  const authApiUrl = isLogin ? 'login' : 'registration';

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // to display error message
  const [error, setError] = useState(null);

  // not submitting post request in the begining/initial render
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = async () => {
    // error handling
    try {
      // if we are logging in, we need only email & password, otherwise
      const user = isLogin ? {email, password} : {email, password, username}

      await axios.post(`http://localhost:8000/rest-auth/${authApiUrl}`, {
        // objects object with query params
        body: {
          user
        },
      });
    } catch (error) {
      setError(error);
    }

    // after fetching data, set to default
    setIsSubmitting(false);
  };

  const handleSubmit = event => {
    event.preventDefault();
    // on form submit, making post request
    setIsSubmitting(true);
    fetchData();

    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    // on form submit or
    // on true, do nothing in our effect & just return fetch data
    if (!isSubmitting) {
      return;
    }

    fetchData();
    // eslint-disable-next-line
  }, []);

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
                {/* Displaying this fieldset only when we are on /register page */}
                {!isLogin && <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </fieldset>}

                <fieldset className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </fieldset>
              </fieldset>

              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </fieldset>

                <button
                  disabled={isSubmitting}
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                >
                  {pageTitle}
                </button>
              </fieldset>

              {error && <div>{error.message}</div>}
            </form>
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
