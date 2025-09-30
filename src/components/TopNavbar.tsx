import { BellIcon, SunIcon } from "@heroicons/react/24/outline";


export default function TopNavbar() {
  return (
    <header className="w-full bg-white shadow flex justify-between items-center px-6 py-4">
      <div className="flex items-center gap-4">
        <button className="text-gray-600 md:hidden">☰</button>
      </div>
      <div className="flex items-center gap-[15px]">
        <div className="w-10 h-10 rounded-full flex justify-center items-center border border-bordercolor"><SunIcon className="text-secondary"/></div>
        <div className="w-10 h-10 rounded-full flex justify-center items-center border border-bordercolor"><BellIcon className="text-secondary"/></div>
        <div>
            <span className="text-base text-primary">Jane Cooper</span>
        </div>
      </div> 
    </header>
  );
}
