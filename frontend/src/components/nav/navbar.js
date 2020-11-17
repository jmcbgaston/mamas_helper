import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const AuthNav = ({ userId, logout }) => (
  <>
    <div className="nav-bar__header-container">
      <h3 className ="nav-bar__header">Welcome!</h3>
      <div>User ID: {userId}</div>
    </div>
    <button
      className ="nav-bar__session-button button"
      onClick={() => logout()}>
        <ExitToAppIcon />&nbsp;Sign Out
    </button>
  </>
)

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

const NavBar = ({ userId, loggedIn, logout }) => {
  return (
    <nav className="nav-bar">
      <Link to="/" className="nav-bar__app-title">
        <p className="nav-bar__logo">(logo)&nbsp;</p>
        Mama's Helper
      </Link>

      { loggedIn ? <AuthNav userId={userId} logout={logout}/> :<UnAuthNav /> }
    </nav>
  );
}

export default NavBar;
