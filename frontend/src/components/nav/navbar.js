import React from 'react';
import { Link } from 'react-router-dom'
import "../../css/navbar.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
  }

  getLinks() {
      if (this.props.loggedIn) {
        return (
            <div className = "nav-logged-in-container">
                <h1 className="nav-header">Mama's Helper</h1>
                <br />
                <h1 className = "nav-welcome-message">Welcome!</h1>
                <button className = "nav-welcome-logout" onClick={this.logoutUser}>Sign Out</button>
            </div>
        );
      } else {
        return (
            <div>
              <h1 className="nav-header">Mama's Helper</h1>
              <div className="nav-button-container">

                <div>
                  <div>
                    <Link to={'/signup'}><button className="nav-signup">Sign Up</button></Link>
                  </div>
                  <div>
                    <Link to={'/login'}><button className="nav-signin">Sign In</button></Link>
                  </div>
                </div>

              </div>
            </div>

        );
      }
  }

  render() {
      return (
        <div>
            { this.getLinks() }
        </div>
      );
  }
}

export default NavBar;