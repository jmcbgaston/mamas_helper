import React from 'react';
import TaskCompleteItem from './task_complete_item';
import {withRouter} from 'react-router-dom';
import Back from '../../back';

class TaskComplete extends React.Component {
    componentDidMount() {
        this.props.fetchTasks(this.props.user.id)
    }

    render() {
        return(
            <div>
                <h1>Task Completed List</h1>
                <ul>
                    {this.props.tasks.map((task, i) => {
                        return task.completed ?
                          <TaskCompleteItem task={task} key={i} />
                          :
                          null
                    })}
                </ul>
                < Back history={this.props.history}/>
            </div>
        )
    }
};

export default withRouter(TaskComplete);
