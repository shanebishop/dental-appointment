import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store from "../redux/store";
import { toggleSidebar } from "../redux/actions/sidebarActions";

import {
  Button,
  Navbar,
  Collapse,
  Nav,
} from "reactstrap";

class Navigation extends React.Component {
  loggedIn() {
    const state = store.getState();
    return state.auth && state.auth.loggedIn;
  }

  render() {
    return (
      <Navbar color="white" light expand>
      <span
        className="sidebar-toggle d-flex mr-2"
        onClick={() => {
          this.props.dispatch(toggleSidebar());
        }}
      >
        <i className="hamburger align-self-center"/>
      </span>

        <Collapse navbar>
          <Nav className="ml-auto" navbar>
            <Button
              href={this.loggedIn() ? '/auth/sign-out' : '/auth/sign-in'}
              color="primary"
              className="ml-2"
            >
              {this.loggedIn() ? 'Logout' : 'Login'}
            </Button>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

Navigation.propTypes = {
  dispatch: PropTypes.func
};

export default connect(store => ({
  app: store.app
}))(Navigation);
