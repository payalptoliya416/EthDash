function BankWithdrawal() {
  return (
    <>
      <div className="common-bg mb-[35px]">
        <div className="grid grid-cols-12 lg:gap-[62px] mb-5">
          <div className="col-span-12 lg:col-span-6 relative lg:after:absolute after:top-5 after:transform after:translate-y-0 after:-right-8 after:bg-afterline after:w-[1px] after:h-[85%] after:contet-['']">
            <h3 className="box-title">Enter Your Bank Account Details</h3>
            <div className="grid grid-cols-12 gap-5  mt-[15px]">
              <div className="col-span-12 sm:col-span-6">
                <label className="block text-darkblack mb-2 text-sm font-medium">
                  Account number
                </label>
                <input
                  type="text"
                  className="w-full border border-bordercolor py-3 px-4 rounded text-sm text-darkblack focus:outline-none"
                  placeholder="Account number"
                />
              </div>
              <div className="col-span-12 sm:col-span-6">
                <label className="block text-darkblack mb-2 text-sm font-medium">
                  IBAN
                </label>
                <input
                  type="text"
                  className="w-full border border-bordercolor py-3 px-4 rounded text-sm text-darkblack focus:outline-none"
                  placeholder="IBAN"
                />
              </div>
              <div className="col-span-12 sm:col-span-6">
                <label className="block text-darkblack mb-2 text-sm font-medium">
                  SWIFT code
                </label>
                <input
                  type="text"
                  className="w-full border border-bordercolor py-3 px-4 rounded text-sm text-darkblack focus:outline-none"
                  placeholder="SWIFT code"
                />
              </div>
              <div className="col-span-12 sm:col-span-6">
                <label className="block text-darkblack mb-2 text-sm font-medium">
                  country
                </label>
                <select className="w-full border border-bordercolor py-3 px-4 rounded text-sm text-darkblack focus:outline-none">
                  <option value="Default">Select country</option>
                  <option value="indea">India</option>
                  <option value="china">China</option>
                  <option value="america">America</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6 mt-10 lg:mt-0">
            <h3 className="box-title">Bank Account Validator</h3>
            <div className="mt-[15px]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="transition-colors">
                      <td className="px-[15px] py-[13px] text-sm text-primary font-medium border border-bordercolor bg-listbg whitespace-nowrap">
                        US
                      </td>
                      <td className="px-[15px] py-[13px] text-sm text-primary font-medium border border-bordercolor bg-whitelight whitespace-nowrap">
                        ABA Routing Number check.
                      </td>
                    </tr>
                    <tr className="transition-colors">
                      <td className="px-[15px] py-[13px] text-sm text-primary font-medium border border-bordercolor bg-whitelight whitespace-nowrap">
                        EU
                      </td>
                      <td className="px-[15px] py-[13px] text-sm text-primary font-medium border border-bordercolor bg-listbg whitespace-nowrap">
                       IBAN validation.
                      </td>
                    </tr>
                    <tr className="transition-colors">
                      <td className="px-[15px] py-[13px] text-sm text-primary font-medium border border-bordercolor bg-listbg whitespace-nowrap">
                       UK
                      </td>
                      <td className="px-[15px] py-[13px] text-sm text-primary font-medium border border-bordercolor bg-whitelight whitespace-nowrap">
                       Sort Code & Account Number validation.
                      </td>
                    </tr>
                    <tr className="transition-colors">
                      <td className="px-[15px] py-[13px] text-sm text-primary font-medium border border-bordercolor  bg-whitelight whitespace-nowrap">
                        Others
                      </td>
                      <td className="px-[15px] py-[13px] text-sm text-primary font-medium border border-bordercolor bg-listbg whitespace-nowrap">
                       International SWIFT/BIC check.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="py-[10px] px-5 bg-purple text-whitelight rounded text-base leading-[16px] font-medium cursor-pointer">Submit</button>
        </div>
      </div>
        <div className="common-bg mb-[35px]">
          <div className="flex justify-between items-center mb-[31px] flex-wrap gap-4">
            <h3 className="text-primary text-lg xl:text-2xl md:leading-[24px] font-medium text-primary mb-0">Available Balance for Withdrawal</h3>
            <button type="submit" className="py-[10px] px-5 bg-purple text-whitelight rounded text-base leading-[16px] font-medium cursor-pointer">Withdrawal</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 items-center flex-wrap">
             <button className="py-3 xl:py-6 px-5 rounded border border-bordercolor text-secondary text-lg xl:text-[26px] leading-[26px] font-medium w-full  text-start">0.00 USD</button>
             <button className="py-3 xl:py-6 px-5 rounded border border-bordercolor text-secondary text-lg xl:text-[26px] leading-[26px] font-medium w-full  text-start">0.00 USD</button>
             <button className="py-3 xl:py-6 px-5 rounded border border-bordercolor text-secondary text-lg xl:text-[26px] leading-[26px] font-medium w-full  text-start">0.00 USD</button>
             <button className="py-3 xl:py-6 px-5 rounded border border-bordercolor text-secondary text-lg xl:text-[26px] leading-[26px] font-medium w-full  text-start">0.00 USD</button>
          </div>
        </div>
    </>
  );
}

export default BankWithdrawal;
