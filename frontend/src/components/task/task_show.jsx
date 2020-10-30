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
            <div>
                {(this.props.task) ? <h1>{this.props.task.title}</h1> : console.log("")}
                {(this.props.task) ? <h1>{this.props.task.requirements.map((requirement) => <RequirementShowItem requirement={requirement} /> )}</h1> : console.log("")}
            
                <button onClick={ () => (this.props.deleteTask(this.props.task._id))}><Link to="/startmyday">Delete Task</Link></button>
                <Link to={`/startmyday/${this.props.match.params.taskId}/edit`}>Edit Task</Link>
                {/* <Link to={`/startmyday/${this.props.task._id}/edit`}>Edit Task</Link> */}
                <Link to={"/startmyday"}>Home</Link>
            </div>
        )

    }
}; 

export default TaskShow;