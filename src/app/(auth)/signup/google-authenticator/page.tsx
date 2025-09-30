"use client";

import Image from "next/image";
import React, { JSX } from "react";

export default function GoogleAuthentication(): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="md:w-1/2 flex flex-col order-2 md:order-1 justify-between">
        <div className="p-[35px] pb-0 mb-[43px]">
          <a href="javascript:void(0)">
            {/*  Use next/image for logo as well */}
            <Image src="/logo.png" alt="Logo" width={120} height={40} />
          </a>
        </div>

        <div className="text-center px-6 sm:px-10 lg:px-16 xl:px-[90px]">
          <h3 className="text-primary mb-10 text-2xl sm:text-[28px] font-semibold">
            Google Authenticator Setup
          </h3>

          {/*  Proper number type for width/height */}
          <Image
            src="/scanner.png"
            width={226}
            height={226}
            alt="QR Scanner"
            className="mx-auto mb-[30px]"
          />

          <h4 className="text-primary mb-[25px] text-[22px] leading-[22px] font-semibold">
            Scan QR Code
          </h4>
          <p className="text-[#595959] mb-[15px] text-base leading-[26px]">
            After signup details user will be prompted with 2FA GAuth setup
          </p>
          <p className="text-[#595959] text-base leading-[26px]">
            2FA is mandatory to create an account, please download the Google
            Authenticator app and link it to the QR below
          </p>
        </div>

        {/* Footer */}
        <div className="text-sm text-[#595959] p-[35px] flex justify-center lg:justify-between flex-col lg:flex-row items-center gap-3">
          <span>© 2025 ETH Wallet.</span>
          <span>
            <a href="javascript:void(0)" className="me-[25px]">
              Privacy Policy
            </a>
            <a href="javascript:void(0)">Terms Use</a>
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 order-1 md:order-2 hidden md:block">
        <div className="bg-[url(/auth-bg.png)] bg-cover bg-no-repeat bg-[100%_100%] h-full w-full flex flex-col items-center justify-center py-24">
          <div className="px-6 sm:px-10 lg:px-[70px]">
            <div className="pb-[88px]">
              <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold mb-[15px]">
                Secure Your Wallet with 2FA
              </h3>
              <p className="text-white font-normal text-sm sm:text-base leading-[26px]">
                Enable Google Authenticator for an extra layer of protection and
                keep your crypto assets safe.
              </p>
            </div>

            {/*  Use next/image here too */}
            <Image
              src="/authenticator.png"
              alt="Authenticator"
              width={280}
              height={220}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
