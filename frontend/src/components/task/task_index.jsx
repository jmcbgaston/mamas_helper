import React from "react"
import TaskIndexItem from "./task_index_item";
import TaskForm from "./task_form";

class TaskIndex extends React.Component {    
  componentDidMount() {

    this.props.fetchTasks(this.props.user.id);
  }

  render() {

    const taskItem = this.props.tasks.map((task) => {
      return (
        <TaskIndexItem className="start-my-day-list-item" key={task._id} task={task} />
      );
    });

    return (
      <div className="start-my-day-container">
          <ul>
            {taskItem}
          </ul>
          <TaskForm createTask={this.props.createTask} errors={this.props.errors} clearErrors={this.props.clearErrors}/>
      </div>
    );
  }
}

export default TaskIndex