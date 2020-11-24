import React from 'react';
import { withRouter } from 'react-router-dom';
import SessionInstructionBox from "./session_instruction_box";
import { Tooltip } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

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
    this.demoDefaultUser = this.demoDefaultUser.bind(this);
    this.demoParentUser = this.demoParentUser.bind(this);
    this.demoLimitedUser = this.demoLimitedUser.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.errors })
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  demoDefaultUser(){
    const user = {
      email: "danaykroydgames@gmail.com",
      password: "password",
    };
    this.props.login(user);
  }

  demoParentUser() {
    const user = {
      email: "parent@user.com",
      password: "password"
    };

    this.props.login(user);
  }

  demoLimitedUser() {
    const user = {
      email: "child1@user.com",
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

    const root = document.getElementById('root');
    root.style.backgroundImage = 'url(./backgrounds/session_forms.webp)';
    ;

    return (
      <form className="session-form" onSubmit={this.handleSubmit}>
        <SessionInstructionBox />
        <h2 className="session-form__header">Welcome Back!</h2>
        <input
          type="text"
          className={`session-form__input-field input-field ${this.addErrorsClass(
            "email"
          )}`}
          value={user.email}
          onChange={this.update("email")}
          placeholder="Email"
        />
        <div className="session-form__errors form-errors">
          {this.renderErrors("email")}
        </div>

        <input
          type="password"
          className={`session-form__input-field input-field ${this.addErrorsClass(
            "email"
          )}`}
          value={user.password}
          onChange={this.update("password")}
          placeholder="Password"
        />
        <div className="session-form__errors form-errors">
          {this.renderErrors("password")}
        </div>

        <input
          className="session-form__submit button"
          type="submit"
          value="Login"
        />

        <button
          className="session-form__demo button"
          type="button"
          onClick={this.demoDefaultUser}
        >
          Demo (Standard User)&nbsp;
          <Tooltip
            placement="top"
            title={
              <span style={{ fontSize: "1.1rem" }}>
                A standard user can create and complete personal tasks,
                but cannot delegate tasks to others or receive tasks from others.
              </span>
            }
          >
            <HelpIcon />
          </Tooltip>
        </button>

        <button
          className="session-form__demo button"
          type="button"
          onClick={this.demoParentUser}
        >
          Demo (Parent User)&nbsp;
          <Tooltip
            placement="top"
            title={
              <span style={{ fontSize: "1.1rem" }}>
                A parent user is only used to delegate tasks to a child user
                and cannot complete tasks. A standard user turns into a parent
                user once a child user is included into the household.
              </span>
            }
          >
            <HelpIcon />
          </Tooltip>
        </button>

        <button
          className="session-form__demo button"
          type="button"
          onClick={this.demoLimitedUser}
        >
          Demo (Child User)&nbsp;
          <Tooltip
            placement="top"
            title={
              <span style={{ fontSize: "1.1rem" }}>
                A child user can receive and complete assigned tasks from a
                parent user and can create & complete additional personal tasks.
              </span>
            }
          >
            <HelpIcon />
          </Tooltip>
        </button>
      </form>
    );
  }
}

export default withRouter(LoginForm);
