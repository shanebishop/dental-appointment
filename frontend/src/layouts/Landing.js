import React from "react";
import PropTypes from 'prop-types';

import Main from "../components/Main";

const Landing = ({ children }) => <Main>{children}</Main>;

Landing.propTypes = {
  children: PropTypes.object.isRequired
};

export default Landing;
