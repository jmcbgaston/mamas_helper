import React from 'react';
import RequirementShowItem from './requirement_show_item'; 
import { Link } from 'react-router-dom';

class TaskShow extends React.Component {
    constructor(props) {
        super(props)
        // this.state = this.props.task; 
    }

    componentDidMount(){
        // debugger
        // this.props.fetchTask(this.state.id);
        this.props.fetchTask(this.props.match.params.taskId); 
    }

    render() {
        // debugger
        // if (!this.state) {
        //     return null; 
        // }
        return (
            <div className="task-show-outer-container"> 

                <div className="task-show-inner-container">
                    {(this.props.task) ? <h1 className="task-show-title">{this.props.task.title}</h1> : console.log("")}
                    {(this.props.task) ? <h1>{this.props.task.requirements.map((requirement) => <RequirementShowItem requirement={requirement} /> )}</h1> : console.log("")}
                </div>
                
                <Link to="/startmyday"><button onClick={ () => (this.props.deleteTask(this.props.task._id))} className = "task-delete">Delete Task</button></Link>
                <Link to={`/startmyday/${this.props.match.params.taskId}/edit`}><button type='button' className='task-edit'>Edit Task</button></Link>
                <Link to={"/startmyday"}><button type='button' className='task-back'>Home</button></Link>
            </div>
        )

    }
}; 

export default TaskShow;