import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout, login } from './actions/session_actions';

// TESTING
import * as TaskActions from './actions/task_actions'
import * as EmailAPIUtil from './util/email_api_util'
window.fetchTasks = TaskActions.fetchTasks
window.fetchTask = TaskActions.fetchTask
window.createTask = TaskActions.createTask
window.updateTask = TaskActions.updateTask
window.deleteTask = TaskActions.deleteTask
window.login = login
window.createEmail = EmailAPIUtil.createEmail
//

document.addEventListener('DOMContentLoaded', () => {
  let store;

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);

    const decodedUser = jwt_decode(localStorage.jwtToken);
    const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };

    store = configureStore(preloadedState);

    //
    window.getState = store.getState
    window.dispatch = store.dispatch
    //

    const currentTime = Date.now() / 1000;


    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
    }
  } else {
    store = configureStore({});

    //
    window.getState = store.getState
    window.dispatch = store.dispatch
    //
  }
  const root = document.getElementById('root');

  ReactDOM.render(<Root store={store} />, root);
});
