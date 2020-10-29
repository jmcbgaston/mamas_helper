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

  componentWillUnmount() {
    this.props.clearErrors();
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

                <div className='session-form-errors'>{this.renderErrors('email')}</div>

                <div>
                  <input className="form-input-field" type="text"
                    value={this.state.handle}
                    onChange={this.update('handle')}
                    placeholder="Handle"
                  />
                </div>

              <div className='session-form-errors'>{this.renderErrors('handle')}</div>

                <div>
                  <input className="form-input-field" type="password"
                    value={this.state.password}
                    onChange={this.update('password')}
                    placeholder="Password"
                  />
                </div>

                <div className='session-form-errors'>{this.renderErrors('password')}</div>

                <div>
                  <input className="form-input-field" type="password"
                    value={this.state.password2}
                    onChange={this.update('password2')}
                    placeholder="Confirm Password"
                  />
                </div>

                <div className='session-form-errors'>{this.renderErrors('password2')}</div>

                <div className="form-login-button">
                  <input className="form-submit" type="submit" value="Submit" />
                </div>

              </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);