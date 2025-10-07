"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { authService } from "@/lib/api/authService";

interface AuthButtonProps {
  mode: "login" | "register";
}

export default function AuthButton({ mode }: AuthButtonProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log("session",session)
  const [providerSelected, setProviderSelected] = useState<"google" | "facebook" | null>(null);

const handleSocialAuth = async (provider: "google" | "facebook") => {
  setProviderSelected(provider);
  localStorage.setItem("loginProvider", provider);

  toast.success(`Redirecting for ${mode}...`);
  
  await signIn(provider, { callbackUrl: "/overview" });
};


useEffect(() => {
  const sendUserDataToAPI = async () => {
    if (!session?.user || !providerSelected) return;

    const userEmail = session.user.email || "";
    const fullName = session.user.name || "";
    const firstName = fullName.split(" ")[0] || "";
    const lastName = fullName.split(" ")[1] || "";

    try {
     if (mode === "register") {
  const payload = {
    first_name: firstName,
    last_name: lastName,
    email: userEmail,
    is_google: providerSelected === "google",
    is_facebook: providerSelected === "facebook",
  };
  const res = await authService.socialSignup(payload);
  console.log("Register API response:", res);

  // Save provider locally
    } else if (mode === "login") {
      const payload = {
        email: userEmail,
        password: "",
        is_google: providerSelected === "google",
        is_facebook: providerSelected === "facebook",
      };
      const res = await authService.login(payload);
      console.log("Login API response:", res);

      // Save provider locally
    }

      router.push("/overview");
    } catch (error) {
      console.error(`${mode} API error:`, error);
      toast.error("Something went wrong while calling API.");
    } finally {
      setProviderSelected(null);
    }
  };

  sendUserDataToAPI();
}, [session, providerSelected, mode, router]);


  if (status === "loading") return null;

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => handleSocialAuth("google")}
        className="border border-bordercolor flex justify-center items-center gap-[10px] py-2 mb-4 cursor-pointer"
      >
        <img src="/goggle.png" alt="Google" className="w-5 h-5" />
        <span className="text-linkgray text-base font-normal">
          Continue with Google
        </span>
      </button>

      <button
        onClick={() => handleSocialAuth("facebook")}
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
