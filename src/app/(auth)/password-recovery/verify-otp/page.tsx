'use client'

import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Image from "next/image";
import { VerificationFormValues } from "@/types/signup";
import { motion } from "framer-motion";
import { authService } from "@/lib/api/authService";
import { useRouter } from "next/navigation";

function Page() {
  // 🔹 Validation Schema
  const router = useRouter();
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
  const initialValues: VerificationFormValues = {
    email: "", 
    otp: ["", "", "", "", "", ""], 
  };

  // 🔹 Handle Submit
const handleSubmit = async (
  values: VerificationFormValues,
  { resetForm }: FormikHelpers<VerificationFormValues>
) => {
  const otpCode = values.otp.join("");
  if (otpCode.length === 6 && values.email) {
    try {
      const response = await authService.verifyOtp({
        email: values.email,
        otp: otpCode,
      });
console.log("response",response)
      if (response.success === "success") {
        toast.success(response.message || "OTP Verified Successfully ✅");
        console.log("OTP Verified Response:", response);
        setTimeout(() => {
            router.push("/password-recovery/create");
            }, 1500);
        resetForm();
      } else {
        toast.error(response.message || "OTP verification failed ❌");
      }
    } catch (error: unknown) {
      toast.error(error?.message || "Something went wrong ❌");
      console.error("OTP verification error:", error);
    }
  } else {
    toast.error("Please enter complete OTP and email ❌");
  }
};


  // 🔹 Handle OTP Input
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    setFieldValue: (
      field: string,
      value: string,
      shouldValidate?: boolean
    ) => void
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
    setFieldValue: (
      field: string,
      value: string,
      shouldValidate?: boolean
    ) => void,
    values: VerificationFormValues
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

        <div className="auth-container">
          <h1 className="auth-heading">Verify OTP</h1>
          <p className="auth-para">
            Enter 6-digit Google Authenticator code to continue.
          </p>

          {/* Formik OTP Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="mt-[35px] mb-10">
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
                     <label className="block text-base font-normal mb-[10px]">
                                      Enter OTP
                                    </label>
                  <div className="flex items-center gap-[15px]">
                    {values.otp.map((_, index) => (
                      <Field
                        key={index}
                        id={`otp-${index}`}
                        name={`otp[${index}]`}
                        maxLength={1}
                        className="w-10 sm:w-14 h-10 sm:h-14 text-center text-lg font-semibold rounded border border-bordercolor focus:outline-none"
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInput(e, index, setFieldValue)
                        }
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                          handleKeyDown(e, index, setFieldValue, values)
                        }
                      />
                    ))}
                  </div>
                </div>

                <button type="submit" className="submit-form">
                  Verify
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
        <div className="bg-[url(/pass-bg.png)] bg-cover bg-no-repeat bg-[100%_100%] h-full w-full flex flex-col items-center justify-center py-5">
          <div className="right-container">
            <div className="pb-16">
              <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold mb-[15px]">
                Reset your password for Wallet
              </h3>
              <p className="text-white font-normal text-sm sm:text-base leading-[26px]">
                Quickly reset your wallet access by verifying your email and creating a password.
              </p>
            </div>
            <Image
              src="/pass-right.png"
              alt="Password Recovery"
              width={240}
              height={220}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Page;
