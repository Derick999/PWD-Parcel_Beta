import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input,Spinner} from 'reactstrap';
import { connect } from "react-redux";
import { registerAction } from "../redux/actions";


class RegisterPage extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    formErrors: {email: '', password: '', username: ''},
    usernameValid : false,
    emailValid: false,
    passwordValid: false,
    formValid: false
  };

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }



 FormErrors = ({formErrors}) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <p key={i}>{fieldName} {formErrors[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
  </div>

  validateField(fieldName, value) {
  let fieldValidationErrors = this.state.formErrors;
  let emailValid = this.state.emailValid;
  let passwordValid = this.state.passwordValid; 
  let usernameValid = this.state.usernameValid; 

  switch(fieldName) {
    case 'email':
      emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      fieldValidationErrors.email = emailValid ? '' : ' is invalid';
      break;
    case 'password':
      passwordValid = value.length >= 6;
      
      fieldValidationErrors.password = passwordValid ? '': ' is too short min 6 character';
      break;
    case 'username':
      usernameValid = value.length > 0 ;
      fieldValidationErrors.username = usernameValid ? '' : ' empty';
      break;
    default:
      break;
  }
  this.setState({formErrors: fieldValidationErrors,
                  usernameValid: usernameValid,
                  emailValid: emailValid,
                  passwordValid: passwordValid
                }, this.validateForm);
}

validateForm() {
  this.setState({formValid: this.state.usernameValid && this.state.emailValid && this.state.passwordValid});
}

errorClass(error) {
  return(error.length === 0 ? '' : 'has-error');
}


  render() {
    const { loading, registerAction } = this.props;
    return(
      <div  style={{paddingTop:"40px"}} >
        <div className="container" 
        style={{ width:"500px", paddingTop:"20px", borderStyle: "solid", borderRadius: "20px", borderColor: "brown" }}>
      
      <Form >
  
      <h2>Register Page</h2>
      <div className="panel panel-default" style={{color:"red"}}>
          <this.FormErrors formErrors={this.state.formErrors} />
        </div>
        
      <FormGroup >
        <Label for="username">Username</Label>
        <Input type="text" 
        name="username"
        placeholder="enter username" 
        value={this.state.username}
        onChange={this.handleUserInput}/>
      </FormGroup>
      
      <FormGroup >
        <Label for="email">Email</Label>
        <Input type="email" 
        name="email"
        placeholder="enter Email" 
        value={this.state.email}
        onChange={this.handleUserInput}/>
      </FormGroup>

      <FormGroup >
        <Label for="password">Password</Label>
        <Input type="password" 
        name="password" 
        placeholder="enter password" 
        value={this.state.password}
        onChange={this.handleUserInput} />
      </FormGroup>
      <Button color="primary" disabled={!this.state.formValid} onClick={() => registerAction(this.state)}>
            {loading ? <Spinner /> : "Register"}
          </Button>
      <div style={{paddingTop:"20px"}}/>
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
