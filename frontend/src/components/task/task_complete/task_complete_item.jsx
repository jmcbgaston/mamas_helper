import React from 'react';

const TaskCompleteItem = ( {task} ) => {
    return (
        <div>
            <h2>{task.title}</h2>
            <h2>{task.updatedAt}</h2>
        </div>

    )
};

export default TaskCompleteItem;