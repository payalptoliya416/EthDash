'use client'

import { Menu, Transition } from "@headlessui/react";
import {  ChevronDownIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

type Transaction = {
  id: number;
  name: string;
  action: string;
  timestamp : string
};

const transactions: Transaction[] = [
  {
    id: 1,
    name : "Client Name",
    action: "Transfer ETH 0.6",
    timestamp :'Jun 25, 2025 07:24 PM'
  },
  {
    id: 2,
    name : "Wade Warren",
    action: "Wallet Setup Completed",
    timestamp :'Jun 24, 2025 09:15 AM'
  },
  {
    id: 3,
    name : "Cameron Williamson",
    action: "Bank Account Added",
    timestamp :'Jun 20, 2025 10:10 AM'
  },
  {
    id: 4,
    name : "Leslie Alexander",
    action: "Transfer ETH 0.6",
    timestamp :'Jun 18, 2025 05:00 PM'
  },
  {
    id: 5,
    name : "Jenny Wilson",
    action: "Wallet Setup Completed",
    timestamp :'Jun 16, 2025 03:15 PM'
  },
  {
    id: 6,
    name : "Wade Warren",
    action: "Wallet Setup Completed",
    timestamp :'Jun 24, 2025 09:15 AM'
  },
  {
    id: 7,
    name : "Cameron Williamson",
    action: "Bank Account Added",
    timestamp :'Jun 20, 2025 10:10 AM'
  },
  {
    id: 8,
    name : "Leslie Alexander",
    action: "Transfer USDT 54123",
    timestamp :'Jun 18, 2025 05:00 PM'
  },
  {
    id: 9,
    name : "Jenny Wilson",
    action: "Wallet Setup Completed",
    timestamp :'Jun 16, 2025 03:15 PM'
  },
  {
    id: 10,
    name : "Leslie Alexander",
    action: "Transfer USDT 54123",
    timestamp :'Jun 18, 2025 05:00 PM'
  },
  {
    id: 11,
    name : "Jane Cooper",
    action: "Transfer ETH 0.6",
    timestamp :'Jun 25, 2025 07:24 PM'
  },
];

export default function Transaction() {
  return (
      <div className="grid grid-cols-12">
         <div className="col-span-12 bg-whitelight shadow-[4px_4px_48px_0_rgba(18,18,18,0.08)] rounded-[10px]">
       <div className="flex justify-between items-center p-5 flex-wrap gap-5">
        <h3 className="box-title">Transactions History</h3>
         <Menu as="div" className="relative">
                {({ open }) => (
                  <>
                    <Menu.Button className="flex items-center text-linkgray focus:outline-none cursor-pointer border border-bordercolor py-3 px-[15px] rounded text-sm leading-[14px]  md:w-[279px] justify-between">
                     Notifications types
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
                      <Menu.Items className="absolute right-0 mt-2 bg-white border border-bordercolor rounded-md shadow-lg focus:outline-none z-50 w-44 md:w-[279px]">
                        <ul className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <li
                                className={`block px-4 py-2 text-sm ${active ? "bg-gray-100" : ""}`}
                              >
                                View All Transactions
                              </li>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <li
                                className={`block px-4 py-2 text-sm ${active ? "bg-gray-100" : ""}`}
                              >
                              Filter by Date
                              </li>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <li
                               className={`block px-4 py-2 text-sm ${active ? "bg-gray-100" : ""}`}
                              >
                                Export as CSV
                              </li>
                            )}
                          </Menu.Item>
                        </ul>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
       </div>
        <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-tablehead font-medium">
          <tr>
            <th className="thead-th">
              Client Name
            </th>
            <th className="thead-th">
             Action 
            </th>
            <th className="thead-th">
              Time Stramp
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr
              key={tx.id}
              className="hover:bg-[#f3f3f3] transition-colors odd:bg-whitelight even:bg-listbg"
            >
              <td className="tbody-tr">{tx.name}</td>
              <td className="tbody-tr">{tx.action}</td>
              <td className="tbody-tr">{tx.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </div>
      </div>
  )
}
