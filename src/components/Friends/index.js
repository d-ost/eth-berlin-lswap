import React, {Component} from 'react';
import ls from '../../lib/localStorage';
import style from './style';

import {Button} from "react-bootstrap";
import { Link } from 'react-router-dom';

class Friends extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      users: []
    }
  }

  onUserNameChange = (event) => {
    this.setState({userName: event.target.value});
  }

  onAddUser = () => {
    if(!this.state.userName) return;
    this.setState({ users : [ ...this.state.users ,  ...[this.state.userName] ]});
    this.setState({userName: ""});
  }

  isUsers = () => {
    return this.state.users.length > 0
  }

  showUsers = () =>{
    return this.isUsers() && (
      this.state.users.map((user)=> {
        return  <div className="alert alert-warning" 
         style={{textAlign: "left" , float: "left" , marginRight: "20px"}} role="alert">{user}</div> 
      })
    )
  }

  render() {
    return (
      <div className="container">
        <div className="row">
         
          <div className="alert alert-primary col-12" role="alert">
            Friends
          </div> 

          <div className="col-12">
            <div className="form-group row">
              <label  className="col-sm-2 col-form-label">Username</label>
              <div className="col-6">
                  <input type="text" className="form-control" 
                          style={{backgroundColor: "#fff"}}
                          autocomplete="off"
                          value={this.state.userName}
                          autoFocus={true}
                          onChange={this.onUserNameChange}
                          placeholder="Username" />
              </div>
              <div className="col-4">
                <button className="btn btn-outline-secondary"
                    onClick={this.onAddUser}
                  style={{width: "260px"}}>Add User</button>
              </div>  
              </div>
            </div>  
         </div> 
         {this.showUsers()}
      </div>
    );
  }
}

export default Friends;
