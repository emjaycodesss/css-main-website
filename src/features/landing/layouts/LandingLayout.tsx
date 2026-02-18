import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../../shared/components/layout/Footer';
// import CookieConsent from '../../../shared/components/CookieConsent'; // Hidden for now – re-enable when needed


const LandingLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col text-white">
      <main className="flex-1 min-h-0 w-full">
        <Outlet />
      </main>
      <Footer minimal={false} />
      {/* <CookieConsent /> */}
    </div>
  );
};

export default LandingLayout;
