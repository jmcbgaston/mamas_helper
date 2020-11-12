import React from 'react';
import { Link } from 'react-router-dom';
import Back from '../../back';
import {withRouter} from 'react-router-dom';

const TaskCompleteItem = ( {history} ) => {
    return (
        <div>
            <h1>Task Completed List</h1>
            {/* <button><Link to="/"> Click here to go back</Link></button> */}
            < Back history={history}/>
        </div>
    )
};

export default withRouter(TaskCompleteItem);