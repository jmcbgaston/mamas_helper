import React from 'react';
import { withRouter } from 'react-router-dom';
import SessionInstructionBox from './session_instruction_box';
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from "@material-ui/core/Tooltip";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        handle: '',
        password: '',
        password2: '',
        household: [],
        assignedTasks: [],
        isLimitedUser: false,
        parentId: ''
      },
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLimited = this.handleLimited.bind(this);
    this.clearedErrors = false;

    window.state = this.state
  }

  componentWillReceiveProps(nextProps) {
    const { user } = this.state;

    if (nextProps.signedIn) {
      this.props.login({ email: user.email, password: user.password });
    }

    this.setState({errors: nextProps.errors})
  }

  componentWillUnmount() {
    this.props.clearErrors();
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
    this.props.signup(this.state.user, this.props.history);
  }

  handleLimited(e) {
    if (e.currentTarget.checked) {
      this.state.user.isLimitedUser = true
      let att = document.getElementById('conditional-show')
      att.setAttribute('type', '')
    } else {
      this.state.user.isLimitedUser = false
      let att = document.getElementById('conditional-show')
      att.setAttribute('type', 'hidden')
    }
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
        <SessionInstructionBox />
        <h2 className="session-form__header">Sign up for free!</h2>
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
          type="text"
          className={`session-form__input-field input-field ${this.addErrorsClass(
            "handle"
          )}`}
          value={user.handle}
          onChange={this.update("handle")}
          placeholder="Handle"
        />
        <div className="session-form__errors form-errors">
          {this.renderErrors("handle")}
        </div>

        <input
          type="password"
          className={`session-form__input-field input-field ${this.addErrorsClass(
            "password"
          )}`}
          value={user.password}
          onChange={this.update("password")}
          placeholder="Password"
        />
        <div className="session-form__errors form-errors">
          {this.renderErrors("password")}
        </div>

        <input
          type="password"
          className={`session-form__input-field input-field ${this.addErrorsClass(
            "password2"
          )}`}
          value={user.password2}
          onChange={this.update("password2")}
          placeholder="Confirm Password"
        />
        <div className="session-form__errors form-errors">
          {this.renderErrors("password2")}
        </div>

        <div className="session-form__limited-user">
          <label className="session-form__limited-user-label">
            <input type="checkbox" onClick={this.handleLimited} />
            <div className="session-form__limit-user-header">
              Limited user?&nbsp;
            </div>
          </label>
          <Tooltip
            placement="top"
            title={
              <span style={{ fontSize: "1rem" }}>
                Limited users: Select this option and enter your household's
                parent ID, in order to receive tasks from your parent user.<br/>
                Regular users: Provide your user ID to a new user, in order to add them
                to your household.  <br/>
                Both types of users have the ability to create and use their own tasks.
              </span>
            }
          >
            <HelpIcon />
          </Tooltip>
        </div>
        <input
          id="conditional-show"
          type="hidden"
          className={`session-form__input-field input-field ${this.addErrorsClass(
            "parentId"
          )}`}
          value={user.parentId}
          onChange={this.update("parentId")}
          placeholder="Parent User ID"
        />
        <div className="session-form__errors form-errors">
          {this.renderErrors("parentId")}
        </div>

        <input
          className="session-form__submit button"
          type="submit"
          value="Sign Up"
        />
      </form>
    );
  }
}

export default withRouter(SignupForm);
