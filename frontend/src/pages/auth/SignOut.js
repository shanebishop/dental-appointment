/* global localStorage */

import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { logout } from '../../redux/actions/authActions';

import {
  Button,
  Card,
  CardBody,
} from 'reactstrap';

class SignOut extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Logging out...',
    };
  }

  componentDidMount() {
    localStorage.removeItem('user-token');
    localStorage.removeItem('user-data');

    this.props.dispatch(logout());

    this.setState({message: 'You have logged out.'});
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <div className="text-center mt-4">
              <p className="lead">{this.state.message}</p>
            </div>
            <div className="text-center mt-3">
              <Button href="/auth/sign-in" color="primary" size="lg">
                Login again
              </Button>
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

SignOut.propTypes = {
  dispatch: PropTypes.func
};

export default withRouter(connect()(SignOut));
