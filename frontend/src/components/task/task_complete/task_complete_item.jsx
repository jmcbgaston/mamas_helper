import React from 'react';
import { Link } from 'react-router-dom';
import Back from '../../back';
import {withRouter} from 'react-router-dom';

const TaskCompleteItem = ( {task, history} ) => {
    return (
        <div>
            <div>
                <h2>{task.title}</h2>
                <h2>{task.updatedAt}</h2>
            </div>
                {/* < Back history={history}/> */}
        </div>

    )
};

// export default withRouter(TaskCompleteItem);
export default TaskCompleteItem;