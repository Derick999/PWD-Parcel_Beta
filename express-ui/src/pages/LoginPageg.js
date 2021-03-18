import React, { Component } from 'react';
import Axios from 'axios'
import {connect} from 'react-redux'
import {Button, Alert, Input} from 'reactstrap'
// import {api_url} from '../helpers/api_url'
import {loginAction} from '../redux/action/userAction'
// import { Redirect } from 'react-router';

class LoginPage extends Component {
  state = { 
    loginInfo: {
      email: "",
      password: "",
    },
   }

   onChangeInput = (e) => {
     this.setState({
       loginInfo:{...this.state.loginInfo, 
        [e.target.value]: e.target.value
      },
     })
   }
   clickLogin = () => {
    const { email, password } = this.state.loginInfo;
    Axios.get(
      `$http://localhost:3000/users?email=${email}&password=${password}`
      )
      .then((res) => {
        if (res.data.length !== 0) {
          this.props.loginAction(res.data[0]);
        } else {
          alert("User Invalid");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
   
   render() {
    //  const { email, password } = this.state.loginInfo
     if(this.props.emailUser !== "") {
       return <Alert color="danger">Email invalid!</Alert>
     }
     return (
      <div>
        <div>
          <Input
            placeholder="email"
            type="email"
            id="email"
            onChange={this.onChangeInput}
          />
          <br />
          <Input
            placeholder="password"
            type="password"
            id="password"
            onChange={this.onChangeInput}
          />
          <br />
          <Button onClick={this.clickLogin}>Log In</Button>
          <Button color="link">Forget password? reset here</Button>
        </div>
      </div>
     )
    }
  }
const mapStateToProps = (state) => {
  return {
    userId: state.user.id,
    emailUser: state.user.email,
  }
}

export default connect(mapStateToProps, {loginAction})(LoginPage)