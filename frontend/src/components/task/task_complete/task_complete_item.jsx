import React from 'react';

const TaskCompleteItem = ( {task} ) => {
    let hour = new Date(task.updatedAt).getHours();
    let minute = new Date(task.updatedAt).getMinutes();
    let second = new Date(task.updatedAt).getSeconds();
    return (
        <div>
            <h2>{task.title}</h2>
            <h2>{new Date(task.updatedAt.slice(0, 10)).toDateString()}</h2>
            <h2>{hour}:{minute}:{second}</h2>
        </div>

    )
};

export default TaskCompleteItem;