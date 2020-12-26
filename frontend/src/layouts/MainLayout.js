import React from "react";
import PropTypes from 'prop-types';

import Main from "../components/Main";

const MainLayout = ({ children }) => <Main>{children}</Main>;

MainLayout.propTypes = {
  children: PropTypes.object.isRequired
};

export default MainLayout;
