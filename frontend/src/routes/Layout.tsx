import Sidebar from '@/components/sidebar/Sidebar';
import React from 'react';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className='h-full flex flex-row bg-secondary'>
            <div className='h-full border-4 border-secondary bg-background'>
                <Sidebar></Sidebar>
            </div>
            <div className='overflow-auto w-full'>
                <Outlet/>
            </div>
        </div>
  );
}

export default Layout;