import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: '',
      },
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.demoSignIn = this.demoSignIn.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.errors })
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  demoSignIn() {
    const user = {
      email: "test@test.com",
      password: "password"
    };

    this.props.login(user);
  }

  update(field) {
    const { user } = this.state;

    return e => {
      user[field] = e.currentTarget.value;
      this.setState({ user });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state.user);
  }

  renderErrors(field) {
    const { errors } = this.props;
    return errors[field] ? errors[field] : null
  }

  addErrorsClass(field) {
    return this.state.errors[field] ? "input-errors" : '';
  }

  render() {
    const { user } = this.state;

    return (
      <form className="session-form" onSubmit={this.handleSubmit}>
        <h2 className="session-form__header">Welcome Back!</h2>
          <input type="text"
            className={`session-form__input-field input-field ${this.addErrorsClass('email')}`}
            value={user.email}
            onChange={this.update('email')}
            placeholder="Email"
          />
          <div className='session-form__errors form-errors'>{this.renderErrors('email')}</div>

          <input type="password"
            className={`session-form__input-field input-field ${this.addErrorsClass('email')}`}
            value={user.password}
            onChange={this.update('password')}
            placeholder="Password"
          />
          <div className='session-form__errors form-errors'>{this.renderErrors('password')}</div>

          <input className="session-form__submit button" type="submit" value="Login" />

          <button className="session-form__demo button" type="button" onClick={this.demoSignIn}>
            Demo Login
          </button>
      </form>
    );
  }
}

export default withRouter(LoginForm);
