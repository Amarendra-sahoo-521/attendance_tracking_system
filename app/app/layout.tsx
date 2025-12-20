import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import React from 'react'
// pass icon names (strings) instead of components to avoid sending non-serializable values

// import { seed } from '../api/db/scripts/seed';
interface RootLayoutProps {
    children: React.ReactNode;
}
 function layout({children}:RootLayoutProps) {
  // await seed();
  const menu_list = [
    { id: 1, name: "dashboard", icon: "LayoutIcon", path: "/app/dashboard" },
    { id: 2, name: "employee", icon: "GraduationCap", path: "/app/employee" },
    { id: 3, name: "attendance", icon: "Hand", path: "/app/attendance" },
    { id: 4, name: "settings", icon: "Settings", path: "/app/settings" },
  ];
  return (
    <div className='flex'>
        <div className="min-w-55 hidden sm:block">
            <Sidebar menus={menu_list}/>
        </div>
        <div className="w-full">
            <Header menus={menu_list}/>
      {children}
        </div>
    </div>
  )
}

export default layout
