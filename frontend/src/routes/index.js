import async from "../components/Async";

import {
  Calendar as CalendarIcon,
  Layout as LayoutIcon,
  Monitor as MonitorIcon,
  Sliders as SlidersIcon,
  Users as UsersIcon
} from "react-feather";

// Landing
import Landing from "../pages/landing/Landing";

// Auth
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ResetPassword from "../pages/auth/ResetPassword";
import Page404 from "../pages/auth/Page404";
import Page500 from "../pages/auth/Page500";

// Layouts
import Boxed from "../pages/layouts/Boxed";
import SidebarCollapsed from "../pages/layouts/SidebarCollapsed";
import SidebarSticky from "../pages/layouts/SidebarSticky";
import ThemeClassic from "../pages/layouts/ThemeClassic";
import ThemeCorporate from "../pages/layouts/ThemeCorporate";
import ThemeModern from "../pages/layouts/ThemeModern";

// Misc
import Blank from "../pages/misc/Blank";

// Pages
import Profile from "../pages/pages/Profile";

// Dashboards
const Default = async(() => import("../pages/dashboards/Default"));
const Analytics = async(() => import("../pages/dashboards/Analytics"));
const Ecommerce = async(() => import("../pages/dashboards/Ecommerce"));
const Crypto = async(() => import("../pages/dashboards/Crypto"));
const Social = async(() => import("../pages/dashboards/Social"));

// Calendar
const Calendar = async(() => import("../pages/calendar/Calendar"));

// Routes
const landingRoutes = {
  path: "/",
  name: "Landing Page",
  component: Landing,
  children: null
};

const dashboardRoutes = {
  path: "/dashboard",
  name: "Dashboards",
  header: "Pages",
  badgeColor: "primary",
  badgeText: "5",
  icon: SlidersIcon,
  containsHome: true,
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
    {
      path: "/dashboard/e-commerce",
      name: "E-commerce",
      component: Ecommerce
    },
    {
      path: "/dashboard/social",
      name: "Social",
      component: Social
    },
    {
      path: "/dashboard/crypto",
      name: "Crypto",
      component: Crypto,
      badgeColor: "primary",
      badgeText: "New"
    }
  ]
};

const pageRoutes = {
  path: "/pages",
  name: "Pages",
  icon: LayoutIcon,
  children: [
    {
      path: "/pages/profile",
      name: "Profile",
      component: Profile
    },
    {
      path: "/pages/blank",
      name: "Blank Page",
      component: Blank
    }
  ]
};

const authRoutes = {
  path: "/auth",
  name: "Auth",
  icon: UsersIcon,
  badgeColor: "secondary",
  badgeText: "Special",
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
      path: "/auth/reset-password",
      name: "Reset Password",
      component: ResetPassword
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

const layoutRoutes = {
  path: "/layouts",
  name: "Layouts",
  icon: MonitorIcon,
  children: [
    {
      path: "/layouts/sidebar-sticky",
      name: "Sticky Sidebar",
      component: SidebarSticky
    },
    {
      path: "/layouts/sidebar-collapsed",
      name: "Sidebar Collapsed",
      component: SidebarCollapsed
    },
    {
      path: "/layouts/boxed",
      name: "Boxed Layout",
      component: Boxed
    },
    {
      path: "/layouts/theme-classic",
      name: "Classic Theme",
      component: ThemeClassic
    },
    {
      path: "/layouts/theme-corporate",
      name: "Corporate Theme",
      component: ThemeCorporate,
      badgeColor: "primary",
      badgeText: "New"
    },
    {
      path: "/layouts/theme-modern",
      name: "Modern Theme",
      component: ThemeModern,
      badgeColor: "primary",
      badgeText: "New"
    }
  ]
};

const calendarRoutes = {
  path: "/calendar",
  name: "Calendar",
  icon: CalendarIcon,
  component: Calendar,
  children: null
};

// This route is not visible in the sidebar
const privateRoutes = {
  path: "/private",
  name: "Private",
  children: [
    {
      path: "/private/blank",
      name: "Blank Page",
      component: Blank
    }
  ]
};

// Dashboard specific routes
export const dashboard = [
  dashboardRoutes,
  pageRoutes,
  layoutRoutes,
  calendarRoutes,
  privateRoutes
];

// Landing specific routes
export const landing = [landingRoutes];

// Auth specific routes
export const page = [authRoutes];

// All routes
export default [
  dashboardRoutes,
  pageRoutes,
  authRoutes,
  layoutRoutes,
  calendarRoutes
];
