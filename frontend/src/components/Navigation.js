import React from "react";
import { connect } from "react-redux";
import store from "../redux/store";
import { toggleSidebar } from "../redux/actions/sidebarActions";

import {
  Button,
  Navbar,
  NavbarBrand,
  Collapse,
  Nav,
} from "reactstrap";

import { Home } from "react-feather";

class Navigation extends React.Component {
  loggedIn() {
    const state = store.getState();
    return state.auth && state.auth.loggedIn;
  }

  // render() {
  //   const isLoggedIn = this.loggedIn();
  //
  //   return (
  //     <Navbar dark expand className="navbar-landing">
  //       <NavbarBrand href="/">
  //         <Home title="Dr. Phil Ing Dental Clinic" />
  //         Dr. Phil Ing Dental Clinic
  //       </NavbarBrand>
  //       <Button
  //         href={isLoggedIn ? '/auth/sign-out' : '/auth/sign-in'}
  //         color="primary"
  //         className="ml-auto ml-2"
  //       >
  //         {isLoggedIn ? 'Logout' : 'Login'}
  //       </Button>
  //     </Navbar>
  //   );
  // }

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

export default connect(store => ({
  app: store.app
}))(Navigation);
