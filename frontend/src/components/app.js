import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import TaskShowContainer from './task/task_show/task_show_container'
import TaskIndexContainer from './task/task_index/task_index_container'
import TaskUpdateContainer from './task/task_update/task_update_container';

import MainPage from './main/main_page';
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
import '../css/task/task_show.css'
import '../css/task/task_update.css'
import '../css/requirements/requirement_show.css'

const App = () => (
    <>
      <NavBarContainer />
      <div className='content-container'>
        <div className='content'>
        <Switch>
            <ProtectedRoute exact path='/' component={MainPage} />
            <Route exact path='/about' component={About} />
            <AuthRoute exact path='/login' component={LoginFormContainer} />
            <AuthRoute exact path='/signup' component={SignupFormContainer} />
            <ProtectedRoute exact path ='/startmyday' component={TaskIndexContainer} />
            <ProtectedRoute exact path = '/startmyday/:taskId' component ={TaskShowContainer} />
            <ProtectedRoute exact path = '/startmyday/:taskId/edit' component ={TaskUpdateContainer} />
        </Switch>
        </div>
      </div>
      <Footer />
    </>

);

export default App;
