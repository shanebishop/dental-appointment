import React from "react";
import PropTypes from 'prop-types';

import Main from "../components/Main";

const EditAppointment = ({ children }) => <Main>{children}</Main>;

EditAppointment.propTypes = {
  children: PropTypes.object.isRequired
};

export default EditAppointment;
