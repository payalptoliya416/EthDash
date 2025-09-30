"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { JSX, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

// 🔹 Define types for form values
interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export default function Login(): JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  // 🔹 Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // 🔹 Initial Values
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
    remember: false,
  };

  // 🔹 Form Submit Handler
  const handleSubmit = (
    values: LoginFormValues,
    { resetForm }: FormikHelpers<LoginFormValues>
  ): void => {
    if (values.email && values.password) {
      toast.success("Login Submitted!");

      setTimeout(() => {
        router.push("/login/verification");
      }, 1500);

      resetForm();
    } else {
      toast.error("Please fill all required fields ❌");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Toaster position="top-right" />
      <div className="md:w-1/2 flex flex-col order-2 md:order-1 justify-between ">
        {/* Logo */}
        <div className="p-6 pb-0 mb-9">
          <a href="javascript:void(0)">
            <img src="/logo.png" alt="Logo" />
          </a>
        </div>

        {/* Form Section */}
        <div className="auth-container">
          <h1 className="auth-heading">
            Welcome Back to Your Wallet
          </h1>
          <p className="auth-para">
            Access your wallet quickly, stay protected with 2FA.
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="mt-7 md:mx-11">
              {/* Email */}
              <div className="mb-5">
                <label className="block text-base font-normal mb-[10px]">
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  className="input"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div className="mb-5">
                <label className="block text-base font-normal mb-[10px]">
                  Password
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    className="input"
                  />
                  {showPassword ? (
                    <EyeSlashIcon
                      onClick={() => setShowPassword(false)}
                      className="text-[#4F4F51] absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer w-5 h-5"
                    />
                  ) : (
                    <EyeIcon
                      onClick={() => setShowPassword(true)}
                      className="text-[#4F4F51] absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer w-5 h-5"
                    />
                  )}
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Remember Me + Forgot Password */}
              <div className="flex justify-between items-center">
                <div className="flex items-start">
                  <Field
                    id="remember"
                    type="checkbox"
                    name="remember"
                    className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300"
                  />
                  <label
                    htmlFor="remember"
                    className="ms-2 text-sm font-medium text-[#4F4F51]"
                  >
                    Remember
                  </label>
                </div>
                <a
                  href="/password-recovery"
                  className="text-[#6C24E0] text-sm font-semibold cursor-pointer"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="submit-form mt-10"
              >
                Wallet Access
              </button>

              {/* Divider */}
              <div className="flex items-center my-4">
                <hr className="flex-1 border-gray-300" />
                <span className="px-2 text-gray-400 text-lg font-medium">or</span>
                <hr className="flex-1 border-gray-300" />
              </div>

              {/* Google Login */}
              <a
                href="/signup/google-authenticator"
                className="border border-[#E7E7E7] flex justify-center items-center gap-[10px] py-3 lg:py-[17px] mb-5 cursor-pointer"
              >
                <img src="/goggle.png" alt="Google Login" />
                <h3>Continue with Google</h3>
              </a>

              {/* Facebook Login */}
              <a
                href="javascript:void(0)"
                className="border border-[#E7E7E7] flex justify-center items-center gap-[10px] py-3 lg:py-[17px] mb-[25px] cursor-pointer"
              >
                <img src="/facebook.png" alt="Facebook Login" />
                <h3>Continue with Facebook</h3>
              </a>

              {/* Signup redirect */}
              <div className="text-center">
                <p className="text-base font-normal">
                  Don’t have an account?{" "}
                  <Link
                    href="/"
                    className="font-semibold text-[#6C24E0] underline cursor-pointer"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </Form>
          </Formik>
        </div>

        {/* Footer */}
        <div className="policy">
          <span>© 2025 ETH Wallet.</span>
          <span>
            <a href="javascript:void(0)" className="me-6">
              Privacy Policy
            </a>{" "}
            <a href="javascript:void(0)">Terms Use</a>
          </span>
        </div>
      </div>

      {/* Right Side Banner */}
      <div className="md:w-1/2 order-1 md:order-2 hidden md:block">
        <div className="bg-[url(/auth-bg.png)] bg-cover bg-no-repeat bg-[100%_100%] h-full w-full flex flex-col items-center justify-center py-5">
          <div className="right-container">
            <div className="pb-16">
              <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold mb-[15px]">
                Access Your Crypto Wallet
              </h3>
              <p className="text-white font-normal text-sm sm:text-base leading-[26px]">
                Access your wallet using Google, Facebook, or email login, then
                verify with two-factor authentication
              </p>
            </div>
            <img src="/login.png" alt="Login Illustration" className="mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
