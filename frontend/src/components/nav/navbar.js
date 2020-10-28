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

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
      if (this.props.loggedIn) {
        return (
            <div>
                <Link to={'/tweets'}>All Tweets</Link>
                <Link to={'/profile'}>Profile</Link>
                <Link to={'/new_tweet'}>Write a Tweet</Link>
                <button onClick={this.logoutUser}>Logout</button>
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