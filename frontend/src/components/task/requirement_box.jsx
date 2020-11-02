import React from 'react';
import Reusable from '../../reusable/reusable';

class RequirementBox extends React.Component {
  render() {
    const { description, reusable } = this.props;

    return (
      <li className="requirement-box-container">
        <p className = "requirement-description">{description}</p>
        {reusable ? <Reusable /> : null }
      </li>
    )
  }
}

export default RequirementBox;
