import React from "react"
import { Link } from 'react-router-dom'; 

class TaskIndexItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    // debugger
          
    return(
      <>
        <ul className="start-my-day-list-item">
          <Link to={`/startmyday/${this.props.task._id}`}>
            <li className="task-title">{this.props.task.title}</li>
          </Link>
        </ul>
      </>
    )
  }
}

export default TaskIndexItem