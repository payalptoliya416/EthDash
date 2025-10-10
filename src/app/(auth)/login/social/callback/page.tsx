"use client";

import { useEffect } from "react";
import { getSession } from "next-auth/react";
import toast from "react-hot-toast";
import { BASE_URL } from "@/lib/api/requests";

export default function SocialLoginCallbackPage() {
  useEffect(() => {
    const loginUser = async () => {
      const session = await getSession();
      if (!session?.user?.email) {
        toast.error("Authentication failed - no user data found");
        window.location.href = "/";
        return;
      }

      // Get provider from localStorage (set before redirect)
      const provider = localStorage.getItem("loginProvider") || "";

      const userData = {
        email: session.user.email,
        password: "",
        is_google: provider === "google",
        is_facebook: provider === "facebook",
      };
      try {
        const res = await fetch(`${BASE_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Login failed");

        // Save token and email
        const email = data.user?.email || data.email;
        if (email) localStorage.setItem("loginEmail", email);
        localStorage.setItem("authtoken", data.token || data.access_token);

        toast.success("Login successful!");

        // Redirect accordingly
        if (data["2_fa"]) {
          window.location.href = "/login/verification";
        } else {
          window.location.href = "/overview";
        }
      } catch (err: any) {
        console.error("Login callback error:", err);
        toast.error(err.message || "Something went wrong");
        window.location.href = "/";
      }
    };

    loginUser();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen text-gray-600">
      <p>Processing your social login...</p>
    </div>
  );
}
