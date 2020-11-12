import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";
//
export const FETCH_USER = "FETCH_USER";
//

const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
});

const receiveUserSignIn = () => ({
    type: RECEIVE_USER_SIGN_IN
});

const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

//
const receiveUser = (user) => ({
    type: FETCH_USER, 
    user
})


export const fetchUser = (user) => dispatch => {
    debugger
    return(
        APIUtil.fetchUser(user.id).then(() => (
            dispatch(receiveUser(user))
        ))
    )
}
//

export const clearErrors = () => dispatch => {
  return dispatch(receiveErrors([]));
}

export const signup = user => dispatch => {
    debugger
    return(
        APIUtil.signup(user).then(() => (
            dispatch(receiveUserSignIn())
        ), err => (
            dispatch(receiveErrors(err.response.data))
        ))
    )
};

export const login = user => dispatch => {
    debugger
    return(
        APIUtil.login(user).then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            APIUtil.setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(receiveCurrentUser(decoded))
        })
        .catch(err => {
            dispatch(receiveErrors(err.response.data));
        })
    )
};

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken')
    APIUtil.setAuthToken(false)
    dispatch(logoutUser())
};
