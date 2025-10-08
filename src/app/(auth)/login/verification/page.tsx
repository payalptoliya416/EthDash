"use client";

import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { JSX, useEffect, useState } from "react";
import Image from "next/image";
import { VerificationValue } from "@/types/signup";
import { motion } from "framer-motion";
import { BASE_URL } from "@/lib/api/requests";
// import { useRouter } from "next/navigation";

export default function Verification(): JSX.Element {
  // const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");

useEffect(() => {
  const savedEmail = localStorage.getItem("loginEmail");
  if (savedEmail) {
    setEmail(savedEmail);
  }
}, []);

  // 🔹 Validation Schema
  const validationSchema = Yup.object({
    otp: Yup.array()
      .of(
        Yup.string()
          .matches(/^[0-9]$/, "Must be a digit")
          .required("Required")
      )
      .length(6, "OTP must be 6 digits"),
  });

  // 🔹 Initial Values
  const initialValues: VerificationValue = {
    email: email || "",
    otp: ["", "", "", "", "",""],
  };

  // 🔹 Handle Submit with API call
const handleSubmit = async (
  values: VerificationValue,
  { resetForm }: FormikHelpers<VerificationValue>
) => {
  const otpCode = values.otp.join("");

  if (otpCode.length !== 6) {
    toast.error("Please enter complete OTP ❌");
    return;
  }

  setLoading(true);
  try {
    const response = await fetch(`${BASE_URL}/verify-login-2fa`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        one_time_password: otpCode,
      }),
    });

    const res = await response.json();
    if (response.ok && res.status === "success" && res.user) {
      // ✅ Store in localStorage
      localStorage.setItem("authtoken", res.access_token);
      localStorage.setItem("2fa-enable", String(res.user.is_2fa_enabled ?? false));
      localStorage.setItem("2fa-verify", String(res.user.is_2fa_verify ?? 0));

      toast.success("OTP Verified Successfully ✅");
      resetForm();

      // ✅ Redirect to overview
      window.location.href = "/overview";
    } else {
      toast.error(res.message || "Invalid OTP ❌");
    }
  } catch (error : any) {
    console.error(error);
    toast.error("Something went wrong. Please try again ❌");
  } finally {
    setLoading(false);
  }
};

  // 🔹 Handle OTP Input
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    setFieldValue: (field: string, value: string, shouldValidate?: boolean) => void
  ) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value)) {
      setFieldValue(`otp[${index}]`, value);
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement | null;
      if (nextInput) nextInput.focus();
    } else if (value === "") {
      setFieldValue(`otp[${index}]`, "");
    }
  };

  // 🔹 Handle Backspace Navigation
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    setFieldValue: (field: string, value: string, shouldValidate?: boolean) => void,
    values: VerificationValue
  ) => {
    if (e.key === "Backspace") {
      if (values.otp[index] === "") {
        const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement | null;
        if (prevInput) prevInput.focus();
      } else {
        setFieldValue(`otp[${index}]`, "");
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col md:flex-row"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Left Section */}
      <div className="md:w-1/2 flex flex-col order-2 md:order-1 justify-between">
        <div className="p-6 pb-0 mb-9">
          <a href="javascript:void(0)">
            <img src="/logo.png" alt="Logo" />
          </a>
        </div>

        <div className=" auth-container">
          <h1 className="auth-heading">Google Authenticator Code</h1>

          {/* Formik OTP Form */}
          <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ values, setFieldValue }) => (
              <Form>
                <div className="mt-[35px] mb-10">

                  {/* OTP Inputs */}
                   <label className="block text-base font-normal mb-[10px]">OTP</label>
                  <div className="flex items-center gap-[15px]">
                    {values.otp.map((_, index) => (
                      <Field
                        key={index}
                        id={`otp-${index}`}
                        name={`otp[${index}]`}
                        maxLength={1}
                        className="w-10 sm:w-14 h-12 sm:h-14 text-center text-lg font-semibold rounded border border-bordercolor focus:outline-none"
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e, index, setFieldValue)}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                          handleKeyDown(e, index, setFieldValue, values)
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Verify Button */}
                <button type="submit" className="submit-form" disabled={loading}>
                  {loading ? "Verifying..." : "Verify"}
                </button>
              </Form>
            )}
          </Formik>
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
                Two-Factor Verification
              </h3>
              <p className="text-white font-normal text-sm sm:text-base leading-[26px]">
                Use your Google Authenticator app to enter the verification code and unlock your account.
              </p>
            </div>
            <Image src="/verification.png" alt="Verification" width={240} height={220} className="mx-auto" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
