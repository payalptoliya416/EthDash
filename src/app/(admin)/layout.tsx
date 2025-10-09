'use client';

import { ReactNode, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import TopNavbar from "@/components/TopNavbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
   const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
    exit: { x: "-100%" },
  };

  // Overlay fade animation
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 },
    exit: { opacity: 0 },
  };

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut", 
    },
  },
};
  return (
    <>
      <div className="flex relative">
          <div className="hidden lg:flex">
        <Sidebar apiType="admin" />
      </div>
      <div className="flex-1 min-h-screen bg-bgview">
           <AnimatePresence>
         {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setSidebarOpen(false)}
             variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
          />    
          <motion.div className="absolute left-0 top-0 h-full w-64 bg-whitelight shadow-md" 
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "tween", duration: 0.3 }}>
            <Sidebar apiType="admin" />
          </motion.div>
        </div>
         )}
           </AnimatePresence>
      <div className="flex-1 flex flex-col bg-bodybg min-h-screen" >
        <TopNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)}  apiType='admin' />
        <motion.main className="p-4 md:p-[25px] flex-1" 
         variants={contentVariants}
        initial="hidden"
        animate="visible">
          {children}
        </motion.main>
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
