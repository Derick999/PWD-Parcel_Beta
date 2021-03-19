import React, { Component } from "react";
import { emailVerificationAction } from "../redux/actions";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Button, Jumbotron } from "reactstrap";

class VerifyPage extends Component {
  componentDidMount() {
  
    const { emailVerificationAction } = this.props;
    const username = new URLSearchParams(this.props.location.search).get(
      "username"
    );
    const password = new URLSearchParams(this.props.location.search).get(
      "password"
    );
    if (username && password) {
      emailVerificationAction({ username, password });
    }
  }
  render() {
    const { verified } = this.props;
    if (verified === 1) {
      return <Redirect to="/" />;
    }
    return <div>
    <div className="container" 
        style={{ marginTop: "60px", width:"500px", paddingTop:"20px", borderRadius: "20px", border: "solid brown" }}>
        <Jumbotron style={{backgroundColor:"whitesmoke"}}>
        <h2 className="display-3">Selamat</h2>
        <p className="lead">Akun anda telah terferivikasi</p>
        <hr className="my-2" />
        <p>Silahkan login untuk melanjutkan</p>
        <p className="lead">
          <Link to="/login"> <Button color="primary">Login</Button></Link>
        </p>
      </Jumbotron>
      </div>

    </div>
  }
}

const mapStatetoProps = ({ user: { verified } }) => {
  return {
    verified,
  };
};

export default connect(mapStatetoProps, { emailVerificationAction })(
  VerifyPage
);
