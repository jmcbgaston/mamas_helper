import React from 'react';
import { Link } from 'react-router-dom';
import startmyday from './start_my_day.png';
import InstructionBox from './instruction_box';

const MainPage = () => (
  <>
    <Link to="/startmyday" className="start-my-day-button">
      <img src={startmyday} alt="Start My Day" />
    </Link>
    <InstructionBox />
  </>
);

export default MainPage;
