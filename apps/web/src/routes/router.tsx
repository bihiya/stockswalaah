import { lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

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
const withLoading = (page: ReactNode) => (
  <Suspense fallback={loadingPage}>{page}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/login",
    element: withLoading(<LoginPage />),
  },
  {
    path: "/signup",
    element: withLoading(<SignupPage />),
  },
  {
    element: withLoading(<DashboardLayout />),
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "/dashboard",
        element: withLoading(<DashboardPage />),
      },
    ],
  },
  { path: "*", element: <Navigate to="/dashboard" replace /> },
]);
