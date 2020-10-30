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
                
                <button onClick={ () => (this.props.deleteTask(this.props.task._id))} className = "task-delete"><Link to="/startmyday">Delete Task</Link></button>
                <button type='button' className='task-edit'><Link to={`/startmyday/${this.props.match.params.taskId}/edit`}>Edit Task</Link></button>
                <button type='button' className='task-back'><Link to={"/startmyday"}>Home</Link></button>
            </div>
        )

    }
}; 

export default TaskShow;