import {
  Users as UsersIcon,
  List as ListIcon,
  UserPlus as UserPlusIcon,
  PlusCircle as PlusCircleIcon,
  User as UserIcon,
} from "react-feather";

// Landing
import Landing from "../pages/landing/Landing";

// Auth
import SignIn from "../pages/auth/SignIn";
import CompleteRegistration from "../pages/auth/CompleteRegistration";
import SignOut from "../pages/auth/SignOut";
import Page404 from "../pages/auth/Page404";
import Page500 from "../pages/auth/Page500";

// Pages
import Profile from "../pages/pages/Profile";
import RegisterUser from "../pages/pages/RegisterUser";
import Appointments from "../pages/pages/Appointments";
import EditAppointment from "../pages/pages/EditAppointment";
import Clients from "../pages/pages/Clients";

// Routes
const landingRoutes = {
  path: "/",
  name: "Landing Page",
  component: Landing,
  displayInSidebar: false,
  requiresLoggedIn: true,
  children: null
};


const profileRoutes = {
  path: "/profile",
  name: "Profile",
  icon: null,
  component: Profile,
  displayInSidebar: false,
  requiresLoggedIn: true,
  children: null,
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
      path: "/auth/complete-registration",
      name: "Complete Registration",
      component: CompleteRegistration
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
    },
    {
      path: '/auth/sign-out',
      name: 'Sign Out',
      component: SignOut
    }
  ]
};

// Routes to pages used by dental staff for administrative tasks
const registerUserRoutes = {
  path: '/register-user',
  name: 'Register Client',
  header: 'Administration',
  icon: UserPlusIcon,
  component: RegisterUser,
  displayInSidebar: true,
  requiresLoggedIn: true,
  staffOnlyRoute: true,
  children: null
};

// A single link to a list of appointments in chronological order
// (rather than a calendar view)
const appointmentsRoutes = {
  path: '/appointments',
  name: 'Appointments',
  icon: ListIcon,
  component: Appointments,
  displayInSidebar: true,
  requiresLoggedIn: true,
  children: null
};

const editAppointmentRoutes = {
  path: '/edit-appointment',
  name: 'Create Appointment',
  icon: PlusCircleIcon,
  component: EditAppointment,
  displayInSidebar: true,
  requiresLoggedIn: true,
  staffOnlyRoute: true,
  children: null
};

const clientListRoutes = {
  path: '/clients',
  name: 'View Clients',
  icon: UserIcon,
  component: Clients,
  displayInSidebar: true,
  requiresLoggedIn: true,
  staffOnlyRoute: true,
  children: null
};

// All pages that display the sidebar (as opposed to something like an auth page,
// which does not display the sidebar).
//
// For some reason, everything we want to see in the sidebar should go here.
// When they go here, they are automatically wrapped, and the button to toggle the
// sidebar is displayed properly.
export const dashboard = [
  registerUserRoutes,
  appointmentsRoutes,
  editAppointmentRoutes,
  clientListRoutes,
  profileRoutes,
];

// Landing specific routes
export const landing = [landingRoutes];

// Auth specific routes
export const page = [authRoutes];

// Staff routes
export const staff = [registerUserRoutes];

// Appointment routes
export const appointments = [appointmentsRoutes];

// Edit appointment routes
export const editAppointment = [editAppointmentRoutes];

// All routes
// Order matters - routes are displayed in sidebar in the order
// defined here
export default [
  profileRoutes,
  authRoutes,
  appointmentsRoutes,
  registerUserRoutes,
  editAppointmentRoutes,
  clientListRoutes,
];
