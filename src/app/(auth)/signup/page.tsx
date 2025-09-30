"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

// 1️⃣ Define types for form values
interface SignupFormValues {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const router = useRouter();

  // 2️⃣ Yup validation schema
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

  // 3️⃣ Initial form values
  const initialValues: SignupFormValues = {
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // 4️⃣ Handle submit with types
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
    <div className="min-h-screen flex flex-col md:flex-row">
      <Toaster position="top-right" />
      <div className="md:w-1/2 flex flex-col order-2 md:order-1">
        {/* Logo */}
        <div className="p-[35px] pb-0 mb-[43px]">
          <a href="javascript:void(0)">
            <img src="/logo.png" alt="Logo" />
          </a>
        </div>

        {/* Left form area */}
        <div className="px-6 sm:px-10 lg:px-16 xl:px-[90px]">
          <h1 className="text-primary text-2xl sm:text-[28px] font-semibold leading-[34px] mb-[15px]">
            Create a New Wallet
          </h1>
          <p className="text-secondary text-sm sm:text-base lg:text-xl font-normal">
            Join us today and start your journey in just a few clicks.
          </p>

          {/* Formik Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="mt-[35px]">
              {/* Name + Surname */}
              <div className="flex lg:items-center gap-5 mb-5 flex-col lg:flex-row">
                <div className="lg:w-1/2">
                  <label className="block text-lg font-normal mb-[10px]">
                    Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    className="w-full border border-[#E7E7E7] px-[15px] py-3 lg:py-[17px] rounded text-base sm:text-lg"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="lg:w-1/2">
                  <label className="block text-lg font-normal mb-[10px]">
                    Surname
                  </label>
                  <Field
                    type="text"
                    name="surname"
                    placeholder="Enter surname"
                    className="w-full border border-[#E7E7E7] px-[15px] py-3 lg:py-[17px] rounded text-base sm:text-lg"
                  />
                  <ErrorMessage
                    name="surname"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="block text-lg font-normal mb-[10px]">
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter email Address"
                  className="w-full border border-[#E7E7E7] px-[15px] py-3 lg:py-[17px] rounded text-base sm:text-lg"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div className="mb-5">
                <label className="block text-lg font-normal mb-[10px]">
                  Password
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    className="w-full border border-[#E7E7E7] px-[15px] py-3 lg:py-[17px] rounded text-base sm:text-lg"
                  />
                  {showPassword ? (
                    <EyeOff
                      onClick={() => setShowPassword(false)}
                      className="text-[#4F4F51] absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    />
                  ) : (
                    <Eye
                      onClick={() => setShowPassword(true)}
                      className="text-[#4F4F51] absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
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
              <div className="mb-5">
                <label className="block text-lg font-normal mb-[10px]">
                  Confirm Password
                </label>
                <div className="relative">
                  <Field
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Enter confirm password"
                    className="w-full border border-[#E7E7E7] px-[15px] py-3 lg:py-[17px] rounded text-base sm:text-lg"
                  />
                  {showConfirm ? (
                    <EyeOff
                      onClick={() => setShowConfirm(false)}
                      className="text-[#4F4F51] absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    />
                  ) : (
                    <Eye
                      onClick={() => setShowConfirm(true)}
                      className="text-[#4F4F51] absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
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
                type="submit"
                className="w-full py-3 lg:py-[14px] text-white bg-purple text-lg font-medium rounded cursor-pointer"
              >
                Create a New Wallet
              </button>

              {/* OR Divider */}
              <div className="flex items-center my-4">
                <hr className="flex-1 border-gray-300" />
                <span className="px-2 text-gray-400 text-lg font-medium">or</span>
                <hr className="flex-1 border-gray-300" />
              </div>

              {/* Google Login */}
              <a
                href="javascript:void(0)"
                className="border border-[#E7E7E7] flex justify-center items-center gap-[10px] py-3 lg:py-[17px] mb-5 cursor-pointer"
              >
                <img src="/goggle.png" alt="Google" />
                <h3>Continue with Google</h3>
              </a>

              {/* Facebook Login */}
              <a
                href="javascript:void(0)"
                className="border border-[#E7E7E7] flex justify-center items-center gap-[10px] py-3 lg:py-[17px] mb-[25px] cursor-pointer"
              >
                <img src="/facebook.png" alt="Facebook" />
                <h3>Continue with Facebook</h3>
              </a>

              {/* Already have account */}
              <div className="text-center">
                <p className="text-base font-normal">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-semibold text-[#6C24E0] underline cursor-pointer"
                  >
                    Login
                  </a>
                </p>
              </div>
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

      {/* Right Banner */}
      <div className="md:w-1/2 order-1 md:order-2 hidden md:block">
        <div className="bg-[url(/signupbg.png)] bg-cover bg-no-repeat bg-[100%_100%] h-full w-full flex flex-col items-center justify-center py-24">
          <div className="px-6 sm:px-10 lg:px-[70px]">
            <div className="pb-[88px]">
              <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold mb-[15px]">
                Start Your Crypto Journey
              </h3>
              <p className="text-white font-normal text-sm sm:text-base leading-[26px]">
                Generate a private wallet with top-grade encryption and start
                managing your crypto safely.
              </p>
            </div>
            <img src="/right-sign.png" alt="Right Sign" className="mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
