"use client";

import { authService } from "@/lib/api/authService";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

interface Country {
  id: number;
  country_name: string;
}

function BankWithdrawal() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountryName, setSelectedCountryName] = useState<string>("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await authService.countryGet();
        if (res.status === "success") {
          setCountries(res.data);
        }
      } catch (err) {
        console.error("Error fetching countries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const validationSchema = Yup.object().shape({
    country: Yup.string().required("Please select a country"),

    // generic account_number is used for non-Canada countries.
    account_number: Yup.string().when("country", (countryValue: any, schema: any) => {
      const countryName = countries.find((c) => String(c.id) === String(countryValue))?.country_name;
      if (countryName === "United Kingdom") {
        return schema
          .required("Account number is required")
          .matches(/^\d{8}$/, "Account number must be 8 digits for United Kingdom");
      } 
      if (countryName === "Canada") {
        // For Canada we show separate fields, so make this not required
        return schema.notRequired();
      }
      // Other countries: keep generic required (no strict pattern)
      return schema.required("Account number is required");
    }),

    // Canada-specific parts
    institution_number: Yup.string().when("country", (countryValue: any, schema: any) => {
      const countryName = countries.find((c) => String(c.id) === String(countryValue))?.country_name;
      if (countryName === "Canada") {
        return schema
          .required("Institution number is required")
          .matches(/^\d{3}$/, "Institution number must be 3 digits");
      }
      return schema.notRequired();
    }),

    transit_number: Yup.string().when("country", (countryValue: any, schema: any) => {
      const countryName = countries.find((c) => String(c.id) === String(countryValue))?.country_name;
      if (countryName === "Canada") {
        return schema
          .required("Transit number is required")
          .matches(/^\d{5}$/, "Transit number must be 5 digits");
      }
      return schema.notRequired();
    }),

    canada_account_number: Yup.string().when("country", (countryValue: any, schema: any) => {
      const countryName = countries.find((c) => String(c.id) === String(countryValue))?.country_name;
      if (countryName === "Canada") {
        return schema
          .required("Account number is required")
          .matches(/^\d{6,12}$/, "Canada account number must be 6 to 12 digits");
      }
      return schema.notRequired();
    }),

    // IBAN handling:
    iban: Yup.string()
      .transform((val) => (typeof val === "string" ? val.replace(/\s+/g, "").toUpperCase() : val))
      .when("country", (countryValue: any, schema: any) => {
        const countryName = countries.find((c) => String(c.id) === String(countryValue))?.country_name;
        if (countryName === "Canada") {
          // Canada typically doesn't use IBAN domestically - keep IBAN optional
          return schema.notRequired();
        }
        if (countryName === "United Kingdom") {
          // UK IBAN: must start with GB and be 22 characters total
          return schema
            .required("IBAN is required")
            .matches(/^[A-Z0-9]{22}$/, "UK IBAN must be 22 characters");
        }
        // Other countries (Europe / rest): general IBAN pattern up to 34 alphanumeric characters
        return schema
          .required("IBAN is required")
          // .matches(/^[A-Z]{2}\d{2}[A-Z0-9]{0,30}$/, "IBAN must start with country code and be up to 34 chars")
          .matches(/^[A-Z0-9]{1,34}$/, "IBAN must be up to 34 alphanumeric characters")
          .test("len", "IBAN must be between 5 and 34 characters", (val: any) => {
            if (!val) return false;
            return val.length >= 5 && val.length <= 34;
          });
      }),

    // SWIFT/BIC - required for all; UK has extra pattern
    swift_code: Yup.string().when("country", (countryValue: any, schema: any) => {
      const countryName = countries.find((c) => String(c.id) === String(countryValue))?.country_name;
      if (countryName === "United Kingdom") {
        return schema
          .required("SWIFT code is required")
          .matches(/^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/, "SWIFT code must be 8 or 11 characters");
      }
      // generic SWIFT pattern for others (8 or 11 chars)
      return schema
        .required("SWIFT code is required")
        // .matches(/^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/, "SWIFT code must be 8 or 11 characters");
    }),

    // Sort code for UK: 6 digits
    sort_code: Yup.string().when("country", (countryValue: any, schema: any) => {
      const countryName = countries.find((c) => String(c.id) === String(countryValue))?.country_name;
      if (countryName === "United Kingdom") {
        return schema
          .required("Sort code is required")
          .matches(/^\d{6}$/, "Sort code must be 6 digits");
      }
      return schema.notRequired();
    }),
  });

  const handleSubmit = async (values: any) => {
    try {
      console.log("Payload for API:", values);
      const result = await authService.submitBankDetails(values);
      toast.success(result.message || "Bank details submitted successfully!")
    } catch (err) {
      console.error("API error:", err);
    }
  };

  return (
    <>
      <div className="common-bg mb-[35px]">
        <div>
          <h3 className="box-title">Enter Your Bank Account Details</h3>
          <Formik
            initialValues={{
              country: "",
              account_number: "",
              iban: "",
              swift_code: "",
              sort_code: "",
              institution_number: "",
              transit_number: "",
              canada_account_number: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, setFieldValue, values }) => (
              <Form>
                <div className="grid grid-cols-12 gap-5 mt-[15px]">
                  <div className="col-span-12 sm:col-span-4">
                    <label className="block text-darkblack mb-[10px] text-sm font-medium">
                      Country
                    </label>

                    <Field
                      as="select"
                      name="country"
                      className="input"
                      onChange={(e: any) => {
                        const val = e.target.value;
                        setFieldValue("country", val);
                        const sel = countries.find((c) => String(c.id) === String(val));
                        setSelectedCountryName(sel?.country_name || "");
                      }}
                      value={values.country}
                    >
                      <option value="">Select country</option>
                      {loading ? (
                        <option value="">Loading...</option>
                      ) : (
                        countries.map((country) => (
                          <option key={country.id} value={country.id}>
                            {country.country_name}
                          </option>
                        ))
                      )}
                    </Field>

                    {errors.country && touched.country && (
                      <div className="text-red-500 text-sm flex items-center mt-1 gap-1">
                        <InformationCircleIcon className="w-4 h-4" /> {errors.country}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-5 mt-[15px]">
                  {/* For Canada we show institution+transit+account fields */}
                  {selectedCountryName === "Canada" ? (
                    <>
                      <div className="col-span-12 sm:col-span-4">
                        <label className="block text-darkblack mb-[10px] text-sm font-medium">
                          Institution number
                        </label>
                        <Field
                          type="text"
                          name="institution_number"
                          className="input"
                          placeholder="Institution number (3 digits)"
                        />
                        {errors.institution_number && touched.institution_number && (
                          <div className="text-red-500 text-sm flex items-center mt-1 gap-1">
                            <InformationCircleIcon className="w-4 h-4" />
                            {errors.institution_number}
                          </div>
                        )}
                      </div>

                      <div className="col-span-12 sm:col-span-4">
                        <label className="block text-darkblack mb-[10px] text-sm font-medium">
                          Transit number
                        </label>
                        <Field
                          type="text"
                          name="transit_number"
                          className="input"
                          placeholder="Transit number (5 digits)"
                        />
                        {errors.transit_number && touched.transit_number && (
                          <div className="text-red-500 text-sm flex items-center mt-1 gap-1">
                            <InformationCircleIcon className="w-4 h-4" />
                            {errors.transit_number}
                          </div>
                        )}
                      </div>

                      <div className="col-span-12 sm:col-span-4">
                        <label className="block text-darkblack mb-[10px] text-sm font-medium">
                          Account number
                        </label>
                        <Field
                          type="text"
                          name="canada_account_number"
                          className="input"
                          placeholder="Account number (6-12 digits)"
                        />
                        {errors.canada_account_number && touched.canada_account_number && (
                          <div className="text-red-500 text-sm flex items-center mt-1 gap-1">
                            <InformationCircleIcon className="w-4 h-4" />
                            {errors.canada_account_number}
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    // Non-Canada: show generic account_number + possibly sort_code for UK
                    <>
                      <div className="col-span-12 sm:col-span-4">
                        <label className="block text-darkblack mb-[10px] text-sm font-medium">
                          Account number
                        </label>
                        <Field
                          type="text"
                          name="account_number"
                          className="input"
                          placeholder="Account number"
                        />
                        {errors.account_number && touched.account_number && (
                          <div className="text-red-500 text-sm flex items-center mt-1 gap-1">
                            <InformationCircleIcon className="w-4 h-4" />
                            {errors.account_number}
                          </div>
                        )}
                      </div>

                      {/* Sort Code for UK only */}
                      {selectedCountryName === "United Kingdom" && (
                        <div className="col-span-12 sm:col-span-4">
                          <label className="block text-darkblack mb-[10px] text-sm font-medium">
                            Sort code
                          </label>
                          <Field
                            type="text"
                            name="sort_code"
                            className="input"
                            placeholder="Sort code (6 digits)"
                          />
                          {errors.sort_code && touched.sort_code && (
                            <div className="text-red-500 text-sm flex items-center mt-1 gap-1">
                              <InformationCircleIcon className="w-4 h-4" />
                              {errors.sort_code}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}

                  <div className="col-span-12 sm:col-span-4">
                    <label className="block text-darkblack mb-[10px] text-sm font-medium">
                      IBAN
                    </label>
                    <Field
                      type="text"
                      name="iban"
                      className="input"
                      placeholder="IBAN"
                    />
                    {errors.iban && touched.iban && (
                      <div className="text-red-500 text-sm flex items-center mt-1 gap-1">
                        <InformationCircleIcon className="w-4 h-4" />
                        {errors.iban}
                      </div>
                    )}
                  </div>

                  <div className="col-span-12 sm:col-span-4">
                    <label className="block text-darkblack mb-[10px] text-sm font-medium">
                      SWIFT code
                    </label>
                    <Field
                      type="text"
                      name="swift_code"
                      className="input"
                      placeholder="SWIFT / BIC"
                    />
                    {errors.swift_code && touched.swift_code && (
                      <div className="text-red-500 text-sm flex items-center mt-1 gap-1">
                        <InformationCircleIcon className="w-4 h-4" />
                        {errors.swift_code}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end mt-[30px]">
                  <button
                    type="submit"
                    className="py-[10px] px-5 bg-purple text-whitelight rounded text-base leading-[16px] font-medium cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="common-bg mb-[35px]">
        <div className="flex justify-between items-center mb-[31px] flex-wrap gap-4">
          <h3 className="text-primary text-lg xl:text-2xl md:leading-[24px] font-medium text-primary mb-0">
            Available Balance for Withdrawal
          </h3>
          <button
            type="submit"
            className="py-[10px] px-5 bg-purple text-whitelight rounded text-base leading-[16px] font-medium cursor-pointer"
          >
            Withdrawal
          </button>
        </div>
        <Formik
          initialValues={{
            amount1: "0.00 USD",
            amount2: "0.00 USD",
            amount3: "0.00 USD",
            amount4: "0.00 USD",
          }}
          onSubmit={(values) => {
            console.log("Form Values:", values);
          }}
        >
          {() => (
            <Form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 items-center flex-wrap">
              <Field name="amount1" type="text" className="input" disabled />
              <Field name="amount2" type="text" className="input" disabled />
              <Field name="amount3" type="text" className="input" disabled />
              <Field name="amount4" type="text" className="input" disabled />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default BankWithdrawal;
