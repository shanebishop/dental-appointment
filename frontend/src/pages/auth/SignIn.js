import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import * as Actions from '../../redux/actions/signInActions';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    let redirectedFrom = '/';
    if (props.location && props.location.state && props.location.state.from) {
      redirectedFrom = props.location.state.from;
    }

    this.state = {
      email: '',
      password: '',
      redirectedFrom,
      dialogOpen: false,
    }

    this.toggleDialog = Actions.toggleDialog.bind(this);
    this.showDialog = Actions.showDialog.bind(this);
    this.login = Actions.login.bind(this);
    this.handleEmailChange = Actions.handleEmailChange.bind(this);
    this.handlePasswordChange = Actions.handlePasswordChange.bind(this);
    this.signInButtonEnabled = Actions.signInButtonEnabled.bind(this);
  }

  render() {
    return (
      <React.Fragment>
        <div className="text-center mt-4">
          <p className="lead">Sign in to your account to continue</p>
        </div>

        <Card>
          <CardBody>
            <div className="m-sm-4">
              <Form>
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    bsSize="lg"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={this.handleEmailChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    bsSize="lg"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={this.handlePasswordChange}
                  />
                </FormGroup>
                <div className="text-center mt-3">
                  <Link to="/">
                    <Button
                      type="submit" color="primary" size="lg"
                      name="sign-in-btn"
                      disabled={!this.signInButtonEnabled()}
                      onClick={this.login}
                      onSubmit={this.login}
                    >
                      Sign in
                    </Button>
                  </Link>
                </div>
              </Form>
            </div>
          </CardBody>
        </Card>

        <Modal
          isOpen={this.state.dialogOpen}
          toggle={this.toggleDialog}
          name="failed-login-dialog"
        >
          <ModalHeader toggle={this.toggleDialog}>Login Failed</ModalHeader>
          <ModalBody className="text-center m-3">
            <p className="mb-0" name="login-err-msg">
              {this.state.dialogMsg || 'Error message not found'}
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={this.toggleDialog}
            >
              OK
            </Button>
          </ModalFooter>
        </Modal>

      </React.Fragment>
    );
  }
}

SignIn.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
};

export default SignIn;
