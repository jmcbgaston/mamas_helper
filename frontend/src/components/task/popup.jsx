import React from 'react';
import "../../css/popup.css"; 

class Popup extends React.Component {
    render () {
        return (
            <div className="popup">
                <div className="inner-popup">
                    <button onClick={this.props.closePopup}>X</button>
                    <h1 className="modal-text">Your Task has been added!</h1>
                    <h2 className="modal-text">To add Requirements to this task, please select the Task and then select Edit Task.</h2>
                </div>
            </div>
        )
    }
}; 

export default Popup; 