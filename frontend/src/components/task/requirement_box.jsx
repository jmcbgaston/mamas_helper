import React from 'react';
import reusable_img from "./reusable.png";

class RequirementBox extends React.Component {
  render() {
    const { description, reusable } = this.props;

    return (
      <li className="requirement-box-container">
        <p className = "requirement-description">{description}</p>
        {reusable ? <img className = "reusable" src={reusable_img} alt="recycle-logo" /> : "" }
      </li>
    )
  }
}

export default RequirementBox;
