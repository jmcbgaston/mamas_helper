import React from 'react'; 

class EditTask extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.fetchTask(this.props.match.params.taskId)
    }

    render() {
        return (
            <div>
                EDIT ME!
            </div>
        )
    }
}; 

export default EditTask; 