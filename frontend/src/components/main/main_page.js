import React from 'react';
import { Link } from 'react-router-dom';
import startmyday from './start_my_day.png';
import InstructionBox from './instruction_box';

const MainPage = () => (
  <div className = 'main-page'>
    <Link to="/startmyday">
      <img src={startmyday} alt="Start My Day" />
    </Link>
    <InstructionBox />
  </div>
);

export default MainPage;
