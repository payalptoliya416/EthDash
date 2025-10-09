"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AuthButtonLogin() {
  const [isGoogleProcessing, setIsGoogleProcessing] = useState(false);
  const [isFacebookProcessing, setIsFacebookProcessing] = useState(false);

  const handleSocialAuth = async (provider: "google" | "facebook") => {
    try {
      if (provider === "google") setIsGoogleProcessing(true);
      if (provider === "facebook") setIsFacebookProcessing(true);

      const result = await signIn(provider, {
        redirect: true,
        callbackUrl: "/login/social/callback", // 👈 redirect here
      });

      if (result?.error) {
        toast.error(`Failed to sign in with ${provider}`);
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      toast.error("Authentication failed. Please try again.");
    } finally {
      setIsGoogleProcessing(false);
      setIsFacebookProcessing(false);
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
