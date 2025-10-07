"use client";

import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

export default function LogoutButton({ className }: { className?: string }) {
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("No token found. Please login again.");
        await signOut({ redirect: true, callbackUrl: "/signup" });
        return;
      }

      // 🔹 Call your backend logout API
      const res = await fetch("http://192.168.29.134:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("Logout API Response:", data);

      if (res.ok) {
        toast.success(data.message || "Logged out successfully");
      } else {
        toast.error(data.message || "Logout failed");
      }

      // 🔹 Clear local storage & session
      localStorage.removeItem("authToken");
      localStorage.removeItem("loginProvider");
      localStorage.removeItem("qrCodeImage");

      // 🔹 NextAuth sign out
      await signOut({
        redirect: true,
        callbackUrl: "/signup",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong during logout");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`px-4 py-2 rounded-md text-red-500 hover:bg-gray-100 ${className}`}
    >
      Logout
    </button>
  );
}
