import React from 'react';
import Reusable from '../../reusable/reusable';

const TaskShowRequirementItems = ({ requirement }) => {
    return (
      <li className="requirements-list-item">
        <h3 className = "description-show-title">➼ {requirement.description}</h3>
        { requirement.reusable ? <Reusable /> : null }
      </li>
    )
};

export default TaskShowRequirementItems;
