"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { SignupFormValues } from "@/types/signup";
import { motion } from "framer-motion";
import AuthButton from "@/components/AuthButton";

const SignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const router = useRouter();

  //  Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    surname: Yup.string().required("Surname is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"),undefined], "Passwords must match")
      .required("Confirm Password is required"),
  });

  //  Initial form values
  const initialValues: SignupFormValues = {
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (
    values: SignupFormValues,
    { resetForm }: FormikHelpers<SignupFormValues>
  ) => {
    if (values.email && values.password) {
      toast.success("Form Submitted!");
      setTimeout(() => {  
        router.push("/signup/google-authenticator");
      }, 1500);
      resetForm();
    } else {
      toast.error("Please fill all required fields ❌");
    }
  };

  return (
    <motion.div className="min-h-screen flex flex-col md:flex-row"   initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
      <Toaster position="top-right" />
      <div className="md:w-1/2 flex flex-col order-2 md:order-1">
        {/* Logo */}
        <div className="p-6 pb-0 mb-9">
          <a href="javascript:void(0)">
            <img src="/logo.png" alt="Logo" className="mb-3"/>
          </a>
        </div>

        {/* Left form area */}
        <div className="auth-container">
          <h1 className="auth-heading">
            Create a New Wallet
          </h1>
          <p className="auth-para">
            Join us today and start your journey in just a few clicks.
          </p>

          {/* Formik Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="mt-7 lg:mx-11">
              {/* Name + Surname */}
              <div className="flex xl:items-center gap-5 mb-4 flex-col xl:flex-row">
                <div className="xl:w-1/2">
                  <label className="block text-base font-normal mb-2">
                    Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    className="input"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="xl:w-1/2">
                  <label className="block text-base font-normal mb-2">
                    Surname
                  </label>
                  <Field
                    type="text"
                    name="surname"
                    placeholder="Enter surname"
                    className="input"
                  />
                  <ErrorMessage
                    name="surname"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-base font-normal mb-2">
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter email Address"
                  className="input"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block text-base font-normal mb-2">
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
                      className="text-grayicon absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer  w-4 h-4"
                    />
                  ) : (
                    <EyeIcon
                      onClick={() => setShowPassword(true)}
                      className="text-grayicon absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer  w-4 h-4"
                    />
                  )}
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label className="block text-base font-normal mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Field
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Enter confirm password"
                    className="input"
                  />
                  {showConfirm ? (
                    <EyeSlashIcon
                      onClick={() => setShowConfirm(false)}
                      className="text-grayicon absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer w-4 h-4"
                    />
                  ) : (
                    <EyeIcon
                      onClick={() => setShowConfirm(true)}
                      className="text-grayicon absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer  w-4 h-4"
                    />
                  )}
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit */}
              <button
                type="submit" className="submit-form">
                Create a New Wallet
              </button>

              {/* OR Divider */}
              <div className="flex items-center my-3">
                <hr className="flex-1 border-gray-300" />
                <span className="px-2 text-gray-400 text-lg font-medium">or</span>
                <hr className="flex-1 border-gray-300" />
              </div>
           </Form>
          </Formik>
          <div className="lg:mx-11">
              <AuthButton />

              {/* Already have account */}
              <div className="text-center">
                <p className="text-base font-normal">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-semibold text-purple underline cursor-pointer"
                  >
                    Login
                  </a>
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
            </a>
            <a href="javascript:void(0)">Terms Use</a>
          </span>
        </div>
      </div>

      {/* Right Banner */}
      <div className="md:w-1/2 order-1 md:order-2 hidden md:block">
        <div className="bg-[url(/signupbg.png)] bg-cover bg-no-repeat bg-[100%_100%] h-full w-full flex flex-col items-center justify-center py-5">
          <div className="px-6 sm:px-10 lg:px-16">
            <div className="pb-16">
              <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold mb-[15px]">
                Start Your Crypto Journey
              </h3>
              <p className="text-white font-normal text-sm sm:text-base leading-[26px]">
                Generate a private wallet with top-grade encryption and start
                managing your crypto safely.
              </p>
            </div>
               <Image   src="/right-sign.png"
                          alt="Right Sign"
                          width={350}
                          height={220}
                          className="mx-auto"  />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SignupPage;
