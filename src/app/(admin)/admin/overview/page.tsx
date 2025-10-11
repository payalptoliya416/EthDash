'use client'

import { authService } from "@/lib/api/authService";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Transaction = {
  id: number;
  name: string;
  email: string;
  action: string;
  timestamp: string;
};

interface ApiResponse {
  status: string;
  data: {
    id: number;
    action: string;
    created_at: string;
    user: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
    };
  }[];
}

export default function Overview() {
 const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res =  await authService.historyGet();

        if (res.status === "success") {
          const mappedTransactions: Transaction[] = res.data.map((tx) => ({
            id: tx.id,
            name: `${tx.user.first_name} ${tx.user.last_name}`,
            email: tx.user.email,
            action: tx.action,
            timestamp: new Date(tx.created_at).toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
          }));

          setTransactions(mappedTransactions);
        }
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
      <div className="grid grid-cols-12">
        <div className="col-span-12 bg-whitelight shadow-[4px_4px_48px_0_rgba(18,18,18,0.08)] rounded-[10px]">
                <h3 className="box-title p-5">Transactions History</h3>
            <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-tablehead font-medium">
                  <tr>
                <th className="thead-th">Client Name</th>
                <th className="thead-th">Email</th>
                <th className="thead-th">Action</th>
                <th className="thead-th">Timestamp</th>
              </tr>
                </thead>
                <tbody>
                 {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-lightgray transition-colors odd:bg-whitelight even:bg-listbg"
                >
                  <td className="tbody-tr">{tx.name}</td>
                  <td className="tbody-tr">{tx.email}</td>
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
