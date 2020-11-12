import React from 'react';
import { Link } from 'react-router-dom';
import TaskCompleteItem from './task_complete_item';

class TaskComplete extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
                <TaskCompleteItem />
            </div>

        )
    }
};

export default TaskComplete;