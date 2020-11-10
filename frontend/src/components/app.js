import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import TaskShowContainer from './task/task_show/task_show_container'
import TaskIndexContainer from './task/task_index/task_index_container'
import TaskUpdateContainer from './task/task_update/task_update_container';

import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import '../css/reset.css';
import '../css/app.css';
import '../css/navbar.css'
import '../css/session_forms.css';
import '../css/task/task_index.css'
import '../css/task/task_show.css'
import '../css/task/task_update.css'
import '../css/requirements/requirement_show.css'

const App = () => (
    <div className='app-container'>
      <NavBarContainer />
      <div className='content-container'>
        <Switch>
            <ProtectedRoute exact path='/' component={TaskIndexContainer} />
            <AuthRoute exact path='/login' component={LoginFormContainer} />
            <AuthRoute exact path='/signup' component={SignupFormContainer} />
            <ProtectedRoute exact path = '/tasks/:taskId' component ={TaskShowContainer} />
            <ProtectedRoute exact path = '/tasks/:taskId/edit' component ={TaskUpdateContainer} />
        </Switch>
      </div>
    </div>

);

export default App;
