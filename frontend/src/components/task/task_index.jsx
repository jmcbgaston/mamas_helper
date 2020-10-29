import React from "react"
import TaskIndexItem from "./task_index_item";
import TaskForm from "./task_form";

class TaskIndex extends React.Component {    
  componentDidMount() {

    this.props.fetchTasks(this.props.user.id);
  }

  render() {

    debugger

    const taskList = this.props.tasks.map((task) => {
      return <TaskIndexItem  key={task._id} task={task} />;
    });
    return (
      <div>
          {taskList}
          <TaskForm createTask={this.props.createTask} errors={this.props.errors} />
      </div>
    );
  }
}

export default TaskIndex