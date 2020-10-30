import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class EditTask extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.task; 
        // debugger
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(event) {
        // event.preventDefault();
        this.props.updateTask(this.state)
            .then( () => this.props.history.push('/startmyday'))
            .catch( () => console.log("errrrorrrrsss"))
            // .then( () => <Redirect to="/startmyday" />)
    }

    handleChange(type) {
        return (e) => {
            this.setState({ [type]: e.currentTarget.value })
        }
    }

    componentDidMount(){
        // debugger 
        this.props.fetchTask(this.props.match.params.taskId)
        // debugger 
        this.setState({ ...this.props.task}) 
    }

    render() {
        // debugger 
        // if (!Object.keys(this.props.task).length) {
        //     debugger
        //     return <div>LoAding</div>;
        // }
        if (!this.props.task) {
            // debugger
            return null;
        }
        // debugger
        return (
            <div>
                EDIT ME!
                <form onSubmit={this.handleSubmit}>
                    <label>Title: 
                        <input type="text" value={this.state.title} onChange={this.handleChange('title')} />
                    </label>
                    <p>Requirements:</p>
                    {this.state.requirements.map((requirement) => {
                        return (
                            <label> {requirement.description}
                                <input type="text" value={requirement.description} onChange={this.handleChange('requirements')} />
                            </label>
                        )
                    } )}
                    {/* <label>Requirements:
                        <input type="text" value={this.state.requirements} onChange={this.handleChange('requirements')} />
                    </label> */}
                    <button>Submit</button>
                    {/* <button onClick={ () => console.log("hellllo")}><Link to="/startmyday">Update Task</Link></button> */}
                </form>
                
                {/* <Link to={""}><---back</Link> */}
            </div>
        )
    }
}; 

export default EditTask; 