import { BellIcon, ChevronDownIcon, SunIcon } from "@heroicons/react/24/outline";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
interface TopNavbarProps {
  toggleSidebar: () => void;
}

export default function TopNavbar({ toggleSidebar }: TopNavbarProps) {
  return (
    <header className="w-full bg-white shadow flex justify-between items-center px-6 py-3 md:py-5 sticky top-0 z-[9]">
      <div className="flex items-center gap-4">
        <button className="text-gray-600 lg:hidden" onClick={toggleSidebar}>
          <Bars3BottomLeftIcon className="w-7 h-7" />
        </button>
      </div>
      <div className="flex items-center gap-[15px]">
        <div className="w-10 h-10 rounded-full flex justify-center items-center border border-bordercolor">
          <SunIcon className="text-secondary w-5 h-5" />
        </div>
        <div className="w-10 h-10 rounded-full flex justify-center items-center border border-bordercolor">
          <BellIcon className="text-secondary w-5 h-5" />
        </div>
         <Menu as="div" className="relative">
        {({ open }) => (
          <>
            <Menu.Button className="flex items-center text-base text-primary focus:outline-none cursor-pointer">
              Jane Cooper
              <ChevronDownIcon
                className={`w-3 h-3 ms-3 transition-transform duration-200 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none z-50">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#profile"
                        className={`block px-4 py-2 text-sm ${active ? "bg-gray-100" : ""}`}
                      >
                        Profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#settings"
                        className={`block px-4 py-2 text-sm ${active ? "bg-gray-100" : ""}`}
                      >
                        Settings
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#logout"
                        className={`block px-4 py-2 text-sm text-red-600 ${
                          active ? "bg-gray-100" : ""
                        }`}
                      >
                        Logout
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
      </div>
    </header>
  );
}
