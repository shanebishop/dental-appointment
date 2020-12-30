import React from "react";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { toggleSidebar } from "../redux/actions/sidebarActions";

import {
  Collapse,
  Navbar,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import {
  PieChart,
  Settings,
  User,
} from "react-feather";

import avatar1 from "../assets/img/avatars/avatar.jpg";
import {Link} from "react-router-dom";

const NavbarComponent = ({ dispatch }) => {
  return (
    <Navbar color="white" light expand>
      <span
        className="sidebar-toggle d-flex mr-2"
        onClick={() => {
          dispatch(toggleSidebar());
        }}
      >
        <i className="hamburger align-self-center" />
      </span>

      <Collapse navbar>
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <span className="d-inline-block d-sm-none">
              <DropdownToggle nav caret>
                <Settings size={18} className="align-middle" />
              </DropdownToggle>
            </span>
            <span className="d-none d-sm-inline-block">
              <DropdownToggle nav caret>
                <img
                  src={avatar1}
                  className="avatar img-fluid rounded-circle mr-1"
                  alt="Chris Wood"
                />
                <span className="text-dark">Chris Wood</span>
              </DropdownToggle>
            </span>
            <DropdownMenu right>
              <DropdownItem>
                <User size={18} className="align-middle mr-2" />
                Profile
              </DropdownItem>
              <DropdownItem>
                <PieChart size={18} className="align-middle mr-2" />
                Analytics
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Settings & Privacy</DropdownItem>
              <DropdownItem>Help</DropdownItem>
              <DropdownItem>
                <Link to="/auth/sign-out">
                  Sign out
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

NavbarComponent.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect(store => ({
  app: store.app
}))(NavbarComponent);
