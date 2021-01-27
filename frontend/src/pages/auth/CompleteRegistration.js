import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import * as Actions from '../../redux/actions/completeRegistrationActions';
import ConfirmDialog from "../../components/ConfirmDialog";
import TooltipItem from "../../components/TooltipItem";

class CompleteRegistration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      registerToken: '',
      password: '',
      confirmPassword: '',

      dialog: {
        open: false,
        msg: '',
        title: '',
      }
    };

    this.onSubmit = Actions.onSubmit.bind(this);
    this.submitButtonEnabled = Actions.submitButtonEnabled.bind(this);
    this.showSuccessDialog = Actions.showSuccessDialog.bind(this);
    this.showErrorDialog = Actions.showErrorDialog.bind(this);
    this.toggleDialog = Actions.toggleDialog.bind(this);
    this.onUsernameChanged = Actions.onUsernameChanged.bind(this);
    this.onRegisterTokenChanged = Actions.onRegisterTokenChanged.bind(this);
    this.onPasswordChanged = Actions.onPasswordChanged.bind(this);
    this.onConfirmPasswordChanged = Actions.onConfirmPasswordChanged.bind(this);
  }

  render() {
    return (
      <React.Fragment>
        <div className="text-center mt-4">
          <h1 className="h2">Complete registration</h1>
        </div>

        <Card>
          <CardBody>
            <div className="m-sm-4">
              <Form>
                <FormGroup>
                  <Label>Username</Label>
                  <Input
                    bsSize="lg"
                    type="username"
                    name="username"
                    placeholder="Enter your username"
                    onChange={this.onUsernameChanged}
                  />
                </FormGroup>
                <FormGroup>
                  <TooltipItem title="Enter the registration token you received in your 'complete registration' email">
                    <Label>Register token</Label>
                    {' '}<FontAwesomeIcon icon={faQuestionCircle} />
                  </TooltipItem>
                  <Input
                    bsSize="lg"
                    type="password"
                    name="register-token"
                    placeholder="Enter registration token"
                    onChange={this.onRegisterTokenChanged}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    bsSize="lg"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    onChange={this.onPasswordChanged}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    bsSize="lg"
                    type="password"
                    name="password-confirm"
                    placeholder="Re-enter password"
                    onChange={this.onConfirmPasswordChanged}
                  />
                </FormGroup>
                <div className="text-center mt-3">
                  <Link to="/dashboard/default">
                    <Button
                      type="submit" color="primary" size="lg"
                      name="submit-btn"
                      disabled={!this.submitButtonEnabled()}
                      onClick={this.onSubmit}
                      onSubmit={this.onSubmit}
                    >
                      Complete registration
                    </Button>
                  </Link>
                </div>
              </Form>
            </div>
          </CardBody>
        </Card>

        {
          !this.state.dialog.open
            ? null
            : (
              <ConfirmDialog
                open={this.state.dialog.open}
                msg={this.state.dialog.msg}
                title={this.state.dialog.title}
                htmlName="confirm-dialog"
                msgHtmlName="confirm-dialog-msg"
                toggleOpenFn={this.toggleDialog}
              />
            )
        }

      </React.Fragment>
    );
  }
}

export default CompleteRegistration;
