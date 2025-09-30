import { DocumentDuplicateIcon, EyeIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";


type Transaction = {
  id: number;
  action: "Deposit" | "Withdrawal";
  currency: string;
  type: string;
  amount: string;
  time: string;
  date: string;
  status: "Completed" | "Pending" | "Failed";
};

const transactions: Transaction[] = [
  {
    id: 1,
    action: "Deposit",
    currency: "USDT",
    type: "Smart Contract",
    amount: "15,623.05 USDT",
    time: "15:56",
    date: "Jun 26, 2025",
    status: "Completed",
  },
  {
    id: 2,
    action: "Withdrawal",
    currency: "ETH",
    type: "ERC-20",
    amount: "10,150.30 ETH",
    time: "10:25",
    date: "Jun 24, 2025",
    status: "Completed",
  },
  {
    id: 3,
    action: "Withdrawal",
    currency: "ETH",
    type: "ERC-20",
    amount: "20,250.50 ETH",
    time: "23:45",
    date: "Jun 22, 2025",
    status: "Completed",
  },
  {
    id: 4,
    action: "Deposit",
    currency: "ETH",
    type: "Smart Contract",
    amount: "10,650.10 ETH",
    time: "20:55",
    date: "Jun 22, 2025",
    status: "Completed",
  },
  {
    id: 5,
    action: "Withdrawal",
    currency: "USDT",
    type: "ERC-20",
    amount: "9,150.20 USDT",
    time: "02:05",
    date: "Jun 18, 2025",
    status: "Completed",
  },
];


function Overview() {
  return (
    <>
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 xl:col-span-7">
        <div className="common-bg mb-5">
        <div className="flex justify-between items-center mb-[15px]">
            <h3 className="box-title">Smart Contract Details</h3>
            <button className="text-accetgray bg-yellow py-2 px-5 rounded-[4px] text-sm font-medium">Pending</button>
        </div>
        <div>
            <h3 className="text-lg font-medium mb-[10px] text-accetgray">Recovered Funds Balance</h3>
            <div className="flex gap-[10px] items-center mb-3"> 
                 <div><img src="/t1.png" alt="" /></div>
                <h2 className="text-purple text-[28px] leading-[28px] font-bold">1.00 USDT</h2>
            </div>
            <div className="flex items-center flex-wrap gap-2">
                <span className="text-sm leading-[14px] font-medium mr-[10px] text-darkblack">Smart contract address :</span>
                 <button className="bg-lightgray py-[7px] px-[10px] rounded me-[15px] text-sm leading-[14px] break-all text-start">0xdAC17F958D2ee523a2206206994597C13D831ec7</button>
                 <div className="flex items-center gap-[7px]">
                    <EyeIcon className="h-4 w-4 text-accetgray"/>
                    <DocumentDuplicateIcon className="w-4 h-4 text-accetgray"/>
                 </div>
            </div> 
        </div>
        </div>
        <div className="common-bg">
              <h3 className="text-lg font-medium mb-[10px] text-accetgray">Available Balance</h3>
           <div className="flex gap-[10px] items-center mb-3"> 
                <h2 className="text-purple text-[28px] leading-[28px] font-bold">0 USDT</h2>
                 <div><QuestionMarkCircleIcon className="w-5 h-5 text-accetgray"/></div>
            </div>
            <p className="text-sm mb-[18px] text-darkblack">Your USDT available balance will update once you proceed with the ETH required deposit</p>
            <h3 className="text-base leading-[16px] mb-[11px] text-accetgray">Deposit</h3>
             <form className="grid grid-cols-12 gap-5 w-full items-end mb-[15px]">
            <div className="col-span-12 lg:col-span-5">
                <label className="block text-darkblack mb-2 text-sm font-medium">ETH Balance</label>
                <input
                type="text"
                className="w-full border border-bordercolor py-3 px-4 rounded text-sm text-darkblack focus:outline-none"
                placeholder="1.10"
                />
            </div>
            <div className="col-span-12 lg:col-span-5">
                <label className="block text-darkblack mb-2 text-sm font-medium">USD Value</label>
                <input
                type="text"
                className="w-full border border-bordercolor py-3 px-4 rounded text-sm text-darkblack focus:outline-none"
                placeholder="$5500"
                />
            </div>
            <div className="col-span-12 lg:col-span-2 flex items-end">
                <button
                type="submit"
                className="w-full py-2 md:py-3 rounded bg-purple text-whitelight text-base hover:bg-purple/90 transition"
                >
                Deposit
                </button>
            </div>
            </form>
             <div className="flex items-center flex-wrap gap-2">
                <span className="text-sm leading-[14px] font-medium mr-[10px] text-darkblack">Your  ETH wallet address :</span>
                 <button className="bg-lightgray py-[7px] px-[10px] rounded me-[15px] text-sm leading-[14px] break-all text-start">0x....23123123132131dsada</button>
                 <div className="flex items-center gap-[7px]">
                    <EyeIcon className="h-4 w-4 text-accetgray"/>
                    <DocumentDuplicateIcon className="w-4 h-4 text-accetgray"/>
                 </div>
            </div> 
        </div>
      </div>
      <div className="col-span-12 xl:col-span-5 common-bg">
         <h3 className="box-title">Notifications History</h3>
         <div className="border border-bordercolor p-[15px] rounded mt-5">
               <h3 className="text-sm leading-[14px]  text-primary mb-[10px] font-medium ">Deposit Successful: 15,623.05 USDT</h3>
               <p className="text-paragray text-xs leading-[12px] font-normal">Jun 24, 2025 - 15:56</p>
         </div>
         <div className="border border-bordercolor p-[15px] rounded mt-[15px]">
               <h3 className="text-sm leading-[14px]  text-primary mb-[10px] font-medium ">Smart Contract Updated</h3>
               <p className="text-paragray text-xs leading-[12px] font-normal">Jun 20, 2025 - 10:45</p>
         </div>
         <div className="border border-bordercolor p-[15px] rounded mt-[15px]">
               <h3 className="text-sm leading-[14px]  text-primary mb-[10px] font-medium ">Error: ETH Deposit Required</h3>
               <p className="text-paragray text-xs leading-[12px] font-normal">Jun 18, 2025 - 20:15</p>
         </div>
         <div className="border border-bordercolor p-[15px] rounded mt-[15px]">
               <h3 className="text-sm leading-[14px]  text-primary mb-[10px] font-medium ">Deposit Successful: 15,623.05 USDT</h3>
               <p className="text-paragray text-xs leading-[12px] font-normal">Jun 15, 2025 - 09:35</p>
         </div>
         <div className="border border-bordercolor p-[15px] rounded mt-[15px]">
               <h3 className="text-sm leading-[14px]  text-primary mb-[10px] font-medium ">Smart Contract Updated</h3>
               <p className="text-paragray text-xs leading-[12px] font-normal">Jun 20, 2025 - 10:45</p>
         </div>
      </div>
      <div className="col-span-12 bg-whitelight shadow-[4px_4px_48px_0_rgba(18,18,18,0.08)] rounded-[10px]">
       <h3 className="box-title p-5">Transactions History</h3>
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
          {transactions.map((tx) => (
            <tr
              key={tx.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="tbody-tr">{tx.action}</td>
              <td className="tbody-tr">{tx.currency}</td>
              <td className="tbody-tr">{tx.type}</td>
              <td className="tbody-tr">{tx.amount}</td>
              <td className="tbody-tr">{tx.time}</td>
              <td className="tbody-tr">{tx.date}</td>
              <td className="px-[19px] py-4 md:py-[21px] text-sm  border border-bordercolor">
                <span
                  className={`px-4 py-1 md:py-2 rounded-md text-xs font-medium ${
                    tx.status === "Completed"
                      ? "bg-completed text-whitelight"
                      : tx.status === "Pending"
                      ? "bg-yellow-500 text-whitelight"
                      : "bg-red-500 text-whitelight"
                  }`}
                >
                  {tx.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </div>
    </div>
    <div className="text-center py-[14px] bg-[url(/overview-bg.png)] bg-cover bg-[100%_100%] bg-no-repeat w-full my-10">
        <h4 className="font-medium text-base md:text-lg leading-[20px] mb-[11px] text-primary">The Benefits of</h4>
        <h2 className="text-primary text-2xl md:text-[28px] leading-[28px] font-bold uppercase">Cryptocurrency</h2>
    </div>
    {/* <div className="flex justify-between items-center flex-col md:flex-row gap-4 text-center md:text-left">
         <p className="text-paragray text-sm leading-[14px] font-normal">Copyright © 2025 ETH OpenSource Wallet. All rights reserved.</p>
        <div className="flex gap-[25px]">
            <a href="#" className="text-paragray text-sm leading-[14px] font-normal">Privacy policy</a>
            <a href="#" className="text-paragray text-sm leading-[14px] font-normal">Terms use</a>
        </div>
    </div> */}
    </>
  );
}

export default Overview;
