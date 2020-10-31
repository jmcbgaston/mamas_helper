import React from 'react';
import { Link } from 'react-router-dom';
import startmyday from './start_my_day.png';

const MainPage = () => (
  <>
    <Link to='/startmyday' className = "start-my-day-button">
      <img src={startmyday} alt="Start My Day" />
    </Link>
  </>
)

export default MainPage;
