import React from "react"
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { enableCorporateTheme } from "../../redux/actions/themeActions";
import store from '../../redux/store';
import Sidebar from '../../components/Sidebar';
import Wrapper from '../../components/Wrapper';
import Main from '../../components/Main';

import {
  Col,
  Container,
  Row
} from "reactstrap";
import Navbar from "../../components/Navbar";

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
    if (!store.getState().auth.loggedIn) {
      return <Redirect to={{ pathname: '/auth/sign-in', state: { from: '/' } }} />
    }

    return (
      <Wrapper>
        <Sidebar />
        <Main>
          <Navbar />
          <Body {...this.props} />
        </Main>
      </Wrapper>
    );
  }
}

Landing.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(Landing);
