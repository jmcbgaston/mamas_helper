import React from 'react';
import { Link, useLocation } from 'react-router-dom'

const AuthNav = ({ logout }) => (
  <>
    <h2 className ="nav-bar__header">Welcome!</h2>
    <button
      className ="nav-bar__logout-button button"
      onClick={() => logout()}>
        Sign Out
    </button>
  </>
)

const UnAuthNav = () => {
  const SignUp = () => (
    <Link className="button-links" to="/signup">
      <button className="nav-bar__session-button button">
        Sign Up
      </button>
    </Link>
  )

  const LogIn = () => (
    <Link className="button-links" to="/login">
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
      <h1>
        <Link to="/startmyday" className="nav-bar__header">
          Mama's Helper
        </Link>
      </h1>

      { loggedIn ? <AuthNav logout={logout}/> :<UnAuthNav /> }
    </nav>
  );
}

export default NavBar;
