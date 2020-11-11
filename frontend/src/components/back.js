import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Back = ({ history }) => (
  <button type="button"
    className="task-show__option back-button button"
    onClick={() => history.goBack()}>
      <ArrowBackIcon />&nbsp;Back
  </button>
)

export default Back;
