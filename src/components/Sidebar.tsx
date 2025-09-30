
import React from "react";
import { CurrencyDollarIcon, HomeIcon } from "@heroicons/react/24/outline";

//  TypeScript interface (props if needed)
interface SidebarProps {}

const navItems = [
  { label: "Overview", icon: <HomeIcon />, href: "/overview" },
  { label: "Wallet", icon: <HomeIcon  />, href: "/wallet" },
  { label: "Bank Withdrawal", icon: <HomeIcon />, href: "/bank-withdrawal" },
];

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <div className="flex flex-col justify-between h-screen bg-whitelight border-r border-[#D0D0D0]">
      {/* Top Logo + Nav */}
      <div>
        <div className="py-5 px-5 flex justify-center">
          <img src="/logo.png" alt="Logo" className="h-10" />
        </div>
        <hr className="mx-[10px] text-[#E7E7E7]" />
        <nav className="py-5 px-3">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 px-5 py-3 rounded-md text-darkgray hover:bg-purple hover:text-white transition-all duration-300"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom Live Support */}
      <div className="mb-5 px-3">
        <a
          href="/support"
          className="flex items-center gap-3 px-5 py-3 rounded-md text-darkgray hover:bg-purple hover:text-white transition-all duration-300"
        >
          <CurrencyDollarIcon/>
          <span>Live Support</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
