"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { BASE_URL } from "@/lib/api/requests";

interface Enable2FAResponse {
  status: "success" | "error";
  message?: string;
  enabled?: boolean;
  secret?: string;
  qr_code_url?: string;
  qr_code_image?: string;
}

function Settings() {
  const router = useRouter();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [loginProvider, setLoginProvider] = useState<string | null>(null);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const is2FAEnabled = localStorage.getItem("2fa-enable");

    if (is2FAEnabled !== null) {
      setTwoFactorEnabled(is2FAEnabled === "true");
    }
  }, []);

  // ✅ Detect and store provider
  useEffect(() => {
    if (session?.user) {
       const provider =  localStorage.getItem("loginProvider");
        setLoginProvider(provider);
    } else {
      const storedProvider = localStorage.getItem("loginProvider");
      if (storedProvider) {
        setLoginProvider(storedProvider);
      }
    }
  }, [session]);

  // ✅ Handle 2FA toggle
  const handleToggle = async () => {
    const newValue = !twoFactorEnabled;
    setTwoFactorEnabled(newValue);

    const token = localStorage.getItem("authtoken");
    if (!token) {
      toast.error("No auth token found!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/enable-2fa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ enabled: newValue }),
      });

      const data: Enable2FAResponse = await res.json();
      console.log("2FA API Response:", data);

      if (data.status === "success") {
        toast.success(
          data.message || `Two-Factor ${newValue ? "Enabled" : "Disabled"} successfully`
        );
        if (newValue && data.qr_code_image) {
          localStorage.setItem("qrCodeImage", data.qr_code_image);
          router.push("/setting/show-qr");
        }
      } else {
        toast.error(data.message || "Something went wrong");
        setTwoFactorEnabled(!newValue);
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error");
      setTwoFactorEnabled(!newValue);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Password form
  const initialValues = {
    password: "",
    confirm_password: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  });

  // ✅ /set-password API call
  const handleSubmit = async (values: typeof initialValues) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("authtoken");
      console.log("token",token)
      if (!token) {
        toast.error("No auth token found!");
        return;
      }

      const res = await fetch(`${BASE_URL}/set-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: values.password,
          confirm_password: values.confirm_password,
        }),
      });

      const data = await res.json();
      console.log("Set Password Response:", data);

      if (res.ok && data.status === "success") {
        toast.success(data.message || "Password set successfully");
      } else {
        toast.error(data.message || "Failed to set password");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-7">
      {/* Two-Factor Section */}
      <div className="common-bg col-span-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-6">Two-Factor Verification</h3>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Enable Two-Factor</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="twoFactorEnabled"
                className="sr-only peer"
                checked={twoFactorEnabled}
                onChange={handleToggle}
                disabled={loading}
              />
              <div className="w-14 h-7 bg-gray-300 rounded-full peer-checked:bg-purple transition-colors duration-300"></div>
              <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-7 transition-transform duration-300"></div>
            </label>
          </div>
        </div>
      </div>

      {/* ✅ Show Set Password form only if user logged in via Google or Facebook */}
      {(loginProvider === "google" || loginProvider === "facebook") && (
        <div className="common-bg col-span-7 p-6">
          <p className="mb-4">
            Logged in with{" "}
            <span className="font-semibold capitalize">{loginProvider}</span>
          </p>

          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                {/* Password */}
                <div className="mb-5">
                  <label className="block text-base font-normal mb-2">Password</label>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter new password"
                      className="input"
                    />
                    {showPassword ? (
                      <EyeSlashIcon
                        onClick={() => setShowPassword(false)}
                        className="text-grayicon absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer w-5 h-5"
                      />
                    ) : (
                      <EyeIcon
                        onClick={() => setShowPassword(true)}
                        className="text-grayicon absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer w-5 h-5"
                      />
                    )}
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Confirm Password */}
                <div className="mb-5">
                  <label className="block text-base font-normal mb-2">Confirm Password</label>
                  <div className="relative">
                    <Field
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirm_password"
                      placeholder="Confirm new password"
                      className="input"
                    />
                    {showConfirmPassword ? (
                      <EyeSlashIcon
                        onClick={() => setShowConfirmPassword(false)}
                        className="text-grayicon absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer w-5 h-5"
                      />
                    ) : (
                      <EyeIcon
                        onClick={() => setShowConfirmPassword(true)}
                        className="text-grayicon absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer w-5 h-5"
                      />
                    )}
                  </div>
                  <ErrorMessage
                    name="confirm_password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="submit-form mt-4"
                >
                  {loading ? "Saving..." : "Set Password"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}

export default Settings;
