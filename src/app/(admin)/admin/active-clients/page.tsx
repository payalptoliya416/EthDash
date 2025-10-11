'use client'

import { authService } from "@/lib/api/authService";
import { EyeIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ClientTransaction = {
  id: number;
  clientName: string;
  caseId: string;
  walletStatus: "Active" | "Inactive"; 
  usdt: number; 
  bankAccount: "Yes" | "No";
  ethBalance: number; 
  userID : number
};

interface ApiResponse {
  status: string;
  data: {
    id: number;
    case_id: string;
    email: string;
    first_name: string;
    last_name: string;
    status: "Active" | "Inactive";
    bank: "Yes" | "No";
    sdt_balance: number;
    eth_balance: number;
  }[];
}

export default function ActiveClient() {
  const router = useRouter();
  const [clientTransactionList, setClientTransactionList] = useState<ClientTransaction[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await authService.activeClient();

        if (res.status === "success") {
          const mappedClients: ClientTransaction[] = res.data.map((client) => ({
             id: client.id,
  clientName: `${client.first_name ?? ""} ${client.last_name ?? ""}`,
  caseId: client.case_id ?? "",
  walletStatus: client.status ?? "",
  usdt: client.sdt_balance ?? "",
  bankAccount: client.bank ?? "",
  ethBalance: client.eth_balance ?? "",
  userID: client.user_id ?? 0,

          }));

          setClientTransactionList(mappedClients);
        }
      } catch (error) {
        console.error("Failed to fetch clients:", error);
      }
    };

    fetchClients();
  }, []);

  const handleViewClick = (userId: number) => {
    router.push(`/admin/active-clients/wallet/${userId}`);
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 bg-whitelight shadow-[4px_4px_48px_0_rgba(18,18,18,0.08)] rounded-[10px]">
        <div className="flex justify-between items-center p-5 flex-wrap gap-5">
          <h3 className="box-title">Active Clients</h3>
          <a href="/admin/active-clients/add-client" className="bg-purple rounded py-[10px] px-5 text-whitelight flex gap-2 items-center text-base leading-[16px] font-medium">
            <PlusIcon className="w-5 h-5"/> Add Client
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-tablehead font-medium">
              <tr>
                <th className="thead-th">Client Name</th>
                <th className="thead-th">Case ID</th>
                <th className="thead-th">Wallet Status</th>
                <th className="thead-th">USDT Balance</th>
                <th className="thead-th">Bank Account Status</th>
                <th className="thead-th">ETH Balance</th>
                <th className="thead-th">View</th>
              </tr>
            </thead>
            <tbody>
              {clientTransactionList.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-lightgray transition-colors odd:bg-whitelight even:bg-listbg"
                >
                  <td className="tbody-tr">{tx.clientName ?? ""}</td>
                  <td className="tbody-tr">{tx.caseId ?? ""}</td>
                  <td className="tbody-tr">
                    <span className={`py-2 inline-block text-center rounded-md text-white w-[105px] font-normal text-sm leading-[14px] ${tx.walletStatus === 'Active' ?  "bg-completed":"bg-yellow"} `}>
                      {tx.walletStatus ?? ""}
                    </span>
                  </td>
                  <td className="tbody-tr">{tx.usdt ?? ""}</td>
                  <td className="tbody-tr">
                    <span className={`py-2 text-center inline-block rounded-md text-white w-[60px] font-normal text-sm leading-[14px] ${tx.bankAccount === 'Yes' ?  "bg-blue":"bg-red"} `}>
                      {tx.bankAccount ?? ""}
                    </span>
                  </td>
                  <td className="tbody-tr">{tx.ethBalance ?? ""}</td>
                  <td className="tbody-tr">
                {tx.walletStatus !== "Inactive" ? (
              <button onClick={() => handleViewClick(tx.userID)}>
                <EyeIcon className="w-5 h-5 cursor-pointer text-purple" />
              </button>
            ) : null}
              </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
