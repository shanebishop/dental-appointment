import React from "react";
import PropTypes from 'prop-types';

import Main from "../components/Main";

const Appointments = ({ children }) => <Main>{children}</Main>;

Appointments.propTypes = {
  children: PropTypes.object.isRequired
};

export default Appointments;
