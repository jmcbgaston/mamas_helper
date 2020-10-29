import React from "react"
import TaskIndexItem from "./task_index_item";
import TaskForm from "./task_form";

class TaskIndex extends React.Component {    
  componentDidMount() {
    debugger

    this.props.fetchTasks(this.props.user.id);
  }

  render() {
    debugger

    // if (!this.props.tasks.length) {
    //     this.props.tasks = []
    // }

    const taskList = this.props.tasks.map((task) => {
      return <TaskIndexItem key={task._id} task={task} />;
    });
    return (
      <div>
          {taskList}
          <TaskForm createTask={this.props.createTask} />
      </div>
    );
  }
}

export default TaskIndex