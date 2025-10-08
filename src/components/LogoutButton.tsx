"use client";

import { BASE_URL } from "@/lib/api/requests";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();
  
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authtoken");
      if (!token) {
        toast.error("No token found. Please login again.");
        // await signOut({ redirect: true, callbackUrl: "/signup" });
        return;
      }

      const res = await fetch(`${BASE_URL}/logout`, {
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
      localStorage.removeItem("authtoken");
      localStorage.removeItem("loginProvider");
      localStorage.removeItem("qrCodeImage");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("2fa-enable");
      localStorage.removeItem("2fa-verify");
      localStorage.removeItem("loginEmail");

      await signOut({
        redirect: true,
        callbackUrl: "/login",
      });

     router.push('/login')
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
