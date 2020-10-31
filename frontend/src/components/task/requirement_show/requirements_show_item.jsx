import React from 'react';
import Reusable from '../../reusable/reusable';

const RequirementShowItem = ({ requirement }) => {
    return (
      <li className="requiements-list-item">
        <h3 className = "description-show-title">➼ {requirement.description}</h3>
        { requirement.reusable ? <Reusable /> : null }
      </li>
    )
};

export default RequirementShowItem;
