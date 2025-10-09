"use client";

import { BASE_URL } from "@/lib/api/requests";
import { signOut } from "next-auth/react";  
import toast from "react-hot-toast";

interface LogoutButtonProps {
  apiType?: "admin" | "user"; 
  className?: string;
}

export default function LogoutButton({ apiType = "user", className }: LogoutButtonProps) {

const handleLogout = async () => {
  try {
    const tokenKey = apiType === "admin" ? "admin-authtoken" : "authtoken";
    const token = localStorage.getItem(tokenKey);

    if (!token) {
      toast.error("No token found. Please login again.");
      await signOut({
        redirect: true,
        callbackUrl: apiType === "admin" ? "/admin-login" : "/login",
      });
      return;
    }

    const logoutEndpoint =
      apiType === "admin"
        ? `${BASE_URL}/admin/logout`
        : `${BASE_URL}/logout`;

    const res = await fetch(logoutEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message || "Logged out successfully");
    } else {
      toast.error(data.message || "Logout failed");
    }

    // 🔹 Remove common items
    const itemsToRemove = [
      "loginProvider",
      "qrCodeImage",
      "2fa-enable",
      "2fa-verify",
      "loginEmail",
    ];
    itemsToRemove.forEach((key) => localStorage.removeItem(key));

    // 🔹 Remove only the relevant token
    localStorage.removeItem(tokenKey);

    // 🔹 Sign out & redirect
    await signOut({
      redirect: true,
      callbackUrl: apiType === "admin" ? "/admin-login" : "/login",
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
