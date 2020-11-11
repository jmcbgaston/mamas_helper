import React from 'react';
import Reusable from '../../reusable/reusable';

const TaskShowRequirementItems = ({ requirement }) => {
    return (
      <li className="requirements-list-item">
        <h3>
          <span className="requirements-list-item__bullet-point">➼</span>
          {requirement.description}
        </h3>
        { requirement.reusable ? <Reusable /> : null }
      </li>
    )
};

export default TaskShowRequirementItems;
