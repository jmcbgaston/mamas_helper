import React from 'react';

class RequirementBox extends React.Component {
  render() {
    const { description, reusable } = this.props;

    return (
      <li className="requirement-box-container">
        <p className = "requirement-description">{description}</p>
        {reusable ? <img src="recycle-logo.jpg" alt="recycle-logo" /> : "" }
      </li>
    )
  }
}

export default RequirementBox;
