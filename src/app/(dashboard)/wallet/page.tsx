
function Wallet() {
  return (
    <div className="grid grid-cols-12 gap-5">
       <div className="col-span-12 md:col-span-6 common-bg">
           <div className="flex items-center gap-[18px]">
            <img src="/wallet1.png" alt="" />
            <div>
                <h3 className="text-secondary text-base md:text-lg leading-5 mb-3 mb-base md:mb-[15px] font-medium">USDT Available Balance</h3>
                <h2 className="text-purple text-2xl md:text-[32px] leading-[32px] font-bold">0.00 USDT</h2>
            </div>
           </div>
       </div>
       <div className="col-span-12 md:col-span-6 common-bg">
           <div className="flex items-center gap-[18px]">
            <img src="/wallet2.png" alt="" />
            <div>
                <h3 className="text-secondary text-base md:text-lg leading-5 mb-3 mb-base md:mb-[15px] font-medium">ETH Available Balance</h3>
                <h2 className="text-purple text-2xl md:text-[32px] leading-[32px] font-bold">0.00 ETH</h2>
            </div>
           </div> 
       </div>
        <div className="col-span-12 common-bg space-y-5">
            <div className="flex justify-between items-center rounded-md bg-listbg border border-listborder py-4 lg:py-[25px] px-4 md:px-[23px] flex-wrap gap-3">
                  <h3 className="text-base md:text-lg leading-5 font-normal text-primary">Wallet Type:</h3>
                  <h2 className="text-base md:text-lg leading-5 font-medium text-primary">ERC-20 Non Custodial</h2>
            </div>
            <div className="flex justify-between items-center rounded-md bg-listbg border border-listborder py-4 lg:py-[25px] px-4 md:px-[23px] flex-wrap gap-3">
                  <h3 className="text-base md:text-lg leading-5 font-normal text-primary">Wallet Creation Date:</h3>
                  <h2 className="text-base md:text-lg leading-5 font-medium text-primary">May 26, 2025</h2>
            </div>
            <div className="flex justify-between items-center rounded-md bg-listbg border border-listborder py-4 lg:py-[25px] px-4 md:px-[23px] flex-wrap gap-3">
                  <h3 className="text-base md:text-lg leading-5 font-normal text-primary">Wallet Security:</h3>
                  <button className="text-whitelight py-2 px-4 rounded bg-blue font-medium text-base md:text-lg leading-[20px]">2FA</button>
            </div>
        </div>
    </div>
  )
}

export default Wallet
