import React, { Component } from "react";
import { Link } from "react-router-dom";

class LoginPage extends Component {
  state = {};
  render() {
    return <div>
        
        Login page
        <Link to="/register"> register</Link>
        </div>;
  }
}

export default LoginPage
