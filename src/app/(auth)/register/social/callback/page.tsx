"use client";

import { useEffect } from "react";
import { getSession } from "next-auth/react";
import toast from "react-hot-toast";
import { BASE_URL } from "@/lib/api/requests";

export default function SocialCallbackPage() {
  useEffect(() => {
    const registerUser = async () => {
      const session = await getSession();
      if (!session?.user?.email) {
        toast.error("Authentication failed - no user data");
        window.location.href = "/";
        return;
      }

      const userData = {
        first_name: session.user.name?.split(" ")[0] || "",
        last_name: session.user.name?.split(" ").slice(1).join(" ") || "",
        email: session.user.email,
        password: "",
        confirm_password: "",
        is_google: session.user.provider === "google",
        is_facebook: session.user.provider === "facebook",
      };

      try {
        const res = await fetch(`${BASE_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Registration failed");

        toast.success("Registration successful!");
        window.location.href = "/login";
      } catch (err: any) {
        toast.error(err.message || "Something went wrong");
        window.location.href = "/";
      }
    };

    registerUser();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen text-gray-600">
      <p>Processing social login...</p>
    </div>
  );
}
