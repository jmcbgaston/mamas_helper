import React from "react"

class TaskIndexItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <>
        <ul className="start-my-day-list-item">
          <li className="task-title">{this.props.task.title}</li>
        </ul>
      </>
    )
  }
}

export default TaskIndexItem