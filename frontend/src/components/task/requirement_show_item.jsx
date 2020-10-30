import React from 'react'; 
import reusable_img from './reusable.png';

const RequirementShowItem = ({requirement }) => {
    return (
        <div className = "requirement-show-container">
            <h1 className = "description-show-title">➼ {requirement.description}</h1>
            <span>{requirement.reusable ? <img className="reusable reusable-task-show" alt="reusable" src={reusable_img} /> : null}</span>
                
        </div>
    )
}; 

export default RequirementShowItem; 