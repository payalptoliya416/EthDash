"use client";

import { BASE_URL } from "@/lib/api/requests";
import { signIn, getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AuthButtonLogin() {
  const [isGoogleProcessing, setIsGoogleProcessing] = useState(false);
  const [isFacebookProcessing, setIsFacebookProcessing] = useState(false);

  // Remove Facebook's #_=_ if present
  useEffect(() => {
    if (window.location.hash === "#_=_") {
  history.replaceState
    ? history.replaceState({}, document.title, window.location.href.split("#")[0])
    : (window.location.hash = "");
}

  }, []);

  const handleSocialAuth = async (provider: "google" | "facebook") => {
    if (provider === "google") setIsGoogleProcessing(true);
    if (provider === "facebook") setIsFacebookProcessing(true);

    try {
      localStorage.setItem("loginProvider", provider);

      const signInResult = await signIn(provider, { redirect: false });

      if (signInResult?.error) {
        toast.error(`Failed to sign in with ${provider}`);
        return;
      }

      // Wait for session to populate
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

      if (!response.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      const email = data.user?.email || data.email;
      if (email) localStorage.setItem("loginEmail", email);
      localStorage.setItem("authtoken", data.token || data.access_token);

      toast.success("Login successful!");

      // Redirect after removing Facebook hash (if any)
     if (window.location.hash === "#_=_") {
  history.replaceState
    ? history.replaceState({}, document.title, window.location.href.split("#")[0])
    : (window.location.hash = "");
}


      if (data["2_fa"]) {
        window.location.href = "/login/verification";
      } else {
        window.location.href = "/overview";
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      toast.error(err.message || "Authentication failed");
      localStorage.removeItem("authtoken");
    } finally {
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
