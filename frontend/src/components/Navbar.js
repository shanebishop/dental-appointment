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
  User as UserIcon,
} from "react-feather";

import defaultProfilePic from "../assets/img/avatars/default-profile-pic.png";
import User from "../utils/User";

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
                  src={defaultProfilePic}
                  className="avatar img-fluid rounded-circle mr-1"
                  alt={User.getDisplayName()}
                />
                <span className="text-dark">{User.getDisplayName()}</span>
              </DropdownToggle>
            </span>
            <DropdownMenu right>
              <DropdownItem>
                <UserIcon size={18} className="align-middle mr-2" />
                Profile
              </DropdownItem>
              <DropdownItem>
                <PieChart size={18} className="align-middle mr-2" />
                Analytics
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Settings & Privacy</DropdownItem>
              <DropdownItem>Help</DropdownItem>
              <DropdownItem href="/auth/sign-out">
                Sign out
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
