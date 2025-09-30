import Sidebar from "@/components/Sidebar";
import TopNavbar from "@/components/TopNavbar";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopNavbar />
        <main className="p-[25px] flex-1">{children}</main>
      </div>
    </div>
  );
}
