//NB: Deprecated file, no longer used in project

import React from 'react';
import { Link } from 'react-router-dom';
import startmyday from './start_my_day.png';
import InstructionBox from '../task/task_index/task_instruction_box';

const MainPage = () => (
  <div className = 'main-page'>
    <Link to="/startmyday">
      <img src={startmyday} alt="Start My Day" />
    </Link>
  </div>
);

export default MainPage;
