import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {validate, renderField} from '../shared/validator/validator';
import { fetchUsers } from '../actions/items';
import './login.scss';

class LoginForm extends React.Component  {
  constructor(props) {
    super(props);
    this.state =  {
        username : "",
        password : ""
  }
    this.handleChange = this.handleChange.bind(this);
    this.updateUserName = this.updateUserName.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }
  handleChange(e) {
    e.preventDefault();
    if (this.props.data) {
      var flag =true;
      for (var i = 0 ;i < this.props.data.length; i++) {
          var userInfo  = this.props.data[i];
          if (userInfo.name == this.state.username && userInfo.birth_year == this.state.password) {
            flag =false;
            var userDetail = {
                "username" : this.state.username,
                "password" : this.state.password
            }
            sessionStorage.setItem('userDetail', userDetail);
            this.props.history.push('/dashboard');
          }
      }
      if (flag) {
          if (this.state.username === "" && this.state.password === "") {
            alert("Please fill the user details");
          } else {
            alert("Invalid User");
          }
      }
    }
  } 

  updateUserName(event) {
    this.setState({
      username : event.target.value
    });
  }

  updatePassword(event) {
    this.setState({
      password : event.target.value
    });
  }

  componentWillMount() {
    if (sessionStorage.getItem('userDetail')) {
      this.props.history.push('/dashboard');
    }
  }

  componentDidMount() {
    const { dispatch} = this.props;
    dispatch(fetchUsers());
  }
  render() {
      return ( 
          <div>
              <div className="container-form">
                <div className="row">
                <div className="span12">
                  <form className="form-horizontal">
                    <fieldset>
                      <div id="legend">
                        <legend className="">Login Form</legend>
                      </div>
                      <div className="control-group">
                        <label className="control-label">Username</label>
                        <div className="controls">
                          <input type="text" id="username" name="username" value={this.state.username} onChange={this.updateUserName}  required placeholder="" className="input-xlarge"/>
                        </div>
                      </div>
                      <div className="control-group">
                        <label className="control-label">Password</label>
                        <div className="controls">
                          <input type="password" id="password" name="password" value={this.state.password} onChange={this.updatePassword} required placeholder="" className="input-xlarge"/>
                        </div>
                      </div>
                      <div className="control-group">
                        <div className="controls">
                          <button onClick={this.handleChange} className="btn btn-success">Login</button>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </div>
      );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
      data : state.userData
  }
}

export default connect(mapStateToProps)(LoginForm);