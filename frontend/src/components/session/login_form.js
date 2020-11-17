import React from 'react';
import { withRouter } from 'react-router-dom';
import SessionInstructionBox from "./session_instruction_box";

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
    this.demoStandardUser = this.demoStandardUser.bind(this);
    this.demoLimitedUser = this.demoLimitedUser.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.errors })
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  demoStandardUser() {
    const user = {
      email: "standarduser@test.com",
      password: "password"
    };

    this.props.login(user);
  }

  demoLimitedUser() {
    const user = {
      email: "limiteduser@test.com",
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
    return this.state.errors[field] ? "session-form__input--errors" : '';
  }

  render() {
    const { user } = this.state;

    return (
      <form className="session-form" onSubmit={this.handleSubmit}>
        <SessionInstructionBox/>
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

          <button className="session-form__demo button" type="button" onClick={this.demoStandardUser}>
            Demo (Standard User)
          </button>

          <button className="session-form__demo button" type="button" onClick={this.demoLimitedUser}>
            Demo (Limited User)
          </button>
      </form>
    );
  }
}

export default withRouter(LoginForm);
