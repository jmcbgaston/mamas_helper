import React from 'react';
import Reusable from '../../reusable/reusable';
import CheckIcon from '@material-ui/icons/Check';
import {green} from '@material-ui/core/colors';

const TaskShowRequirementItems = ({ requirement }) => {
    return (
      <li className="requirements-list-item">
        <h3>
          <CheckIcon style={{color: green[500]}}/>
          {requirement.description}
        </h3>
        { requirement.reusable ? <Reusable /> : null }
      </li>
    )
};

export default TaskShowRequirementItems;
