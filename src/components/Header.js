import React, { useContext, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';

// checking user state to see if current user is logged in
import { CurrentUserContext } from '../context/currentUser';


function Header() {
  // current user state
  const [currentUserState] = useContext(CurrentUserContext);
  // console.log(currentUserState)
  // if user is logged in & we have image of current user - use that
  // if user don't have image, use our default image
  const userImage = (currentUserState.isLoggedIn && currentUserState.currentUser.image) || 
    'https:static.productionready.io/images/smiley-cyrus.jpg'

  return (
    <nav className="navbar navbar-light">
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

          {currentUserState.isLoggedIn && (
            <Fragment>
              <li className="nav-item">
                <NavLink to="/articles/new" className="nav-link">
                  <i className='ion-compose' />
                  &nbsp; New Post
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/settings" className="nav-link">
                  <i className='ion-gear-a' />
                  &nbsp; Settings
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={`/profiles/${currentUserState.currentUser.username}`} className="nav-link">
                 
                  <img className="user-pic" src={userImage} alt="" />
                  &nbsp; {currentUserState.currentUser.username}
                </NavLink>
              </li>
            </Fragment>
          )}

          {
            /* by deault it's null, when user is not logged in - false,
             display this only when user is not logged in */
            currentUserState.isLoggedIn === false && (
              <Fragment>
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
              </Fragment>
            )
          }
        </ul>
      </div>
    </nav>
  );
}

export default Header;
