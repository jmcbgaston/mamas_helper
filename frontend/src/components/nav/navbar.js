import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const AuthNav = ({ logout }) => (
  <>
    <h2 className ="nav-bar__header">Welcome!</h2>
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

const NavBar = (props) => {
  const { loggedIn, logout } = props;

  return (
    <nav className="nav-bar">
      <Link to="/" className="nav-bar__app-title">
        <p className="nav-bar__logo">(logo)&nbsp;</p>
        Mama's Helper
      </Link>

      { loggedIn ? <AuthNav logout={logout}/> :<UnAuthNav /> }
    </nav>
  );
}

export default NavBar;
