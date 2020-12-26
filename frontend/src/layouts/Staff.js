import React from "react";
import PropTypes from 'prop-types';

import Main from "../components/Main";

const Staff = ({ children }) => <Main>{children}</Main>;

Staff.propTypes = {
  children: PropTypes.object.isRequired
};

export default Staff;
