import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

const DashboardLayout = lazy(() => import("../layouts/DashboardLayout").then((module) => ({ default: module.DashboardLayout })));
const DashboardPage = lazy(() => import("../pages/DashboardPage").then((module) => ({ default: module.DashboardPage })));
const PortfolioPage = lazy(() => import("../pages/PortfolioPage").then((module) => ({ default: module.PortfolioPage })));
const ActivityPage = lazy(() => import("../pages/ActivityPage").then((module) => ({ default: module.ActivityPage })));
const SettingsPage = lazy(() => import("../pages/SettingsPage").then((module) => ({ default: module.SettingsPage })));
const LoginPage = lazy(() => import("../pages/LoginPage").then((module) => ({ default: module.LoginPage })));
const SignupPage = lazy(() => import("../pages/SignupPage").then((module) => ({ default: module.SignupPage })));
const loadingPage = <div className="route-loading" aria-label="Loading page" />;
const lazyPage = (Page: React.LazyExoticComponent<() => JSX.Element>) => (
  <Suspense fallback={loadingPage}><Page /></Suspense>
);

export const router = createBrowserRouter([
  { path: "/login", element: lazyPage(LoginPage) },
  { path: "/signup", element: lazyPage(SignupPage) },
  {
    element: lazyPage(DashboardLayout),
    children: [
      { path: "/", element: <Navigate to="/dashboard" replace /> },
      { path: "/dashboard", element: lazyPage(DashboardPage) },
      { path: "/portfolio", element: lazyPage(PortfolioPage) },
      { path: "/activity", element: lazyPage(ActivityPage) },
      { path: "/settings", element: lazyPage(SettingsPage) },
    ],
  },
  { path: "*", element: <Navigate to="/dashboard" replace /> },
]);
