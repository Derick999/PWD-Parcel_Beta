import React, { Component } from 'react'
import { Route } from "react-router-dom";
import { Header } from "./components";
import { 
  LoginPage, 
  LandingPage, 
  RegisterPage, 
  VerifyPage, 
  CartPage} from "./pages";

class App extends Component {
  state = {};
  render() {
    return (
      <div>
       <Header/>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login"  component={LoginPage} />
        <Route path="/register"  component={RegisterPage} />
        <Route path="/verify"  component={VerifyPage} />
        <Route path="/cart"  component={CartPage} />

      </div>
    );
  }
}

export default App;
