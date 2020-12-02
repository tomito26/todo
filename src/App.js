import React, { Component } from 'react';
import {TodoBanner} from './TodoBanner';
import {TodoCreator} from './TodoCreator';
import {TodoRow} from './TodoRow';
import { VisibilityControl } from "./VisibilityControl";

 class App extends Component {
   constructor(props){
     super(props)
     this.state = {
       userName:'Tom',
       todoItems:[{action:"Buy Flowers", done:false},
                  {action:"Get Shoes",done:false},
                  {action:"Collect Tickets", done:true},
                  {action:"Call James",done:false},],
        showCompleted:true 
    }
  }
  updateNewTextValue = (event)=>{
    this.setState({ newItemText: event.target.value });
  }
  createNewTodo = (task) =>{
    if(!this.state.todoItems.find(item=>item.action === task)){
      this.setState({
        todoItems: [ ...this.state.todoItems, { action: task, done:false}]
      },() => localStorage.setItem("todos", JSON.stringify(this.state)));
    }
  }
  
  toggleTodo = (todo) =>this.setState({todoItems:
    this.state.todoItems.map(item=>item.action === todo.action ? {...item,done:!item.done} : item)});

  todoTableRows = (doneValue) => this.state.todoItems.filter(item =>item.done === doneValue).map(item=>
    <TodoRow key={item.action} item={ item } callback={this.toggleTodo} />);


  componentDidMount = () => {
    let data = localStorage.getItem("todos");
    this.setState(data != null
        ? JSON.parse(data)
        : {
            userName: "Tom",
            todoItems:[
                          {action:"Buy Flowers", done:false},
                          {action:"Get Shoes", done:false},
                          {action:"Collect Tickets",done:true},
                          {action:"Call James",done:false}
                      ],
              showCompleted: true
          });
  }
  render() {
    return (
      <div>
        <div className="bg-info">
          <div className="p-2 text-center">
            <TodoBanner name={this.state.userName} tasks={this.state.todoItems} />
          </div>
        </div>

        <div className="container-fluid  pt-5 mt-5">
          <div className="row mt-5">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <TodoCreator callback={this.createNewTodo} />
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Done</th>
                  </tr>
                </thead>
                <tbody>{this.todoTableRows(false)}</tbody>
              </table>
              <div className="bg-secondary text-center p-2">
                <VisibilityControl description="Complete Task" ischecked={this.state.showCompleted} callback={(checked)=>this.setState({showCompleted: checked})}/>
              </div>
              { this.state.showCompleted &&
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr><th>Description</th><th>DOne</th></tr>
                    </thead>
                    <tbody>{this.todoTableRows(true)}</tbody>
                  </table>
              }
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App

