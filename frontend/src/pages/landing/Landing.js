import React from "react";
import { connect } from "react-redux";
import { enableCorporateTheme } from "../../redux/actions/themeActions";

import {
  Button,
  Col,
  Container,
  Navbar,
  NavbarBrand,
  Row
} from "reactstrap";

import { Home } from "react-feather";

const Navigation = () => (
    <Navbar dark expand className="navbar-landing">
      <NavbarBrand href="/">
        <Home title="Dr. Phil Ing Dental Clinic" />
        Dr. Phil Ing Dental Clinic
      </NavbarBrand>
      <Button
          href='/auth/sign-in'
          color="primary"
          className="ml-auto ml-2"
      >
        Login
      </Button>
    </Navbar>
);

const Body = () => (
    <section className="py-6 bg-white">
      <Container>
        <Row>
          <Col md="12" lg="9" xl="12" className="mx-auto">
            <Row>
              <Col xl="5">
                <h1 className="my-4 font-weight-normal">
                  Welcome to the Dr. Phil Ing Dental Clinic website!
                </h1>

                <p className="text-muted lead">
                  We hope you enjoy your stay.
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
);

class Landing extends React.Component {
  UNSAFE_componentWillMount() {
    const { dispatch } = this.props;
    dispatch(enableCorporateTheme());
  }

  render() {
    return (
        <React.Fragment>
          <Navigation />
          <Body />
        </React.Fragment>
    );
  }
}

export default connect()(Landing);
