import React from 'react'; 

class TasksShow extends React.Component {
    // constructor(props) {
    //     // debugger
    //     super(props)
    //     // this.state = {
    //     //     user_id: ""
    //         // tasks: []
    //     }
    // }

    componentDidMount(){
        const { fetchTasks, user, tasks } = this.props;
        // this.setState({ tasks, user_id: user.id })
        // this.setState({ user_id: user.id })
        fetchTasks(user.id)
        
    }

    //  componentDidUpdate(){
    //     const { fetchTasks, user, tasks } = this.props;
    //     this.setState({ tasks, user_id: user.id })
    //     fetchTasks(user.id)
        
    // }

    render(){
        const { tasks } = this.props;

        if (!tasks.length) {
            return null; 
        }
        return(
            <div>
                <ul>
                    {/* { {tasks} ? tasks.map((task) => task.title) : "" } */}
                    { tasks.map((task) => <li key={task._id}>{task.title}</li>) } 
                </ul>

                

            </div>
        )
    }
}

export default TasksShow; 