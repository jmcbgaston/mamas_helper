import React from "react"
import { Link } from 'react-router-dom'; 

class TaskIndexItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <li className="task-title">
        <Link to={`/startmyday/${this.props.task._id}`}>{this.props.task.title}</Link>
      </li>
    )
  }
}

export default TaskIndexItem