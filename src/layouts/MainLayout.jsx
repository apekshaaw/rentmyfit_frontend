import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto">
<Outlet /> // Renders the matching child route of a parent route or nothing if no child route matches
      </main>


      <Footer />
    </div>
  );
};

export default MainLayout;