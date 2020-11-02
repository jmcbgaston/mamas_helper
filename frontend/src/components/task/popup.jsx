import React from 'react';
import "../../css/popup.css"; 

class Popup extends React.Component {
    render () {
        return (
            <div className="popup">
                <div className="inner-popup">
                    <h1 className="modal-text">Your Task has been added! To add Requirements to this task, please select the Task and then select Edit Task. </h1>
                    <button onClick={this.props.closePopup}>X</button>
                </div>
            </div>
        )
    }
}; 

export default Popup; 