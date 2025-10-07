"use client";

import { useFormik } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Enable2FAResponse {
  status: "success" | "error";
  message?: string;
  enabled?: boolean;
  secret?: string;
  qr_code_url?: string;
  qr_code_image?: string;
}

function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      twoFactorEnabled: false,
    },
    onSubmit: async (values) => {},
  });

  const handleToggle = async () => {
    const newValue = !formik.values.twoFactorEnabled;
    formik.setFieldValue("twoFactorEnabled", newValue);

    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("No auth token found!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://192.168.29.134:8000/api/enable-2fa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ enabled: newValue }),
      });

      const data: Enable2FAResponse = await res.json();
      console.log("API Response:", data);

      if (data.status === "success") {
        toast.success(data.message || `Two-Factor ${newValue ? "Enabled" : "Disabled"} successfully`);

        // Navigate to QR code page and pass the QR code image & secret
        if (newValue && data.qr_code_image) {
          // store QR code image in localStorage to access on next page
          localStorage.setItem("qrCodeImage", data.qr_code_image);
          router.push("/setting/show-qr");
        }
      } else {
        toast.error(data.message || "Something went wrong");
        formik.setFieldValue("twoFactorEnabled", !newValue);
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error");
      formik.setFieldValue("twoFactorEnabled", !newValue);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2">
      <div className="common-bg">
        <h3 className="text-xl font-semibold text-gray-700 mb-6">Two-Factor Verification</h3>

        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Enable Two-Factor</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="twoFactorEnabled"
                className="sr-only peer"
                checked={formik.values.twoFactorEnabled}
                onChange={handleToggle}
                disabled={loading}
              />
              <div className="w-14 h-7 bg-gray-300 rounded-full peer-checked:bg-purple transition-colors duration-300"></div>
              <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-7 transition-transform duration-300"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
