"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthButton() {
  const router = useRouter();
  const { data: session, status } = useSession();   

  const handleGoogleLogin = async () => {
    await signIn("google");
  };

  const handleFacebookLogin = async () => {
    await signIn("facebook");
  };

useEffect(() => {
    if (status === "authenticated") {
      router.replace("/overview");
    }
  }, [status, router]);

  if (status === "loading") return null;

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={handleGoogleLogin}
        className="border border-bordercolor flex justify-center items-center gap-[10px] py-2 mb-4 cursor-pointer"
      >
        <img src="/goggle.png" alt="Google" className="w-5 h-5" />
        <span className="text-linkgray text-base font-normal">Continue with Google</span>
      </button>

      <button
        onClick={handleFacebookLogin}
        className="border border-bordercolor flex justify-center items-center gap-[10px] py-2 mb-[25px] cursor-pointer"
      >
        <img src="/facebook.png" alt="Facebook" className="w-5 h-5" />
        <span className="text-linkgray text-base font-normal">Continue with Facebook</span>
      </button>
    </div>
  );
}
