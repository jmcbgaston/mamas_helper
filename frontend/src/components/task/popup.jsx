import React from 'react';
import "../../css/popup.css"; 

class Popup extends React.Component {
    render () {
        return (
            <div className="popup">
                <div className="inner-popup">
                    <h1 className="modal-text">To Add Requirements, please click on the Task and then click Edit Task. Sorry for the inconvenience.  </h1>
                    <button onClick={this.props.closePopup}>X</button>
                </div>
            </div>
        )
    }
}; 

export default Popup; 