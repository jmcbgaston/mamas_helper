import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import logo from './PNG_MH_Logo.png';

const AuthNav = ({ user, logout }) => {
  debugger
  if (user.isLimitedUser) {
    return(
      <>
        <div className="nav-bar__header-container">
          <h3 className ="nav-bar__header">Welcome!</h3>
        </div>
        <button
          className ="nav-bar__session-button button"
          onClick={() => logout()}>
            <ExitToAppIcon />&nbsp;Sign Out
        </button>
      </>
    )
  } else {
    return(
      <>
        <div className="nav-bar__header-container">
          <h3 className ="nav-bar__header">Welcome!</h3>
          <div>User ID: {user.id}</div>
        </div>
        <button
          className ="nav-bar__session-button button"
          onClick={() => logout()}>
            <ExitToAppIcon />&nbsp;Sign Out
        </button>
      </>
    )
  }
}

const UnAuthNav = () => {
  const SignUp = () => (
    <Link className="nav-bar__session-links-container" to="/signup">
      <button className="nav-bar__session-button button">
        Sign Up
      </button>
    </Link>
  )

  const LogIn = () => (
    <Link className="nav-bar__session-links-container" to="/login">
      <button className="nav-bar__session-button button">
        Login
      </button>
    </Link>
  )

  const { pathname } = useLocation();
  return pathname === '/signup' ? <LogIn /> : <SignUp />
}

const NavBar = ({ user, loggedIn, logout }) => {
  return (
    <nav className="nav-bar">
      <Link to="/" className="nav-bar__app-title">
        <img className="nav-bar__logo" src={logo} />
      </Link>

      { loggedIn ? <AuthNav user={user} logout={logout}/> :<UnAuthNav /> }
    </nav>
  );
}

export default NavBar;
