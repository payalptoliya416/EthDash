"use client";

import { BASE_URL } from "@/lib/api/requests";
import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AuthButtonRegister() {
  const [isGoogleProcessing, setIsGoogleProcessing] = useState(false);
  const [isFacebookProcessing, setIsFacebookProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // const handleSocialAuth = async (provider: "google" | "facebook") => {
  //   if (provider === "google") setIsGoogleProcessing(true);
  //   if (provider === "facebook") setIsFacebookProcessing(true);

  //   try {
  //     const signInResult = await signIn(provider, { redirect: false });
  //     if (signInResult?.error) {
  //       const message = `Failed to sign in with ${provider}`;
  //       setErrorMessage(message);
  //       toast.error(message);
  //       return;
  //     }

  //     let session: any = null;
  //     for (let i = 0; i < 10; i++) {
  //       session = await getSession();
  //       if (session?.user?.email) break;
  //       await new Promise((r) => setTimeout(r, 500));
  //     }

  //     if (!session?.user?.email) {
  //       const message = "Authentication failed - no user data received";
  //       setErrorMessage(message);
  //       toast.error(message);
  //       return;
  //     }

  //     const userData = {
  //       first_name: session.user.name?.split(" ")[0] || "",
  //       last_name: session.user.name?.split(" ").slice(1).join(" ") || "",
  //       email: session.user.email,
  //       password: "",
  //       confirm_password: "",
  //       is_google: provider === "google",
  //       is_facebook: provider === "facebook",
  //     };

  //     const res = await fetch(`${BASE_URL}/register`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(userData),
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       const message = data.message || "Registration failed";
  //       setErrorMessage(message);
  //       toast.error(message);
  //       return;
  //     }

  //     toast.success("Registration successful!");
  //     window.location.href = "/login";
  //   } catch (err: any) {
  //     const message = err.message || "Authentication failed";
  //     setErrorMessage(message);
  //     toast.error(message);
  //   } finally {
  //     if (provider === "google") setIsGoogleProcessing(false);
  //     if (provider === "facebook") setIsFacebookProcessing(false);
  //   }
  // };
const handleSocialAuth = async (provider: "google" | "facebook") => {
  try {
    if (provider === "google") setIsGoogleProcessing(true);
    if (provider === "facebook") setIsFacebookProcessing(true);

    const result = await signIn(provider, { redirect: true, callbackUrl: "/register/social/callback" });
    // This will redirect user to Facebook/Google if first time login
  } catch (err) {
    console.error("Auth error:", err);
    toast.error("Authentication failed, please try again.");
  } finally {
    setIsGoogleProcessing(false);
    setIsFacebookProcessing(false);
  }
};

  return (
    <div className="flex flex-col gap-4">
      {errorMessage && (
        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
      )}

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
