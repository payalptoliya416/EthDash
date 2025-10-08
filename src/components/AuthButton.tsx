"use client";

import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { BASE_URL } from "@/lib/api/requests";

interface AuthButtonProps {
  mode: "login" | "register";
}

export default function AuthButton({ mode }: AuthButtonProps) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSocialAuth = async (provider: "google" | "facebook") => {
    setIsProcessing(true);

    try {
      localStorage.setItem("loginProvider", provider);

      // Step 1: Sign in via NextAuth (no redirect)
      const signInResult = await signIn(provider, { redirect: false });

      if (signInResult?.error) {
        toast.error(`Failed to sign in with ${provider}`);
        return;
      }

      // Step 2: Wait for NextAuth session to be ready
      let session: any = null;
      const maxRetries = 10;

      for (let i = 0; i < maxRetries; i++) {
        session = await getSession();
        if (session?.user?.email) break;
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      if (!session?.user?.email) {
        toast.error("Authentication failed - no user data received");
        return;
      }

      // Step 3: Prepare payload depending on mode
      let userData: any;

      if (mode === "register") {
        userData = {
          first_name: session.user.name?.split(" ")[0] || "",
          last_name: session.user.name?.split(" ").slice(1).join(" ") || "",
          email: session.user.email,
          password: "", 
          confirm_password: "",
          is_google: provider === "google",
          is_facebook: provider === "facebook",
        };
        localStorage.setItem("userData",userData)
      } else {
        userData = {
          email: session.user.email,
          password: "",
          is_google: provider === "google",
          is_facebook: provider === "facebook",
        };
          localStorage.setItem("userData",userData)
      }

      const apiUrl =
        mode === "register"
          ? `${BASE_URL}/register`
          : `${BASE_URL}/login`;

      // Step 4: Call backend API
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "API request failed");

      // Step 5: Store token and response data
      localStorage.setItem("value", JSON.stringify(data));
      localStorage.setItem("authtoken", data.token || data.access_token);

      toast.success(
        mode === "register"
          ? "Registration successful!"
          : "Login successful!"
      );

      // Step 6: Redirect
      if (mode === "register") {
          window.location.href = "/login";
      } else {
        if (data["2_fa"]) {
          window.location.href = "/login/verification";
        } else {
          window.location.href = "/overview";
        }
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      toast.error(err.message || "Authentication failed");
      localStorage.removeItem("authtoken");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => handleSocialAuth("google")}
        disabled={isProcessing}
        className="border border-bordercolor flex justify-center items-center gap-[10px] py-2 mb-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <img src="/goggle.png" alt="Google" className="w-5 h-5" />
        <span className="text-linkgray text-base font-normal">
          {isProcessing ? "Processing..." : "Continue with Google"}
        </span>
      </button>

      <button
        onClick={() => handleSocialAuth("facebook")}
        disabled={isProcessing}
        className="border border-bordercolor flex justify-center items-center gap-[10px] py-2 mb-[25px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <img src="/facebook.png" alt="Facebook" className="w-5 h-5" />
        <span className="text-linkgray text-base font-normal">
          {isProcessing ? "Processing..." : "Continue with Facebook"}
        </span>
      </button>
    </div>
  );
}
