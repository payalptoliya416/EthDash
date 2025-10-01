"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { JSX, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

// 🔹 Form Values Type
interface CreatePasswordValues {
  newPassword: string;
  confirmPassword: string;
}

export default function Create(): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  // 🔹 Validation Schema
  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
      .required("Confirm password is required"),
  });

  // 🔹 Initial Values
  const initialValues: CreatePasswordValues = {
    newPassword: "",
    confirmPassword: "",
  };

  // 🔹 Submit Handler
  const handleSubmit = (
    values: CreatePasswordValues,
    { resetForm }: FormikHelpers<CreatePasswordValues>
  ): void => {
    toast.success("Password changed successfully");
    console.log("New Password Values:", values);

    setTimeout(() => {
      router.push("/login");
    }, 1500);

    resetForm();
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
          <h1 className="auth-heading">Your Key to Access</h1>
          <p className="auth-para">
            Create a unique password to unlock your wallet securely.
          </p>

          {/* Formik Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="lg:mx-11">
              {/* New Password */}
              <div className="mb-5">
                <label className="block text-base font-normal mb-[10px]">
                  New Password
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="Enter new password"
                    className="input leading-[18px]"
                  />
                  {showPassword ? (
                    <EyeSlashIcon
                      className="text-[#4F4F51] absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer  w-4 h-4"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <EyeIcon
                      className="text-[#4F4F51] absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer  w-4 h-4"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-5">
                <label className="block text-base font-normal mb-[10px]">
                  Confirm Password
                </label>
                <div className="relative">
                  <Field
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Enter confirm password"
                    className="input leading-[18px]"
                  />
                  {showConfirm ? (
                    <EyeSlashIcon
                      className="text-[#4F4F51] absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer  w-5 h-5"
                      onClick={() => setShowConfirm(false)}
                    />
                  ) : (
                    <EyeIcon
                      className="text-[#4F4F51] absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer  w-5 h-5"
                      onClick={() => setShowConfirm(true)}
                    />
                  )}
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Save Button */}
              <button type="submit" className="submit-form">
                Save
              </button>
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
                Shield Your Wallet
              </h3>
              <p className="text-white font-normal text-sm sm:text-base leading-[26px]">
                Create a robust, unique password combining letters, numbers, and
                symbols for wallet security.
              </p>
            </div>
            <Image
              src="/passcreate.png"
              alt="Create Password"
              width={240}
              height={220}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
