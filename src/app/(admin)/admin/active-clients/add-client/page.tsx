"use client";

import React, { useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { authService } from "@/lib/api/authService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Step1Values = {
  case_id: string;
  email: string;
};

type FormValues = Step1Values;

export default function AddClient() {
const route = useRouter();
  const initialValues: FormValues = {
    case_id: "",
    email: "",
  };

  const step1Validation = Yup.object({
    case_id: Yup.string().required("Case ID is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleNext = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
      try {
        await step1Validation.validate(values, { abortEarly: false });
        const payload = { case_id: values.case_id, email: values.email };
        const res = await authService.adminEthWallet(payload as any);
         if (res.status === "success") {
             toast.success(res.message || "Something went wrong");
       } else {
        toast.error(res.message || "Something went wrong");
       }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors: Record<string, string> = {};
          err.inner.forEach((error) => {
            if (error.path) errors[error.path] = error.message;
          });
          actions.setErrors(errors);
        }
      }
  };

  return (
    <>
        <div className="w-full bg-whitelight shadow-lg rounded-lg px-5 py-5">
          {/* Formik Form */}
          <Formik initialValues={initialValues} onSubmit={handleNext}>
            {(formik) => (
              <Form>
                  <div className="grid grid-cols-12 md:gap-5">
                    <div className="mb-5 col-span-12 md:col-span-6">
                      <label className="block text-sm font-medium mb-2 text-darkbalck">
                        Case ID
                      </label>
                      <Field
                        type="text"
                        name="case_id"
                        placeholder="PR99509"
                        className="input"
                      />
                      {formik.errors.case_id && formik.touched.case_id && (
                        <div className="text-red-500 text-xs">
                          {formik.errors.case_id}
                        </div>
                      )}
                    </div>
                    <div className="mb-5 col-span-12 md:col-span-6">
                      <label className="block text-sm font-medium mb-2 text-darkbalck">
                        Email
                      </label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="jennywilson15@gmail.com"
                        className="input"
                      />
                      {formik.errors.email && formik.touched.email && (
                        <div className="text-red-500 text-xs">
                          {formik.errors.email}
                        </div>
                      )}
                    </div>
                  </div>
                    <div className="text-end">
                      <button
                        type="submit"
                        className="py-2 px-6 rounded bg-purple text-whitelight font-medium cursor-pointer"
                      >
                        Generate ETH wallet
                      </button>
                      <div className="text-center"></div>
                    </div>
              </Form>
            )}
          </Formik>
        </div>
    </>
  );
}
