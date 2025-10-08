"use client";

import { BASE_URL } from "@/lib/api/requests";
import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AuthButtonLogin() {
  // separate processing state per button
  const [isGoogleProcessing, setIsGoogleProcessing] = useState(false);
  const [isFacebookProcessing, setIsFacebookProcessing] = useState(false);

  const handleSocialAuth = async (provider: "google" | "facebook") => {
    // set processing for only the clicked provider
    if (provider === "google") setIsGoogleProcessing(true);
    if (provider === "facebook") setIsFacebookProcessing(true);

    try {
      localStorage.setItem("loginProvider", provider);

      const signInResult = await signIn(provider, { redirect: false });
      if (signInResult?.error) {
        toast.error(`Failed to sign in with ${provider}`);
        return;
      }

      let session: any = null;
      const maxRetries = 10;
      for (let i = 0; i < maxRetries; i++) {
        session = await getSession();
        if (session?.user?.email) break;
        await new Promise((r) => setTimeout(r, 500));
      }

      if (!session?.user?.email) {
        toast.error("Authentication failed - no user data received");
        return;
      }

      const userData = {
        email: session.user.email,
        password: "",
        is_google: provider === "google",
        is_facebook: provider === "facebook",
      };

      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "API request failed");

      localStorage.setItem("loginEmail", data.email);
      localStorage.setItem("authtoken", data.token || data.access_token);

      toast.success('Login successful!');

      if (data["2_fa"]) {
        window.location.href = "/login/verification";
      } else {
        window.location.href = "/overview";
      }

    } catch (err: any) {
      console.error("Auth error:", err);
      toast.error(err.message || "Authentication failed");
      localStorage.removeItem("auth_data");
      localStorage.removeItem("authtoken");
    } finally {
      // reset only the clicked button
      if (provider === "google") setIsGoogleProcessing(false);
      if (provider === "facebook") setIsFacebookProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => handleSocialAuth("google")}
        disabled={isGoogleProcessing}
        className="border border-bordercolor flex justify-center items-center gap-[10px] py-2 mb-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <img src="/goggle.png" alt="Google" className="w-5 h-5" />
        <span className="text-linkgray text-base font-normal">
          {isGoogleProcessing ? "Processing..." : "Continue with Google"}
        </span>
      </button>

      <button
        onClick={() => handleSocialAuth("facebook")}
        disabled={isFacebookProcessing}
        className="border border-bordercolor flex justify-center items-center gap-[10px] py-2 mb-[25px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <img src="/facebook.png" alt="Facebook" className="w-5 h-5" />
        <span className="text-linkgray text-base font-normal">
          {isFacebookProcessing ? "Processing..." : "Continue with Facebook"}
        </span>
      </button>
    </div>
  );
}
