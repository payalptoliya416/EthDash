'use client';

import { ReactNode, useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopNavbar from "@/components/TopNavbar";
interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
    {/* <div className="flex min-h-screen">

      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setSidebarOpen(false)}
          />    
          <div className="absolute left-0 top-0 h-full w-64 bg-whitelight shadow-md">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <TopNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-4 md:p-[25px] flex-1">{children}</main>
      </div>
    </div> */}
      <div className="flex relative">
          <div className="hidden lg:flex">
        <Sidebar />
      </div>
      <div className="flex-1 min-h-screen bg-[#F5F6FA]">
         {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setSidebarOpen(false)}
          />    
          <div className="absolute left-0 top-0 h-full w-64 bg-whitelight shadow-md">
            <Sidebar />
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col bg-bodybg min-h-screen">
        <TopNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-4 md:p-[25px] flex-1">
          {children}
        </main>
         <div className="pb-[25px] px-[25px]">
             <div className="flex justify-between items-center flex-col md:flex-row gap-4 text-center md:text-left">
         <p className="text-paragray text-sm leading-[14px] font-normal">Copyright © 2025 ETH OpenSource Wallet. All rights reserved.</p>
        <div className="flex gap-[25px]">
            <a href="javascript:void(0)" className="text-paragray text-sm leading-[14px] font-normal">Privacy policy</a>
            <a href="javascript:void(0)" className="text-paragray text-sm leading-[14px] font-normal">Terms use</a>
        </div>
       </div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
}
