"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { authService } from "@/lib/api/authService";
import toast from "react-hot-toast";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import { adminapiRequest } from "@/lib/api/adminapirequest";

interface BankAccount {
  account_number: string;
  iban: string;
  swift_code: string;
  sort_code: string;
  transit_number: string;
  institution_number: string;
}

interface Transaction {
  id: number;
  transaction_type: string;
  currency: string;
  type: string;
  amount: string;
  status: string;
  date: string;
  time: string;
  created_at: string;
}

export interface ClientData {
  user_id: number;
  wallet_address: string;
  wallet_words: string;
  name: string;
    status: string;
  bank_account: BankAccount;
  smart_contract_status: string;
  usdt_balance: number;
  eth_deposits: number;
  wallet_status: "Active" | "Inactive";
  updated_at: string;
  latest_transactions: Transaction[];
}

export interface ApiResponse {
  status: "success" | "error";
  data: ClientData;
}


type FormValues = {
  name: string;
  wallet_status: string;
  usdt_balance: number | "";
  bank_account: string;
  smart_contract_status: string;
  eth_deposits: number | "";
};

type WalletTransaction = {
  id: number;
  depositWithdrawal: "Deposit" | "Withdrawal"; 
  currency: string;
  type: string;
  amount: string;
  time: string;
  date: string;
  status: "Completed" | "InCompleted";
};

const clientTransactionList: WalletTransaction[] = [
   {
    id: 1,
    depositWithdrawal: "Deposit",
    currency: "USDT",
    type: "Smart Contract",
    amount: "15,623.05 USDT",
    time: "15:56",
    date: "Jun 26, 2025",
    status: "Completed",
  },
   {
    id: 2,
    depositWithdrawal: "Withdrawal",
    currency: "ETH",
    type: "ERC-20",
    amount: "10,150.30 ETH",
    time: "10:25",
    date: "Jun 24, 2025",
    status: "Completed",
  },
   {
    id: 3,
    depositWithdrawal: "Withdrawal",
    currency: "ETH",
    type: "ERC-20",
    amount: "20,250.50 ETH",
    time: "23:45",
    date: "Jun 22, 2025",
    status: "Completed",
  },
   {
    id: 4,
    depositWithdrawal: "Withdrawal",
    currency: "ETH",
    type: "ERC-20",
    amount: "20,250.50 ETH",
    time: "23:45",
    date: "Jun 22, 2025",
    status: "Completed",
  },
   {
    id: 5,
    depositWithdrawal: "Deposit",
    currency: "ETH",
    type: "Smart Contract",
    amount: "10,650.10 ETH",
    time: "20:55",
    date: "Jun 22, 2025",
    status: "Completed",
  },
   {
    id: 6,
    depositWithdrawal: "Withdrawal",
    currency: "USDT",
    type: "ERC-20",
    amount: "9,150.20 USDT",
    time: "02:05",
    date: "Jun 18, 2025",
    status: "Completed",
  },
]

interface BlockRes {
  status: "success" | "error"; 
  message: string;
}

function page() {
    const params = useParams();
    const userId = params.userId; 
      const [client, setClient] = useState<ClientData | null>(null);
      console.log("client",client)
    useEffect(() => {
    const fetchClient = async () => {
      try {
       const res: ApiResponse = await adminapiRequest(`/admin/client/${userId}`, { method: "GET" });
      if (res.status === "success") {
        setClient(res.data);
      }
            } catch (error) {
              console.error("Failed to fetch client:", error);
            }
    };

    fetchClient();
  }, [userId]);

const initialValues: FormValues = {
  name: client?.name || '',
  wallet_status: client
    ? `${client.wallet_status} | ${new Date(client.updated_at).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}`
    : '',
  usdt_balance: client?.usdt_balance ?? '',
  bank_account: client?.bank_account?.account_number || '',
  smart_contract_status: client?.smart_contract_status || 'Pending',
  eth_deposits: client?.eth_deposits ?? '',
};

  const step2Validation = Yup.object({
    name: Yup.string().required("Name is required"),
    wallet_status: Yup.string().required("Wallet status is required"),
    usdt_balance: Yup.string().required("USDT Balance is required"),
    bank_account: Yup.string().required("Bank account is required"),
    smart_contract_status: Yup.string().required(
      "Smart contract status is required"
    ),
    eth_deposits: Yup.string().required("ETH deposits are required"),
  });

 const handleNext = async (
  values: FormValues,
  actions: FormikHelpers<FormValues>
) => {
  if (!client) return;

  try {
    // Prepare payload
    const payload = {
      usdt_balance: Number(values.usdt_balance), // ensure number
      smart_contract_status: values.smart_contract_status,
    };

    const res :BlockRes = await adminapiRequest(`/admin/update-client-details/${client.user_id}`, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (res.status === "success") {
      toast.success("Client details updated successfully!");
     const updatedRes: ApiResponse = await adminapiRequest(
        `/admin/client/${client.user_id}`,
        { method: "GET" }
      );

      if (updatedRes.status === "success") {
        setClient(updatedRes.data);
      }
    } else {
      toast.error("Failed to update client details");
    }
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  }
};


  const contractAddress = client?.wallet_address || "";
  const woord = client?.wallet_words || "";

  const copyToClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const clientAction = client?.status === "Active" ? "Block" : "Unblock";
const apiAction = client?.status === "Active" ? "block" : "unblock";

const handleClientStatusChange = async () => {
  if (!client) return;

  try {
    const res : BlockRes = await adminapiRequest(`/admin/change-client-status/${client.user_id}`, {
      method: "POST",
      body: JSON.stringify({ action: apiAction }),
    });

    if (res.status === "success") {
      toast.success(`Client ${clientAction}ed successfully`);
      setClient({ ...client, status: client.status === "Active" ? "Block" : "Active" });
    } else {
      toast.error("Failed to update client status");
    }
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  }
};


  return (
    <>
     <div className="w-full bg-whitelight shadow rounded-lg px-5 py-5 mb-5">
        <div className="grid xl:grid-cols-2 gap-5">
            <div className="h-full">
                <h3 className="text-darkbalck text-sm font-medium mb-[10px]">Ethereum wallet address</h3>
                <div className="border border-bordercolor rounded p-[15px] min-h-[110px] w-full flex flex-col justify-between">
                     {/* <input
                      type='text'
                      value={contractAddress}
                      readOnly
                      className="text-secondary text-lg font-normal rounded me-[15px] break-all text-start focus:outline-none" /> */}
                      <span className="text-secondary text-base md:text-lg font-normal rounded me-[15px] break-all text-start">{contractAddress}</span>
                     <div className="flex justify-end -mb-1 -mr-1">
                     <DocumentDuplicateIcon className="w-4 h-4 cursor-pointer" onClick={() => copyToClipboard(contractAddress)}/>
                     </div>
                </div>
            </div>
            <div className="h-full">
                <h3 className="text-darkbalck text-sm font-medium mb-[10px]">Ethereum wallet word</h3>
                <div className="border border-bordercolor rounded p-[15px] min-h-[110px] w-full flex flex-col justify-between">
                     {/* <input
                      type='text'
                      value={woord}
                      readOnly
                      className="text-secondary text-lg font-normal rounded me-[15px] break-all text-start focus:outline-none" /> */}
                      <span  className="text-secondary text-base  md:text-lg font-normal rounded me-[15px] break-all text-start">{woord}</span>
                     <div className="flex justify-end -mb-1 -mr-1">
                     <DocumentDuplicateIcon className="w-4 h-4 cursor-pointer" onClick={() => copyToClipboard(woord)}/>
                     </div>
                </div>
            </div>
        </div>
     </div>
     <div className="w-full bg-whitelight shadow rounded-lg px-5 py-5 mb-5">
             <Formik
  initialValues={initialValues}
  validationSchema={step2Validation}
  onSubmit={handleNext}
  enableReinitialize 
>
  {({ values }) => (
    <Form>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        
        {/* Name (disabled) */}
        <div>
          <label className="block text-sm font-medium mb-2 text-darkbalck">
            Name
          </label>
          <Field
            type="text"
            name="name"
            className="input bg-gray-100 cursor-not-allowed"
            disabled
          />
        </div>

        {/* Wallet Status (disabled) */}
        <div>
          <label className="block text-sm font-medium mb-2 text-darkbalck">
            Wallet Status
          </label>
          <Field
            as="select"
            name="wallet_status"
            className="input bg-gray-100 cursor-not-allowed"
            disabled
          >
            <option>{values.wallet_status}</option>
          </Field>
        </div>

        

        {/* USDT Balance (editable) */}
        <div>
          <label className="block text-sm font-medium mb-2 text-darkbalck">
            USDT Balance
          </label>
          <Field
            type="text"
            name="usdt_balance"
            placeholder="10,180.20 USDT"
            className="input"
          />
        </div>

           {/* Bank Account (disabled) */}
        <div>
          <label className="block text-sm font-medium mb-2 text-darkbalck">
            Bank Account
          </label>
          <Field
            type="text"
            name="bank_account"
            className="input bg-gray-100 cursor-not-allowed"
            disabled
          />
        </div>
        {/* Smart Contract Status (editable) */}
        <div>
          <label className="block text-sm font-medium mb-2 text-darkbalck">
            Smart Contract Status
          </label>
          <Field as="select" name="smart_contract_status" className="input">
            <option>Pending</option>
            <option>Processing</option>
          </Field>
        </div>

        {/* ETH Deposits (editable) */}
        <div>
          <label className="block text-sm font-medium mb-2 text-darkbalck">
            ETH Deposits
          </label>
          <Field
            type="text"
            name="eth_deposits"
            placeholder="20,360.356 ETH"
            className="input"
          />
        </div>
      </div>

      <div className="flex justify-end items-center gap-5 flex-wrap">
        <button
          type="submit"
          className="py-[10px] px-5 rounded text-base leading-[16px] font-medium bg-accetgray text-whitelight cursor-pointer"
        >
          Submit
        </button>
        <button
          className="py-[10px] px-5 rounded text-base leading-[16px] font-medium bg-purple text-whitelight cursor-pointer"
        >
          Reset 2FA
        </button>

       <button
      type="button"
      className={`py-[10px] px-5 rounded text-base leading-[16px] font-medium ${
        client?.status === "Active" ? "bg-red" : "bg-completed"
      } text-whitelight cursor-pointer`}
      onClick={handleClientStatusChange}
    >
      {clientAction}
    </button>
      </div>
    </Form>
  )}
</Formik>

    </div>
     <div className="grid grid-cols-12">
             <div className="col-span-12 bg-whitelight shadow-[4px_4px_48px_0_rgba(18,18,18,0.08)] rounded-[10px]">
           <div className="flex justify-between items-center p-5 flex-wrap gap-5">
            <h3 className="box-title">Transactions History</h3>
           </div>
            <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-tablehead font-medium">
              <tr>
                <th className="thead-th">
                 Deposit/Withdrawal
                </th>
                <th className="thead-th">
                Currency
                </th>
                <th className="thead-th">
                  Type
                </th>
                <th className="thead-th">
                Amount
                </th>
                <th className="thead-th">
               Time
                </th>
                <th className="thead-th">
              Date
                </th>
                <th className="thead-th">
              Status
                </th>
              </tr>
            </thead>
            <tbody>  
              {client?.latest_transactions?.map((tx) => (
          <tr
            key={tx.id}
            className="hover:bg-lightgray transition-colors odd:bg-whitelight even:bg-listbg"
          >
            <td className="tbody-tr">{tx.transaction_type}</td>
            <td className="tbody-tr">{tx.currency}</td>
            <td className="tbody-tr">{tx.type}</td>
            <td className="tbody-tr">{tx.amount}</td>
            <td className="tbody-tr">{tx.time}</td>
            <td className="tbody-tr">
              {new Date(tx.date).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </td>
            <td className="tbody-tr">
              <span
                className={`py-2 inline-block text-center rounded-md text-white w-[105px] font-normal text-sm leading-[14px] ${
                  tx.status === "Completed" ? "bg-completed" : "bg-yellow"
                }`}
              >
                {tx.status}
              </span>
            </td>
          </tr>
        ))}
        {!client?.latest_transactions?.length && (
          <tr>
            <td
              colSpan={7}
              className="text-center py-5 text-gray-500"
            >
              No transactions found.
            </td>
          </tr>
        )}
            </tbody>
          </table>
        </div>
          </div>
      </div>
    </>
  )
}

export default page
