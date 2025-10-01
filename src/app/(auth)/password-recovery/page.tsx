"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { JSX } from "react";

// 🔹 Form values type
interface PasswordRecoveryValues {
  email: string;
}

export default function PasswordRecovery(): JSX.Element {
  const router = useRouter();

  // 🔹 Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
  });

  // 🔹 Initial Values
  const initialValues: PasswordRecoveryValues = {
    email: "",
  };

  // 🔹 Submit Handler
  const handleSubmit = (
    values: PasswordRecoveryValues,
    { resetForm }: FormikHelpers<PasswordRecoveryValues>
  ): void => {
    if (values.email) {
      toast.success("Reset link sent to your email");
      console.log("Forgot Password:", values);

      setTimeout(() => {
        router.push("/password-recovery/create");
      }, 1500);

      resetForm();
    } else {
      toast.error("Please enter your email ❌");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Toaster position="top-right" />

      {/* Left Section */}
      <div className="md:w-1/2 flex flex-col order-2 md:order-1 justify-between">
        <div className="p-6 pb-0 mb-9">
          <a href="javascript:void(0)">
            <img src="/logo.png" alt="Logo" />
          </a>
        </div>

        <div className="auth-container">
          <h1 className="auth-heading">
            Forgot Your Password?
          </h1>
          <p className="auth-para">
            Reset wallet access using your email password.
          </p>

          {/* Formik Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="lg:mx-11">
              {/* Email Field */}
              <div className="mb-5">
                <label className="block text-base font-normal mb-[10px]">
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter email Address"
                  className="input leading-[18px]"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="submit-form my-5"
              >
                Send Link
              </button>

              {/* Resend */}
              <p className="text-base font-medium underline text-[#414141] text-center mb-0 cursor-pointer">
                Resend
              </p>
            </Form>
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
        <div className="bg-[url(/pass-bg.png)] bg-cover bg-no-repeat bg-[100%_100%] h-full w-full flex flex-col items-center justify-center py-5">
          <div className="right-container">
            <div className="pb-16">
              <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold mb-[15px]">
                Reset your password for Wallet
              </h3>
              <p className="text-white font-normal text-sm sm:text-base leading-[26px]">
                Quickly reset your wallet access by verifying your email and
                creating password.
              </p>
            </div>
            <img src="/pass-right.png" alt="Password Recovery" className="mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
