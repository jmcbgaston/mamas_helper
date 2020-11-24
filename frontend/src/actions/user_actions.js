import * as UserAPIUtil from '../util/user_api_util';

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";

export const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});

export const receiveUserErrors = errors => ({
    type: RECEIVE_USER_ERRORS,
    errors
});

export const fetchUser = userId => dispatch => {
    return (
        UserAPIUtil.getUser(userId)
        .then(user => dispatch(receiveUser(user)))
        .catch(errors => dispatch(receiveUserErrors(errors)))
    );
};

// updates parent user
export const updateUser = user => dispatch => {
    // debugger
    return (
        UserAPIUtil.updateUser(user)
        .then(updatedUser => dispatch(receiveUser(updatedUser)))
        .catch(errors => dispatch(receiveUserErrors(errors)))
    );
}