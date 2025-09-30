"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { JSX, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

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
        <div className="p-[35px] pb-0 mb-[43px]">
          <a href="javascript:void(0)">
            <img src="/logo.png" alt="Logo" />
          </a>
        </div>

        <div className="px-6 sm:px-10 lg:px-16 xl:px-[90px]">
          <h1 className="text-primary text-2xl sm:text-[28px] font-semibold leading-[34px] mb-[15px]">
            Your Key to Access
          </h1>
          <p className="text-secondary text-sm sm:text-base lg:text-xl font-normal mb-[35px]">
            Create a unique password to unlock your wallet securely.
          </p>

          {/* Formik Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              {/* New Password */}
              <div className="mb-5">
                <label className="block text-lg font-normal mb-[10px]">
                  New Password
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="Enter new password"
                    className="w-full border border-[#E7E7E7] px-[15px] py-3 lg:py-[17px] rounded text-base sm:text-lg leading-[18px]"
                  />
                  {showPassword ? (
                    <EyeOff
                      className="text-[#4F4F51] absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <Eye
                      className="text-[#4F4F51] absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
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
                <label className="block text-lg font-normal mb-[10px]">
                  Confirm Password
                </label>
                <div className="relative">
                  <Field
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Enter confirm password"
                    className="w-full border border-[#E7E7E7] px-[15px] py-3 lg:py-[17px] rounded text-base sm:text-lg leading-[18px]"
                  />
                  {showConfirm ? (
                    <EyeOff
                      className="text-[#4F4F51] absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowConfirm(false)}
                    />
                  ) : (
                    <Eye
                      className="text-[#4F4F51] absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
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
              <button
                type="submit"
                className="w-full py-3 lg:py-[14px] text-white bg-purple text-lg font-medium rounded cursor-pointer"
              >
                Save
              </button>
            </Form>
          </Formik>
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
        <div className="bg-[url(/pass-bg.png)] bg-cover bg-no-repeat bg-[100%_100%] h-full w-full flex flex-col items-center justify-center py-24">
          <div className="px-6 sm:px-10 lg:px-[70px]">
            <div className="pb-[88px]">
              <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold mb-[15px]">
                Shield Your Wallet
              </h3>
              <p className="text-white font-normal text-sm sm:text-base leading-[26px]">
                Create a robust, unique password combining letters, numbers, and symbols for wallet security.
              </p>
            </div>
            <img src="/passcreate.png" alt="Create Password" className="mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
