import * as EmailAPIUtil from '../util/email_api_util';

export const RECEIVE_EMAIL = "RECEIVE_EMAIL";

const receiveEmail = email => ({
  type: RECEIVE_EMAIL,
  email
});

export const createEmail = email => dispatch => {
  return (
    EmailAPIUtil.createEmail(email)
    .then(newEmail => dispatch(receiveEmail(newEmail)))
  )
}
