import React, { Component } from 'react'

export class AccessCodeForm extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         accessCode: ''
      }
    }

    handleAccessCodeChange = (event) => {
        this.setState({
            accessCode: event.target.value
        })
    }

    handleSubmit = (event) => {
        alert(`${this.state.accessCode}`)
        event.preventDefault()
    }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
            <div>
                <label>
                    Access Code:
                    <input
                        type='text'
                        value={this.state.accessCode}
                        onChange={this.handleAccessCodeChange}>
                    </input>
                </label>
            </div>
            <button type="submit">
                Submit
            </button>
        </form>
    )
  }
}

export default AccessCodeForm