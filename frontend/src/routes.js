import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/LandingPage';
import NotFound from './pages/404';

import RequireAuth from './components/RequireAuth';

const SignIn = React.lazy(() => import('./pages/SignIn'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Categories = React.lazy(() => import('./pages/Categories'));
const Transactions = React.lazy(() => import('./pages/Transactions'));

export const routes = {
  LANDING_PAGE: { path: '/', element: <Home />, requireAuth: false },
  SIGN_IN: { path: '/signin', element: <SignIn />, requireAuth: false },
  SIGN_UP: { path: '/signup', element: <SignUp />, requireAuth: false },
  DASHBOARD: { path: '/home', element: <Dashboard />, requireAuth: true },
  MONTHLY_OVERVIEW: {
    path: '/monthly',
    element: <Dashboard />,
    requireAuth: true,
  },
  MANAGE_TRANSACTIONS: {
    path: '/transactions',
    element: <Transactions />,
    requireAuth: true,
  },
  MANAGE_CATEGORIES: {
    path: '/categories',
    element: <Categories />,
    requireAuth: true,
  },
};

function AppRoutes() {
  return (
    <Routes>
      {Object.values(routes).map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.requireAuth ? (
              <RequireAuth>{route.element}</RequireAuth>
            ) : (
              route.element
            )
          }
        />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
