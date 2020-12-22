import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { enableCorporateTheme } from "../../redux/actions/themeActions";

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Collapse,
  Container,
  Media,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  Row
} from "reactstrap";

import {
  Box,
  Chrome,
  Code,
  DownloadCloud,
  Mail,
  Sliders,
  Smartphone
} from "react-feather";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => (
  <Navbar dark expand="md" className="navbar-landing">
    <Container>
      <NavbarBrand href="/">
        <Box title="AppStack" />
        AppStack
      </NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem className="d-none d-md-inline-block">
          <NavLink href="/dashboard/default" target="_blank" active>
            Preview
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/docs/introduction" target="_blank" active>
            Documentation
          </NavLink>
        </NavItem>
        <NavItem className="d-none d-md-inline-block">
          <NavLink href="mailto:support@bootlab.io" active>
            Support
          </NavLink>
        </NavItem>
      </Nav>
      <Button
        href="https://themes.getbootstrap.com/product/appstack-react-admin-dashboard-template/"
        target="_blank"
        rel="noopener noreferrer"
        color="primary"
        className="ml-2"
        size="lg"
      >
        Get AppStack
      </Button>
    </Container>
  </Navbar>
);

const Footer = () => (
  <section className="landing-footer pb-6">
    <svg className="landing-footer-shape" xmlns="http://www.w3.org/2000/svg" viewBox="0 100 1440 220">
      <path fill="#F7F9FC" fill-opacity="1" d="M0,128L1440,256L1440,0L0,0Z"></path>
    </svg>
    <Container className="text-center landing-footer-container">
      <Row>
        <Col md="9" lg="8" xl="6" className="mx-auto">
          <h2 className="h1 text-white mb-3">
            Join over 3,000 developers who are already working with our products
          </h2>
          <Button
            color="light"
            size="lg"
            href="https://themes.getbootstrap.com/product/appstack-react-admin-dashboard-template/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-n1"
          >
            Purchase Now
          </Button>
        </Col>
      </Row>
    </Container>
  </section>
);

const Landing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(enableCorporateTheme());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Navigation />
      <Footer />
    </React.Fragment>
  )
}

export default connect()(Landing);
