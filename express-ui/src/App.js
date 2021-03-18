import React, { Component } from 'react'
import { Route } from "react-router-dom";
import { Header } from "./components";
import { LoginPage, LandingPage, RegisterPage, VerifyPage } from "./pages";

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
      </div>
    );
  }
}

export default App;
