import React from "react";
import PropTypes from 'prop-types';

import Wrapper from "../components/Wrapper";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import Navbar from "../components/Navbar";
import Content from "../components/Content";
import Footer from "../components/Footer";

const Dashboard = ({ children }) => (
  <React.Fragment>
    <Wrapper>
      <Sidebar />
      <Main>
        <Navbar />
        <Content>{children}</Content>
        <Footer />
      </Main>
    </Wrapper>
  </React.Fragment>
);

Dashboard.propTypes = {
  children: PropTypes.object.isRequired
};

export default Dashboard;
