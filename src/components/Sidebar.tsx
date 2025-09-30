'use client';

import React from "react";
import { ArchiveBoxArrowDownIcon, ChartPieIcon, CurrencyDollarIcon, HomeIcon, WalletIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation"; 

interface SidebarProps {};

const navItems = [
  { label: "Overview", icon: ChartPieIcon, href: "/overview" },
  { label: "Wallet", icon: WalletIcon, href: "/wallet" },
  { label: "Bank Withdrawal", icon: ArchiveBoxArrowDownIcon, href: "/bank-withdrawal" },
];

const Sidebar: React.FC<SidebarProps> = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col justify-between h-screen bg-whitelight border-r border-[#D0D0D0] sticky top-0">
      <div>
        <div className="py-3 md:py-5 px-5 flex justify-center">
         <a href="#"> <img src="/logo.png" alt="Logo" /></a>
        </div>
        <hr className="mx-[10px] text-[#E7E7E7]" />
        <nav className="py-5 px-3">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href; 
                const Icon = item.icon;
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`flex items-center gap-3 px-5 py-3 rounded-md transition-all duration-300 group
                      ${isActive ? "bg-purple text-white" : "text-darkgray hover:bg-purple hover:text-white"}
                    `}>
                   <Icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? "text-white" : "text-[#717171] group-hover:text-whitelight" }`}/>
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Bottom Live Support */}
      <div className="mb-5 px-3">
        <a
          href="/support"
          className={`flex items-center gap-3 px-5 py-3 rounded-md transition-all duration-300
            ${pathname === "/support" ? "bg-purple text-white" : "text-darkgray hover:bg-purple hover:text-white"}
          `}
        >
          <CurrencyDollarIcon className="w-5 h-5" />
          <span>Live Support</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
