import React from 'react';
import { withRouter } from 'react-router-dom';
import "../../css/form.css";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({errors: nextProps.errors})
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  demoSignIn() {
    const user = {email: "test@test.com", password: "password"};
    this.props.login(user);
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
      password: this.state.password
    };

    this.props.login(user); 
  }

  renderErrors(field) {
    let error_message = "";
    if(this.props.errors[field] !== undefined)
    {
        error_message = this.props.errors[field];
    }
 
    return(
      <div>
      { error_message }
      </div>
    );
  }


  render() {
    return (
      <div>
        <h1 className="signup-header"> Welcome Back!</h1>
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

              <div className='session-form-errors'>{this.renderErrors('email')}</div>

              <div>
                <input className="form-input-field" type="password"
                  value={this.state.password}
                  onChange={this.update('password')}
                  placeholder="Password"
                />
              </div>

              <div className='session-form-errors'>{this.renderErrors('password')}</div>

              <div className="form-login-button">
                <input className="form-submit" type="submit" value="Login" />
              </div>

              <div className="form-demo-login-button">
                <button className="form-submit" type="button" onClick={this.demoSignIn.bind(this)}>Demo Login</button>
              </div>

            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);

//adf