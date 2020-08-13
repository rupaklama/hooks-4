import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalFeed from './pages/GlobalFeed';
import Article from './pages/Article';
import Login from './components/Login';
function Routes() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={GlobalFeed}/>
          <Route path='/articles/:slug' component={Article}/>
          <Route path='/login' component={Login}/>
        </Switch>
      </Router>
    </div>
  );
}

export default Routes;
