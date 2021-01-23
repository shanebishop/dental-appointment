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
import store from "../../redux/store";
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";

const PrimaryInfo = ({ user }) => (
  <Card>
    <CardHeader>
      <CardTitle tag="h5" className="mb-0">
        Primary info
      </CardTitle>
    </CardHeader>
    <CardBody>
      <Row>
        <Col md="8">
          <Label id="username-lbl">{`Username: ${user.username}`}</Label>
        </Col>
      </Row>
      <Row>
        <Col md="8">
          <Label id="display-name-lbl">{`Display name: ${User.getDisplayName(user)}`}</Label>
        </Col>
      </Row>
    </CardBody>
  </Card>
);

PrimaryInfo.propTypes = {
  user: PropTypes.object.isRequired
};

const ContactInfo = ({ user }) => {
  if (user.username === 'admin') {
    return null;
  }

  return (
    <Card id="contact-info-card">
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
              value={user.address1}
              disabled={true}
            />
          </FormGroup>
          <FormGroup>
            <Label for="address2">Address 2</Label>
            <Input
              type="text"
              name="address2"
              id="address2"
              value={user.address2}
              disabled={true}
            />
          </FormGroup>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="city">City</Label>
                <Input
                  type="text" name="city" id="city"
                  value={user.city}
                  disabled={true}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>Province or territory</Label>
                <Input
                  type="text"
                  id="province"
                  value={user.province}
                  disabled={true}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label>Postal code</Label>
                <Input
                  type="text"
                  id="postalCode"
                  value={user.postalCode}
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

ContactInfo.propTypes = {
  user: PropTypes.object.isRequired
};

class Profile extends React.Component {
  constructor(props) {
    super(props);

    const clientPropProvided = props && props.location && props.location.state && props.location.state.client;

    let user;

    if (clientPropProvided) {
      user = props.location.state.client;
    } else {
      const userRootData = User.getRootData();
      user = {...userRootData.user, ...userRootData.user_data};
    }

    this.state = {
      clientPropProvided,
      user
    };
  }

  render() {
    if (!store.getState().auth.loggedIn) {
      return <Redirect to={{ pathname: '/auth/sign-in', state: { from: window.location.pathname } }} />
    }

    return (
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">
          {this.state.clientPropProvided ? `Profile for Client ${this.state.user.username}` : 'Profile'}
        </h1>

        <Row>
          <Col>
            <PrimaryInfo user={this.state.user} />
            <ContactInfo user={this.state.user} />
          </Col>
        </Row>
      </Container>
    );
  }
}

// Since this page can be accessed directly by URL, it is possible it will
// receive no props. Therefore, all props are technically optional.
Profile.propTypes = {
  location: PropTypes.object
};

export default Profile;
