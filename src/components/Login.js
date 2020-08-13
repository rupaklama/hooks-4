import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // to display error message
  const [error, setError] = useState(null);
  
  // not submitting post request in the begining/initial render
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = async () => {
    
    // error handling 
    try {
      await axios.post('https://conduit.productionready.io/api/users/login', {
       // objects object with query params 
       body: {
        user: {
          email: 'rl@hotmail.com',
          password: 1234
        }
       }

      })
    } catch (error) {
      setError(error)
    }
    
    // after fetching data, set to default
    setIsSubmitting(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // on form submit, making post request
    setIsSubmitting(true)
    fetchData()

    setEmail('')
    setPassword('')
  }

  useEffect(() => {
    // on form submit or
    // on true, do nothing in our effect & just return fetch data
    if (!isSubmitting) {
      return  
    }
    
    fetchData()
    // eslint-disable-next-line 
  }, []);

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link to='register'>Need an account?</Link>
            </p>

            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input 
                    type='email' 
                    className='form-control form-control-lg'
                    placeholder='Email'
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                  />
                </fieldset>
              </fieldset>

              <fieldset>
                <fieldset className="form-group">
                  <input 
                    type='password' 
                    className='form-control form-control-lg'
                    placeholder='password' 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                />
                </fieldset>

                <button 
                  disabled={isSubmitting}
                  className='btn btn-lg btn-primary pull-xs-right'
                  type='submit'
                >Sign in</button>
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
