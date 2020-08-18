import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import GlobalFeed from './pages/GlobalFeed';
import Article from './pages/Article';
import Login from './components/Login';
import Header from './components/Header';

// import Provider component from user Context object
import { CurrentUserProvider } from './context/currentUser';

//
import CurrentUserChecker from './components/CurrentUserChecker';

function App() {
  return (
    // header component will be displayed in all the components
    <CurrentUserProvider>
      <div className="container">
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={GlobalFeed} />
              <Route path="/articles/:slug" component={Article} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Login} />
            </Switch>
          </div>
        </Router>
      </div>
    </CurrentUserProvider>
  );
}

export default App;
// All the components wrapped by Router has three default objects - history, location & match
// <Router/> does its job as an Higher Order Component and wraps your components or views
// and injects these three objects as props inside them.
