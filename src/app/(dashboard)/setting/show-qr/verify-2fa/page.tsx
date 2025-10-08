"use client";

import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/lib/api/requests";

interface VerificationValue {
  otp: string[];
}

export default function Verify2FAPage() {
  const router = useRouter();

  const initialValues: VerificationValue = {
    otp: ["", "", "", "", "", ""], // 6 digits
  };

  const validationSchema = Yup.object({
    otp: Yup.array()
      .of(
        Yup.string()
          .matches(/^[0-9]$/, "Must be a digit")
          .required("Required")
      )
      .length(6, "OTP must be 6 digits"),
  });

  const handleSubmit = async (
    values: VerificationValue,
    { resetForm }: FormikHelpers<VerificationValue>
  ) => {
    const otpCode = values.otp.join("");
    if (otpCode.length !== 6) {
      toast.error("Please enter complete 6-digit OTP");
      return;
    }

    const token = localStorage.getItem("authtoken");
    if (!token) {
      toast.error("No auth token found!");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/verify-2fa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ one_time_password: otpCode }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "OTP Verified Successfully");
        resetForm();
          localStorage.setItem("2fa-enable", "true");

        // redirect user after success
      localStorage.removeItem("qrCodeImage");
        router.push('/setting')
      } else {
        toast.error(data.message || "Invalid OTP, try again");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again.");
    }
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    setFieldValue: (field: string, value: string, shouldValidate?: boolean) => void
  ) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value)) {
      setFieldValue(`otp[${index}]`, value);
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    } else if (value === "") {
      setFieldValue(`otp[${index}]`, "");
    }
  };

const handleKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>, // ✅ explicitly typed
  index: number,
  setFieldValue: (field: string, value: string, shouldValidate?: boolean) => void,
  values: VerificationValue
) => {
  if (e.key === "Backspace") {
    if (values.otp[index] === "") {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    } else {
      setFieldValue(`otp[${index}]`, "");
    }
  }
};


  return (
    <div className="grid grid-cols-2">
      <div className="common-bg flex flex-col items-center gap-6">
        <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
          Enter 6-digit code from Authenticator
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col items-center gap-6">
              <div className="flex gap-3">
                {values.otp.map((_, index) => (
                  <Field
                    key={index}
                    id={`otp-${index}`}
                    name={`otp[${index}]`}
                    maxLength={1}
                    className="w-12 h-12 text-center text-lg font-semibold rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleInput(e, index, setFieldValue)
                        }
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                            handleKeyDown(e, index, setFieldValue, values)
                        }
                  />
                ))}
              </div>
              <button
                type="submit"
                className="bg-purple text-white px-6 py-2 rounded-md hover:bg-purple transition cursor-pointer"
              >
                Verify
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
