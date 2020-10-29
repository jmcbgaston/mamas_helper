import React from 'react';
import RequirementShowItem from './requirement_show_item'; 

class RealTaskShow extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.fetchTask(this.props.match.params.taskId); 
    }

    render() {
        return (
            <div>
                {(this.props.task) ? <h1>{this.props.task.title}</h1> : console.log("")}
                {(this.props.task) ? <h1>{this.props.task.requirements.map((requirement) => <RequirementShowItem requirement={requirement} /> )}</h1> : console.log("")}
            </div>
        )

    }
}; 

export default RealTaskShow; 