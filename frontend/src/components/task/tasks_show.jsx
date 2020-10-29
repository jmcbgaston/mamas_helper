import React from 'react'; 

class TasksShow extends React.Component {
    constructor(props) {
        // debugger
        super(props)
        this.state = {
            user_id: "",
            tasks: []
        }
    }

    componentDidMount(){
        const { fetchTasks, user, tasks } = this.props;
        this.setState({ tasks, user_id: user.id })
        fetchTasks(user.id)
        
    }

    render(){
        const { tasks } = this.state;

        if (!tasks.length) {
            return null; 
        }
        return(
            <div>
                {/* { {tasks} ? tasks.map((task) => task.title) : "" } */}
                { tasks.map((task) => task.title) } 
                

            </div>
        )
    }
}

export default TasksShow; 