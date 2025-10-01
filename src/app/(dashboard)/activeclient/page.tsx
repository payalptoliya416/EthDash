'use client'

import {  PlusIcon } from "@heroicons/react/24/outline";

type clientTransaction = {
  id: number;
  clientName: string;
  caseId: string;
  walletStatus: "Active" | "Inactive"; 
  usdt: string; 
  bankAccount: string;
  ethBalance: string; 
};

const clientTransactionList: clientTransaction[] = [
  {
    id: 1,
    clientName : "Jane Cooper",
    caseId: "PR99508",
    walletStatus :'Active',
    usdt:"25,420.15 USDT",
    bankAccount:"Yes",
    ethBalance:"1,230.20 ETH"
  },
  {
    id: 2,
    clientName : "Wade Warren",
    caseId: "PR99507",
    walletStatus :'Inactive',
    usdt:"25,420.15 USDT",
    bankAccount:"No",
    ethBalance:"1,230.20 ETH"
  },
  {
    id: 3,
    clientName : "Cameron Williamson",
    caseId: "PR99506",
    walletStatus :'Active',
    usdt:"25,420.15 USDT",
    bankAccount:"Yes",
    ethBalance:"1,230.20 ETH"
  },
  {
    id: 4,
    clientName : "Leslie Alexander",
    caseId: "PR99505",
    walletStatus :'Active',
    usdt:"25,420.15 USDT",
    bankAccount:"Yes",
    ethBalance:"1,230.20 ETH"
  },
  {
    id: 5,
    clientName : "Jenny Wilson",
    caseId: "PR99504",
    walletStatus :'Inactive',
    usdt:"25,420.15 USDT",
    bankAccount:"Yes",
    ethBalance:"1,230.20 ETH"
  },
  {
    id: 6,
    clientName : "Wade Warren",
    caseId: "PR99507",
    walletStatus :'Inactive',
    usdt:"25,420.15 USDT",
    bankAccount:"No",
    ethBalance:"1,230.20 ETH"
  },
  {
    id: 7,
    clientName : "Cameron Williamson",
    caseId: "PR99506",
    walletStatus :'Active',
    usdt:"25,420.15 USDT",
    bankAccount:"Yes",
    ethBalance:"1,230.20 ETH"
  },
  {
    id: 8,
    clientName : "Leslie Alexander",
    caseId: "PR99505",
    walletStatus :'Active',
    usdt:"25,420.15 USDT",
    bankAccount:"Yes",
    ethBalance:"1,230.20 ETH"
  },
  {
    id: 9,
    clientName : "Jenny Wilson",
    caseId: "PR99504",
    walletStatus :'Inactive',
    usdt:"25,420.15 USDT",
    bankAccount:"Yes",
    ethBalance:"1,230.20 ETH"
  },
  {
    id: 10,
    clientName : "Leslie Alexander",
    caseId: "PR99505",
    walletStatus :'Active',
    usdt:"25,420.15 USDT",
    bankAccount:"Yes",
    ethBalance:"1,230.20 ETH"
  },
  {
    id: 11,
    clientName : "Cameron Williamson",
    caseId: "PR99506",
    walletStatus :'Active',
    usdt:"25,420.15 USDT",
    bankAccount:"Yes",
    ethBalance:"1,230.20 ETH"
  },
  {
    id: 12,
    clientName : "Wade Warren",
    caseId: "PR99507",
    walletStatus :'Inactive',
    usdt:"25,420.15 USDT",
    bankAccount:"No",
    ethBalance:"1,230.20 ETH"
  },
]

export default function ActiveClient() {
  return (
      <div className="grid grid-cols-12">
             <div className="col-span-12 bg-whitelight shadow-[4px_4px_48px_0_rgba(18,18,18,0.08)] rounded-[10px]">
           <div className="flex justify-between items-center p-5 flex-wrap gap-5">
            <h3 className="box-title">Transactions History</h3>
             <a href="/activeclient/addclient" className="bg-purple rounded py-[10px] px-5 text-whitelight flex gap-2 items-center text-base leading-[16px] font-medium"><PlusIcon className="w-5 h-5"/> Add Client</a>
           </div>
            <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-tablehead font-medium">
              <tr>
                <th className="thead-th">
                 Client Name    
                </th>
                <th className="thead-th">
                Case ID
                </th>
                <th className="thead-th">
                  Wallet Status
                </th>
                <th className="thead-th">
                  USDT Balance
                </th>
                <th className="thead-th">
                Bank Account Status
                </th>
                <th className="thead-th">
                ETH Balance
                </th>
              </tr>
            </thead>
            <tbody>
              {clientTransactionList.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-lightgray transition-colors odd:bg-whitelight even:bg-listbg"
                >
                  <td className="tbody-tr">{tx.clientName}</td>
                  <td className="tbody-tr">{tx.caseId}</td>
                  <td className="tbody-tr">
                    <span className={`py-2 text-center rounded-md text-white w-[105px] font-normal text-sm leading-[14px] ${tx.walletStatus === 'Active' ?  "bg-completed":"bg-yellow"} `}>  {tx.walletStatus}</span>
                  </td>
                  <td className="tbody-tr">{tx.usdt}</td>
                  <td className="tbody-tr">
                     <span className={`py-2 text-center rounded-md text-white w-[60px] font-normal text-sm leading-[14px] ${tx.bankAccount === 'Yes' ?  "bg-blue":"bg-red"} `}>  {tx.bankAccount}</span>
                  </td>
                  <td className="tbody-tr">{tx.ethBalance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          </div>
      </div>
  )
}
