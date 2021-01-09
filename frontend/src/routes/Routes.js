import React from "react";
import store from "../redux/store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  landing as landingRoutes,
  dashboard as dashboardRoutes,
  page as pageRoutes,
  staff as staffRoutes,
  appointments as appointmentsRoutes,
  editAppointment as editAppointmentRoutes,
} from "./index";

import DashboardLayout from "../layouts/Dashboard";
import LandingLayout from "../layouts/Landing";
import StaffLayout from "../layouts/Staff";
import AppointmentsLayout from "../layouts/Appointments";
import EditAppointmentLayout from "../layouts/EditAppointment";
import AuthLayout from "../layouts/Auth";
import Page404 from "../pages/auth/Page404";

import ScrollToTop from "../components/ScrollToTop";

const childRoutes = (Layout, routes) =>
  routes.map(({ children, path, component: Component }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }, index) => (
        <Route
          key={index}
          path={path}
          exact
          render={props => (
            <Layout>
              <Component store={store} {...props} />
            </Layout>
          )}
        />
      ))
    ) : (
      // Route item without children
      <Route
        key={index}
        path={path}
        exact
        render={props => (
          <Layout>
            <Component store={store} {...props} />
          </Layout>
        )}
      />
    )
  );

const Routes = () => (
  <Router>
    <ScrollToTop>
      <Switch>
        {childRoutes(LandingLayout, landingRoutes)}
        {childRoutes(DashboardLayout, dashboardRoutes)}
        {childRoutes(AuthLayout, pageRoutes)}
        {childRoutes(StaffLayout, staffRoutes)}
        {childRoutes(AppointmentsLayout, appointmentsRoutes)}
        {childRoutes(EditAppointmentLayout, editAppointmentRoutes)}
        <Route
          render={() => (
            <AuthLayout>
              <Page404 />
            </AuthLayout>
          )}
        />
      </Switch>
    </ScrollToTop>
  </Router>
);

export default Routes;
