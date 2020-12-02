import React, { Component } from 'react'

export class TodoCreator extends Component {
    constructor(props){
        super(props)
        this.state = {
            newItem:""
        }
    }
    updateNewTextValue = (event)=>{
        this.setState({newItemText: event.target.value});
    }
    createNewTodo = () =>{
        this.props.callback(this.state.newItemText);
        this.setState({newItemText:""});
    }

    render() {
        return (
          <div className="my-1 d-flex">
            <input
              className="form-control"
              value={this.state.newItemText}
              onChange={this.updateNewTextValue}
            />
            <button
              className="btn btn-primary"
              onClick={this.createNewTodo}
            >Add</button>
          </div>
        );
    }
}

export default TodoCreator
