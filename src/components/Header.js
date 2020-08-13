import React from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-light">
      <Router>
        <div className="container">
          <Link to="/" className="navbar-brand">
            Nepal World Wide
          </Link>

          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <NavLink exact to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                Sign in
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register" className="nav-link">
                Sign up
              </NavLink>
            </li>
          </ul>
        </div>
      </Router>
    </nav>
  );
}

export default Header;
