import React from 'react';
import { withRouter } from 'react-router-dom';
import SessionInstructionBox from './session_instruction_box';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        handle: '',
        password: '',
        password2: '',
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
    debugger
    if (e.currentTarget.checked) {
      this.state.user.isLimitedUser = true
      let att = document.getElementById('conditional-show')
      att.setAttribute('type', '')
      debugger
    } else {
      this.state.user.isLimitedUser = false
      let att = document.getElementById('conditional-show')
      att.setAttribute('type', 'hidden')
      debugger
    }
    debugger
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

        <input
          className="session-form__submit button"
          type="submit"
          value="Sign Up"
        />

        <label>
          <input 
            type="checkbox" 
            onClick={this.handleLimited} />
            Check box if Limited User

        <br/>
        <input
          id="conditional-show"
          type="hidden"
          className={`session-form__input-field input-field ${this.addErrorsClass(
            "parentId"
            )}`}
            value={user.parentID}
            onChange={this.update("parentId")}
            placeholder="User ID"
            />
        </label>

      </form>
    );
  }
}

export default withRouter(SignupForm);
