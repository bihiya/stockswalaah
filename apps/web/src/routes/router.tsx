import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

const DashboardLayout = lazy(() =>
  import("../layouts/DashboardLayout").then((module) => ({
    default: module.DashboardLayout,
  })),
);
const DashboardPage = lazy(() =>
  import("../pages/DashboardPage").then((module) => ({
    default: module.DashboardPage,
  })),
);
const LoginPage = lazy(() =>
  import("../pages/LoginPage").then((module) => ({
    default: module.LoginPage,
  })),
);
const SignupPage = lazy(() =>
  import("../pages/SignupPage").then((module) => ({
    default: module.SignupPage,
  })),
);
const loadingPage = <div className="route-loading" aria-label="Loading page" />;

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={loadingPage}><LoginPage /></Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={loadingPage}><SignupPage /></Suspense>
    ),
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: (
          <Suspense fallback={loadingPage}><DashboardLayout /></Suspense>
        ),
        children: [
          {
            path: "/dashboard",
            element: (
              <Suspense fallback={loadingPage}><DashboardPage /></Suspense>
            ),
          },
        ],
      },
    ],
  },
  { path: "*", element: <Navigate to="/dashboard" replace /> },
]);
