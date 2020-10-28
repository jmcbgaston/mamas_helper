import React from 'react';  
import { withRouter } from 'react-router-dom';
import "../../css/form.css";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      handle: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.login({ email: this.state.email, password: this.state.password });
    }

    this.setState({errors: nextProps.errors})
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      handle: this.state.handle,
      password: this.state.password,
      password2: this.state.password2
    };
 
    this.props.signup(user, this.props.history);
  }

  renderErrors() {
    return(
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div>
      <h1 className="signup-header"> Sign up for free!</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-input-container">
              <div>

                <div>
                  <input className="form-input-field" type="text"
                    value={this.state.email}
                    onChange={this.update('email')}
                    placeholder="Email"
                  />
                </div>
                <div>
                  <input className="form-input-field" type="text"
                    value={this.state.handle}
                    onChange={this.update('handle')}
                    placeholder="Handle"
                  />
                </div>
                <div>
                  <input className="form-input-field" type="password"
                    value={this.state.password}
                    onChange={this.update('password')}
                    placeholder="Password"
                  />
                </div>
                <div>
                  <input className="form-input-field" type="password"
                    value={this.state.password2}
                    onChange={this.update('password2')}
                    placeholder="Confirm Password"
                  />
                </div>
                <div className="form-login-button">
                  <input className="form-submit" type="submit" value="Submit" />
                </div>

              </div>
            {this.renderErrors()}

          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);