import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBModalBody,
  MDBModal,
  MDBCard,
  MDBCardBody,
} from "mdbreact";
import classes from "./Loginform.module.css";
class Login extends Component {
  state = {
    modal: false,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  render() {
    let ShowAlert = null;
    if (this.state.modal) {
      ShowAlert = (
        <MDBContainer className={classes.modal}>
          <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
            <MDBModalBody>Logged in successfully !...</MDBModalBody>
          </MDBModal>
        </MDBContainer>
      );
    }
    return (
      <div className={classes.up}>
        <div className={classes.uperContainer}>
          {ShowAlert}
          <MDBContainer className={classes.login}>
            <MDBRow>
              <MDBCol md="6">
                <MDBCard>
                  <MDBCardBody>
                    <form>
                      <p className="h4 text-center py-4">Sign in</p>
                      <div className="grey-text">
                        <MDBInput
                          label="Your email"
                          icon="envelope"
                          group
                          type="email"
                          value={this.props.valueEmail}
                          onChange={this.props.changeEmail}
                          validate
                          error="wrong"
                          success="right"
                        />

                        <MDBInput
                          label="Your password"
                          icon="lock"
                          group
                          type="password"
                          value={this.props.valuePassword}
                          onChange={this.props.changePassword}
                          validate
                        />
                      </div>
                      <div className="text-center py-4 mt-3">
                        <MDBBtn
                          color="cyan"
                          type="submit"
                          onClick={this.props.clicked}
                        >
                          Sign in
                        </MDBBtn>
                      </div>
                    </form>
                    <MDBBtn color="red" type="reset" onClick={this.props.login}>
                      Sign-up
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    );
  }
}
export default Login;
