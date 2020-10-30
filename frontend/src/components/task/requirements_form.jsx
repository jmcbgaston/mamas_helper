import React from 'react'

class RequirementsForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            description: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleButton = this.handleButton.bind(this)
    }

    handleChange(e) {
        debugger

        return (
          this.setState({description: e.currentTarget.value})
        )
    }

    handleButton(e) {
        e.preventDefault();
        let newRequirement = { description: e.currentTarget.value, reusable: false }
        this.props.task.requirements.push(newRequirement); 
        this.setState({
          description: ""
        });
    }

    render() {
        debugger

        return (
            <div>
                <input 
                    type="text" 
                    value={this.state.description} 
                    onChange={this.handleChange} 
                />
                <button 
                    type="button" 
                    onClick={this.handleButton}>
                        Add item to list
                </button>
            </div>
        )
    }
}

export default RequirementsForm