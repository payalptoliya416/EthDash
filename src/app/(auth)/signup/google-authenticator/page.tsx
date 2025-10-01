"use client";

import Image from "next/image";
import React, { JSX } from "react";

export default function GoogleAuthentication(): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-1/2 flex flex-col order-2 md:order-1 justify-between">
        <div className="p-6 pb-0 mb-9">
          <a href="javascript:void(0)">
            {/*  Use next/image for logo as well */}
            <Image src="/logo.png" alt="Logo" width={120} height={40} />
          </a>
        </div>

        <div className="text-center auth-container">
          <h3 className="auth-heading">
            Google Authenticator Setup
          </h3>

          {/*  Proper number type for width/height */}
          <Image
            src="/scanner.png"
            width={226}
            height={226}
            alt="QR Scanner"
            className="mx-auto mb-[30px] mt-10"
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
        <div className="policy">
          <span>© 2025 ETH Wallet.</span>
          <span>
            <a href="javascript:void(0)" className="me-6">
              Privacy Policy
            </a>
            <a href="javascript:void(0)">Terms Use</a>
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 order-1 md:order-2 hidden md:block">
        <div className="bg-[url(/auth-bg.png)] bg-cover bg-no-repeat bg-[100%_100%] h-full w-full flex flex-col items-center justify-center py-5">
          <div className="right-container">
            <div className="pb-16">
              <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold mb-[15px]">
                Secure Your Wallet with 2FA
              </h3>
              <p className="text-white font-normal text-sm sm:text-base leading-[26px]">
                Enable Google Authenticator for an extra layer of protection and
                keep your crypto assets safe.
              </p>
            </div>

            <Image
              src="/authenticator.png"
              alt="Authenticator"
              width={300}
              height={220}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
