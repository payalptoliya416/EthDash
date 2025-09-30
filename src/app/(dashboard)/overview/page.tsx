function Overview() {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-8 bg-whitelight shadow-[4px_4px_48px_0_rgba(18,18,18,0.08)] p-5 rounded-[10px]">
        <div className="flex justify-between items-center mb-[15px]">
            <h3 className="text-base font-semibold text-primary mb-0">Smart Contract Details</h3>
            <button className="text-accetgray bg-yellow py-2 px-5 rounded-[4px] text-sm font-medium">Pending</button>
        </div>
        <div>
            <h3 className="text-lg font-medium mb-[10px] text-accetgray">Recovered Funds Balance</h3>
            <div className="flex gap-[10px] items-center mb-3"> 
                 <div><img src="/t1.png" alt="" /></div>
                <h2 className="text-purple text-[28px] leading-[28px] font-bold">1.00 USDT</h2>
            </div>
            <div className="flex items-center">
                
            </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
