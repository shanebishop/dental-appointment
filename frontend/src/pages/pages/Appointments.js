import React from 'react';

import AppointmentsComponent from "../../components/Appointments";
import Wrapper from "../../components/Wrapper";
import Sidebar from "../../components/Sidebar";
import Main from "../../components/Main";
import Footer from "../../components/Footer";

class Appointments extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Wrapper>
          <Sidebar />
          <Main>
            <AppointmentsComponent {...this.props} />
            <Footer />
          </Main>
        </Wrapper>
      </React.Fragment>
    );
  }
}

export default Appointments;
