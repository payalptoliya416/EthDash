"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authService } from "@/lib/api/authService";

export default function AuthButton() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const registerSocialUser = async (provider: "google" | "facebook") => {
    try {
      const result = await signIn(provider, { redirect: false });

      if (result?.error) {
        toast.error("Login failed!");
        return;
      }

      // 🔹 Immediately fetch the session
      const sessionRes = await fetch("/api/auth/session");
      const sessionData = await sessionRes.json();

      if (!sessionData?.user || !sessionData.user.email) {
        toast.error("Could not fetch user info. Please try again.");
        return;
      }

      const user = sessionData.user;
      const fullName = user.name?.split(" ") || [];
      const first_name = fullName[0];
      const last_name = fullName.slice(1).join(" ") || "";

      // 🔹 Call backend safely
      await authService.socialSignup({
        first_name,
        last_name,
        email: user.email,
        is_google: provider === "google",
        is_facebook: provider === "facebook",
      });

      toast.success("Login successful!");
      router.replace("/overview");
    } catch (error) {
      console.error("Error registering social user:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (status === "loading") return null;

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => registerSocialUser("google")}
        className="border border-bordercolor flex justify-center items-center gap-[10px] py-2 mb-4 cursor-pointer"
      >
        <img src="/goggle.png" alt="Google" className="w-5 h-5" />
        <span className="text-linkgray text-base font-normal">
          Continue with Google
        </span>
      </button>

      <button
        onClick={() => registerSocialUser("facebook")}
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
