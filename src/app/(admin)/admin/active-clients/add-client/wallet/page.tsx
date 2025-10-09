"use client";

import React, { useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { authService } from "@/lib/api/authService";
import toast from "react-hot-toast";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

type Step1Values = {
  case_id: string;
  email: string;
};

type Step2Values = {
  name: string;
  walletStatus: string;
  usdtBalance: string;
  bankAccount: string;
  smartContractStatus: string;
  ethDeposits: string;
};

type FormValues = Step1Values & Step2Values;

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

function page() {
  const initialValues: FormValues = {
    case_id: "",
    email: "",
    name: "",
    walletStatus: "Active | Jun 25, 2025 07:24 PM",
    usdtBalance: "",
    bankAccount: "",
    smartContractStatus: "Pending",
    ethDeposits: "",
  };

  const step2Validation = Yup.object({
    name: Yup.string().required("Name is required"),
    walletStatus: Yup.string().required("Wallet status is required"),
    usdtBalance: Yup.string().required("USDT Balance is required"),
    bankAccount: Yup.string().required("Bank account is required"),
    smartContractStatus: Yup.string().required(
      "Smart contract status is required"
    ),
    ethDeposits: Yup.string().required("ETH deposits are required"),
  });

  const handleNext = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
      try {
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors: Record<string, string> = {};
          err.inner.forEach((error) => {
            if (error.path) errors[error.path] = error.message;
          });
          actions.setErrors(errors);
        }
  };}

  const handleBack = () => {
   
  };

  const contractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
  const woord = 'ocean vibrant nest gentle moon mirror carpet yellow energy jungle crisp dawn';

  const copyToClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy");
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
               <Formik initialValues={initialValues} onSubmit={handleNext}>
                       {() => (
                         <Form>
                             <>
                               <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
                                 <div>
                                   <label className="block text-sm font-medium mb-2 text-darkbalck">
                                     Name
                                   </label>
                                   <Field
                                     type="text"
                                     name="name"
                                     placeholder="Jenny Wilson"
                                     className="input"
                                   />
                                 </div>
                                 <div>
                                   <label className="block text-sm font-medium mb-2 text-darkbalck">
                                     Wallet Status
                                   </label>
                                   <Field
                                     as="select"
                                     name="walletStatus"
                                     className="input"
                                   >
                                     <option>Active | Jun 25, 2025 07:24 PM</option>
                                     <option>Inactive | Jun 25, 2025 07:24 PM</option>
                                   </Field>
                                 </div>
                                 <div>
                                   <label className="block text-sm font-medium mb-2 text-darkbalck">
                                     USDT Balance
                                   </label>
                                   <Field
                                     type="text"
                                     name="usdtBalance"
                                     placeholder="10,180.20 USDT"
                                     className="input"
                                   />
                                 </div>
                                 <div>
                                   <label className="block text-sm font-medium mb-2 text-darkbalck">
                                     Bank Account
                                   </label>
                                   <Field
                                     type="text"
                                     name="bankAccount"
                                     placeholder="1235 5263 2568"
                                     className="input"
                                   />
                                 </div>
                                 <div>
                                   <label className="block text-sm font-medium mb-2 text-darkbalck">
                                     Smart Contract Status
                                   </label>
                                   <Field
                                     as="select"
                                     name="smartContractStatus"
                                     className="input"
                                   >
                                     <option>Pending</option>
                                     <option>Completed</option>
                                   </Field>
                                 </div>
                                 <div>
                                   <label className="block text-sm font-medium mb-2 text-darkbalck">
                                     ETH Deposits
                                   </label>
                                   <Field
                                     type="text"
                                     name="ethDeposits"
                                     placeholder="20,360.356 ETH"
                                     className="input"
                                   />
                                 </div>
                               </div>
                               <div className="flex justify-center items-center gap-5 flex-wrap">
                                 <button
                                   type="submit"
                                   className="py-[10px] px-5 rounded text-base leading-[16px] font-medium bg-purple text-whitelight cursor-pointer"
                                   onClick={handleBack}
                                 >
                                   Reset 2FA
                                 </button>
                                 <button
                                   type="submit"
                                   className="py-[10px] px-5 rounded text-base leading-[16px] font-medium bg-red text-whitelight cursor-pointer"
                                 >
                                   Block Client
                                 </button>
                               </div>
                             </>
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
              {clientTransactionList.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-lightgray transition-colors odd:bg-whitelight even:bg-listbg"
                >
                  <td className="tbody-tr">{tx.depositWithdrawal}</td>
                  <td className="tbody-tr">{tx.currency}</td>
                  <td className="tbody-tr">{tx.type}</td>
                  <td className="tbody-tr">{tx.amount}</td>
                  <td className="tbody-tr">{tx.time}</td>
                  <td className="tbody-tr">{tx.date}</td>
                  <td className="tbody-tr"><span className={`py-2 inline-block text-center rounded-md text-white w-[105px] font-normal text-sm leading-[14px] ${tx.status === 'Completed' ?  "bg-completed":"bg-yellow"} `}>  {tx.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          </div>
      </div>
    </>
  )
}

export default page
