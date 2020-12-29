import React from "react";
import store from "../redux/store";

import {
  Button,
  Navbar,
  NavbarBrand
} from "reactstrap";

import { Home } from "react-feather";

class Navigation extends React.Component {
  loggedIn() {
    const state = store.getState();
    return state.auth && state.auth.loggedIn;
  }

  render() {
    const isLoggedIn = this.loggedIn();

    return (
      <Navbar dark expand className="navbar-landing">
        <NavbarBrand href="/">
          <Home title="Dr. Phil Ing Dental Clinic" />
          Dr. Phil Ing Dental Clinic
        </NavbarBrand>
        <Button
          href={isLoggedIn ? '/auth/sign-out' : '/auth/sign-in'}
          color="primary"
          className="ml-auto ml-2"
        >
          {isLoggedIn ? 'Logout' : 'Login'}
        </Button>
      </Navbar>
    );
  }
}

export default Navigation;
