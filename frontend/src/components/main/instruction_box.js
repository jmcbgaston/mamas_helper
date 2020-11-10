import React from "react";

class InstructionBox extends React.Component {
  render()
  {
    return (
      <div className="instruction-box">
        <p>Welcome to Mama's Helper!</p>
        <p>
          Mama's Helper is a mobile-optimized site that allows users to make
          sure they have everything they need for the tasks they have for the
          day.
        </p>
        <p></p>
        <p>
          Getting started is simple. Create a task, then select the task to add
          or remove the required items for that task.
        </p>
        <p>Task: Jesse's soccer game</p>
        <p>Requirements:</p>
        <p>- car keys</p>
        <p>- wallet</p>
        <p>- soccer</p>
        <p>- ball</p>
        <p>- orange slices for the team</p>
        <p>
          Once your tasks are set up, get your day started by choosing the tasks
          on your to-do list so that you can make sure that you have everything
          you need to get things done.
        </p>
      </div>
    );
  }
}

export default InstructionBox;