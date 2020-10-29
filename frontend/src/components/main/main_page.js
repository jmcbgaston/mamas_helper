import React from 'react';
import { Link } from 'react-router-dom';
import startmyday from './start_my_day.png';

class MainPage extends React.Component {

  render() {
    return (
      <div className = "main-page-container">
        <Link to='/startmyday' className = "start-my-day-button"><img alt = "Start My Day" src={startmyday} /></Link>
        <Link to='/mytasks' ><button className = "splash-my-tasks">My Tasks</button></Link>
      </div>
    );
  }
}

export default MainPage;