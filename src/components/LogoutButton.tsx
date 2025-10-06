"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton({ className }: { className?: string }) {
  const handleLogout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/signup",
    });
  };

  return (
    <button
      onClick={handleLogout}
      className={`border border-gray-300 py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100 ${className}`}>
      Logout
    </button>
  );
}
