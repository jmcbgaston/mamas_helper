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
        <ul>
          <Link to={`/startmyday/${this.props.task._id}`}>
            <li>{this.props.task.title}</li>
          </Link>
          
        </ul>
      </>
    )
  }
}

export default TaskIndexItem