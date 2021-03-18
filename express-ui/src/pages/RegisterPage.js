import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input,Spinner } from 'reactstrap';
import { connect } from "react-redux";
import { registerAction } from "../redux/actions";


class RegisterPage extends Component {
  state = {
    username: "",
    password: "",
    email: "",
  };

  onChangeInput = (e) => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value,
    });
  };



  render() {
    const { loading, registerAction } = this.props;
    return(
      <div  style={{paddingTop:"40px"}} >
        
        <div className="container" style={{borderStyle: "solid", borderRadius:"12px", height:"400px", width:"500px", paddingTop:"20px"}}>
      <Form >
      <h2>Register Page</h2>
      <FormGroup>
        <Label for="username">Username</Label>
        <Input type="text" 
        id="username" 
        placeholder="enter username" 
        required = "true" 
        onChange={this.onChangeInput}/>
      </FormGroup>
      
      <FormGroup>
        <Label for="email">Email</Label>
        <Input type="email" 
        id="email" 
        placeholder="enter Email" 
        required
        onChange={this.onChangeInput}/>
      </FormGroup>

      <FormGroup>
        <Label for="password">Password</Label>
        <Input type="password" 
        id="password" 
        placeholder="enter password" 
        required
        onChange={this.onChangeInput}/>
      </FormGroup>
      <Button color="primary" disabled={loading} onClick={() => registerAction(this.state)}>
            {loading ? <Spinner /> : "Register"}
          </Button>
      </Form>
      </div>
      </div>
    )
  }
}
const mapStatetoProps = ({ user }) => {
  return {
    username: user.username,
    loading: user.loading,
  };
};

export default connect(mapStatetoProps, { registerAction })(RegisterPage);
