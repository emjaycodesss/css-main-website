import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingLayout from '../features/landing/layouts/LandingLayout';
import LandingPage from '../features/landing/pages/LandingPage';
import GateLandingPage from '../features/landing/pages/GateLandingPage';
import { ROUTE_PATHS } from './routePaths';

/**
 * Main Router Component
 * 
 * Single-route setup: serves the CSS landing page.
 * All portal/auth/admin routes have been removed since
 * membership functionality is no longer part of the site.
 * 
 * @returns JSX element containing the landing route
 */
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Landing page - the only route */}
      <Route element={<LandingLayout />}>
        <Route path={ROUTE_PATHS.HOME} element={<LandingPage />} />
        <Route path={ROUTE_PATHS.GATE} element={<GateLandingPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
