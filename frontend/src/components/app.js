import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import TaskShowContainer from './task/task_show/task_show_container'
import TaskIndexContainer from './task/task_index/task_index_container'
import TaskUpdateContainer from './task/task_update/task_update_container';

import Footer from './footer/footer';
import About from './about/about';

import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import '../css/reset.css';
import '../css/app.css';
import '../css/navbar.css'
import '../css/about.css'
import '../css/session_forms.css';
import '../css/task/task_index.css'
import '../css/task/task_index_list.css'
import '../css/task/task_show.css'
import '../css/task/task_update.css'
import '../css/requirements/requirement_show.css'
import '../css/delete_confirmation.css'
import '../css/task/task_slider.css'
import '../css/task/task_tab.css';

const App = () => (
    <>
      <NavBarContainer />
      <div className='content-container'>
        <div className='content'>
        <Switch>
            <ProtectedRoute exact path='/' component={TaskIndexContainer} />
            <Route exact path='/about' component={About} />
            <AuthRoute exact path='/login' component={LoginFormContainer} />
            <AuthRoute exact path='/signup' component={SignupFormContainer} />
            <ProtectedRoute exact path = '/tasks/:taskId' component ={TaskShowContainer} />
            <ProtectedRoute exact path = '/tasks/:taskId/edit' component ={TaskUpdateContainer} />
            <Route path="*">
              <Redirect to="/" />
          </Route>
        </Switch>
        </div>
      </div>
      <Footer />
    </>

);

export default App;
