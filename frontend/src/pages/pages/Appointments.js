import React from 'react';

import AppointmentsComponent from "../../components/Appointments";

class Appointments extends React.Component {
  render() {
    return (
      <AppointmentsComponent {...this.props} />
    );
  }
}

export default Appointments;
