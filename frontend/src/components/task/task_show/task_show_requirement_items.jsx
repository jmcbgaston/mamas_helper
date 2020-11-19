import React from 'react';
import Reusable from '../../reusable/reusable';
import req from './requirement-marker.png';

const TaskShowRequirementItems = ({ requirement }) => {
    return (
      <li className="requirements-list-item">
        <h3>
          <img className="list-item__bullet-point" src={req}/>
          {requirement.description}
        </h3>
        { requirement.reusable ? <Reusable /> : null }
      </li>
    )
};

export default TaskShowRequirementItems;
