import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

import User from "../../utils/User";

const PrimaryInfo = () => (
  <Card>
    <CardHeader>
      <CardTitle tag="h5" className="mb-0">
        Primary info
      </CardTitle>
    </CardHeader>
    <CardBody>
      <Row>
        <Col md="8">
          <Label>{`Username: ${User.getUsername()}`}</Label>
        </Col>
      </Row>
      <Row>
        <Col md="8">
          <Label>{`Display name: ${User.getDisplayName()}`}</Label>
        </Col>
      </Row>
    </CardBody>
  </Card>
);

const ContactInfo = () => {
  const userRootData = User.getRootData();
  const user = User.getRootData().user;

  if (user.username === 'admin') {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h5" className="mb-0">
          Contact info
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Form>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="firstName">First name</Label>
                <Input
                  type="text"
                  name="text"
                  id="firstName"
                  value={user.first_name}
                  disabled={true}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="lastName">Last name</Label>
                <Input
                  type="text"
                  name="text"
                  id="lastName"
                  value={user.last_name}
                  disabled={true}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" value={user.email} disabled={true} />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input
              type="text"
              name="address"
              id="address"
              value={userRootData.user_data.address1}
              disabled={true}
            />
          </FormGroup>
          <FormGroup>
            <Label for="address2">Address 2</Label>
            <Input
              type="text"
              name="address2"
              id="address2"
              value={userRootData.user_data.address2}
              disabled={true}
            />
          </FormGroup>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="city">City</Label>
                <Input
                  type="text" name="city" id="city"
                  value={userRootData.user_data.city}
                  disabled={true}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>Province or Territory</Label>
                <Input
                  type="text"
                  value={userRootData.user_data.province}
                  disabled={true}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label>Zip</Label>
                <Input
                  type="text"
                  value={userRootData.user_data.postalCode}
                  disabled={true}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
}

const Profile = () => (
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Profile</h1>

    <Row>
      <Col>
        <PrimaryInfo />
        <ContactInfo />
      </Col>
    </Row>
  </Container>
);

export default Profile;
