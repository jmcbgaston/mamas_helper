import React from "react"

class TaskIndexItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    debugger

    return(
      <>
        <ul>
          <li>{this.props.task.title}</li>
        </ul>
      </>
    )
  }
}

export default TaskIndexItem