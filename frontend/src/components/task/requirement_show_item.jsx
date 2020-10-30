import React from 'react'; 
import reusable_img from './reusable.png';

const RequirementShowItem = ({requirement }) => {
    return (
        <div>
            <h1> Description:{requirement.description}</h1>
            <span>{requirement.reusable ? <img className="reusable" alt="reusable" src={reusable_img} /> : null}</span>  
        </div>
    )
}; 

export default RequirementShowItem; 