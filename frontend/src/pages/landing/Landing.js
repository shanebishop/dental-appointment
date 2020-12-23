import React from "react";
import { connect } from "react-redux";
// import { Redirect } from 'react-router-dom';
import { enableCorporateTheme } from "../../redux/actions/themeActions";
// import store from '../../redux/store';
import Sidebar from '../../components/Sidebar';
import Wrapper from '../../components/Wrapper';
import Main from '../../components/Main';

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
    // TODO Fix me once docker-compose works with frontend
    // if (!store.getState().auth.loggedIn) {
    //   return <Redirect to={{ pathname: '/auth/sign-in', state: { from: '/' } }} />
    // }

    return (
        <Wrapper>
          <Sidebar />
          <Main>
            <Navigation />
            <Body />
          </Main>
        </Wrapper>
    );
  }
}

export default connect()(Landing);
