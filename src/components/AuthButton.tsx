"use client";

import { signIn, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { authService } from "@/lib/api/authService";

interface AuthButtonProps {
  mode: "login" | "register";
}

export default function AuthButton({ mode }: AuthButtonProps) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const provider = localStorage.getItem("loginProvider");
  }, []);

  const handleSocialAuth = async (provider: "google" | "facebook") => {
    setIsProcessing(true);
    toast.loading("Logging in...");

    try {
       localStorage.setItem("loginProvider", provider);
      // Prevent redirect to handle API call first
      await signIn(provider, { redirect: false });

      // Get updated session after social login
      const session = await getSession();
      if (!session?.user) {
        toast.error("Could not get user info");
        setIsProcessing(false);
        return;
      }

      const fullName = session.user.name || "";
      const firstName = fullName.split(" ")[0] || "";
      const lastName = fullName.split(" ")[1] || "";
      const email = session.user.email || "";

      // Call backend API immediately
      if (mode === "register") {
    
        await authService.socialSignup({
          first_name: firstName,
          last_name: lastName,
          email,
          is_google: provider === "google",
          is_facebook: provider === "facebook",
        });
      } else if (mode === "login") {
        await authService.login({
          email,
          password: "", // social login, no password
          is_google: provider === "google",
          is_facebook: provider === "facebook",
        });
      }

      toast.success("Login successful!");
      router.push("/overview"); // redirect after API call

    } catch (err) {
      console.error("Social login error:", err);
      toast.error("Something went wrong during social login");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => handleSocialAuth("google")}
        disabled={isProcessing}
        className="border border-bordercolor flex justify-center items-center gap-[10px] py-2 mb-4 cursor-pointer"
      >
        <img src="/goggle.png" alt="Google" className="w-5 h-5" />
        <span className="text-linkgray text-base font-normal">
          Continue with Google
        </span>
      </button>

      <button
        onClick={() => handleSocialAuth("facebook")}
        disabled={isProcessing}
        className="border border-bordercolor flex justify-center items-center gap-[10px] py-2 mb-[25px] cursor-pointer"
      >
        <img src="/facebook.png" alt="Facebook" className="w-5 h-5" />
        <span className="text-linkgray text-base font-normal">
          Continue with Facebook
        </span>
      </button>
    </div>
  );
}
