import React from 'react';
import store from "../../redux/store";
import { Redirect } from "react-router-dom";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  FormGroup,
  Form,
  Label,
  Row,
  Col,
  Input,
  Button,
  Container,
} from 'reactstrap';

import * as Actions from '../../redux/actions/registerUserActions';
import ConfirmDialog from "../../components/ConfirmDialog";

class Body extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      firstName: '',
      surname: '',
      email: '',
      address1: '',
      address2: '',
      city: '',
      province: '',
      postalCode: '',

      dialog: {
        open: false,
        msg: '',
        title: '',
      }
    };

    this.onSubmit = Actions.onSubmit.bind(this);
    this.onUsernameChanged = Actions.onUsernameChanged.bind(this);
    this.onEmailChanged = Actions.onEmailChanged.bind(this);
    this.onFirstNameChanged = Actions.onFirstNameChanged.bind(this);
    this.onSurnameChanged = Actions.onSurnameChanged.bind(this);
    this.onAddress1Changed = Actions.onAddress1Changed.bind(this);
    this.onAddress2Changed = Actions.onAddress2Changed.bind(this);
    this.onCityChanged = Actions.onCityChanged.bind(this);
    this.onProvinceChanged = Actions.onProvinceChanged.bind(this);
    this.onPostalCodeChanged = Actions.onPostalCodeChanged.bind(this);
    this.registerButtonEnabled = Actions.registerButtonEnabled.bind(this);
    this.toggleDialog = Actions.toggleDialog.bind(this);
    this.showSuccessDialog = Actions.showSuccessDialog.bind(this);
    this.showErrorDialog = Actions.showErrorDialog.bind(this);
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle tag="h6" className="text-center mt-4">Register User</CardTitle>
          </CardHeader>
          <CardBody>
            <Form>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>First name</Label>
                    <Input
                      type="name" name="first-name" placeholder="First name"
                      onChange={this.onFirstNameChanged}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Surname</Label>
                    <Input
                      type="name" name="surname" placeholder="Surname"
                      onChange={this.onSurnameChanged}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>Username</Label>
                    <Input
                      type="username" name="username" placeholder="Username"
                      onChange={this.onUsernameChanged}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      type="email" name="email" placeholder="Email address"
                      onChange={this.onEmailChanged}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label>Address</Label>
                <Input
                  type="text" name="address" placeholder="1234 Main St"
                  onChange={this.onAddress1Changed}
                />
              </FormGroup>
              <FormGroup>
                <Label>Address 2</Label>
                <Input
                  type="text"
                  name="address2"
                  placeholder="Apartment, studio, or floor"
                  onChange={this.onAddress2Changed}
                />
              </FormGroup>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>City</Label>
                    <Input
                      type="text" name="city" placeholder="City"
                      onChange={this.onCityChanged}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label>Province or territory</Label>
                    <Input type="select" name="province" onChange={this.onProvinceChanged}>
                      <option />
                      <option>Alberta</option>
                      <option>British Columbia</option>
                      <option>Manitoba</option>
                      <option>New Brunswick</option>
                      <option>Newfoundland and Labrador</option>
                      <option>Northwest Territories</option>
                      <option>Nova Scotia</option>
                      <option>Nunavut</option>
                      <option>Ontario</option>
                      <option>Prince Edward Island</option>
                      <option>Quebec</option>
                      <option>Saskatchewan</option>
                      <option>Yukon</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label>Postal code</Label>
                    <Input
                      type="text" name="postal-code" placeholder="Postal code"
                      onChange={this.onPostalCodeChanged}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button
                type="submit" color="primary"
                name="register-btn"
                disabled={!this.registerButtonEnabled()}
                onClick={this.onSubmit}
                onSubmit={this.onSubmit}
              >
                Register
              </Button>
            </Form>
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
                htmlName="register-dialog"
                msgHtmlName="register-dialog-msg"
                toggleOpenFn={this.toggleDialog}
              />
            )
        }

      </React.Fragment>
    );
  }
}

class RegisterUser extends React.Component {
  render() {
    if (!store.getState().auth.loggedIn) {
      return <Redirect to={{ pathname: '/auth/sign-in', state: { from: window.location.pathname } }} />
    }

    return (
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Register User</h1>
        <Body {...this.props} />
      </Container>
    );
  }
}

export default RegisterUser;
