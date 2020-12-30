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

class Body extends React.Component {
  render() {
    return (
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
                  <Input type="name" name="first-name" placeholder="First name" />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Surname</Label>
                  <Input type="name" name="surname" placeholder="Surname" />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label>Email</Label>
              <Input type="email" name="email" placeholder="Email" />
            </FormGroup>
            <FormGroup>
              <Label>Address</Label>
              <Input type="text" name="address" placeholder="1234 Main St" />
            </FormGroup>
            <FormGroup>
              <Label>Address 2</Label>
              <Input
                type="text"
                name="address2"
                placeholder="Apartment, studio, or floor"
              />
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label>City</Label>
                  <Input type="text" name="city" placeholder="City" />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label>Province or territory</Label>
                  <Input type="select" name="province">
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
                  <Input type="text" name="postal-code" placeholder="Postal code" />
                </FormGroup>
              </Col>
            </Row>
            <Button color="primary">Register</Button>
          </Form>
        </CardBody>
      </Card>
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
