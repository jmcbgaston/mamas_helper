import React from 'react';
import TaskBox from './task_box';
import TasksCreateContainer from './tasks_create_container'; 
import '../../css/task.css';

class TasksShow extends React.Component {

    componentDidMount(){
        const { fetchTasks, user } = this.props;
        fetchTasks(user.id)
    }

    render() {
        // debugger 
        const { tasks, history } = this.props;

        if (!tasks.length) {
            return null;
        }

        return(
            <div>

                <div className="start-my-day-container">
                    <ul className="start-my-day-task-list">
                        { tasks.map((task) =>
                        <li className="start-my-day-list-item" key={task._id}>
                            <input type="checkbox" id={task._id} name={task._id} />
                            <TaskBox task={task} />
                        </li>
                        )}
                    </ul>
                    {/* <button className="add-task-button"
                            onClick={() => history.push('/tasks/new')}>
                    Add Task
                    </button> */}
                </div>

                <div className="task-create-component">
                    <TasksCreateContainer />
                </div>


            </div>
        )
    }
}

export default TasksShow;
