'use client'

import React, { useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import Image from "next/image";

type Step1Values = {
  caseId: string;
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

export default function AddClient() {
    
const initialValues: FormValues = {
  caseId: "",
  email: "",
  name: "",
  walletStatus: "Active | Jun 25, 2025 07:24 PM",
  usdtBalance: "",
  bankAccount: "",
  smartContractStatus: "Pending",
  ethDeposits: "",
};

const step1Validation = Yup.object({
  caseId: Yup.string().required("Case ID is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const step2Validation = Yup.object({
  name: Yup.string().required("Name is required"),
  walletStatus: Yup.string().required("Wallet status is required"),
  usdtBalance: Yup.string().required("USDT Balance is required"),
  bankAccount: Yup.string().required("Bank account is required"),
  smartContractStatus: Yup.string().required("Smart contract status is required"),
  ethDeposits: Yup.string().required("ETH deposits are required"),
});


const [step, setStep] = useState(1);

  const handleNext = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    if (step === 1) {
      try {
        await step1Validation.validate(values, { abortEarly: false });
        setStep(2);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors: Record<string, string> = {};
          err.inner.forEach((error) => {
            if (error.path) errors[error.path] = error.message;
          });
          actions.setErrors(errors);
        }
      }
    } else {
      console.log("Submitted:", values);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <>
    {/* <div className="flex justify-center">
      <div className="w-full max-w-[635px] bg-whitelight shadow-[4px_4px_48px_0_rgba(18,18,18,0.08)] rounded-[10px] px-[45px] py-[35px]">
        <div className="flex items-center gap-[120px] justify-center mb-10">
          <div className="flex flex-col justify-center gap-[10px] items-center">
            <span className="w-12 h-12 rounded-full bg-purple flex justify-center items-center text-whitelight  font-bold text-lg leading-[20px]">
              1
            </span>
            <h3 className="text-sm leading-[14px] text-accetgray">Step</h3>
          </div>
          <div className="flex flex-col justify-center gap-[10px] items-center">
            <span className="w-12 h-12 rounded-full flex justify-center items-center font-bold text-lg leading-[20px] border border-bordercolor text-linkgray">
              2
            </span>
            <h3 className="text-sm leading-[14px] text-accetgray">Step</h3>
          </div>
        </div>
        <form>
          <div className="mb-5">
            <label className="block text-sm font-medium mb-[10px] text-darkbalck">Case ID</label>
            <input
              type="text"
              name="name"
              placeholder="PR99509"
              className="input"
            />
          </div>
          <div className="mb-[35px]">
            <label className="block text-sm font-medium mb-[10px] text-darkbalck">Email</label>
            <input
              type="text"
              name="email"
              placeholder="jennywilson15@gmail.com"
              className="input"
            />
          </div>
          <div className="text-center">
         <button type="submit" className="py-[10px] px-5 rounded text-base leading-[16px] font-medium bg-purple text-whitelight">Generate ETH wallet</button>
          </div>
        </form>
         <form>
         <div className="grid grid-cols-2 gap-5 mb-[35px]">
           <div>
            <label className="block text-sm font-medium mb-[10px] text-darkbalck">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Jenny Wilson"
              className="py-[14px] px-[15px] text-sm leading-[14px] placeholder:text-sm border border-bordercolor focus:outline-none rounded w-full"
            />
          </div>
           <div>
            <label className="block text-sm font-medium mb-[10px] text-darkbalck">Wallet Status</label>
            <select
              className="py-[14px] px-[15px] text-sm leading-[14px] placeholder:text-sm border border-bordercolor focus:outline-none rounded w-full">
                <option value="">JActive | Jun 25, 2025 07:24 PM</option>
                <option value="">JActive | Jun 25, 2025 07:24 PM</option>
                <option value="">JActive | Jun 25, 2025 07:24 PM</option>
              </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-[10px] text-darkbalck">USDT Balance</label>
            <input
              type="text"
              name="name"
              placeholder="10,180.20 USDT"
              className="py-[14px] px-[15px] text-sm leading-[14px] placeholder:text-sm border border-bordercolor focus:outline-none rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-[10px] text-darkbalck">Bank Account</label>
            <input
              type="text"
              name="name"
              placeholder="1235 5263 2568"
              className="py-[14px] px-[15px] text-sm leading-[14px] placeholder:text-sm border border-bordercolor focus:outline-none rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-[10px] text-darkbalck">Smart Contract Status</label>
            <select
              className="py-[14px] px-[15px] text-sm leading-[14px] placeholder:text-sm border border-bordercolor focus:outline-none rounded w-full">
                <option value="">Pending</option>
                <option value="">Pending</option>
                <option value="">Pending</option>
              </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-[10px] text-darkbalck">ETH Deposits</label>
            <input
              type="text"
              name="name"
              placeholder="20,360.356 ETH"
              className="py-[14px] px-[15px] text-sm leading-[14px] placeholder:text-sm border border-bordercolor focus:outline-none rounded w-full"
            />
          </div>
         </div>
          <div className="flex justify-center items-center gap-5">
         <button type="submit" className="py-[10px] px-5 rounded text-base leading-[16px] font-medium bg-purple text-whitelight">Reset 2FA</button>
         <button type="submit" className="py-[10px] px-5 rounded text-base leading-[16px] font-medium bg-red text-whitelight">Block Client</button>
          </div>
        </form>
      </div>
    </div> */}
       <div className="flex justify-center mt-10">
      <div className="w-full max-w-[635px] bg-whitelight shadow-lg rounded-lg px-7 md:px-10 py-7 md:py-8">
        {/* Stepper */}
       <div className="flex items-center justify-center mb-10">
        {[1, 2].map((s, index, array) => (
            <React.Fragment key={s}>
            <div className="flex flex-col items-center gap-2">
                <span
                className={`w-12 h-12 rounded-full flex justify-center items-center font-bold text-lg ${
                    step >= s ? "bg-purple text-whitelight" : "border border-bordercolor text-linkgray"
                }`}
                >
                {step > s ? (
                    <Image src="/right.png" alt="check" width={17} height={17} />
                ) : (
                    s
                )}
                </span>
                <h3 className="text-sm text-accetgray">Step</h3>
            </div>

            {index < array.length - 1 && (
                <div
                className={`h-0.5 w-24 transition-colors duration-300 -mt-6 ${
                    step > s ? "bg-purple" : "bg-bordercolor"
                }`}
                ></div>
            )}
            </React.Fragment>
        ))}
        </div>
        
        {/* Formik Form */}
        <Formik initialValues={initialValues} onSubmit={handleNext}>
          {(formik) => (
            <Form>
              {step === 1 && (
                <>
                  <div className="mb-5">
                    <label className="block text-sm font-medium mb-2 text-darkbalck">Case ID</label>
                    <Field
                      type="text"
                      name="caseId"
                      placeholder="PR99509"
                      className="input"
                    />
                    {formik.errors.caseId && formik.touched.caseId && (
                      <div className="text-red-500 text-xs">{formik.errors.caseId}</div>
                    )}
                  </div>
                  <div className="mb-5">
                    <label className="block text-sm font-medium mb-2 text-darkbalck">Email</label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="jennywilson15@gmail.com"
                      className="input"
                    />
                    {formik.errors.email && formik.touched.email && (
                      <div className="text-red-500 text-xs">{formik.errors.email}</div>
                    )}
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="py-2 px-6 rounded bg-purple text-whitelight font-medium cursor-pointer"
                    >
                     Generate ETH wallet
                    </button>
                      <div className="text-center">
          </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-darkbalck">Name</label>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Jenny Wilson"
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-darkbalck">Wallet Status</label>
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
                      <label className="block text-sm font-medium mb-2 text-darkbalck">USDT Balance</label>
                      <Field
                        type="text"
                        name="usdtBalance"
                        placeholder="10,180.20 USDT"
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-darkbalck">Bank Account</label>
                      <Field
                        type="text"
                        name="bankAccount"
                        placeholder="1235 5263 2568"
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-darkbalck">Smart Contract Status</label>
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
                      <label className="block text-sm font-medium mb-2 text-darkbalck">ETH Deposits</label>
                      <Field
                        type="text"
                        name="ethDeposits"
                        placeholder="20,360.356 ETH"
                        className="input"
                      />
                    </div>
                  </div>
                        <div className="flex justify-center items-center gap-5 flex-wrap">
                <button type="submit" className="py-[10px] px-5 rounded text-base leading-[16px] font-medium bg-purple text-whitelight cursor-pointer"  onClick={handleBack}>Reset 2FA</button>
                <button type="submit" className="py-[10px] px-5 rounded text-base leading-[16px] font-medium bg-red text-whitelight cursor-pointer">Block Client</button>
                </div>
                </>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </>
  );
}
