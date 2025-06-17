"use client"
import React, { useState } from 'react'
import SideNav from './_components/SideNav';
import Header from './_components/Header';
import { TotalUsageContext } from '../(context)/TotalUsageContext';

const layout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const state = useState<number>(0); // returns a tuple

  return (
    <TotalUsageContext.Provider value={state}>
      <div className="bg-slate-100 h-screen">
        <div className="md:w-64 hidden md:block fixed">
          <SideNav />
        </div>
        <div className="md:ml-64">
          <Header />
          {children}
        </div>
      </div>
    </TotalUsageContext.Provider>
  );
};

export default layout;