import React from 'react';
import RequirementShowItem from './requirements_show_item';

const RequirementsShow = ({ requirements }) => {
  return (
    <ul className="requirements-list">
      {requirements.map((requirement) => <RequirementShowItem requirement={requirement} />)}
    </ul>
  )
}

export default RequirementsShow;
