"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { JSX, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { LoginFormValues } from "@/types/signup";
import { motion } from "framer-motion";
import { authService } from "@/lib/api/authService";
import AuthButton from "@/components/AuthButton";

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
const handleSubmit = async (
  values: LoginFormValues,
  { resetForm, setSubmitting }: FormikHelpers<LoginFormValues>
) => {
  try {
    const payload = {
      email: values.email,
      password: values.password,
    };

    const res = await authService.login(payload);
    if(res.status === "success"){
      toast.success('User Login Successfully');
    }
    console.log("Login Response:", res);
console.log("res",res)
    if (res.access_token) {
      localStorage.setItem("authToken", res.access_token);
    }

    setTimeout(() => {
      router.push("/overview");
    }, 1500);

    resetForm();
  } catch (error: unknown) {
    toast.error(error.message || "Login failed ❌");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <motion.div className="min-h-screen flex flex-col md:flex-row"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
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
            <Form className="mt-7 lg:mx-11">
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
                      className="text-grayicon absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer w-4 h-4"
                    />
                  ) : (
                    <EyeIcon
                      onClick={() => setShowPassword(true)}
                      className="text-grayicon absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer w-4 h-4"
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
                    className="ms-2 text-sm font-medium text-grayicon"
                  >
                    Remember
                  </label>
                </div>
                <a
                  href="/password-recovery"
                  className="text-purple text-sm font-semibold cursor-pointer"
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
         </Form>
          </Formik>
           <div className="lg:mx-11">
              <AuthButton mode="login"/>
              <div className="text-center">
                <p className="text-base font-normal">
                  Don’t have an account?{" "}
                  <Link
                    href="/"
                    className="font-semibold text-purple underline cursor-pointer"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
           </div>         
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
             <Image  src="/login.png"
                                      alt="Login Illustration"
                                      width={240}
                                      height={220}
                                      className="mx-auto"  />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
