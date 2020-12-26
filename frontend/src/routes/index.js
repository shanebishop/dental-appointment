import async from "../components/Async";

import {
  Calendar as CalendarIcon,
  Layout as LayoutIcon,
  Sliders as SlidersIcon,
  Users as UsersIcon,
  Clipboard as ClipboardIcon,
  List as ListIcon,
} from "react-feather";

// Landing
import Landing from "../pages/landing/Landing";

// Auth
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import Page404 from "../pages/auth/Page404";
import Page500 from "../pages/auth/Page500";

// Pages
import Profile from "../pages/pages/Profile";
import RegisterUser from "../pages/pages/RegisterUser";
import Appointments from "../pages/pages/Appointments";

// Dashboards
const Default = async(() => import("../pages/dashboards/Default"));
const Analytics = async(() => import("../pages/dashboards/Analytics"));

// Calendar
const Calendar = async(() => import("../pages/calendar/Calendar"));

// Routes
const landingRoutes = {
  path: "/",
  name: "Landing Page",
  component: Landing,
  displayInSidebar: false,
  requiresLoggedIn: true,
  children: null
};

const dashboardRoutes = {
  path: "/dashboard",
  name: "Dashboards",
  header: "Pages",
  icon: SlidersIcon,
  containsHome: true,
  displayInSidebar: false,
  requiresLoggedIn: true,
  children: [
    {
      path: "/dashboard/default",
      name: "Default",
      component: Default
    },
    {
      path: "/dashboard/analytics",
      name: "Analytics",
      component: Analytics
    },
  ]
};

const pageRoutes = {
  path: "/pages",
  name: "Pages",
  icon: LayoutIcon,
  displayInSidebar: false,
  requiresLoggedIn: true,
  children: [
    {
      path: "/pages/profile",
      name: "Profile",
      component: Profile
    },
  ]
};

const authRoutes = {
  path: "/auth",
  name: "Auth",
  icon: UsersIcon,
  displayInSidebar: false,
  requiresLoggedIn: true,
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500
    }
  ]
};

const calendarRoutes = {
  path: "/calendar",
  name: "Calendar",
  icon: CalendarIcon,
  component: Calendar,
  displayInSidebar: true,
  requiresLoggedIn: true,
  children: null
};

// Routes to pages used by dental staff for administrative tasks
const staffRoutes = {
  path: '/administration',
  name: 'Administration',
  icon: ClipboardIcon,
  displayInSidebar: true,
  requiresLoggedIn: true,
  children: [
    {
      path: '/administration/register-user',
      name: 'Register User',
      component: RegisterUser
    }
  ]
};

// A single link to a list of appointments in chronological order
// (rather than a calendar view)
const appointmentsRoutes = {
  path: '/appointments-list',
  name: 'Appointments',
  icon: ListIcon,
  component: Appointments,
  displayInSidebar: true,
  requiresLoggedIn: true,
  children: null
}

// All pages that display the sidebar (as opposed to something like an auth page,
// which does not display the sidebar).
//
// For some reason, everything we want to see in the sidebar should go here.
// When they go here, they are automatically wrapped, and the button to toggle the
// sidebar is displayed properly.
export const dashboard = [
  dashboardRoutes,
  calendarRoutes,
  staffRoutes,
  appointmentsRoutes,
];

// Landing specific routes
export const landing = [landingRoutes];

// Auth specific routes
export const page = [authRoutes];

// Staff routes
export const staff = [staffRoutes];

// Appointment routes
export const appointments = [appointmentsRoutes];

// All routes
// Order matters - routes are displayed in sidebar in the order
// defined here
export default [
  dashboardRoutes,
  pageRoutes,
  authRoutes,
  staffRoutes,
  appointmentsRoutes,
  calendarRoutes,
];
